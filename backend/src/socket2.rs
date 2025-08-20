use futures_util::{SinkExt, StreamExt};
use tokio_tungstenite::{connect_async, tungstenite::Message};

#[tokio::main]
async fn main() {
    let url = "ws://127.0.0.1:8080/ws/"; // Connect to the same server
    println!("Connecting to server...");
    let (web_stream, _) = connect_async(url).await.expect("Cannot connect to server");
    let (_write, mut read) = web_stream.split(); // We won't send anything

    // Read a single message
    if let Some(message) = read.next().await {
        let message = message.expect("Cannot read the message");
        println!("Received from server: {}", message);
    }
}
