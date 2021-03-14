import { getMqttHost } from "./urlHelper";

const mqtt = require("mqtt");

export function connectAndSubscribe(deviceEUI, onMessage, onError, onSubscribed) {
    //this.connectionTime = new Date().getTime();

    //let host = "mqtts://" + process.env.REACT_APP_MQTT_HOST + ":" + process.env.REACT_APP_MQTT_PORT;
    let params = {
        username: process.env.REACT_APP_MQTT_USERNAME,
        password: process.env.REACT_APP_MQTT_PASSWORD,
        keepalive: 60,
        connectTimeout: 30000,
        rejectUnauthorized: false,
        servers: [{ protocol: "wss", host: getMqttHost(), port: process.env.REACT_APP_MQTT_PORT }]
    };
    const mqttClient = mqtt.connect(params);

    //Handle connection
    mqttClient.once("connect", () => {
        console.log("MQTTManager connected to ", getMqttHost());
    });

    //Handle all bad events
    let events = ["error", "offline", "end", "disconnect"];
    for (let event of events) { 
        mqttClient.once(event, msg => {
            console.log("MQTTManager", event);
            console.log(msg);
        });
    }

    //Handle messages using provided callback
    mqttClient.on("message", onMessage);

    const topics = [
        `application/1/device/${deviceEUI}/inst`,
        `application/1/device/${deviceEUI}/processed`,
        `application/1/device/${deviceEUI}/uplink`
    ];

    mqttClient.subscribe(topics, err => {
        if (err) {
            console.log("error subscribing ", err);
            onError(err);
        }
        console.log("subscribed to ", topics);
        onSubscribed();
    });

    return mqttClient;
}
