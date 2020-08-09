[[toc]]

## Q1) What is needed to write a new component?

For the model component Reminders the following files are needed:

Total loc: 991

## Client side

### Layer 1

**HTML/CSS/JS (122 loc)** -> /cts/rem/vl/table-ct.vue -> This has the presentation layer (html), styling layer (css), JS to change the state. This file is compiled into seperate html js and css by [vue-cli](https://cli.vuejs.org/)

### Layer 2

1. **Add (123 loc)** /cts/rem/cl/add-ct.vue

2. **Multi change (86 loc)** /cts/rem/cl/mc-ct.vue

### Common between layer 1 and layer 2

State (267 loc) -> Maintained inside vuex-orm. see /cts/rem/db/vuex-orm/rem.js

## Server side

1. **Connection details (27 loc)** -> [/models/database/recommendation.database.js](https://github.com/savantcare/emr/blob/master/node-server/models/database/recommendation.database.js)

2. **Sql structure (41 loc)** -> [/models/recommendation.model.js](https://github.com/savantcare/emr/blob/master/node-server/models/recommendation.model.js)

3. **Routes (174 loc)** and emit socket messages -> [/routes/recommendation.route.js](https://github.com/savantcare/emr/blob/master/node-server/routes/recommendation.route.js)

## Q2) What code-formatter is used?

vetur

## Q3) What is the migration plan?

We get rec and rem component to work completely in the new architecture. Once they are cerifited then 10 developers are given the responsibility of delivered 5 components each week.

Within 2 weeks /p2 will get released once the architecture is finalized

## Q4) What is the ideal component on which other components are based?

Recommendation.

## Q5) What tags are used in code?

- TODO:
- QUESTION:
- FIX:

To find files with Fix tag:

patientfile> grep -ir -n --exclude-dir={node_modules,.git} ' FIX:' ./

## Q6) What is the code review process?

https://www.youtube.com/watch?v=8fx-EaOUK2E

## Q7) How to do discontinue and delete in temporal DB?

1. When doctor says change then run a edit query

2. When doctor says discontinue then run a delete query

### What is the DB doing internally?

1. For each record a start and end time is maintained. These 2 columns are hidden from the sql query.

2. So when a edit is done mysql is internally adding a new record. And marking the end time of the previous record.

3. When a delete is done mysql is NOT deleting from the DB. Mysql is just marking the end time of that record.

Ref: https://mariadb.com/kb/en/temporal-data-tables/

## Q8) How the system decides which components are allowed access for each user role? Also what is the initial load sequence?

sc_user »Table: user_roles has the following fields:
componentsAllowedToAccess
msvlAreaComponentLoadSequence
csvlAreaComponentLoadSequence

The data looks like this:

```asciidoc

| id                                   | name                   | componentsAllowedToAccess | msvlAreaComponentLoadSequence | csvlAreaComponentLoadSequence |
|--------------------------------------|------------------------|---------------------------|------------------------------------------------|--------------------------------------------------|
| 897d25c6-2c84-47fe-9236-2c3cc9c70bdf | Doctor                 | Rex,Rem,Shx               | Rex,Rem,Shx                                    | Rem,Rex                                          |
| ae0ae9e7-545a-4783-ac83-84786839dcc1 | Patient                | NULL                      | 0                                              | 0                                                |
| ae2f20c1-448b-4df0-b221-9b4c3d411f59 | Doctor admin assistant | Shx, Policies             | Shx,Rem                                        | Rex                                              |
```

## Q9) How does the system redirect user to login if the user is not logged in?

## Q10) What is the code architecutre?

- Target: Architecture / LOC = 1/10
- Current: Total references (case insensitive): 605

### Core 1/6. Page design

```asciidoc
┌────────────────────────────────────────────────────────────────────────┐
|    msvlHeader = 9      |                              |
+-----------------------------------------+                              |
|                                         |                              |
|   mtsvl = 102           | ptsvl = 137|
|                                         |                              |
|                                         |                              |  typeOfStateDisplayArea = 122
|                                         |                              |  This var contains 1 of:
|This has list of cts.          |This has list of Components   |  mtsvl
|Data of each component depends on        |                              |            OR
|timeOfStateSelectedInHeader ( = 99 )     |Data is from currentTime      |  ptsvl
|timeOfStateSelectedInHeader has 2        |                              |
|possibilities:                           |On right side I do not care   |
|1. timeOfStateSelectedInHeader=2038-01-19|about                         |
|2. timeOfStateSelectedInHeader=value     |timeOfStateSelectedInHeader   |
|                                         |                              |
|If timeOfStateSelectedInHeader=2038-01-19|                              |
| then data of component is from          |                              |
| current time.                           |                              |
|                                         +------------------------------+
|                                         |SearchBoxForCommandsFromUser=4|
└────────────────────────────────────────────────────────────────────────┘
```

### Core 2/6. Multi state display area header design

```asciidoc
┌────────────────────────────────────────────────────────────────────────────────┐
|          |           Time of state selection            |  Type of component   |
| Name Age |         +-------------------------->         |  selection           |
|          | Slider at start is 100  meaning current time |  health/others       |
└────────────────────────────────────────────────────────────────────────────────┘
```

### Core 3/6 Component design

```asciidoc
┌────────────────────CardHeader = 86────────────────────┐   ┌─────────────────────────────────────────┐
│ ┌───────────────┐               ┌────────────────────┐│   │         Card header actions             │
│ │  CtName = 35  │               │Card header actions ││   ├──┬─────────────────────────────────┬────┤
│ └───────────────┘               └────────────────────┘│   │A │handleClickOnAInCardHeader()     │ 55 │
┣━━━━━━━━━━━━━━━━━━━DataTable = 28━━━━━━━━━━━━━━━━━━━━━━┫   ├──┼─────────────────────────────────┼────┤
│                                                       │   │M │handleClickOnMInCardHeader()     │ 73 │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │   ├──┼─────────────────────────────────┼────┤
│  Data row 1                         Data row actions ││   │F │handleClickOnFInCardHeader()     │ 77 │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │   ├──┼─────────────────────────────────┼────┤
│                                                       │   │D │handleClickOnDInCardHeader()     │ 56 │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │   ├──┼─────────────────────────────────┼────┤
│  Column 1              Column 2         C D           │   │X │handleClickOnXInCardHeader       │ 5  │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │   ├──┼─────────────────────────────────┼────┤
│                                                       │   │R │Review                           │    │
└───────────────────────────────────────────────────────┘   ├──┼─────────────────────────────────┼────┤
                                                            │G │handleUpdateColumns()            │ 17 │
                                                            └──┴─────────────────────────────────┴────┘


 ┌─────────────────────────────────────────┐
 │          Data row actions               │
 ├──┬─────────────────────────────────┬────┤
 │C │    handleClickOnCInDataRow()    │ 26 │
 ├──┼─────────────────────────────────┼────┤
 │D │    handleClickOnDInDataRow()    │ 26 │
 └──┴─────────────────────────────────┴────┘
```

```bash
vk-tech@vk-mini-layer2-3 ~/g/s/p/v/src> cloc --counted=/tmp/files-counted.txt .
90 text files.
90 unique files.
 2 files ignored.
```

```asciidoc

github.com/AlDanial/cloc v 1.86  T=0.11 s (808.1 files/s, 96325.8 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
Vuejs Component                 67            298            475           7088
JavaScript                      19            130            105           2626
Markdown                         3              1              0              4
SVG                              1              0              0              1
-------------------------------------------------------------------------------
SUM:                            90            429            580           9719
-------------------------------------------------------------------------------
```

### Core 4/6: Types of component

- 1/2: Card

  - ideal: patient/Recommendations/Layer1Card.vue
  - 4 categories
  - User interface of a card component See line 2
  - Functions to manage UI changes from Card Header See line 60
  - Functions to manage UI changes from data row See line 116
  - Functions to manage DB changes See line 137

- 2/2: Form
  - ideal: patient/Recommendations/Layer2/AddRecommendations.vue
  - 2 categories
  - User interface of a form component See Line 2
  - Managing form submission

### Core 5/6: Types of socket events

ideal: patient/Recommendations/stateDBSocket.js

- 1/3 add See line 62
- 2/3 change (same as update query for temporal DB) See line 83
- 3/3 discontinue (same as delete query for temporal DB) See line 96

### Core 6/6: Categories of DB API calls

ideal: patient/Recommendations/stateDBSocket.js

- 1/2 Get data See line 111
- 2/2 Change data See line 248
