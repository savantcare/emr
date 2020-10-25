<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <fieldMultiValuesAdd :propCtDef="ctDef"> </fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/1time-eachField-multiValues/common/edit-layer/add-ct.vue'

export default {
  data: function () {
    return {
      ctDef: {
        id: 'diagnosis',
        plural: 'diagnosis',
        singular: 'diagnosis',
        fields: [
          { fieldName: 'Diagnosis', fieldType: 'select', span: 8, selectOptions: this.optionList() },
          { fieldName: 'Assessment', fieldType: 'textarea', span: 8 },
          { fieldName: 'Onset', fieldType: '', span: 8 },
        ],
      },
    }
  },

  components: {
    fieldMultiValuesAdd,
  },
  methods: {
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
