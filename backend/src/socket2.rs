use futures_util::{SinkExt, StreamExt};
use tokio_tungstenite::{connect_async, tungstenite::Message};
use tokio::io::{self, AsyncBufReadExt};

#[tokio::main]
async fn main() {
    let url = "ws://127.0.0.1:8080/ws/socket2";

    println!("Connecting to the main web server...");
    let (web_stream, _) = connect_async(url).await.expect("Can't connect to server");
    let (mut write, mut read) = web_stream.split();

    // Task to read incoming messages
    tokio::spawn(async move {
        while let Some(msg) = read.next().await {
            match msg {
                Ok(Message::Text(text)) => println!("\nIncoming: {}", text),
                Ok(_) => {},
                Err(e) => {
                    eprintln!("Error reading message: {}", e);
                    break;
                }
            }
        }
    });

    // Read from stdin and send messages
    let stdin = io::BufReader::new(io::stdin());
    let mut lines = stdin.lines();

    while let Ok(Some(line)) = lines.next_line().await {
        write.send(Message::Text(line)).await.expect("Can't send message");
    }
}
