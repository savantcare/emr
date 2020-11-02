<template>
  <!-- Goal: Show 2 vitals in each row hence said 1fr 1fr -->
  <div style="display: grid; grid-template-columns: 1fr 1fr">
    <printNote :propApptId="propApptId" :propFormDef="weightFormDef"></printNote>
    <printNote :propApptId="propApptId" :propFormDef="heightFormDef"></printNote>
    <printNote :propApptId="propApptId" :propFormDef="pulseFormDef"></printNote>
    <printNote :propApptId="propApptId" :propFormDef="temperatureFormDef"></printNote>
    <printNote :propApptId="propApptId" :propFormDef="bloodPressureFormDef"></printNote>
    <printNote :propApptId="propApptId" :propFormDef="bloodSugarFormDef"></printNote>
    <printNote :propApptId="propApptId" :propFormDef="waistCircumferenceFormDef"></printNote>
  </div>
</template>

<script>
import printNote from '@/components/def-processors/view/paper.vue'
import { weightFormDef } from '@/components/temporal/weight/db/client-side/structure/weight-of-a-patient-table.js'
import { heightFormDef } from '@/components/temporal/height/db/client-side/structure/height-of-a-patient-table.js'
import { pulseFormDef } from '@/components/temporal/pulse/db/client-side/structure/pulse-of-a-patient-table.js'
import { temperatureFormDef } from '@/components/temporal/temperature/db/client-side/structure/temperature-of-a-patient-table.js'
import { bloodPressureFormDef } from '@/components/temporal/blood-pressure/db/client-side/structure/blood-pressure-of-a-patient-table.js'
import { bloodSugarFormDef } from '@/components/temporal/blood-sugar/db/client-side/structure/blood-sugar-of-a-patient-table.js'
import { waistCircumferenceFormDef } from '@/components/temporal/waist-circumference/db/client-side/structure/waist-circumference-of-a-patient-table.js'

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
      weightFormDef: weightFormDef,
      heightFormDef: heightFormDef,
      pulseFormDef: pulseFormDef,
      temperatureFormDef: temperatureFormDef,
      bloodPressureFormDef: bloodPressureFormDef,
      bloodSugarFormDef: bloodSugarFormDef,
      waistCircumferenceFormDef: waistCircumferenceFormDef,
    }
  },
}
</script>
