[[toc]]

## Q1) How to run the app locally?

The method used by core developers is to run the vuejs and node server locally and the mysql DB on a public server.

VueJS talks to Nodejs running on same computer. Nodejs talks to mysql running on public server.

:::: tabs

::: tab Commands

Step1: Start vue-client

```
cd /gt/sc-prog-repos/
git clone https://github.com/savantcare/emr.git
cd webclient
webclient> npm install
# starts vue server
vue-client> yarn start-dev
# or
vue-client> npm run start-dev
```

Step2: Start node-server

```
cd /gt/sc-prog-repos/emr/ptserver
ptserver> npm install
ptserver> npm run start-dev             # start node server
```

:::

::: tab Action

<video width="560" height="240" controls>
  <source src="./images/run-vue-node-local-with-non-local-db.webm" type="video/mp4">
  Your browser does not support the video tag.
</video>

:::

::::

In 3 incognito tabs open:

To access phpmyadmin -> http://116.203.134.163:81/ stanford : jaidurgama

Login as doctor -> http://localhost/login user1@gmail.com : 123

Login as doctor admin assistant -> http://localhost/login user1@gmail.com : 123

### How to run mysql server?

Steps from VK deployment on DO in July 2020:

Start mysqld

```
mkdir /gt/sc-prog-repos
cd /gt/sc-prog-repos
git clone https://github.com/savantcare/emr.git
cd emr/deploy/docker
apt update
apt install -y docker-compose
emr/deploy/docker> docker-compose -f maria-10.4-docker-compose.yml up -d
```

To access phpmyadmin:
http://[ip-address]:81/

First time the root password is qwerty. PhpmyAdmin that is installed with the above docker-compose will give access from root password.

The admin password is given in:
patientfile/node-server/config/development.json (But this file is never committed to the repo)

To enter the docker container:

```
root@server1:/gt/sc-prog-repos/emr/deploy/docker# docker exec -ti docker_mariadb_1 bash
root@c02b4fc1097e:/# cd /gt/sc-prog-repos/emr/db
root@08e0dceb186a:/gt/sc-prog-repos/emr/deploy/db# ./create-first-user.sh
```

Ref: https://hackernoon.com/mariadb-phpmyadmin-docker-running-local-database-ok9q36ji

## Q2) How to start the documentation system?

### App level

#### Prod

:::: tabs

::: tab Commands

```
ptfile> npm run docs-build     // Generate prod files in .vuepress/dist
```

