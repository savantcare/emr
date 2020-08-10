<!-- Master doc is at reference implementation name/cl/c-ct.vue. 
and graph related doc is at weight
-->
<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          placeholder="Height in inches"
          :value="mfGetCopiedRowFldValue('heightInInches')"
          @input="mfSetCopiedRowFldValueUsingCache($event, 'heightInInches')"
        >
        </el-input>
        <!-- Why is valur format timestamp? see weight/cl/c-ct.vue -->
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
