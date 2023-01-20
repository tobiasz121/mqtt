const client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "clientId");

const setpoint = document.getElementById('container')
setpoint.addEventListener('click', event =>{
    const val = event.target.textContent
    console.log(val)
    client.connect({onSuccess:onConnect});
    function onConnect() {
        console.log("Connected to Mosquitto broker");
        // check the client's connection status before trying to publish the message
        if (client.isConnected()) {
            console.log('connection obtained')
            const message = new Paho.MQTT.Message(val);
            message.destinationName = "exampleTopic";
            client.send(message);
        // subscribe to the "exampleTopic"
            client.subscribe("myTopic");
        } 
        else {
            console.log("Client is not connected to the broker");
            client.disconnect();
}
    }
});


// client.connect({onSuccess:onConnect});

// function onConnect()  {
//     console.log("Connected to Mosquitto broker");
//     // check the client's connection status before trying to publish the message
//     if (client.isConnected()) {
//         console.log('connection obtained')
//       const message = new Paho.MQTT.Message("Welcome to my World!");
//       message.destinationName = "exampleTopic";
//       client.send(message);
//        // subscribe to the "exampleTopic"
//     client.subscribe("myTopic");
//     } else {
//       console.log("Client is not connected to the broker");
//     }
//   };


  client.onConnectionLost = function(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
    }
};

// handle the messages received on the subscribed topic
client.onMessageArrived = function(message) {
    console.log(`Received message on topic ${message.destinationName}: ${message.payloadString}`);
  };