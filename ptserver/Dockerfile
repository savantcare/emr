# Why docker file: Different servers and dev machines have different node ver. This guarantees same node version every time

# Alpine does not have apt. This is based on debian 9
FROM node:14


COPY ./ /gt/sc-prog-repos/patientfile/node-server

WORKDIR /gt/sc-prog-repos/patientfile/node-server

RUN npm install 

# npx takes care of 1. If serve is not installed then install it. 2. node_modules path issues
CMD npm run start



