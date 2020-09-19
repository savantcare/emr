// Master doc is at reference implementation name/view-layer/c-ct.vue. This file has doc unique to
this ct Code synced with ref implementation on 18th august 2020
<template>
  <div>
    <el-form>
      <el-form-item>
        <!-- 
        Q) Why we are using the vaPhq9QuestionFields variable data from  mixins component db/full-sync-with-db-server-mixin.js

        Ans) the vaPhq9QuestionFields is is required for both VL and CL components. 
        Due to this we fetched data from mixins component.
        Fetched all the fields with v-for loop and displayed in the template.

        Note: The question 10 has differeent radio button label and design pattern
        for this we have saperated the design using v-if="index === 9" at line 45
      -->

        <div v-for="(question, index) in vaPhq9QuestionFields" :key="index">
          <div v-if="index !== 9">
            <el-row v-if="index === 0">
              <strong>
                Over the last 2 weeks, how often have you been bothered by any of the following
                problems?
              </strong>
            </el-row>

            <el-row>
              <el-col :span="12">
                <div>{{ index + 1 }}. {{ question.label }}</div>
              </el-col>
              <el-col :span="12">
                <el-radio-group
                  :value="mfGetCopiedRowFldNumericValue(question.name)"
                  @input="mfSetCopiedRowBeingChangedFldVal($event, question.name)"
                >
                  <el-radio :label="0">Not at all</el-radio>
                  <el-radio :label="1">Several days</el-radio>
                  <el-radio :label="2">More then half the days</el-radio>
                  <el-radio :label="3">Nearly every day</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </div>

          <div v-if="index === 9">
            <el-row>
              <strong>{{ question.label }}</strong>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-radio-group
                  :value="mfGetCopiedRowFldNumericValue(question.name)"
                  @input="mfSetCopiedRowBeingChangedFldVal($event, question.name)"
                >
                  <el-radio :label="0">Not difficult at all</el-radio>
                  <el-radio :label="1">Somewhat difficult</el-radio>
                  <el-radio :label="2">Very difficult</el-radio>
                  <el-radio :label="3">Extremely difficult</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="cfHasSomeFldChanged" type="success" plain @click="mfOnSubmit"
          >Submit</el-button
        >
        <el-button :disabled="cfHasSomeFldChanged" type="danger" plain @click="mfOnResetForm"
          >Reset form</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import mxc from '../com-mx/change-layer.js'

export default {
  mixins: [mxc],
}
</script>
