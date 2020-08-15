<!-- Master doc is at reference implementation name/cl/c-ct.vue. This file has doc unique to this ct 
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
              :value="mfGetCopiedRowFldValue('temperatureInFarehnite')"
              @input="mfSetCopiedRowFldValueUsingCache($event, 'temperatureInFarehnite')"
            >
            </el-input>
            <el-date-picker
              :value="mfGetCopiedRowFldValue('timeOfMeasurement')"
              type="date"
              placeholder="Pick a day"
              :picker-options="pickerOptions"
              format="yyyy/MM/dd"
              value-format="timestamp"
              @input="mfSetCopiedRowFldValueUsingCache($event, 'timeOfMeasurement')"
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
      </el-col>
      <el-col :span="12">
        <ctTemperatureGraph form-type="sub-part-of-another-form"></ctTemperatureGraph>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import mxc from '../mixins/change-layer.js'
import ctTemperatureGraph from '@/cts/spi/1t-1rMf/temperature/vl/line-graph-ct.vue'

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
