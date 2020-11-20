<template>
  <el-card hover>
    <div style="display: grid; grid-template-columns: 5; border: solid">
      <div class="gridItem" style="grid-column-start: 1; grid-column-end: 6">
        <el-button
          round
          size="mini"
          :type="features.isThisIntake ? 'info' : 'primary'"
          :class="features.isThisIntake ? 'strike' : 'notStrike'"
          @click="features.isThisIntake = false"
          >Established Patient Office (requires 2 of 3)</el-button
        >
      </div>
      <div class="gridItem" style="font-weight: bold">Time</div>
      <div class="gridItem" style="font-weight: bold">CPT code</div>
      <div class="gridItem" style="font-weight: bold">History</div>
      <div class="gridItem" style="font-weight: bold">Exam</div>
      <div class="gridItem" style="font-weight: bold">MDM</div>

      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">Time</div>
      <div :class="features.cptCode.c99201 ? 'notStrike' : 'strike'">99211</div>
      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">N/A</div>
      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">N/A</div>
      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">N/A</div>

      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">Time</div>
      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">99212</div>
      <div :class="features.history.type.pf ? 'notStrike' : 'strike'">PF</div>
      <div :class="features.examination.type.pf ? 'notStrike' : 'strike'">PF</div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 1 ? 'notStrike' : 'strike'">
        Straight forward
      </div>

      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">Time</div>
      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">99213</div>
      <div :class="features.history.type.epf ? 'notStrike' : 'strike'">EPF</div>
      <div :class="features.examination.type.epf ? 'notStrike' : 'strike'">EPF</div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 2 ? 'notStrike' : 'strike'">Low</div>

      <div class="gridItem" :class="features.isThisIntake ? 'strike' : 'notStrike'">Time</div>
      <div class="gridItem" :class="features.isThisIntake ? 'strike' : 'notStrike'">99214</div>
      <div
        class="gridItem"
        :style="features.history.type.det ? 'background-color: #67C23A' : 'background-color: #909399'"
      >
        DET
      </div>
      <div
        class="gridItem"
        :style="features.examination.type.det ? 'background-color: #67C23A' : 'background-color: #909399'"
      >
        DET
      </div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 3 ? 'notStrike' : 'strike'">
        Moderate
      </div>

      <div class="gridItem" :class="features.isThisIntake ? 'strike' : 'notStrike'">Time</div>
      <div class="gridItem" :class="features.isThisIntake ? 'strike' : 'notStrike'">99215</div>
      <div
        class="gridItem"
        :style="features.history.type.comp ? 'background-color: #67C23A' : 'background-color: #909399'"
      >
        COMP
      </div>
      <div
        class="gridItem"
        :style="features.examination.type.comp ? 'background-color: #67C23A' : 'background-color: #909399'"
      >
        COMP
      </div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 4 ? 'notStrike' : 'strike'">High</div>
    </div>
  </el-card>
</template>

<script>
export default {
  components: {},
  async mounted() {},
  props: {
    features: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClickOnSettingsIcon() {
      console.log('setting to true')
      this.dIsSettingsDialogVisible = true
    },
    handleChange(val) {
      console.log(val)
    },
  },
}
</script>
