use futures_util::{SinkExt, StreamExt};
use tokio_tungstenite::{connect_async, tungstenite::Message};
#[tokio::main]
async fn main (){
    let url = "ws://echo.websocket.events/";
    println!("Connecting to the web socket now ");
    let (web_stream,_)=connect_async(url).await.expect("CAnnot connect to the web socket");
    println!("writing the message now ");
    let (mut write, mut read)= web_stream.split();

    if let Some(message)= read.next().await{
        let message = message.expect("Failed to get a message");
        println!("Recived a message: {}",message);
    }

    
    let msg = Message::Text("Draken Here".into());
    write.send(msg).await.expect("Cannot send the message ");
       if let Some(message)= read.next().await{
        let message = message.expect("Failed to get a message");
        println!("Recived a message: {}",message);
    }

    
}