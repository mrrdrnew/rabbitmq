"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amqp = require("amqplib/callback_api");
var instanceName = "[AMQP]";
var cloudUrl = "https://api.cloudamqp.com/console/1b33c5be-014a-4d82-8f8b-80e3690c0768/details";
var rabbitMQUrl = "https://orangutan.rmq.cloudamqp.com/#/";
var tutorialUrl = "https://www.cloudamqp.com/blog/2015-05-19-part2-2-rabbitmq-for-beginners_example-and-sample-code-node-js.html";
var connection;
// Main code goes here
setup();
start();
// Implementation functions go here
function setup() {
}
exports.setup = setup;
function start() {
    // TODO: Should come from the configuration store(s)
    //  "amqp://<user>:<password>@<server>:<port>/<vhost>"
    var defaultUri = "amqp://lonhnfkm:o0Mu1q8DmTd98uPgAPHRDO4Wp6mZBgYK@orangutan.rmq.cloudamqp.com/lonhnfkm";
    var url = process.env.CLOUDAMQP_URL || defaultUri;
    var heartBit = 60;
    var reconnectTime = 1000;
    amqp.connect(url + "?heartbeat=" + heartBit, function (err, conn) {
        if (err) {
            console.error(instanceName, err.message);
            return setTimeout(start, reconnectTime);
        }
        conn.on("error", function (err) {
            if (err.message !== "Connection closing") {
                console.error(instanceName + " conn error", err.message);
            }
        });
        conn.on("close", function () {
            console.error(instanceName + " reconnecting");
            return setTimeout(start, reconnectTime);
        });
        console.log(instanceName + " connected");
        connection = conn;
        whenConnected();
        setTimeout(function () { return closeConnection(); }, 10 * 1000);
    });
}
exports.start = start;
function whenConnected() {
    //startPublisher();
    //startWorker();
}
function closeConnectionOnErr(err) {
    if (!err)
        return false;
    console.error(instanceName + " error", err);
    return closeConnection();
}
function closeConnection() {
    connection.close();
    return true;
}
//# sourceMappingURL=app.js.map