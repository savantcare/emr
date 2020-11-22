<template>
  <el-card hover>
    <el-button
      round
      size="mini"
      :type="features.isThisIntake ? 'primary' : ''"
      :class="features.isThisIntake ? '' : 'strike'"
      @click="features.isThisIntake = true"
      >New Patient Office (requires 3 of 3)</el-button
    >
    <div
      v-if="features.isThisIntake === true"
      style="display: grid; grid-template-columns: 5; border: 1px solid #f2f6fc"
    >
      <div class="gridItem" style="grid-column: 1/6"></div>

      <div class="gridItem" style="font-weight: bold">Time</div>
      <div class="gridItem" style="font-weight: bold">CPT code</div>
      <div class="gridItem" style="font-weight: bold">History</div>
      <div class="gridItem" style="font-weight: bold">Exam</div>
      <div class="gridItem" style="font-weight: bold">MDM</div>

      <div class="gridItem" :class="features.isThisIntake ? 'strike' : 'notStrike'">Not used</div>
      <div class="gridItem" :class="features.isThisIntake ? 'strike' : 'notStrike'">99201</div>

      <div :class="features.history.type.pf ? 'strike' : 'notStrike'">PF</div>
      <div :class="features.examination.type.pf ? 'strike' : 'notStrike'">PF</div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 1 ? 'notStrike' : 'strike'">
        Straight forward
      </div>

      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">Not used</div>
      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">99202</div>
      <div :class="features.history.type.epf ? 'strike' : 'notStrike'">EPF</div>
      <div :class="features.examination.type.epf ? 'notStrike' : 'strike'">EPF</div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 1 ? 'notStrike' : 'strike'">
        Straight forward
      </div>

      <div :class="features.billingDuration > 15 ? 'notStrike' : 'strike'">>15</div>
      <div
        :class="
          features.highestCode.selected.intake.time >= 99203 || features.highestCode.selected.intake.work >= 99203
            ? 'notStrike'
            : 'strike'
        "
      >
        <span style="color: green; font-weight: bold" v-if="features.highestCode.selected.intake.time >= 99203"
          >=></span
        >

        99203
        <span style="color: green; font-weight: bold" v-if="features.highestCode.selected.intake.work >= 99203">
          &lt;=
        </span>
      </div>
      <div :class="features.history.type.det ? 'notStrike' : 'strike'">DET</div>
      <div :class="features.examination.type.det ? 'notStrike' : 'strike'">DET</div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 2 ? 'notStrike' : 'strike'">Low</div>

      <div :class="features.billingDuration > 37 ? 'notStrike' : 'strike'">>37</div>
      <div
        :class="
          features.highestCode.selected.intake.time >= 99204 || features.highestCode.selected.intake.work >= 99204
            ? 'notStrike'
            : 'strike'
        "
      >
        <span style="color: green; font-weight: bold" v-if="features.highestCode.selected.intake.time >= 99204"
          >=></span
        >

        99204
      </div>
      <div :class="features.history.type.comp ? 'notStrike' : 'strike'">COMP</div>
      <div :class="features.examination.type.comp ? 'notStrike' : 'strike'">COMP</div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 3 ? 'notStrike' : 'strike'">
        Moderate
      </div>
      <div :class="features.billingDuration > 52 ? 'notStrike' : 'strike'">>52</div>

      <div
        :class="
          features.highestCode.selected.intake.time >= 99205 || features.highestCode.selected.intake.work >= 99205
            ? 'notStrike'
            : 'strike'
        "
      >
        <span style="color: green; font-weight: bold" v-if="features.highestCode.selected.intake.time >= 99205"
          >=></span
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
