# Code

| Ch  | Functionality                                                              | LOC | search-phrases | vl/table | cl/table | load-search | objOrm/helloworld | store/vuex-orm |
| --- | -------------------------------------------------------------------------- | --- | -------------- | -------- | -------- | ----------- | ----------------- | -------------- |
| 1   | Show Ct in CsVL                                                            | 20  | 14             | 3        |          | 3           |                   |
| 2   | Show Ct in Cl                                                              | 31  | 22             | 3        | 3        | 3           |                   |
| 3   | Click Vl to Invoke Ct in Cl                                                | 46  | 22             | 18       | 3        | 3           |                   |
| 4   | Central role of vuex-orm                                                   | 73  | 22             | 32       | 3        | 3           | 11                | 2              |
|     | A. Define ORM model                                                        |     |                |          |          |             |                   |                |
|     | B. Insert into ORM                                                         |     |                |          |          |             |                   |
|     | C. Read from ORM                                                           |     |                |          |          |             |                   |
|     | D. Show data from ORM in Ct                                                |     |                |          |          |             |                   |
| 5   | Central role of element.io                                                 | 84  | 22             | 32       | 15       | 3           | 10                | 2              |
|     | Form field in Ct                                                           |     |                |          |          |             |                   |
| 6   | Central role of rowstatus.js                                               | 96  | 22             | 32       | 27       | 3           | 11                | 2              |
|     | A. Connect form field to Orm                                               |     |                |          |          |             |                   |
|     | B. Data in field survives when form is closed                              |     |                |          |          |             |                   |
|     | C. Data is saved in Chrome                                                 |     |                |          |          |             |                   |
|     | dev console -> vue -> vuex -> state -> entities -> helloworld -> data -> 1 |     |                |          |          |             |                   |
| 7   | Connecting element.io with vuex-orm using rowstatus.js                     | 123 | 28             | 32       | 54       | 3           | 11                | 2              |
|     | A. Form can add multiple data rows                                         |     |                |          |          |             |                   |                |
|     | B. Each data row is saved in ORM                                           |     |                |          |          |             |                   |

# For demo:

1. Type "Seventh chapter" and then click on A. Or,
2. Type "Seventh chapter change"

# Video walkthrough

Optimal resolution to view: 3840x2160

[![Adding mutiple rows](https://img.youtube.com/vi/Yd4lsHTSu5Y/0.jpg)](https://www.youtube.com/watch?v=Yd4lsHTSu5Y "Adding mutiple rows")

https://youtu.be/Yd4lsHTSu5Y

# Key concepts

1. What does rowStatus 2 and 24 mean
2. For loop on a computed function cfGetOrmNewRowsInEditState

# File links

- /webclient/cts/book/c7-orm-model/search-phrases-ct.vue
- /webclient/cts/book/c7-orm-model/vl/table-ct.vue
- /webclient/cts/book/c7-orm-model/cl/table-ct.vue
- /webclient/cts/core/search-phrases/load-search-phrases-and-handle-selection.vue
- /webclient/cts/book/c7-orm-model/db/client-side/helloworld.js
- /webclient/store/vuex-orm-register.js
