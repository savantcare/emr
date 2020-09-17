8 steps data flow

# Server side

Step 1: php / lumen
Step 2: redis server running independently on a port
Step 3: redis client on nodejs
Step 4: socketio.server emit

==========================================================  
Step 5: Long packet route between server and users browser
==========================================================

# Client side

Step 6: socketio client receive
Step 7: vue
Step 8: component

Part 1:
https://www.youtube.com/watch?v=a2DT3B3_OzQ

Part 2:
https://youtu.be/IYCzpHm5VFo

Topics covered:

1. Message sent from redis Web UI. This is simulating php/lumen sending the publish message. The event name must be same as the function name at: emr/webclient/cts/pt-info/single/1t-Mrow-1Field/rem/cl/act-on-socket-messages-ct.vue
2. This message is received by nodejs socket server. Look at: emr/servers/socket/msg-pipeline-step1-from-lumen-to-step2-redis-server-to-step3-nodejs-redis-client-to-step4-socketio-emit
3. vue developer tools -> vuex -> entities -> reminders -> see the current rows
4. When message from socket is sent a new row gets added /emr/webclient/cts/pt-info/single/1t-Mrow-1Field/rem/cl/act-on-socket-messages-ct.vue
5. How is a new row added when socket message is recieved. objOrm.insert in previous file
6. As soon as new row is added the UI of grid-design2-ct gets updated. No extra work needs to done. This is like spreadsheet cell getting updated.
7. How to start the redis web ui? redis-commander
8. How to start the socker server?
   > cd emr/servers/socket/
   > ./start-redis-client-and-socket-server
   > This will execute the script: emr/servers/socket/msg-pipeline-step1-from-lumen-to-step2-redis-server-to-step3-nodejs-redis-client-to-step4-socketio-emit.js

Part 3:
https://youtu.be/6WYv-kxGLuA

This video covers:

1. How to start development server
2. How to work 'added from socket logic'
3. How to prevent duplicate entry from socket
