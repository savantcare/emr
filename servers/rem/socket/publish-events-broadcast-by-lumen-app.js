/* 
    Diff between using node createServer and express: https://stackoverflow.com/questions/35167824/difference-between-a-server-with-http-createserver-and-a-server-using-express-in/35167883#:~:text=Express%20uses%20the%20http%20module,app%20using%20HTTPS%2C%20as%20app.
    express is built over createServer and there are tons of middleware available for express (and express-like) frameworks to complete common tasks such as: CORS, XSRF, POST parsing, cookies etc.
*/
var app = require("http").createServer(handler);
var io = require("socket.io")(app);

var Redis = require("ioredis");
var redis = new Redis();

app.listen(6001, function () {
  console.log("Node Server has been started");
  console.log("The redis connection details are", redis);
});

function handler(req, res) {
  console.log("Client connected from handler function");
  res.writeHead(200);
  res.write("Hello World! from handler function");
  res.end("");
}

io.on("connection", function (socket) {
  //
});

redis.psubscribe("*", function (err, count) {
  console.log("Message recd from redis server");
});

redis.on("pmessage", function (subscribed, channel, message) {
  message = JSON.parse(message);
  io.emit(channel + ":" + message.event, message.data);
});
