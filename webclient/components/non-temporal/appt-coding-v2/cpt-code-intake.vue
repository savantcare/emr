<template>
  <el-card hover>
    <el-button
      round
      size="mini"
      :type="features.isThisIntake ? 'primary' : 'info'"
      :class="features.isThisIntake ? '' : 'strike'"
      @click="features.isThisIntake = true"
      >New Patient Office (requires 3 of 3)</el-button
    >
    <div v-if="features.isThisIntake === true" style="display: grid; grid-template-columns: 5; border: solid">
      <div class="gridItem" style="grid-column-start: 1; grid-column-end: 6"></div>

      <div class="gridItem" style="font-weight: bold">Time</div>
      <div class="gridItem" style="font-weight: bold">CPT code</div>
      <div class="gridItem" style="font-weight: bold">History</div>
      <div class="gridItem" style="font-weight: bold">Exam</div>
      <div class="gridItem" style="font-weight: bold">MDM</div>

      <div class="gridItem" :class="features.isThisIntake ? 'strike' : 'notStrike'">Time</div>
      <div class="gridItem" :class="features.isThisIntake ? 'strike' : 'notStrike'">99201</div>

      <div :class="features.history.type.pf ? 'strike' : 'notStrike'">PF</div>
      <div :class="features.examination.type.pf ? 'strike' : 'notStrike'">PF</div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 1 ? 'notStrike' : 'strike'">
        Straight forward
      </div>

      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">Time</div>
      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">99202</div>
      <div :class="features.history.type.epf ? 'strike' : 'notStrike'">EPF</div>
      <div :class="features.examination.type.epf ? 'notStrike' : 'strike'">EPF</div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 1 ? 'notStrike' : 'strike'">
        Straight forward
      </div>

      <div :class="features.isThisIntake ? 'notStrike' : 'strike'">Time</div>
      <div :class="features.isThisIntake ? 'notStrike' : 'strike'">99203</div>
      <div :class="features.history.type.det ? 'notStrike' : 'strike'">DET</div>
      <div :class="features.examination.type.det ? 'notStrike' : 'strike'">DET</div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 2 ? 'notStrike' : 'strike'">Low</div>

      <div :class="features.isThisIntake ? 'notStrike' : 'strike'">Time</div>
      <div :class="features.isThisIntake ? 'notStrike' : 'strike'">99204</div>
      <div :class="features.history.type.comp ? 'notStrike' : 'strike'">COMP</div>
      <div :class="features.examination.type.comp ? 'notStrike' : 'strike'">COMP</div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 3 ? 'notStrike' : 'strike'">
        Moderate
      </div>
      <div
        class="gridItem"
        :style="features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
        :class="features.isThisIntake ? 'notStrike' : 'strike'"
      >
        Time
      </div>

      <div
        class="gridItem"
        :style="!features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
        :class="features.isThisIntake ? 'notStrike' : 'strike'"
      >
        99205
      </div>
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
