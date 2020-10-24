<!-- Reference implementation for non numeric hence no graph-->
<template>
  <div>
    <template v-if="cfLatestDataRowFromClientTbl">
      {{ initialFirstName }} {{ initialMiddleName }} {{ initialLastName }}
    </template>
  </div>
</template>

<script>
import clientTbl from '@/components/1time-eachField-1value/name/db/client-side/structure/table.js'

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
    cfLatestDataRowFromClientTbl() {
      let arOfObjectsFromClientSideDB = clientTbl.query().where('ROW_END', 2147483648000).get()
      return arOfObjectsFromClientSideDB[0]
    },
    initialFirstName() {
      // console.log(this.cfLatestDataRowFromClientTbl.middleName)
      if (this.cfLatestDataRowFromClientTbl.firstName) {
        return this.cfLatestDataRowFromClientTbl.firstName
      } else {
        return ''
      }
    },
    initialMiddleName() {
      // console.log(this.cfLatestDataRowFromClientTbl.middleName)
      if (this.cfLatestDataRowFromClientTbl.middleName) {
        return this.cfLatestDataRowFromClientTbl.middleName.charAt(0)
      } else {
        return ''
      }
    },
    initialLastName() {
      // console.log(this.cfLatestDataRowFromClientTbl.lastName)
      if (this.cfLatestDataRowFromClientTbl.lastName) {
        return this.cfLatestDataRowFromClientTbl.lastName.charAt(0)
      } else {
        return ''
      }
    },
  },
}
</script>
