use actix::prelude::*;
use actix_web::{web, App, HttpServer, HttpRequest, HttpResponse};
use actix_web_actors::ws;
use std::sync::{Arc, Mutex};
use uuid::Uuid;

// Shared state to store one client's Addr
type SharedClient = Arc<Mutex<Option<Addr<MyWs>>>>;

struct MyWs {
    id: Uuid,
    shared: SharedClient,
}

impl Actor for MyWs {
    type Context = ws::WebsocketContext<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        let mut shared = self.shared.lock().unwrap();
        if shared.is_none() {
            println!("First client connected: {}", self.id);
            *shared = Some(ctx.address()); // store Addr of first client
        } else {
            println!("Second client connected: {}", self.id);
        }
    }

    fn stopped(&mut self, _: &mut Self::Context) {
        println!("Client disconnected: {}", self.id);
        let mut shared = self.shared.lock().unwrap();
        *shared = None;
    }
}

// StreamHandler must be imported from actix::prelude
impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for MyWs {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut ws::WebsocketContext<Self>) {
        if let Ok(ws::Message::Text(text)) = msg {
            println!("Received from {}: {}", self.id, text);

            // Forward to the other client if exists
            let shared = self.shared.lock().unwrap();
            if let Some(other_addr) = &*shared {
                if other_addr.connected() && other_addr != &ctx.address() {
                    other_addr.do_send(SendMessage(text.to_string()));
                }
            }

            ctx.text("Message sent!"); // confirmation to sender
        }
    }
}

// Message type to send to other client
struct SendMessage(String);
impl Message for SendMessage {
    type Result = ();
}

impl Handler<SendMessage> for MyWs {
    type Result = ();

    fn handle(&mut self, msg: SendMessage, ctx: &mut ws::WebsocketContext<Self>) {
        ctx.text(msg.0);
    }
}

// WebSocket handler
async fn ws_index(req: HttpRequest, stream: web::Payload, data: web::Data<SharedClient>) -> HttpResponse {
    let ws = MyWs {
        id: Uuid::new_v4(),
        shared: data.get_ref().clone(),
    };
    ws::start(ws, &req, stream).unwrap()
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let shared_client: SharedClient = Arc::new(Mutex::new(None));

    println!("WebSocket server running on ws://127.0.0.1:8080/ws/");
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(shared_client.clone()))
            .route("/ws/", web::get().to(ws_index))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
