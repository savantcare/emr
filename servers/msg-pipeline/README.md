Q1) How to install socket-server?
cd socket
vk-tech@vk-mini-layer2-3 ~/g/s/e/s/r/socket> mkdir node_modules // The mkdir is needed since npm might otherwise choose an already existing node_modules directory higher up in the hierarchy. Ref: https://stackoverflow.com/a/14469516/9782746
vk-tech@vk-mini-layer2-3 ~/g/s/e/s/r/socket> npm init
vk-tech@vk-mini-layer2-3 ~/g/s/e/s/r/socket> npm install socket.io ioredis
vk-tech@vk-mini-layer2-3 ~/g/s/e/s/r/socket> node publish-events-broadcast-by-lumen-app.js
