# Code

| Ch  | Functionality                                                              | LOC | search-phrases | vl/table | cl/table | load-search | orm/helloworld | store/vuex-orm |
| --- | -------------------------------------------------------------------------- | --- | -------------- | -------- | -------- | ----------- | -------------- | -------------- |
| 1   | Show Ct in CsVL                                                            | 20  | 14             | 3        |          | 3           |                |
| 2   | Show Ct in Cl                                                              | 31  | 22             | 3        | 3        | 3           |                |
| 3   | Click Vl to Invoke Ct in Cl                                                | 46  | 22             | 18       | 3        | 3           |                |
| 4   | Central role of vuex-orm                                                   | 73  | 22             | 32       | 3        | 3           | 11             | 2              |
|     | A. Define ORM model                                                        |     |                |          |          |             |                |                |
|     | B. Insert into ORM                                                         |     |                |          |          |             |                |
|     | C. Read from ORM                                                           |     |                |          |          |             |                |
|     | D. Show data from ORM in Ct                                                |     |                |          |          |             |                |
| 5   | Central role of element.io                                                 | 84  | 22             | 32       | 15       | 3           | 10             | 2              |
|     | Form field in Ct                                                           |     |                |          |          |             |                |
| 6   | Central role of rowstatus.js                                               | 96  | 22             | 32       | 27       | 3           | 11             | 2              |
|     | A. Connect form field to Orm                                               |     |                |          |          |             |                |
|     | B. Data in field survives when form is closed                              |     |                |          |          |             |                |
|     | C. Data is saved in Chrome                                                 |     |                |          |          |             |                |
|     | dev console -> vue -> vuex -> state -> entities -> helloworld -> data -> 1 |     |                |          |          |             |                |
| 7   | Connecting element.io with vuex-orm using rowstatus.js                     | 123 | 22             | 32       | 54       | 3           | 11             | 2              |
|     | A. Form can add multiple data rows                                         |     |                |          |          |             |                |                |
|     | B. Each data row is saved in ORM                                           |     |                |          |          |             |                |
| 8   | Remove all rows from the form                                              | 127 | 22             | 32       | 58       | 3           | 11             | 2              |
| 9   | Remove single data rows                                                    | 155 | 28             | 32       | 70       | 3           | 11             | 2              |
| 10  | 3 core concepts of system versioned table Showing data from Cl into Vl     | 167 | 28             | 47       | 70       | 3           | 11             | 2              |

# For demo:

1. Type "Tenth chapter" and then click on A.
2. Enter some data in the add form
3. Data will show up in the view layer.

# Video walkthrough

Optimal resolution to view: 3840x2160

[![3 core concepts of system versioned table](https://img.youtube.com/vi/28wMlcOYfwM/0.jpg)](https://www.youtube.com/watch?v=28wMlcOYfwM '3 core concepts of system versioned table')

https://youtu.be/28wMlcOYfwM

# Key concepts

1. vue_table: https://element.eleme.io/#/en-US/component/table
2. Only required 3 core concepts of system versioned table. https://mariadb.com/kb/en/temporal-data-tables/

# File links:

- /ptclient/cts/book/c7-orm-model/search-phrases.vue
- /ptclient/cts/book/c7-orm-model/vl/table.vue
- /ptclient/cts/book/c7-orm-model/cl/table.vue
- /ptclient/cts/core/manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue
- /ptclient/cts/book/c7-orm-model/db/vuex-orm/helloworld.js
- /ptclient/store/vuex-orm-register.js
