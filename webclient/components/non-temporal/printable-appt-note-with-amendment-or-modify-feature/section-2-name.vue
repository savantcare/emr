<!-- Reference implementation for non numeric hence no graph-->
<template>
  <div>{{ cfLatestDataRowFromClientSideTable['firstName'] }} {{ initialMiddleName }} {{ initialLastName }}</div>
</template>

<script>
import clientSideTable from '@/components/1time-1row-mField/name/db/client-side/structure/table.js'

export default {
  props: {
    formType: {
      default: 'stand-alone',
      type: String,
    },
    date: {
      ctName: 'name',
    },
  },
  computed: {
    cfLatestDataRowFromClientSideTable() {
      console.log('name ct')
      let arOfObjectsFromClientSideDB = clientSideTable.query().where('ROW_END', 2147483648000).get()

      console.log(arOfObjectsFromClientSideDB)
      return arOfObjectsFromClientSideDB[0]
    },

    initialMiddleName() {
      // console.log(this.cfLatestDataRowFromClientSideTable.middleName)
      if (this.cfLatestDataRowFromClientSideTable.middleName) {
        return this.cfLatestDataRowFromClientSideTable.middleName.charAt(0)
      } else {
        return ''
      }
    },
    initialLastName() {
      // console.log(this.cfLatestDataRowFromClientSideTable.lastName)
      if (this.cfLatestDataRowFromClientSideTable.lastName) {
        return this.cfLatestDataRowFromClientSideTable.lastName.charAt(0)
      } else {
        return ''
      }
    },
  },
}
</script>
