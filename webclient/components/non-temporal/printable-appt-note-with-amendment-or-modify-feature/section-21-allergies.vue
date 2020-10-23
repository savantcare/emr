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
import printNote from './common-print-note-for-each-field-multi-values.vue'

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
        { fieldName: 'allergen', fieldType: 'textarea', span: 12 },
        { fieldName: 'relation', fieldType: '', span: 6 },
        { fieldName: 'onset', fieldType: '', span: 6 },
      ],
    }
  },
}
</script>
