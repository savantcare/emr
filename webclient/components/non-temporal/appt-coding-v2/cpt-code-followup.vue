<template>
  <el-card hover>
    <el-button
      round
      size="mini"
      :type="features.isThisIntake ? '' : 'primary'"
      :class="features.isThisIntake ? 'strike' : ''"
      @click="features.isThisIntake = false"
      >Established Patient Office (requires 2 of 3)</el-button
    >
    <div
      v-if="features.isThisIntake === false"
      style="display: grid; grid-template-columns: 5; border: 1px solid #f2f6fc"
    >
      <div class="gridItem" style="grid-column: 1/6"></div>
      <div class="gridItem" style="font-weight: bold">Time</div>
      <div class="gridItem" style="font-weight: bold">CPT code</div>
      <div class="gridItem" style="font-weight: bold">History</div>
      <div class="gridItem" style="font-weight: bold">Exam</div>
      <div class="gridItem" style="font-weight: bold">MDM</div>

      <div :class="features.billingDuration > 1 ? 'notStrike' : 'strike'">>1</div>
      <div :class="highestCode >= 99211 ? 'notStrike' : 'strike'">99211</div>
      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">N/A</div>
      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">N/A</div>
      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">N/A</div>

      <div :class="features.billingDuration > 5 ? 'notStrike' : 'strike'">>5</div>
      <div :class="highestCode >= 99212 ? 'notStrike' : 'strike'">99212</div>
      <div :class="features.history.type.pf ? 'notStrike' : 'strike'">PF</div>
      <div :class="features.examination.type.pf ? 'notStrike' : 'strike'">PF</div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 1 ? 'notStrike' : 'strike'">
        Straight forward
      </div>

      <div :class="features.billingDuration > 8 ? 'notStrike' : 'strike'">>8</div>
      <div :class="highestCode >= 99213 ? 'notStrike' : 'strike'">99213</div>
      <div :class="features.history.type.epf ? 'notStrike' : 'strike'">EPF</div>
      <div :class="features.examination.type.epf ? 'notStrike' : 'strike'">EPF</div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 2 ? 'notStrike' : 'strike'">Low</div>

      <div :class="features.billingDuration > 16 ? 'notStrike' : 'strike'">>16</div>
      <div :class="highestCode >= 99214 ? 'notStrike' : 'strike'">99214</div>
      <div :class="features.history.type.det ? 'notStrike' : 'strike'">DET</div>
      <div :class="features.examination.type.det ? 'notStrike' : 'strike'">DET</div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 3 ? 'notStrike' : 'strike'">
        Moderate
      </div>

      <div :class="features.billingDuration > 25 ? 'notStrike' : 'strike'">>25</div>
      <div :class="highestCode >= 99215 ? 'notStrike' : 'strike'">99215</div>
      <div :class="features.history.type.comp ? 'notStrike' : 'strike'">COMP</div>
      <div :class="features.examination.type.comp ? 'notStrike' : 'strike'">COMP</div>
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
  computed: {
    highestCode() {
      let levels = new Array()
      levels[0] = this.features.cptCode.levels.history
      levels[1] = this.features.cptCode.levels.exam
      levels[2] = this.features.cptCode.levels.mdm

      levels.sort((a, b) => b - a) // now 0 is highest level and 1 is 2nd highest level

      console.log(levels)

      this.features.cptCode.levels.secondHighest = levels[1]

      if (levels[1] === 1) return 99211
      if (levels[1] === 2) return 99212
      if (levels[1] === 3) return 99213
      if (levels[1] === 4) return 99214
      if (levels[1] === 5) return 99215
    },
  },
}
</script>
