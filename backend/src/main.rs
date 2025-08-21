use actix::prelude::*;
use actix_web::{get, web, App, HttpRequest, HttpResponse, HttpServer};
use actix_web_actors::ws;
use std::collections::HashMap;
use std::sync::{Arc, Mutex};

// Shared clients map
type Clients = Arc<Mutex<HashMap<String, Addr<ChatSession>>>>;

// WebSocket actor
struct ChatSession {
    id: String, // owned String now
    clients: Clients,
}

impl Actor for ChatSession {
    type Context = ws::WebsocketContext<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        self.clients.lock().unwrap().insert(self.id.clone(), ctx.address());
        println!("{} connected!", self.id);
    }

    fn stopped(&mut self, _: &mut Self::Context) {
        self.clients.lock().unwrap().remove(&self.id);
        println!("{} disconnected!", self.id);
    }
}

// Handle incoming WebSocket messages
impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for ChatSession {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        if let Ok(ws::Message::Text(text)) = msg {
            // Determine target socket
            let target_id = if self.id == "socket1" { "socket2".to_string() } else { "socket1".to_string() };

            if let Some(target) = self.clients.lock().unwrap().get(&target_id) {
                target.do_send(MessageToClient(text.to_string()));
            }
        }
    }
}

// Wrapper to send message to client
struct MessageToClient(String);
impl Message for MessageToClient {
    type Result = ();
}

impl Handler<MessageToClient> for ChatSession {
    type Result = ();

    fn handle(&mut self, msg: MessageToClient, ctx: &mut Self::Context) {
        ctx.text(msg.0);
    }
}

// WebSocket route
#[get("/ws/{id}")]
async fn ws_route(req: HttpRequest, stream: web::Payload, data: web::Data<Clients>) -> HttpResponse {
    // Convert borrowed &str to owned String
    let id: String = req.match_info().get("id").unwrap().to_string();
    let session = ChatSession { id, clients: data.get_ref().clone() };
    ws::start(session, &req, stream).unwrap()
}

// Main server
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let clients: Clients = Arc::new(Mutex::new(HashMap::new()));

    println!("Starting server at ws://127.0.0.1:8080/ws/socket1 and socket2");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(clients.clone()))
            .service(ws_route)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
