# JSONServer + JWT Auth


## Install

### On Mac
Download and install [docker desktop for mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac) dmg. This is needed for running mysql server

```bash
$ npm install

$ docker run -p "80:80" -p "3306:3306" -v ${PWD}/app:/app mattrayner/lamp:latest-1804 

# Ref: https://github.com/mattrayner/docker-lamp#using-the-image
# Confirm mysql is running http://[ip-address]/phpmyadmin/ 
# login: admin 
# To get the mysql server password 
$ docker logs  # Look at top lines
# edit node_server/config.php to enter admin password

# 1. Create 4 databases A. sc_user B. sc_setting C. sc_reminder D. sc_recommendation
# 2. Insert the data: run sql statement inside the following 2 files:
# user_roles.sql
# users.sql

$ npm run start
```

Might need to run
```
npm audit fix
```

## How to login/register?

### From browser

http://localhost:port/login


### From command line

You can login/register by sending a POST request to

```
POST http://localhost:8000/auth/login
POST http://localhost:8000/auth/register
```
with the following data 

```
{
  "email": "alexey@email.com",
  "password":"123"
}
```

You should receive an access token with the following format 

```
{
   "access_token": "<ACCESS_TOKEN>"
}
```


You should send this authorization with any request to the protected endpoints

```
Authorization: Bearer <ACCESS_TOKEN>
```
