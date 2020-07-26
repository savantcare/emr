const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const http = require("http");
const app = require("express")();

const cors = require("cors");

const config = require("config");

var corsOptions = {
  origin: "*",
};

/* 
The following code section simulates a delay in respone from the server
connect-pause module is explained at https://github.com/flesler/connect-pause

In production mode delay is disabled.
How to run the code in production mode?
export NODE_ENV=prod
npm run start-dev
*/

var env = process.env.NODE_ENV || "dev"; // Ref: https://stackoverflow.com/questions/8449665/how-do-you-detect-the-environment-in-an-express-js-app

console.log(config);
console.log(env);

if (env === "dev") {
  pause = require("connect-pause");
  app.use(pause(config.artificial_delay_in_response_from_node_server)); // Change this to change the delay time.
}
/* End of delay section */

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const SECRET_KEY = "123456789";

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// app.use(/^(?!\/auth).*$/, (req, res, next) => {
//   if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
//     const status = 401
//     const message = 'Error in authorization format'
//     res.status(status).json({ status, message })
//     return
//   }
//   try {
//     let verifyTokenResult;
//     verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

//     if (verifyTokenResult instanceof Error) {
//       const status = 401
//       const message = 'Access token not provided'
//       res.status(status).json({ status, message })
//       return
//     }
//     next()
//   } catch (err) {
//     const status = 401
//     const message = 'Error access_token is revoked'
//     res.status(status).json({ status, message })
//   }
// })

const server = http.createServer(app);
server.listen(8000, () => {
  console.log("Node.js server is running");
});

require("./models");

// db.sequelize.sync();

// require("./socket")(server)

const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("CREATE_ROOM", (roomId) => {
    console.log("------------------------");
    console.log(`join to room ${roomId}`);
    console.log("------------------------");
    socket.join(roomId);
  });
});

const router = require("./routes")(io);
app.use(router);
