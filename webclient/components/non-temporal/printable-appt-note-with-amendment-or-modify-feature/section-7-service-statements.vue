<template>
  <div>
    <printNote :propApptId="propApptId" :propCtDef="ctDef"></printNote>
  </div>
</template>

<script>
import printNote from './structure-print-note.vue'

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
      ctDef: process.env.serviceStatementsCtDef,
    }
  },
  created() {
    // Inside this fn this will refer to this ct (parent) https://stackoverflow.com/questions/59826155/vue-callback-via-props-and-this

    this.ctDef.fnGetSelectOptionLabel = function (fieldNameInDb) {
      return 'jaikalima'
    }
  },
}
</script>
