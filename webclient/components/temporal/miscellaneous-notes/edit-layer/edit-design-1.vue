<template>
  <ctAddStructure propComponentName="family_history" :propFormFields="dataFormFields"></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/temporal/1-framework/edit-layer/edit-form.vue'

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
    ctAddStructure,
  },
}
</script>
