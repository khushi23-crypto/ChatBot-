use futures_util::{SinkExt, StreamExt};
use tokio_tungstenite::{connect_async, tungstenite::Message};

#[tokio::main]
async fn main() {
    let url = "ws://127.0.0.1:8080/ws/"; // Connect to your Actix server
    println!("Connecting to server (socket1)...");
    
    let (web_stream, _) = connect_async(url)
        .await
        .expect("Cannot connect to server");
    
    let (mut write, mut read) = web_stream.split();

    // Send a single message to the server
    let msg = Message::Text("Hello from client 1".into());
    write.send(msg).await.expect("Cannot send message");

    // Read the confirmation from the server
    if let Some(message) = read.next().await {
        let message = message.expect("Cannot read the message");
        println!("Server says: {}", message);
    }

    println!("Message sent from socket1. Exiting...");
}
