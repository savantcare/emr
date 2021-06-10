<template>
  <div>
    <el-tabs v-model="activeHorizontalTab" tab-position="left">
       <el-tab-pane label="Ros Subjective" name="ros_subjective">Subjective:
        <div v-if="activeHorizontalTab === 'ros_subjective'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="subjective" :firstProp="_rowIdForEdit" ></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Depression" name="depression"
        >Depression
        <div v-if="activeHorizontalTab === 'depression'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="depressive.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Gateway mood symptoms" name="gateway_mood_symptoms"
        >Gateway mood symptoms. In the past 10 days, how many days have you:
        <div v-if="activeHorizontalTab === 'gateway_mood_symptoms'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="gateway.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Mania" name="mania"
        >Mania/Hypomania
        <div v-if="activeHorizontalTab === 'mania'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="mania.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Psychosis" name="psychosis"
        >Psychosis
        <div v-if="activeHorizontalTab === 'psychosis'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="psychosis.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Sleep" name="Sleep">Sleep</el-tab-pane>
      <el-tab-pane label="Substance abuse" name="Substance">Substance abuse</el-tab-pane>
      <el-tab-pane label="GAD" name="gad"
        >GAD
        <div v-if="activeHorizontalTab === 'gad'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="gad.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Panic attacks" name="Panic">Panic attacks</el-tab-pane>
      <el-tab-pane label="Social anxiety" name="social">Social anxiety</el-tab-pane>
      <el-tab-pane label="OCD" name="ocd">OCD</el-tab-pane>
      <el-tab-pane label="PTSD" name="ptsd">PTSD</el-tab-pane>
      <el-tab-pane label="ADHD" name="adhd">ADHD</el-tab-pane>
      <el-tab-pane label="Anorexia" name="anorexia">Anorexia</el-tab-pane>
      <el-tab-pane label="Bulimia" name="bulimia">Bulimia</el-tab-pane>
      <el-tab-pane label="Dementia" name="dementia">Dementia</el-tab-pane>
      <el-tab-pane label="Suicide" name="suicide">Suicide</el-tab-pane>
      <el-tab-pane label="Homicide" name="homicide">Homicide</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/change-appt-note/templates/edit-form.vue'
import { psychReviewOfSystemFormDef } from '@/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'
export default {
  data: function () {
    return {
      formDef: psychReviewOfSystemFormDef,
      activeHorizontalTab: 'ros_subjective',
    }
  },
  props: {
    _rowIdForEdit: {
      type: Number,
    },
  },
  mounted() {
    //    console.log(this.dataFormFields)
  },
  created() {},
  components: {
    ctEditFormTemplate,
  },
}
</script>
