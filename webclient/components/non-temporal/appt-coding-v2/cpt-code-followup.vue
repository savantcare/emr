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
      <div :class="workHighestCode >= 99211 ? 'notStrike' : 'strike'">
        <span style="color: green; font-weight: bold" v-if="features.cptCode.selected.followup.time >= 99211">=></span>
        99211
        <span style="color: green; font-weight: bold" v-if="features.cptCode.selected.followup.work >= 99211">
          &lt;=
        </span>
      </div>
      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">N/A</div>
      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">N/A</div>
      <div :class="features.isThisIntake ? 'strike' : 'notStrike'">N/A</div>

      <div :class="features.billingDuration > 5 ? 'notStrike' : 'strike'">>5</div>
      <div :class="workHighestCode >= 99212 ? 'notStrike' : 'strike'">
        <span style="color: green; font-weight: bold" v-if="features.cptCode.selected.followup.time >= 99212">=></span>
        99212<span style="color: green; font-weight: bold" v-if="features.cptCode.selected.followup.work >= 99212"
          >&lt;=
        </span>
      </div>
      <div :class="features.history.type.pf ? 'notStrike' : 'strike'">PF</div>
      <div :class="features.examination.type.pf ? 'notStrike' : 'strike'">PF</div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 1 ? 'notStrike' : 'strike'">
        Straight forward
      </div>

      <div :class="features.billingDuration > 8 ? 'notStrike' : 'strike'">>8</div>
      <div :class="workHighestCode >= 99213 ? 'notStrike' : 'strike'">
        <span style="color: green; font-weight: bold" v-if="features.cptCode.selected.followup.time >= 99213">=></span>
        99213<span style="color: green; font-weight: bold" v-if="features.cptCode.selected.followup.work >= 99213"
          >&lt;=</span
        >
      </div>
      <div :class="features.history.type.epf ? 'notStrike' : 'strike'">EPF</div>
      <div :class="features.examination.type.epf ? 'notStrike' : 'strike'">EPF</div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 2 ? 'notStrike' : 'strike'">Low</div>

      <div :class="features.billingDuration > 16 ? 'notStrike' : 'strike'">>16</div>
      <div :class="workHighestCode >= 99214 ? 'notStrike' : 'strike'">
        <span style="color: green; font-weight: bold" v-if="features.cptCode.selected.followup.time >= 99214">=></span>
        99214<span style="color: green; font-weight: bold" v-if="features.cptCode.selected.followup.work >= 99214"
          >&lt;=</span
        >
      </div>
      <div :class="features.history.type.det ? 'notStrike' : 'strike'">DET</div>
      <div :class="features.examination.type.det ? 'notStrike' : 'strike'">DET</div>
      <div id="complexity" :class="features.medDecisionMaking.complexity.level >= 3 ? 'notStrike' : 'strike'">
        Moderate
      </div>

      <div :class="features.billingDuration > 25 ? 'notStrike' : 'strike'">>25</div>
      <div :class="workHighestCode >= 99215 ? 'notStrike' : 'strike'">
        <span style="color: green; font-weight: bold" v-if="features.cptCode.selected.followup.time >= 99215">=></span>
        99215<span style="color: green; font-weight: bold" v-if="features.cptCode.selected.followup.work >= 99215"
          >&lt;=</span
        >
      </div>
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
    workHighestCode() {
      //debugger
      let levels = new Array()

      if (this.features.history.type.comp) levels[0] = 5
      else if (this.features.history.type.det) levels[0] = 4
      else if (this.features.history.type.epf) levels[0] = 3
      else if (this.features.history.type.pf) levels[0] = 2
      else levels[0] = 0

      if (this.features.examination.type.comp) levels[1] = 5
      else if (this.features.examination.type.det) levels[1] = 4
      else if (this.features.examination.type.epf) levels[1] = 3
      else if (this.features.examination.type.pf) levels[1] = 2
      else levels[1] = 0

      console.log(levels)

      if (levels[1] === 0) {
        this.features.cptCode.selected.followup.work = 99211
        return 99211
      } else if (levels[1] === 1) {
        this.features.cptCode.selected.followup.work = 99212
        return 99212
      } else if (levels[1] === 2) {
        this.features.cptCode.selected.followup.work = 99213
        return 99213
      } else if (levels[1] === 3) {
        this.features.cptCode.selected.followup.work = 99214
        return 99214
      } else if (levels[1] === 4) {
        this.features.cptCode.selected.followup.work = 99214
        return 99215
      }
      /*
levels: {
            history: 1, // 0->unknown 1->n/a 2->PF 3->EPF 4->DET 5->COMP
            exam: 1, // 0->unknown 1->n/a 2->PF 3->EPF 4->DET 5->COMP
            mdm: 1, // 0->unknown 1->n/a 2->straight-forward 3->low 4->moderate 5->high
            secondHighest: 0, // Out of 3, the 2nd highest is the code.
          },

      levels[0] = this.features.cptCode.levels.history
      levels[1] = this.features.cptCode.levels.exam
      levels[2] = this.features.cptCode.levels.mdm

      levels.sort((a, b) => b - a) // now 0 is highest level and 1 is 2nd highest level

      console.log(levels)

      this.features.cptCode.levels.secondHighest = levels[1]

      if (levels[1] === 0) return 99211
      if (levels[1] === 1) return 99212
      if (levels[1] === 2) return 99213
      if (levels[1] === 3) return 99214
      if (levels[1] === 4) return 99215
   
    */
    },
  },
}
</script>
