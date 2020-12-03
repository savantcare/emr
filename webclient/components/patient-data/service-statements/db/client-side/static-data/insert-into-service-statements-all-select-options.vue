<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template>
  <div></div>
</template>

<script>
import serviceStatementsAllSelectOptionsTbl from '@/components/patient-data/service-statements/db/client-side/structure/service-statements-all-select-options.js'

var selectOptions = require('./insert-into-service-statements-all-select-options.js').selectOptions

export default {
  data() {
    return {}
  },
  mounted() {
    let i = 1

    let rowUniqId = 0
    let fldName = {}
    for (fldName in selectOptions) {
      const obj = selectOptions[fldName]
      for (let i = 0; i < obj.length; i++) {
        const label = obj[i].label
        serviceStatementsAllSelectOptionsTbl.insert({
          data: {
            fieldOptionId: '#' + label.replace(/ /g, '_') + '#', // # is the seperator charecter so toggle can work. Look inside manage-rows
            fieldOptionLabel: label,
            fieldNameInDb: fldName,
          },
        })
        rowUniqId++
      }
    }
  },
}
</script>
