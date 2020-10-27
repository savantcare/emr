<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <ctAddStructure :propFormDef="formDef"> </ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/temporal/1-framework/edit-layer/add-form.vue'

export default {
  data: function () {
    return {
      formDef: process.env.diagnosisFormDef,
    }
  },

  components: {
    ctAddStructure,
  },
  created() {
    // Inside this fn this will refer to this ct (parent) https://stackoverflow.com/questions/59826155/vue-callback-via-props-and-this
    ;(this.ctDef.fields[0].selectOptions = function (pQueryString, pCallBack) {
      const options = [
        {
          id: '1',
          value: 'ADHD',
        },
        {
          id: '2',
          value: 'Depression',
        },
        {
          id: '3',
          value: 'Anxiety',
        },
        {
          id: '4',
          value: 'Flu',
        },
        {
          id: '5',
          value: 'Pain',
        },
      ]
      console.log('inside the fn to return select options')
      pCallBack(options)
    }),
      console.log(this.ctDef)
  },
  computed: {},
}
</script>
