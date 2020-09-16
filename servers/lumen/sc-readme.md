This is the reference implementation

Reference documentation is:
https://lumen.laravel.com/docs/5.3/authorization
https://auth0.com/blog/developing-restful-apis-with-lumen/
To do anything that differs from reference documentation a reason must be given.

Q1) Why lumen and not laravel?
Lumen has been made for APIs
Laravel is made for writing server side apps.

Q2) How to start local php server?
vk-tech@vk-mini-layer2-3 ~/g/s/e/s/lumen>brew install composer
vk-tech@vk-mini-layer2-3 ~/g/s/e/s/lumen>composer create-project --prefer-dist laravel/lumen lumen
vk-tech@vk-mini-layer2-3 ~/g/s/e/s/lumen>php -S localhost:8000 -t .
