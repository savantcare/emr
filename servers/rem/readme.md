This is the reference implementation

Reference documentation is:
https://lumen.laravel.com/docs/5.3/authorization
https://auth0.com/blog/developing-restful-apis-with-lumen/
To do anything that differs from reference documentation a reason must be given.

Q1) Why lumen and not laravel?
Lumen has been made for APIs
Laravel is made for writing server side apps.

Q2) How to start local php server?
vk-tech@vk-mini-layer2-3 ~/g/s/e/s/rem>brew install composer
vk-tech@vk-mini-layer2-3 ~/g/s/e/s/rem>composer create-project --prefer-dist laravel/lumen lumen
vk-tech@vk-mini-layer2-3 ~/g/s/e/s/rem>php -S localhost:8000 -t lumen

Q3) How to install redis-server?
brew install redis
redis-server

Q4) Wny is redis needed?
Redis has multiple channels and a pub/sub mechanism. Ref: https://redis.io/topics/pubsub

Q5) How to install socket-server?
cd socket
vk-tech@vk-mini-layer2-3 ~/g/s/e/s/r/socket> mkdir node_modules // The mkdir is needed since npm might otherwise choose an already existing node_modules directory higher up in the hierarchy. Ref: https://stackoverflow.com/a/14469516/9782746
vk-tech@vk-mini-layer2-3 ~/g/s/e/s/r/socket> npm init
vk-tech@vk-mini-layer2-3 ~/g/s/e/s/r/socket> npm install socket.io ioredis
vk-tech@vk-mini-layer2-3 ~/g/s/e/s/r/socket> node publish-events-broadcast-by-lumen-app.js
