/* 
    Diff between using node createServer and express: https://stackoverflow.com/questions/35167824/difference-between-a-server-with-http-createserver-and-a-server-using-express-in/35167883
    express is built over createServer and there are tons of middleware available for express (and express-like) frameworks to complete common tasks such as: CORS, XSRF, POST parsing, cookies etc.

    Ref of code: https://laravel.com/docs/5.2/events#consuming-event-broadcasts
*/
var httpApp = require("http").createServer(httpHandler);
var socketIO = require("socket.io")(httpApp);

var Redis = require("ioredis");
var redis = new Redis();

httpApp.listen(6001, function () {
  console.log("Node Server has been started");
  console.log("The redis connection details are", redis);
});

function httpHandler(pReq, pRes) {
  console.log("Client connected from httpHandler function");
  pRes.writeHead(200);
  pRes.write("Hello World! from httpHandler function");
  pRes.end("");
}

socketIO.on("connection", function (socket) {
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

redis.on("pmessage", function (subscribed, pChannel, pMessage) {
  /* The messages that lumen can send and that the vue-client understands are
      channel=added message=JSON{description=,addedby=,} 
      channel=discontinued message=JSON{uuid=$UUID,discontinuedBy=}


      The word namespace/rooms/channel/rooms/path/event means different things to different systems.
    
      One namespace can have multiple rooms
                      |  namespace                                            |    room            |
                      |  ---------                                            |  -----------       |
      socket.io       | namespace or /$name                                   |    channel or room | https://socket.io/docs/rooms/ https://socket.io/docs/client-api/#With-custom-path
      vue-socket.io   | given in  connection: 'http://localhost:6001/$name',  |    event name      |
      nuxt-socket.io  | channel                                               |                    | https://nuxt-socket-socketIO.netlify.app/usage
      redis           |                                                       |    channel         |

      The channel name comes from lumn -> redis -> nodejs. So all the control is with lumin.
  */

  console.log(pChannel, pMessage);
  socketIO.emit(pChannel, pMessage);
  // pMessage = JSON.parse(message);
  // socketIO.emit(channel + ":" + message.event, message.data);
});
