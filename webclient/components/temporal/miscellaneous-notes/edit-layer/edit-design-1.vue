<template>
  <fieldMultiValuesAdd propComponentName="family_history" :propFormFields="dataFormFields"></fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/temporal/common/edit-layer/edit-design-1.vue'

export default {
  data: function () {
    return {
      dataFormFields: [
        { fieldName: 'description', fieldType: 'textarea', span: 12 },
        { fieldName: 'relationship', fieldType: '', span: 6 },
      ],
    }
  },

  mounted() {
    //    console.log(this.dataFormFields)
  },

  components: {
    fieldMultiValuesAdd,
  },
}
</script>
