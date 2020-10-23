<template>
  <div>
    <printNote
      propComponentName="allergies"
      :propApptId="propApptId"
      propReferToComponentInUiAtSingularClassification="allergy"
      propReferToComponentInUiAtPluralClassification="allergies"
      :propFormFields="dataFormFields"
    ></printNote>
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
      dataFormFields: [
        { fieldName: 'description', fieldType: 'textarea', span: 12 },
        { fieldName: 'relationship', fieldType: '', span: 6 },
      ],
    }
  },
}
</script>
