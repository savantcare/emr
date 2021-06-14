<template>
  <div>
    <el-tabs v-model="activeHorizontalTab" tab-position="left">
       <el-tab-pane label="Ros Subjective" name="ros_subjective">Subjective:
        <div v-if="activeHorizontalTab === 'ros_subjective'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="subjective" :firstProp="_rowIdForEdit" ></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Gateway mood symptoms" name="gateway_mood_symptoms">Gateway mood symptoms. In the past 10 days, how many days have you:
        <div v-if="activeHorizontalTab === 'gateway_mood_symptoms'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="gateway_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Depression" name="depression">Depression
        <div v-if="activeHorizontalTab === 'depression'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="depressive_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Mania" name="mania">Mania/Hypomania
        <div v-if="activeHorizontalTab === 'mania'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="mania_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Psychosis" name="psychosis">Psychosis
        <div v-if="activeHorizontalTab === 'psychosis'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="psychosis_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Sleep" name="sleep" >Sleep
        <div v-if="activeHorizontalTab === 'sleep'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="sleep_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Substance Use" name="substance">Substance Use
        <div v-if="activeHorizontalTab === 'substance'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="substance_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="GAD" name="gad">GAD
        <div v-if="activeHorizontalTab === 'gad'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="gad_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Panic attacks" name="panic">Panic attacks
        <div v-if="activeHorizontalTab === 'panic'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="panic_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Social anxiety" name="social">Social anxiety
        <div v-if="activeHorizontalTab === 'social'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="social_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="OCD" name="ocd">OCD
        <div v-if="activeHorizontalTab === 'ocd'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="ocd_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="PTSD" name="ptsd">PTSD
        <div v-if="activeHorizontalTab === 'ptsd'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="ptsd_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="ADHD" name="adhd">ADHD
        <div v-if="activeHorizontalTab === 'adhd'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="adhd_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Anorexia" name="anorexia">Anorexia
        <div v-if="activeHorizontalTab === 'anorexia'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="anorexia_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Bulimia" name="bulimia">Bulimia
        <div v-if="activeHorizontalTab === 'bulimia'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="bulimia_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Dementia" name="dementia">Dementia
        <div v-if="activeHorizontalTab === 'dementia'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="dementia_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Suicide" name="suicide">Suicide
        <div v-if="activeHorizontalTab === 'suicide'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="suicide_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Homicide" name="homicide">Homicide
        <div v-if="activeHorizontalTab === 'homicide'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="homicide_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
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
