<template>
  <div>
    <el-tabs v-model="activeHorizontalTab" tab-position="left">
       <el-tab-pane label="Ros Subjective" name="subjective">
        <span class="el-text"> Subjective</span>
        <div v-if="activeHorizontalTab === 'subjective'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="subjective" :firstProp="_rowIdForEdit" ></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Gateway mood symptoms" name="gateway_mood_symptoms">
        <span class="el-text"> Gateway mood symptoms. In the past 10 days, how many days have you:</span>
        <div v-if="activeHorizontalTab === 'gateway_mood_symptoms'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="gateway_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Depression" name="depression">
        <span class="el-text"> Depression</span>
        <div v-if="activeHorizontalTab === 'depression'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="depressive_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Mania" name="mania">
        <span class="el-text"> Mania/Hypomania</span>
        <div v-if="activeHorizontalTab === 'mania'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="mania_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Psychosis" name="psychosis">
        <span class="el-text"> Psychosis</span>
        <div v-if="activeHorizontalTab === 'psychosis'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="psychosis_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Sleep" name="sleep" >
        <span class="el-text"> Sleep</span>
        <div v-if="activeHorizontalTab === 'sleep'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="sleep_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Substance Use" name="substance">
        <span class="el-text"> Substance Use</span>
        <div v-if="activeHorizontalTab === 'substance'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="substance_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="GAD" name="gad">
        <span class="el-text"> GAD</span>
        <div v-if="activeHorizontalTab === 'gad'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="gad_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Panic attacks" name="panic">
        <span class="el-text"> Panic attacks</span>
        <div v-if="activeHorizontalTab === 'panic'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="panic_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Social anxiety" name="social">
        <span class="el-text"> Social Anxiety</span>
        <div v-if="activeHorizontalTab === 'social'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="social_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="OCD" name="ocd">
        <span class="el-text"> OCD</span>
        <div v-if="activeHorizontalTab === 'ocd'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="ocd_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="PTSD" name="ptsd">
        <span class="el-text"> PTSD</span>
        <div v-if="activeHorizontalTab === 'ptsd'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="ptsd_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="ADHD" name="adhd">
        <span class="el-text"> ADHD</span>
        <div v-if="activeHorizontalTab === 'adhd'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="adhd_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Anorexia" name="anorexia">
        <span class="el-text"> Anorexia</span>
        <div v-if="activeHorizontalTab === 'anorexia'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="anorexia_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Bulimia" name="bulimia">
        <span class="el-text"> Bulimia</span>
        <div v-if="activeHorizontalTab === 'bulimia'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="bulimia_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Dementia" name="dementia">
        <span class="el-text"> Dementia</span>
        <div v-if="activeHorizontalTab === 'dementia'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="dementia_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Suicide" name="suicide">
        <span class="el-text"> Suicide Assessment</span>
        <div v-if="activeHorizontalTab === 'suicide'">
          <ctEditFormTemplate :_formDef="formDef" _regexForFieldSubset="suicide_.*" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Homicide" name="homicide">
        <span class="el-text"> Homicide Assessment</span>
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
      activeHorizontalTab: 'subjective',
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

<style>
  .el-text{
    padding: 20px;
    font-weight: bold;
  }
</style>
