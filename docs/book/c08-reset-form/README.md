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
| 7   | Connecting element.io with vuex-orm using rowstatus.js                     | 123 | 22             | 32       | 54       | 3           | 11                | 2              |
|     | A. Form can add multiple data rows                                         |     |                |          |          |             |                   |                |
|     | B. Each data row is saved in ORM                                           |     |                |          |          |             |                   |
| 8   | Remove all rows from the form in 2 lines of code                           | 127 | 28             | 32       | 58       | 3           | 11                | 2              |

# For demo:

1. Type "Eigth chapter change"
2. Then click on reset form.

# Video walkthrough

Optimal resolution to view: 3840x2160

[![Deleting all rows](https://img.youtube.com/vi/ULUJ_Efg1C8/0.jpg)](https://www.youtube.com/watch?v=ULUJ_Efg1C8 "Deleting all rows")

https://youtu.be/ULUJ_Efg1C8

# Key concepts

1. Using rowstatus field to easily delete rows that match a state.

# File links

- /webclient/cts/book/c7-orm-model/search-phrases-ct.vue
- /webclient/cts/book/c7-orm-model/vl/table-ct.vue
- /webclient/cts/book/c7-orm-model/cl/table-ct.vue
- /webclient/cts/core/search-phrases/load-search-phrases-and-handle-selection.vue
- /webclient/cts/book/c7-orm-model/db/client-side-db/helloworld.js
- /webclient/store/vuex-orm-register.js
