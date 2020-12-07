<template>
  <div>
    <ctAddForm :_formDef="formDef" _regexForFieldSubset="subjective"></ctAddForm>

    <el-tabs v-model="activeHorizontalTab" tab-position="left">
      <el-tab-pane label="Gateway mood symptoms" name="Gateway mood symptoms"
        >Gasteway mood symptoms
        <ctAddForm :_formDef="formDef" _regexForFieldSubset="obese.*"></ctAddForm>
      </el-tab-pane>
      <el-tab-pane label="Depression" name="depression"
        >Depression

        <ctAddForm :_formDef="formDef" _regexForFieldSubset="depressive.*"></ctAddForm>
      </el-tab-pane>
      <el-tab-pane label="Mania" name="mania"
        >Mania/Hypomania
        <ctAddForm :_formDef="formDef" _regexForFieldSubset="malo.*"></ctAddForm>
      </el-tab-pane>
      <el-tab-pane label="Psychosis" name="psychosis">Psychosis</el-tab-pane>
      <el-tab-pane label="Sleep" name="Sleep">Sleep</el-tab-pane>
      <el-tab-pane label="Substance abuse" name="Substance">Substance abuse</el-tab-pane>
      <el-tab-pane label="GAD" name="gad">GAD</el-tab-pane>
      <el-tab-pane label="Panic attacks" name="Panic">Panic attacks</el-tab-pane>
      <el-tab-pane label="Social anxiety" name="social">Social anxiety</el-tab-pane>
      <el-tab-pane label="OCD" name="ocd">OCD</el-tab-pane>
      <el-tab-pane label="PTSD" name="ptsd">PTSD</el-tab-pane>
      <el-tab-pane label="ADHD" name="ptsd">ADHD</el-tab-pane>
      <el-tab-pane label="Anorexia" name="ptsd">Anorexia</el-tab-pane>
      <el-tab-pane label="Bulimia" name="ptsd">Bulimia</el-tab-pane>
      <el-tab-pane label="Dementia" name="ptsd">Dementia</el-tab-pane>
      <el-tab-pane label="Suicide" name="ptsd">Suicide</el-tab-pane>
      <el-tab-pane label="Homicide" name="ptsd">Homicide</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/note-change/templates/add-form.vue'
import psychReviewOfSystemsOfAPatientTbl from '@/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'

import { psychReviewOfSystemFormDef } from '@/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: psychReviewOfSystemFormDef,
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
