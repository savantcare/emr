<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <fieldMultiValuesAdd propComponentName="reminders" :propFormFields="dataFormFields"></fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/1time-eachField-multiValues/common/edit-layer/add-ct.vue'

export default {
  data: function () {
    return {
      dataFormFields: [{ fieldName: 'description', fieldType: 'textarea', span: 12 }],
    }
  },
  components: {
    fieldMultiValuesAdd,
  },
}
</script>
