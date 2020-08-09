# Code

| Ch  | Functionality               | LOC | search-phrases | vl/table | cl/table | load-search | orm/helloworld | store/vuex-orm |
| --- | --------------------------- | --- | -------------- | -------- | -------- | ----------- | -------------- | -------------- |
| 1   | Show Ct in CsVL             | 20  | 14             | 3        |          | 3           |                |
| 2   | Show Ct in Cl               | 31  | 22             | 3        | 3        | 3           |                |
| 3   | Click Vl to Invoke Ct in Cl | 46  | 22             | 18       | 3        | 3           |                |
| 4   | Central role of vuex-orm    | 73  | 22             | 32       | 3        | 3           | 11             | 2              |
|     | A. Define ORM model         |     |                |          |          |             |                |                |
|     | B. Insert into ORM          |     |                |          |          |             |                |
|     | C. Read from ORM            |     |                |          |          |             |                |
|     | D. Show data from ORM in Ct |     |                |          |          |             |                |
| 5   | Central role of element.io  | 84  | 22             | 32       | 15       | 3           | 10             | 2              |
|     | Form field in Ct            |     |                |          |          |             |                |

# Demo

1. Type "Fifth chapter" and then click on A. Or,
2. Type "Fifth chapter change"

# Video walkthrough

Optimal resolution to view: 3840x2160

[![Show component in current state of view layer](https://img.youtube.com/vi/zCgWHvHn4JA/0.jpg)](https://www.youtube.com/watch?v=lb1IGuGocbI 'form field & element.io')

https://youtu.be/lb1IGuGocbI

# Key concepts

1. Importance of element.io in the EMR.

# File links

- /ptclient/cts/book/c5-orm-model/search-phrases.vue
- /ptclient/cts/book/c5-orm-model/vl/table-ct.vue
- /ptclient/cts/book/c5-orm-model/cl/table-ct.vue
- /ptclient/cts/core/manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue
- /ptclient/cts/book/c5-orm-model/db/vuex-orm/helloworld.js
- /ptclient/store/vuex-orm-register.js
