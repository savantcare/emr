<template>
  <oneTextAreaAdd propComponentName="family_history" :propFormFields="dataFormFields"></oneTextAreaAdd>
</template>

<script>
import oneTextAreaAdd from '@/components/1time-eachField-multiValues/1-textarea/edit-layer/add-ct.vue'

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
    oneTextAreaAdd,
  },
}
</script>