Then send .vuepress/dist to repo -> [https://github.com/savantcare/savantcare.github.io](https://github.com/savantcare/savantcare.github.io)

```
ptfile> cd ..
vk-tech@vk-mini-layer2-3 ~/g/sc-prog-repos> cd savantcare.github.io
savantcare.github.io> mv ../emr/.vuepress/dist/* .
savantcare.github.io>  git add .; git commit -m "generated new doc"; git push
```

:::

::: tab Action

<video width="560" height="240" controls>
  <source src="./images/deploy-docs-to-server.webm" type="video/mp4">
  Your browser does not support the video tag.
</video>

:::

::::

Then access:
[https://savantcare.github.io/](https://savantcare.github.io/)

#### Dev

To write the docs and see changes with hot reload:

:::: tabs

::: tab Command

```
docs> npm run docs-in-dev-mode
```

:::

::: tab Action

![movie](./images/hot-reload-docs.gif)

:::

::::

Then access: [http://localhost:8080/](http://localhost:8080/)

### Api Level

:::: tabs

::: tab Command

```
vue-client> npm run styleguide
```

:::

::: tab Action

<video width="560" height="240" controls>
  <source src="./images/vue-component-tech-doc.webm" type="video/mp4">
  Your browser does not support the video tag.
</video>

:::

::::

And then go to:

http://localhost:6060

## Q3) How to run same component inside patient file component and also individually?

### Step 1

A new componet called AddRecommendationTab is created inside:

/Users/vk-tech/gt/sc-prog-repos/patientfile/vue-client/src/cts/composition-layer2/AddRecommendation.vue

### Step 2

Now there is a route defined in vue-client/src/router/index.js:
{
path: '/recommendation',
name: 'recommendation',
component: () => import('@/views/Recommendation.vue')
},

Now when ever someone comes to http://ip-address/recommendation the router sends the user to /views/Recommendation.vue

### Step 3

Inside views/recommendation.vue the component created in step 1 is used. By the following codes:

1. Component is imported:
   import AddRecommendationTab from "@/components/patient/AddRecommendation";

2. Component is displayed:

```
     <el-tab-pane>
        <span slot="label" style="font-size:22px">Add recommendation</span>
        <AddRecommendationTab />
      </el-tab-pane>
```

The above structure is maintained because:

Components are supposed to be kept in components folder.

Views are supposed to use components but not define components.

## Q4) What VS Code extensions are used by core developers?

1. vetur
2. prettier - code formatter.
3. Debugger for chrome.

## Q5) How to see app behavior when DB server connection is lost?

The mysql server is run from docker (See node-server/README.md)

Use the web app and then

\$ docker stop [container-name-of-mysqld]

Now refresh the web app.

The data will come from localstorage but you will toast message saying:

"Filed to get "component name" data"

This works using try catch examples

1. [For recommendations](file:///gt/sc-prog-repos/patientfile/vue-client/src/store/modules/recommendation.js#221)
1. [For reminder](file:///gt/sc-prog-repos/patientfile/vue-client/src/store/modules/reminder.js#221)

To put the system back:
\$ docker start [container-name-of-mysqld]

## Q6) How to see app behavior when DB server takes 10 seconds for API response?

### Scenario 1:

Refresh the browser page. The UI wsill show data immediately from local storage using [vuex-persistance.](https://github.com/robinvdvleuten/vuex-persistedstate)

After 10 seconds when API returns a value UI will update.

In this case we saved the doctor 10 seconds.

### Scenario 2:

On the UI discontinue a rex.

Inside database.json it will not say Discontinue:true UI will continue to show it as discontinued.

After 10 seconds database.json will show Discontinue:true.

In this case the app was able to give doctor 10 second faster response.

### Scenario 3:

The web page shows the current list of recommendations

Edit node-server/database.json and change the description of a recommendation.

Reload the page

The web page should show the edited recommendation.

Status: Fail

## Q7) How to test the PWA app?

pwa app does not run from localhost. So the following steps needs to be followed:

We can test PWA app by install the following chrome extension:
https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb

## Q8) How to reduce boilerplate code?

Have three types of components?

1. UI components: Reusable across the whole app. They communicate just by using props and events, not holding any application logic.

2. Layout components: App will have only 1 of these. Like header and footer.

3. Domain components:

Ref: https://vueschool.io/articles/vuejs-tutorials/structuring-vue-cts/

## Q9) How are the components structured?

### Option1: A library implementation

```
<RecommendationsCard>

<CardHeader Prop{Title=Recommendation}>
</CardHeader>

<DataTable Prop{row1:(a,b),row2:(c,d)}>
</DataTable>

</RecommendationsCard>
```

### Option2: A framework implementation

```
<GenericCard Prop{Title=Recommendation, row1:(a,b),row2:(c,d)} >

</GenericCard>
```

Why is Option 1 better:

Theory: RecommendationsCard is using libraries and in option 2 RecommendationsCard is using a framework. Ref: https://www.programcreek.com/2011/09/what-is-the-difference-between-a-java-library-and-a-framework/

Practical:

1. Under option 1 I can decide not to use the cardHeader sub component and write my own card header in some cases like "Date of birth component"

## Q10) How to theme app while each component maintains its own scoped local context style?

https://vuedose.tips/tips/theming-using-custom-properties-in-vuejs-cts/

https://medium.com/maestral-solutions/coloring-your-app-implementing-live-theming-with-vue-js-and-styled-components-29e428900394

https://bootstrap-vue.org/docs/reference/theming

## Q11) How is the state of patient on a historical date generated?

### Architecture 1

Suppose doctor wants the state of the paitent on 15th Jan 2020:

The query is:
select \* from recommendationsTable where patientID=1 and createdBy < "15th Jan 2020" and ( discontinuedDate > "15th Jan 2020" or discontinuedDate == NULL)
This returns JSON A

Suppose doctor wants the state of the paitent on 10th Mar 2020:
The query is:
select \* from recommendationsTable where patientID=1 and createdBy < "10th Mar 2020" and ( discontinuedDate > "10th Mar 2020" or discontinuedDate == NULL)
This returns JSON B

Suppose the doctor wants to know the state of the patient on 9th March 2020:
This requires the same API as above.

Dis-Advantages of architecture 1:

1. Too many sql queries. But the data center is big and there are read only copies of MYSQL running from RAM ready to serve these queries. It is better to offload the complexity to the hardware instead of software. Wisdom says it is better to have expensive hardware and simple software.

### Architecture 2

The first query is:
select \* from recommendationsTable where patientID=1;
This returns JSON C

Now all queries about the state of recommendation are made on the client side.

Advantages of architecture 2:

1. Less number of queries to server.

Dis-Advantages of architecture 2:

1. How to run sql query over a JSON on the browser client side. Use https://vuex-orm.org/ with https://github.com/client-side-db/plugin-axios and https://github.com/client-side-db/plugin-soft-delete (bring discontinued to industry standard by calling it soft delete)

## Q12) How to deploy to Heroku?

```
cd vue-client
npm run build
git add .
git commit -m "....."
git push to the Repository
```

Heroku updates the staging server automatically when the master branch is updated

## Q13) How to maintain priority of recommendations, reminders, goals etc?

If you use double floating point numbers to indicate priority you do not need to re-order:

1.00 Task A

2.00 Task B

3.00 Task C

4.00 Task D

5.00 Task E

If you want to place task E between A and B then:-

E.priority = A.priority + ((B.priority - A.priority) / 2)

So now you have:

1.00 Task A

1.50 Task E

2.00 Task B

3.00 Task C

4.00 Task D

If you wanted to insert D between E and B then simply set its priority to 1.75. Given the approximately 18 decimal digits in a floating point number (1.75 is really 1.7500000000000000) you should have a worst case of 53 consecutive inserts before:

A.priority + ((B.priority - A.priority) / 2) = B.priority

And before anyone complains about the overhead of using doubles vs. integers, its just a few hardware instructions, compared with the processing and I/O overhead of reordering the list in the database which would be several orders of magnitude greater.

Ref: https://softwareengineering.stackexchange.com/questions/95431/priority-list-of-tasks-stored-in-a-database

## Q14) How to make sql code browsable?

Option 1: https://github.com/k1LoW/tbls#lint-a-database

Option 2: Take the model file from sequalize and then browse that.

## Q15) How to mark a component as reviewed?

In each component header there is a button called "R" this button on mouse over shows the date when the component was last reviewed by the logged in user.

On clicking on R the component datetime of review is updated.

The table used for this is:

DB_SC_Components_V20 -> componentStateReviewedOn

## Q16) What is the UI to lock an appt?

The slider in header shows all the appt dates.

The locked are in black color.

The not locked but in future are in blue color.

First not locked in past is in red color.

On clicking the circle the appt can be locked. All the reviewed on dates have to be > then the previos appt that is locked.
