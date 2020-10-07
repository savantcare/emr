# Components

[[toc]]

## How to write a component

3 core concepts:

1. The entrance file is: [search-phrases-ct.vue](https://github.com/savantcare/emr/blob/master/webclient/cts/ptinfo-single/1time-Mrow-1Field/reminder/search-phrases-ct.vue)
   This component gives the search terms for the search dropdown by getting [imported](https://github.com/savantcare/emr/blob/85e1510dd834a7e812e2a2ec37eaf26d2c2aa91f/webclient/cts/others/layer-1-right-side-components/index.vue#L24) then [defined](https://github.com/savantcare/emr/blob/85e1510dd834a7e812e2a2ec37eaf26d2c2aa91f/webclient/cts/others/layer-1-right-side-components/index.vue#L31) and then [mounted](https://github.com/savantcare/emr/blob/85e1510dd834a7e812e2a2ec37eaf26d2c2aa91f/webclient/cts/others/layer-1-right-side-components/index.vue#L4) inside
   [manage-layer1-right-side-cards/index.vue](https://github.com/savantcare/emr/blob/master/webclient/cts/others/layer-1-right-side-components/index.vue) For the flow chart see [manage-layer1-right-side-cards](./others/layer-1-right-side-components/README.md)

2. Each component will usually have sub components for [vl](https://github.com/savantcare/emr/tree/master/webclient/cts/ptinfo-single/1time-Mrow-1Field/reminder/vl) and [cl](https://github.com/savantcare/emr/tree/master/webclient/cts/ptinfo-single/1time-Mrow-1Field/reminder/cl). Terms like [vl](../../docs/GLOSSARY.html#others) and [cl](../../docs/GLOSSARY.html#others) are explained in [glossary](../../docs/GLOSSARY). Which subcomponent is invoked is based on [search term](https://github.com/savantcare/emr/blob/85e1510dd834a7e812e2a2ec37eaf26d2c2aa91f/webclient/cts/ptinfo-single/1time-Mrow-1Field/reminder/search-phrases-ct.vue#L15) the keys [ctToShow](https://github.com/savantcare/emr/blob/85e1510dd834a7e812e2a2ec37eaf26d2c2aa91f/webclient/cts/ptinfo-single/1time-Mrow-1Field/reminder/search-phrases-ct.vue#L17) and [ctToShow](https://github.com/savantcare/emr/blob/85e1510dd834a7e812e2a2ec37eaf26d2c2aa91f/webclient/cts/ptinfo-single/1time-Mrow-1Field/reminder/search-phrases-ct.vue#L26) inside [search-phrases-ct.vue](https://github.com/savantcare/emr/blob/master/webclient/cts/ptinfo-single/1time-Mrow-1Field/reminder/search-phrases-ct.vue)

3. Data in a component is [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) through a [model](https://github.com/savantcare/emr/blob/master/webclient/cts/ptinfo-single/1time-Mrow-1Field/reminder/db/client-side/rem.js). During CRUD the status of row is maintained inside [rowstatus.js](https://github.com/savantcare/emr/blob/master/webclient/cts/others/crud/rowstatus.js)

## Types of component

### Core components

| #   | Name                                                  | Programmer | Status       |
| --- | ----------------------------------------------------- | ---------- | ------------ |
| 1   | [Change layer tab manager](./others/edit-layer-tabs/) | Vikas      | Ready to use |

### Health components

| #   | Name                                               | Programmer | Status                             |
| --- | -------------------------------------------------- | ---------- | ---------------------------------- |
| 1   | [Recommendations](./ptinfo-single/rec/)            | Sanjay     | UI and DB final. Feature Under dev |
| 2   | [Goals](./ptinfo-single/goal/)                     | Raj        | UI and DB final. Feature Under dev |
| 3   | [Diagnosis](./ptinfo-single/dx/)                   | Anirban    | UI and DB final. Feature Under dev |
| 4   | [Screening](./ptinfo-single/scr/)                  | Jana       | UI and DB final. Feature Under dev |
| 5   | [Body measurement](./ptinfo-single/vital-signs/)   | Alexey     | Need to bring to nuxt              |
| 6   | [Mental status exam](./ptinfo-single/mse/)         | Alexey     | Need to bring to nuxt              |
| 7   | [Reminders](./ptinfo-single/1time-Mrow-1Field/rem) |            |                                    |
| 8   | [Medication](./ptinfo-single/medications/)         |            |                                    |

### Other components
