<!-- Reference implementation for non numeric hence no graph-->
<template>
  <div>
    <template v-if="cfLatestDataRowFromClientTbl">
      {{ initialFirstName }} {{ initialMiddleName }} {{ initialLastName }}
    </template>
  </div>
</template>

<script>
import clientTbl from '@/components/temporal/name/db/client-side/structure/name-of-a-patient-table.js'

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
      let arOfObjectsFromClientDB = clientTbl.query().where('ROW_END', 2147483648000).get()
      return arOfObjectsFromClientDB[0]
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
