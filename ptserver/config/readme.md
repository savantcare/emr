Config system is managed with https://github.com/lorenwest/node-config

This folder will always have default.json and you can create override values in [environment].json

Only default.json goes inside git repo since others contain sensitive passwords.

Q) How does the app decide which override file to use?

Example 1
=========
$ export NODE_ENV=production
$ node my-app.js
In the above example production.json will get used.

Example 2
=========
$ export NODE_ENV=development
$ node my-app.js
In the above example development.json will get used.

Example 3
=========
$ export NODE_ENV=sanjay
$ node my-app.js
In the above example sanjay.json will get used.
