<!-- Master doc is at reference implementation name/edit-layer/edit-design-1.vue. 
and graph related doc is at weight
-->
<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          placeholder="Height in inches"
          :value="mfGetCopiedRowBeingChangedFldVal('heightInInches')"
          @input="mfSetCopiedRowBeingChangedFldVal($event, 'heightInInches')"
        >
        </el-input>
        <!-- Why is valur format timestamp? see weight/edit-layer/edit-design-1.vue -->
        <el-date-picker
          :value="mfGetCopiedRowBeingChangedFldVal('timeOfMeasurementInMilliseconds')"
          type="date"
          placeholder="Pick a day"
          :picker-options="pickerOptions"
          format="yyyy/MM/dd"
          value-format="timestamp"
          @input="mfSetCopiedRowBeingChangedFldVal($event, 'timeOfMeasurementInMilliseconds')"
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
        <el-button :disabled="cfHasSomeFldChanged" type="primary" plain @click="mfOnReviewed"
          >Reviewed</el-button
        >
        <el-button :disabled="cfHasSomeFldChanged" type="warning" plain @click="mfOnResetForm"
          >Reset form</el-button
        >
      </el-form-item>
    </el-form>
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
