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
    ;(this.ctDef.fields[0].selectOptions = function (pQueryString, pCallBack) {
      const options = [
        {
          id: '1',
          value: '30',
        },
        {
          id: '2',
          value: '40',
        },
        {
          id: '3',
          value: '45',
        },
        {
          id: '4',
          value: '60',
        },
        {
          id: '5',
          value: '70',
        },
      ]
      console.log('inside the fn to return select options')
      pCallBack(options)
    }),
      console.log(this.ctDef)
  },

  components: {
    fieldMultiValuesAdd,
  },
}
</script>
