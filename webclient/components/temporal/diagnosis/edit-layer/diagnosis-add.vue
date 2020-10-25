<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <fieldMultiValuesAdd :propCtDef="ctDef"> </fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/temporal/common/edit-layer/add-ct.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.diagnosisCtDef,
    }
  },

  components: {
    fieldMultiValuesAdd,
  },
  created() {
    this.ctDef.fields[0].selectOptions = this.optionList
  },
  computed: {
    optionList() {
      const options = [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ]
      return options
    },
  },
}
</script>
