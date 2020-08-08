<!-- Master doc is at reference implementation name/cl/c.vue. This file has doc unique to this ct 
This acts as reference implementation for other Cts that use a graph.
So the heierarchy is:

Name
 1. No graph needed
 2. Graph needed
      A. Weight            (Doc of name is not repeated but has doc related to graph)
          1. Height        (Doc of name and weight is not repeated)
          2. BMI


Code synced with ref implementation on 4th august 2020

-->
<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          placeholder="Weight in pounds"
          :value="mfGetCopiedRowFldValue('weightInPounds')"
          @input="mfSetCopiedRowFldValueUsingCache($event, 'weightInPounds')"
        >
        </el-input>
        <el-date-picker
          :value="mfGetCopiedRowFldValue('dateOfMeasurement')"
          type="date"
          placeholder="Pick a day"
          :picker-options="pickerOptions"
          format="yyyy/MM/dd"
          value-format="yyyy-MM-dd"
          @input="mfSetCopiedRowFldValueUsingCache($event, 'dateOfMeasurement')"
        >
        </el-date-picker>
        <el-input
          placeholder="Notes"
          type="textarea"
          :autosize="{ minRows: 2 }"
          :value="mfGetCopiedRowFldValue('notes')"
          @input="mfSetCopiedRowFldValueUsingCache($event, 'notes')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="cfHasSomeFldChanged" type="primary" plain @click="mfOnSubmit"
          >Submit</el-button
        >
        <el-button :disabled="cfHasSomeFldChanged" type="warning" plain @click="mfOnResetForm"
          >Reset form</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mxc from '../c-mixin.js'

export default {
  mixins: [mxc],
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
