import * as amqp from "amqplib/callback_api";

const instanceName = "[AMQP]";
const cloudUrl = "https://api.cloudamqp.com/console/1b33c5be-014a-4d82-8f8b-80e3690c0768/details";
const rabbitMQUrl = "https://orangutan.rmq.cloudamqp.com/#/";

const tutorialUrl = "https://www.cloudamqp.com/blog/2015-05-19-part2-2-rabbitmq-for-beginners_example-and-sample-code-node-js.html";

let connection: amqp.Connection;


// Main code goes here
setup();
start();

// Implementation functions go here
export function setup() {
}

export function start() {
    // TODO: Should come from the configuration store(s)
    //  "amqp://<user>:<password>@<server>:<port>/<vhost>"
    const defaultUri = "amqp://lonhnfkm:o0Mu1q8DmTd98uPgAPHRDO4Wp6mZBgYK@orangutan.rmq.cloudamqp.com/lonhnfkm";

    const url = process.env.CLOUDAMQP_URL || defaultUri;
    const heartBit = 60;
    const reconnectTime = 1000;

    amqp.connect(`${url}?heartbeat=${heartBit}`, (err, conn) => {
        if (err) {
            console.error(instanceName, err.message);
            return setTimeout(start, reconnectTime);
        }

        conn.on("error", err => {
            if (err.message !== "Connection closing") {
                console.error(`${instanceName} conn error`, err.message);
            }
        });

        conn.on("close", function () {
            console.error(`${instanceName} reconnecting`);
            return setTimeout(start, reconnectTime);
        });

        console.log(`${instanceName} connected`);

        connection = conn;
        whenConnected();

        setTimeout(() => closeConnection(), 10 * 1000);
    });
}

function whenConnected() {
    //startPublisher();
    //startWorker();
}

function closeConnectionOnErr(err?: any) {
    if (!err) return false;

    console.error(`${instanceName} error`, err);

    return closeConnection();
}

function closeConnection() {
    connection.close();
    return true;
}