<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->

<template>
  <oneTextAreaAdd propComponentName="family_history" :propFormFields="dataFormFields"></oneTextAreaAdd>
</template>

<script>
import oneTextAreaAdd from '@/components/1time-oneField-multiValues/1-textarea/edit-layer/add-ct.vue'

export default {
  data: function () {
    return {
      dataFormFields: [
        { fieldName: 'description', fieldType: 'textarea' },
        { fieldName: 'relationship', fieldType: 'textarea' },
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
