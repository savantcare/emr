<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <fieldMultiValuesAdd propComponentName="allergies" :propFormFields="dataFormFields"></fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/1time-eachField-multiValues/common/edit-layer/add-ct.vue'

export default {
  data: function () {
    return {
      dataFormFields: [
        { fieldName: 'Allergen', fieldType: '', span: 8 },
        { fieldName: 'Reaction', fieldType: '', span: 8 },
        { fieldName: 'Onset', fieldType: '', span: 8 },
      ],
    }
  },

  components: {
    fieldMultiValuesAdd,
  },
}
</script>
