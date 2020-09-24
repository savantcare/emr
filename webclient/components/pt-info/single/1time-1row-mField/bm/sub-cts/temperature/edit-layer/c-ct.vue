<!-- Master doc is at reference implementation name/edit-layer/c-ct.vue. This file has doc unique to this ct 
For graph related work the reference implementation is weight.
-->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form>
          <el-form-item>
            <el-input
              placeholder="Temperature in farehnite"
              :value="mfGetCopiedRowBeingChangedFldVal('temperatureInFarehnite')"
              @input="mfSetCopiedRowBeingChangedFldVal($event, 'temperatureInFarehnite')"
            >
            </el-input>
            <el-date-picker
              :value="mfGetCopiedRowBeingChangedFldVal('timeOfMeasurement')"
              type="date"
              placeholder="Pick a day"
              :picker-options="pickerOptions"
              format="yyyy/MM/dd"
              value-format="timestamp"
              @input="mfSetCopiedRowBeingChangedFldVal($event, 'timeOfMeasurement')"
            >
            </el-date-picker>
            <el-input
              placeholder="Notes"
              type="textarea"
              :autosize="{ minRows: 2 }"
              :value="mfGetCopiedRowBeingChangedFldVal('notes')"
              @input="mfSetCopiedRowBeingChangedFldVal($event, 'notes')"
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
      </el-col>
      <el-col :span="12">
        <ctTemperatureGraph form-type="sub-part-of-another-form"></ctTemperatureGraph>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ctTemperatureGraph from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/temperature/view-layer/line-graph-ct.vue'
import mxc from '../com-mx/edit-layer.js'

export default {
  components: { ctTemperatureGraph },
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
