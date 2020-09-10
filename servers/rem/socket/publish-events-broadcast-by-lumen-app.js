/* 
    Diff between using node createServer and express: https://stackoverflow.com/questions/35167824/difference-between-a-server-with-http-createserver-and-a-server-using-express-in/35167883#:~:text=Express%20uses%20the%20http%20module,app%20using%20HTTPS%2C%20as%20app.
    express is built over createServer and there are tons of middleware available for express (and express-like) frameworks to complete common tasks such as: CORS, XSRF, POST parsing, cookies etc.

    Ref of code: https://laravel.com/docs/5.2/events#consuming-event-broadcasts
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
  console.log("connected");
});

/* 
  Count is the number of subscriptions active * Ref: https://redis.io/topics/pubsub/ 
  psubscribe -> Subscribes the client to the given patterns. Ref: https://redis.io/commands/psubscribe
*/
redis.psubscribe("*", function (err, count) {
  /* Using Pub/Sub of redis to subscribe https://redis.io/topics/pubsub
     How to test? 
      Step1: On the console type > redis-commander
      Step2: In the browser open: http://localhost:8081/      
      Step3: Inside the browser at the bottom there is a console. In the console type redis> PUBLISH second Hello
              Here second is the channel name. Hello is the message. Message can be json with its own fields.
      Step4: This script will print "Message recd from redis server" on the console.

      What is the architecture?
        reminder component's client side creates its own socket connection. The connection is made to reminder component's server side redis server
        there is a namespace reminders
        redis has channels and socket has rooms (https://socket.io/docs/rooms/)

  */
  console.log(
    "Message recd from redis server. Number of subscriptions active is",
    count
  );
});

redis.on("pmessage", function (subscribed, channel, message) {
  /* The messages that lumen can send and that the vue-client understands are
      channel=added message=JSON{description=,addedby=,} 
      channel=discontinued message=JSON{uuid=$UUID,discontinuedBy=}


      The word channel means different things to different people
    
      One name space can have multiple rooms
                        namespace   |    room            |
                      --------------|--------------------|
      socket.io       | namespace   |    channel or room | https://socket.io/docs/rooms/
      vue-socket.io   | path        |    event name      |
      nuxt-socket.io  | channel     |                    | https://nuxt-socket-io.netlify.app/usage

      The channel name comes from lumn -> redis -> nodejs. So all the control is with lumin.
  */

  console.log(channel, message);
  io.emit(channel, message);
  // message = JSON.parse(message);
  // io.emit(channel + ":" + message.event, message.data);
});
