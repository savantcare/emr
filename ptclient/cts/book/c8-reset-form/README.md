| Ch  | Functionality                                                              | LOC | search-phrases | vl/table | cl/table | load-search | orm/helloworld | store/vuex-orm |
| --- | -------------------------------------------------------------------------- | --- | -------------- | -------- | -------- | ----------- | -------------- | -------------- |
| 1   | Show Ct in CsVL                                                            | 20  | 14             | 3        |          | 3           |                |
| 2   | Show Ct in Cl                                                              | 31  | 22             | 3        | 3        | 3           |                |
| 3   | Click Vl to Invoke Ct in Cl                                                | 46  | 22             | 18       | 3        | 3           |                |
| 4   | A. Define ORM model                                                        | 73  | 22             | 32       | 3        | 3           | 11             | 2              |
|     | B. Insert into ORM                                                         |     |                |          |          |             |                |
|     | C. Read from ORM                                                           |     |                |          |          |             |                |
|     | D. Show data from ORM in Ct                                                |     |                |          |          |             |                |
| 5   | Form field in Ct                                                           | 84  | 22             | 32       | 15       | 3           | 10             | 2              |
| 6   | A. Connect form field to Orm                                               | 96  | 22             | 32       | 27       | 3           | 11             | 2              |
|     | B. Data in field survives when form is closed                              |     |                |          |          |             |                |
|     | C. Data is saved in Chrome                                                 |     |                |          |          |             |                |
|     | dev console -> vue -> vuex -> state -> entities -> helloworld -> data -> 1 |     |                |          |          |             |                |
| 7   | A. Form can add multiple data rows                                         | 123 | 22             | 32       | 54       | 3           | 11             | 2              |
|     | B. Each data row is saved in ORM                                           |     |                |          |          |             |                |
| 8   | Remove all rows from the form                                              |     | 22             | 32       | 54       | 3           | 11             | 2              |

For demo:

1. Type "Seventh chapter" and then click on A. Or,
2. Type "Seventh chapter change"

- /ptclient/cts/book/c7-orm-model/search-phrases.vue
- /ptclient/cts/book/c7-orm-model/vl/table.vue
- /ptclient/cts/book/c7-orm-model/cl/table.vue
- /ptclient/cts/core/manage-csvl-cards/load-search-phrases-and-handle-selection.vue
- /ptclient/cts/book/c7-orm-model/db/vuex-orm/helloworld.js
- /ptclient/store/vuex-orm-register.js
