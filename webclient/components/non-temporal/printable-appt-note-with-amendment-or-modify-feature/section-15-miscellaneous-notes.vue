<template>
  <div>
    <printNote propComponentName="misc_notes" :propApptId="propApptId" :propFormFields="dataFormFields"></printNote>
  </div>
</template>

<script>
import printNote from './section-10-1-textarea.vue'

export default {
  components: {
    printNote,
  },
  props: {
    propApptId: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      dataFormFields: [{ fieldName: 'description', fieldType: 'textarea', span: 12 }],
    }
  },
}
</script>
