<!-- Master doc is at reference implementation name/edit-layer/edit-design-1.vue. This file has doc unique to this ct 
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
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form>
          <el-form-item>
            <el-input
              placeholder="Weight in pounds"
              :value="mfGetCopiedRowBeingChangedFldVal('weightInPounds')"
              @input="mfSetCopiedRowBeingChangedFldVal($event, 'weightInPounds')"
            ></el-input>
            <!-- element.io "By default, the component accepts and emits a Date object."  Ref: https://element.eleme.io/#/en-US/component/date-picker#date-formats
             Date object has date in a string. To accept a timestamp format the prop sent to the Ct is
             value-format="timestamp"
            -->
            <el-date-picker
              :value="mfGetCopiedRowBeingChangedFldVal('timeOfMeasurementInMilliseconds')"
              type="date"
              placeholder="Pick a day"
              :picker-options="pickerOptions"
              format="yyyy/MM/dd"
              value-format="timestamp"
              @input="mfSetCopiedRowBeingChangedFldVal($event, 'timeOfMeasurementInMilliseconds')"
            ></el-date-picker>
            <el-input
              placeholder="Notes"
              type="textarea"
              :autosize="{ minRows: 2 }"
              :value="mfGetCopiedRowBeingChangedFldVal('notes')"
              @input="mfSetCopiedRowBeingChangedFldVal($event, 'notes')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="cfHasSomeFldChanged" type="primary" plain @click="mfOnReviewed">Reviewed</el-button>
            <el-button :disabled="cfHasSomeFldChanged" type="warning" plain @click="mfOnResetForm"
              >Reset form</el-button
            >
          </el-form-item>
        </el-form>

        <!-- Goal: Show history of this row. Since this is a single field hence we are showing the history. If it was multiple fields then we do not show the history -->
        <el-timeline style="padding-inline-start: 20px">
          <el-timeline-item
            v-for="row in cfTimeLineDataAr"
            :key="row.ROW_START"
            :timestamp="row.createdAt"
            :type="row.type"
          >
            {{ row.weightInPounds }}
            <!-- The following come on right of the description that comes in the timeline. 
        Since they are part of the same line we do not capitalize the first alphabet. So it is "sending to server"
        and it is not "Sending to server"
            -->
            <span v-if="row.vnRowStateInSession == 345" class="api-response-message el-button--warning"
              >sending to server</span
            >
            <span v-if="row.vnRowStateInSession == 34571" class="api-response-message el-button--success"
              >saved this session</span
            >
          </el-timeline-item>
        </el-timeline>
      </el-col>
      <el-col :span="12">
        <ctWeightGraph form-type="sub-part-of-another-form"></ctWeightGraph>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ctWeightGraph from '@/components/temporal/vital-signs/sub-cts/weight/view-layer/line-graph-ct.vue'
import editMixin from '../code-common-for-all-1r-mf/edit-layer.js'

export default {
  components: { ctWeightGraph },
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
<style>
span.api-response-message {
  padding: 3px 8px 3px 8px;
  border-radius: 20px;
  font-size: 12px;
}
</style>
