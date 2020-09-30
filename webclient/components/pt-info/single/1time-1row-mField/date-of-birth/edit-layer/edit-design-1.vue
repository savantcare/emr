<!-- Master doc is at reference implementation name/edit-layer/edit-design-1.vue. This file has doc unique to this ct 
This acts as reference implementation for other Cts that use a graph.
So the heierarchy is:

Name
 1. No graph needed
 2. Graph needed
      A. Date of birth            (Doc of name is not repeated but has doc related to graph)
          1. Height        (Doc of name and Date of birth is not repeated)
          2. BMI


Code synced with ref implementation on 4th august 2020

-->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form>
          <el-form-item>
            <el-input
              placeholder="Date of birth"
              :value="mfGetCopiedRowBeingChangedFldVal('dateOfBirthInMilliseconds')"
              @input="mfSetCopiedRowBeingChangedFldVal($event, 'dateOfBirthInMilliseconds')"
            >
            </el-input>
            <!-- element.io "By default, the component accepts and emits a Date object."  Ref: https://element.eleme.io/#/en-US/component/date-picker#date-formats
             Date object has date in a string. To accept a timestamp format the prop sent to the Ct is
             value-format="timestamp"
        -->
            <el-input
              placeholder="Notes"
              type="textarea"
              :autosize="{ minRows: 2 }"
              :value="mfGetCopiedRowBeingChangedFldVal('notes')"
              @input="mfSetCopiedRowBeingChangedFldVal($event, 'notes')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="cfHasSomeFldChanged" type="primary" plain @click="mfOnReviewed"
              >Reviewed</el-button
            >
            <el-button :disabled="cfHasSomeFldChanged" type="warning" plain @click="mfOnResetForm"
              >Reset form</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import editMixin from '../code-common-for-all-1r-mf/edit-layer.js'
export default {
  mixins: [editMixin],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
    }
  },
}
</script>
