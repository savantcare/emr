<template>
  <div>
    <el-tabs v-model="activeHorizontalTab" tab-position="left">
      <el-tab-pane label="Ros Subjective" name="subjective">Subjective:
        <div v-if="activeHorizontalTab === 'subjective'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="subjective"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Gateway mood symptoms" name="gateway_mood_symptoms">Gateway mood symptoms. In the past 10 days, how many days have you:
        <div v-if="activeHorizontalTab === 'gateway_mood_symptoms'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="gateway_.*"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Depression" name="depression" >Depression
        <div v-if="activeHorizontalTab === 'depression'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="depressive_.*"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Mania" name="mania" >Mania/Hypomania
        <div v-if="activeHorizontalTab === 'mania'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="mania_.*"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Psychosis" name="psychosis">Psychosis
        <div v-if="activeHorizontalTab === 'psychosis'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="psychosis_.*"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Sleep" name="sleep">Sleep
        <div v-if="activeHorizontalTab === 'sleep'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="sleep_.*"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Substance Use" name="substance">Substance Use
        <div v-if="activeHorizontalTab === 'substance'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="substance_.*"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="GAD" name="gad">GAD
        <div v-if="activeHorizontalTab === 'gad'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="gad_.*"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Panic attacks" name="panic">Panic attacks
        <div v-if="activeHorizontalTab === 'panic'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="panic_.*"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Social anxiety" name="social">Social anxiety
        <div v-if="activeHorizontalTab === 'social'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="social_.*"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="OCD" name="ocd">OCD
        <div v-if="activeHorizontalTab === 'ocd'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="ocd_.*"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="PTSD" name="ptsd">PTSD
        <div v-if="activeHorizontalTab === 'ptsd'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="ptsd_.*"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="ADHD" name="adhd">ADHD
        <div v-if="activeHorizontalTab === 'adhd'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="adhd_.*"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Anorexia" name="anorexia">Anorexia
        <div v-if="activeHorizontalTab === 'anorexia'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="anorexia_.*"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Bulimia" name="bulimia">Bulimia
        <div v-if="activeHorizontalTab === 'bulimia'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="bulimia_.*"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Dementia" name="dementia">Dementia
        <div v-if="activeHorizontalTab === 'dementia'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="dementia_.*"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Suicide" name="suicide">Suicide
        <div v-if="activeHorizontalTab === 'suicide'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="suicide_.*"></ctAddForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Homicide" name="homicide">Homicide
        <div v-if="activeHorizontalTab === 'homicide'">
          <ctAddForm :_formDef="formDef" _regexForFieldSubset="homicide_.*"></ctAddForm>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import psychReviewOfSystemsOfAPatientTbl from '@/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'
import { psychReviewOfSystemFormDef } from '@/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'
export default {
  data: function () {
    return {
      formDef: psychReviewOfSystemFormDef,
      activeHorizontalTab: 'subjective',
    }
  },
  created() {
    // Inside this fn 'this' will refer to this ct (parent) https://stackoverflow.com/questions/59826155/vue-callback-via-props-and-this
  },
  components: {
    ctAddForm,
  },
}
</script>
