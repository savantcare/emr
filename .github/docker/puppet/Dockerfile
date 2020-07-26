## Custom Dockerfile
FROM dorowu/ubuntu-desktop-lxde-vnc

# node install instructions are from https://github.com/nodesource/distributions/blob/master/README.md#debinstall
RUN apt update
RUN apt -y upgrade
RUN apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

RUN apt install -y supervisor

RUN npm i npx jest puppeteer-core puppeteer jest-puppeteer nuxt-jest-puppeteer vue-jest

