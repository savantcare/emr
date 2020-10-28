<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <ctAddStructure :propFormDef="formDef"> </ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/framework/edit-layer/add-form.vue'
import { diagnosisFormDef } from '@/components/temporal/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: diagnosisFormDef,
    }
  },

  components: {
    ctAddStructure,
  },
  created() {
    // Inside this fn this will refer to this ct (parent) https://stackoverflow.com/questions/59826155/vue-callback-via-props-and-this
    ;(this.formDef.fields[0].selectOptions = function (pQueryString, pCallBack) {
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
      console.log(this.formDef)
  },
  computed: {},
}
</script>
