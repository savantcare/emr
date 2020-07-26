# Components

[[toc]]

## How to write a component

3 core concepts:

1. The entrance file is: [search-phrases.vue](https://github.com/savantcare/emr/blob/master/ptclient/cts/spi/rem/search-phrases.vue)
   This component gives the search terms for the search dropdown by getting [imported](https://github.com/savantcare/emr/blob/85e1510dd834a7e812e2a2ec37eaf26d2c2aa91f/ptclient/cts/core/vl-search/index.vue#L24) then [defined](https://github.com/savantcare/emr/blob/85e1510dd834a7e812e2a2ec37eaf26d2c2aa91f/ptclient/cts/core/vl-search/index.vue#L31) and then [mounted](https://github.com/savantcare/emr/blob/85e1510dd834a7e812e2a2ec37eaf26d2c2aa91f/ptclient/cts/core/vl-search/index.vue#L4) inside
   [vl-search/index.vue](https://github.com/savantcare/emr/blob/master/ptclient/cts/core/vl-search/index.vue) For the flow chart see [vl-search](./core/vl-search/README.md)

2. Each component will usually have sub components for [vl](https://github.com/savantcare/emr/tree/master/ptclient/cts/spi/rem/vl) and [cl](https://github.com/savantcare/emr/tree/master/ptclient/cts/spi/rem/cl). Terms like [vl](../../docs/GLOSSARY.html#others) and [cl](../../docs/GLOSSARY.html#others) are explained in [glossary](../../docs/GLOSSARY). Which subcomponent is invoked is based on [search term](https://github.com/savantcare/emr/blob/85e1510dd834a7e812e2a2ec37eaf26d2c2aa91f/ptclient/cts/spi/rem/search-phrases.vue#L15) the keys [ctToShowInCsOfVl](https://github.com/savantcare/emr/blob/85e1510dd834a7e812e2a2ec37eaf26d2c2aa91f/ptclient/cts/spi/rem/search-phrases.vue#L17) and [ctToShowInCL](https://github.com/savantcare/emr/blob/85e1510dd834a7e812e2a2ec37eaf26d2c2aa91f/ptclient/cts/spi/rem/search-phrases.vue#L26) inside [search-phrases.vue](https://github.com/savantcare/emr/blob/master/ptclient/cts/spi/rem/search-phrases.vue)

3. Data in a component is [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) through a [model](https://github.com/savantcare/emr/blob/master/ptclient/cts/spi/rem/db/vuex-orm/rem.js). During CRUD the status of row is maintained inside [rowstatus.js](https://github.com/savantcare/emr/blob/master/ptclient/cts/core/crud/rowstatus.js)

## Types of component

### Core components

| #   | Name                                                | Programmer | Status       |
| --- | --------------------------------------------------- | ---------- | ------------ |
| 1   | [Change layer tab manager](./core/cl-tabs-manager/) | Vikas      | Ready to use |

### Health components

| #   | Name                             | Programmer | Status                             |
| --- | -------------------------------- | ---------- | ---------------------------------- |
| 1   | [Recommendations](./spi/rec/)    | Sanjay     | UI and DB final. Feature Under dev |
| 2   | [Goals](./spi/goal/)             | Raj        | UI and DB final. Feature Under dev |
| 3   | [Diagnosis](./spi/dx/)           | Anirban    | UI and DB final. Feature Under dev |
| 4   | [Screening](./spi/scr/)          | Jana       | UI and DB final. Feature Under dev |
| 5   | [Body measurement](./spi/bm/)    | Alexey     | Need to bring to nuxt              |
| 6   | [Mental status exam](./spi/mse/) | Alexey     | Need to bring to nuxt              |
| 7   | [Reminders](./spi/rem/)          |            |                                    |
| 8   | [Medication](./spi/medications/) |            |                                    |

### Other components
