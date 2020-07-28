| Ch  | Functionality               | LOC | search-phrases | vl/table | cl/table | load-search | orm/helloworld | database/index |
| --- | --------------------------- | --- | -------------- | -------- | -------- | ----------- | -------------- | -------------- |
| 1   | Show Ct in CsVL             | 20  | 14             | 3        |          | 3           |                |
| 2   | Show Ct in Cl               | 31  | 22             | 3        | 3        | 3           |                |
| 3   | Click Vl to Invoke Ct in Cl | 46  | 22             | 18       | 3        | 3           |                |
| 4   | A. Define ORM model         | 73  | 22             | 32       | 3        | 3           | 11             | 2              |
|     | B. Insert into ORM          |     |                |          |          |             |                |
|     | C. Read from ORM            |     |                |          |          |             |                |
|     | D. Show data from ORM in Ct |     |                |          |          |             |                |

For demo:

1. Type "Fourth chapter"

- /ptclient/cts/book/c4-hello-world/search-phrases.vue
- /ptclient/cts/book/c4-hello-world/vl/table.vue
- /ptclient/cts/book/c4-hello-world/cl/table.vue
- /ptclient/cts/core/manage-csvl-cards/load-search-phrases-and-handle-selection.vue
- /ptclient/cts/book/c4-hello-world/db/vuex-orm/helloworld.js
- /ptclient/store/vuex-orm-register.js
