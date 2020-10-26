<template>
  <fieldMultiValuesAdd :propCtDef="ctDef"></fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/temporal/1-framework/edit-layer/add-ct.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.serviceStatementsCtDef,
    }
  },
  created() {
    // Inside this fn this will refer to this ct (parent) https://stackoverflow.com/questions/59826155/vue-callback-via-props-and-this
    this.ctDef.fields[0].selectOptions = function (fieldObj) {
      console.log(fieldObj)
      const options = fieldObj.options
      console.log('inside the fn to return select options')
      return options
    }
    console.log(this.ctDef)
  },

  components: {
    fieldMultiValuesAdd,
  },
}
</script>
