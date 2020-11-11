<template>
  <!-- Goal: Show 2 vitals in each row hence said 1fr 1fr -->
  <el-card style="padding: 5px" shadow="never">
    <div class="sectionHeader">
      <div class="sectionHeading">Vitals</div>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr">
      <contentDuringApptOfASingleCt :_apptId="_apptId" :_formDef="weightFormDef"></contentDuringApptOfASingleCt>
      <contentDuringApptOfASingleCt :_apptId="_apptId" :_formDef="heightFormDef"></contentDuringApptOfASingleCt>
      <contentDuringApptOfASingleCt :_apptId="_apptId" :_formDef="pulseFormDef"></contentDuringApptOfASingleCt>
      <contentDuringApptOfASingleCt :_apptId="_apptId" :_formDef="temperatureFormDef"></contentDuringApptOfASingleCt>
      <contentDuringApptOfASingleCt :_apptId="_apptId" :_formDef="bloodPressureFormDef"></contentDuringApptOfASingleCt>
      <contentDuringApptOfASingleCt :_apptId="_apptId" :_formDef="bloodSugarFormDef"></contentDuringApptOfASingleCt>
      <contentDuringApptOfASingleCt
        :_apptId="_apptId"
        :_formDef="waistCircumferenceFormDef"
      ></contentDuringApptOfASingleCt>
      <contentDuringApptOfASingleCt :_apptId="_apptId" :_formDef="bmiFormDef"></contentDuringApptOfASingleCt>
      <contentDuringApptOfASingleCt
        :_apptId="_apptId"
        :_formDef="oxygenSaturationFormDef"
      ></contentDuringApptOfASingleCt>
    </div>
  </el-card>
</template>

<script>
import contentDuringApptOfASingleCt from '@/components/def-processors/view/content-during-appt-of-a-single-ct.vue'
import { weightFormDef } from '@/components/temporal/weight/db/client-side/structure/weight-of-a-patient-table.js'
import { heightFormDef } from '@/components/temporal/height/db/client-side/structure/height-of-a-patient-table.js'
import { pulseFormDef } from '@/components/temporal/pulse/db/client-side/structure/pulse-of-a-patient-table.js'
import { temperatureFormDef } from '@/components/temporal/temperature/db/client-side/structure/temperature-of-a-patient-table.js'
import { bloodPressureFormDef } from '@/components/temporal/blood-pressure/db/client-side/structure/blood-pressure-of-a-patient-table.js'
import { bloodSugarFormDef } from '@/components/temporal/blood-sugar/db/client-side/structure/blood-sugar-of-a-patient-table.js'
import { waistCircumferenceFormDef } from '@/components/temporal/waist-circumference/db/client-side/structure/waist-circumference-of-a-patient-table.js'
import { bmiFormDef } from '@/components/temporal/bmi/db/client-side/structure/bmi-of-a-patient-table.js'
import { oxygenSaturationFormDef } from '@/components/temporal/oxygen-saturation/db/client-side/structure/oxygen-saturation-of-a-patient-table.js'

export default {
  components: {
    contentDuringApptOfASingleCt,
  },
  props: {
    _apptId: {
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
      bmiFormDef: bmiFormDef,
      oxygenSaturationFormDef: oxygenSaturationFormDef,
    }
  },
}
</script>

<style scoped>
.sectionHeader {
  margin-top: 0.5rem !important;
  padding-bottom: 0.1rem !important;
  border-bottom: 1px solid #dcdfe6;
}
.sectionHeading {
  font-size: 1rem;
  color: #606266;
}
</style>
