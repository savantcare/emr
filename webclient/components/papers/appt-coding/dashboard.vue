<template>
  <div>
    <el-button round type="primary" size="mini" @click="handleClickOnSettingsIcon">{{ apptCode }}</el-button>
    <el-dialog title="Insurance: Anthem" :visible.sync="dIsSettingsDialogVisible" width="100%" top="5vh">
      <el-tabs tab-position="left">
        <el-tab-pane label="Billing duration">
          <div
            style="display: grid; grid-template-columns: repeat(1, 1fr); border: 2px solid #ebeef5; border-radius: 15px"
          >
            <el-slider v-model="features.billingDuration" show-input></el-slider>
          </div>
        </el-tab-pane>
        <el-tab-pane label="History">
          <span v-if="features.history.summaryDisplay"> <historySummary :features="features"> </historySummary></span>
          <span v-else> <historyFull :features="features"> </historyFull></span>
        </el-tab-pane>
        <el-tab-pane label="Examination">
          <span v-if="features.examination.summaryDisplay"> <examinationSummary :features="features" /></span>
          <span v-else> <examinationFull :features="features"> </examinationFull></span>
        </el-tab-pane>
        <el-tab-pane label="MDM">
          <span v-if="features.medDecisionMaking.summaryDisplay">
            <medDecisionMakingSummary :features="features"
          /></span>
          <span v-else><medDecisionMakingFull :features="features" /></span>
        </el-tab-pane>
        <el-tab-pane label="Full">
          <el-slider v-model="features.billingDuration" show-input></el-slider>

          <span v-if="features.history.summaryDisplay"> <historySummary :features="features"> </historySummary></span>
          <span v-else> <historyFull :features="features"> </historyFull></span>

          <br />

          <span v-if="features.examination.summaryDisplay"> <examinationSummary :features="features" /></span>
          <span v-else> <examinationFull :features="features"> </examinationFull></span>

          <br />

          <span v-if="features.medDecisionMaking.summaryDisplay">
            <medDecisionMakingSummary :features="features"
          /></span>
          <span v-else><medDecisionMakingFull :features="features" /></span>
        </el-tab-pane>
        <el-tab-pane label="Legend">
          <div
            style="display: grid; grid-template-columns: repeat(1, 1fr); border: 2px solid #ebeef5; border-radius: 15px"
          >
            <h3>Rounded corner buttons</h3>
            <ul>
              <li>Blue: user selected button</li>
              <li>White with a orange line: User may choose</li>
            </ul>
            <br /><br />
            <h3>Rectangle</h3>
            <ul>
              <li>Green: Algorithm choice</li>
              <li>White with a orange line: Algorithm eliminated</li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
      <br />
      <el-tabs tab-position="left">
        <el-tab-pane label="CPT Code burd">
          <cptCode :features="features" />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import historyFull from './history-full.vue'
import historySummary from './history-summary.vue'
import examinationFull from './examination-full.vue'
import examinationSummary from './examination-summary.vue'
import medDecisionMakingFull from './med-decision-making-full.vue'
import medDecisionMakingSummary from './med-decision-making-summary.vue'
import cptCode from './cpt-code.vue'

export default {
  computed: {
    apptCode() {
      if (this.features.isThisIntake === true) {
        return this.features.highestCode.selected.intake.time > this.features.highestCode.selected.intake.work
          ? this.features.highestCode.selected.intake.time
          : this.features.highestCode.selected.intake.work
      }

      if (this.features.isThisIntake === false) {
        return this.features.highestCode.selected.followup.time > this.features.highestCode.selected.followup.work
          ? this.features.highestCode.selected.followup.time
          : this.features.highestCode.selected.followup.work
      }
    },
  },
  watch: {
    'features.billingDuration': {
      immediate: true,
      handler(newVal, oldVal) {
        // console.log(newVal)

        // for followup
        if (newVal > 25) this.features.highestCode.selected.followup.time = 99215
        else if (newVal > 16) this.features.highestCode.selected.followup.time = 99214
        else if (newVal > 8) this.features.highestCode.selected.followup.time = 99213
        else if (newVal > 5) this.features.highestCode.selected.followup.time = 99212
        else if (newVal > 1) this.features.highestCode.selected.followup.time = 99211
        else this.features.highestCode.selected.followup.time = 0

        // for intake
        if (newVal > 52) this.features.highestCode.selected.intake.time = 99205
        else if (newVal > 37) this.features.highestCode.selected.intake.time = 99204
        else if (newVal > 15) this.features.highestCode.selected.intake.time = 99203
        else if (newVal > 10) this.features.highestCode.selected.intake.time = 99202
        else if (newVal > 5) this.features.highestCode.selected.intake.time = 99201
        else this.features.highestCode.selected.intake.time = 0

        // console.log(this.features.highestCode.selected)
      },
    },
    'features.history.type': {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (this.features.history.type.comp) this.features.history.level = 4
        else if (this.features.history.type.det) this.features.history.level = 3
        else if (this.features.history.type.epf) this.features.history.level = 2
        else if (this.features.history.type.pf) this.features.history.level = 1
        else this.features.history.level = 0
      },
    },
    'features.examination.type': {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (this.features.examination.type.comp) this.features.examination.level = 4
        else if (this.features.examination.type.det) this.features.examination.level = 3
        else if (this.features.examination.type.epf) this.features.examination.level = 2
        else if (this.features.examination.type.pf) this.features.examination.level = 1
        else this.features.examination.level = 0
      },
    },
    'features.history.level': {
      immediate: true,
      handler(newVal, oldVal) {
        this.decideWorkCode()
      },
    },
    'features.examination.level': {
      immediate: true,
      handler(newVal, oldVal) {
        this.decideWorkCode()
      },
    },
    'features.medDecisionMaking.complexity.level': {
      immediate: true,
      handler(newVal, oldVal) {
        this.decideWorkCode()
      },
    },
  },
  data() {
    return {
      dIsSettingsDialogVisible: false,
      features: {
        billingDuration: 15,
        isThisIntake: false,
        highestCode: {
          selected: {
            intake: {
              time: 1,
              work: 1,
            },
            followup: {
              time: 1,
              work: 1,
            },
          },
        },
        history: {
          summaryDisplay: false,
          chiefComplaint: true, // 0 -> false 1-> true
          hpi: 1, // 1. 1 or 2. extended
          pfsh: 1, // 1. not-applicable 2. pertinent or 3. complete
          ros: 1, // 1. not-applicable 2. pertinent or 3. extended or 4. complete
          type: {
            pf: false,
            epf: false,
            det: false,
            comp: false,
          },
          level: 0,
        },
        examination: {
          summaryDisplay: false,
          bullets: 0, // value can be 1 to 9 and then 10 repsenting All bullets in Constitutional and Psychiatric (shaded) boxes and 1 bullet in Musculoskeletal (unshaded) box
          type: {
            pf: false,
            epf: false,
            det: false,
            comp: false,
          },
          level: 0,
        },
        medDecisionMaking: {
          summaryDisplay: false,
          bullets: 0, // value can be 1 to 9 and then 10 repsenting All bullets in Constitutional and Psychiatric (shaded) boxes and 1 bullet in Musculoskeletal (unshaded) box
          problemPoints: {
            selfLimiting: 0,
            establishedStable: 0,
            establishedWorsening: 0,
            newToExamining: 0,
            newAdditionalWorkup: 0,
            total: 0,
          },
          dataPoints: {
            reviewOrderClinical: false,
            reviewOrderRadiology: false,
            reviewOrderMedicine: false,
            discussionTestResults: false,
            decisionOldRecords: false,
            reviewOldRecords: false,
            independentTracing: false,
            points: 0,
          },
          risk: {
            type: 0, // 0-> unknown 1->Minimal 2->Low 3->Moderate 4->High
            problem: 0, // 0-> unknown 1-> min 2-> low 3-> Moderate 4->High
            diagnostic: 0, // 0-> unknown 1-> min 2-> low 3-> Moderate 4->High
            management: 0, // 0-> unknown 1-> min 2-> low 3-> Moderate 4->High
          },
          complexity: {
            level: 0, // 1 straightForward , 2 low, 3  moderate, 4 high
          },
        },
      },
    }
  },
  components: {
    historyFull,
    historySummary,
    examinationFull,
    examinationSummary,
    medDecisionMakingFull,
    medDecisionMakingSummary,
    cptCode,
  },
  async mounted() {},
  methods: {
    decideWorkCode() {
      let levels = new Array()
      levels[0] = this.features.history.level
      levels[1] = this.features.examination.level
      levels[2] = this.features.medDecisionMaking.complexity.level

      levels.sort((a, b) => b - a) // now 0 is highest level and 1 is 2nd highest level

      // For followup only 2 out of 3 need to be met
      if (levels[1] === 0) this.features.highestCode.selected.followup.work = 99211
      if (levels[1] === 1) this.features.highestCode.selected.followup.work = 99212
      if (levels[1] === 2) this.features.highestCode.selected.followup.work = 99213
      if (levels[1] === 3) this.features.highestCode.selected.followup.work = 99214
      if (levels[1] === 4) this.features.highestCode.selected.followup.work = 99215

      // For intake 3 out of 3 need to be met
      if (levels[0] >= 1 && levels[1] >= 1 && levels[2] >= 1) {
        this.features.highestCode.selected.intake.work = 99201
      }

      if (levels[0] >= 2 && levels[1] >= 2 && levels[2] >= 1) {
        this.features.highestCode.selected.intake.work = 99202
      }

      if (levels[0] >= 3 && levels[1] >= 3 && levels[2] >= 2) {
        this.features.highestCode.selected.intake.work = 99203
      }

      if (levels[0] >= 4 && levels[1] >= 4 && levels[2] >= 3) {
        this.features.highestCode.selected.intake.work = 99204
      }

      if (levels[0] >= 4 && levels[1] >= 4 && levels[2] >= 4) {
        this.features.highestCode.selected.intake.work = 99205
      }

      // console.log(this.features.highestCode.selected.intake)
    },
    handleClickOnSettingsIcon() {
      this.dIsSettingsDialogVisible = true
    },
    handleChange(val) {},
  },
}
</script>

<style>
.gridItem {
  background-color: #fff;
  border: 1px solid #f2f6fc;
  padding: 0px;
  font-size: 1rem;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Ref: https://stackoverflow.com/questions/36267507/is-it-possible-to-animate-a-css-line-through-text-decoration */
@keyframes strike {
  0% {
    width: 0;
    background: red;
    height: 2px;
  }
  100% {
    width: 100%;
    background: #e6a23c;
    height: 2px;
    opacity: 75%;
  }
}
.strike {
  position: relative;
  text-align: center;
  border: solid 1px #dcdfe6;
}
.notStrike {
  text-align: center;
  background-color: #67c23a;
  border: solid 1px #dcdfe6;
}
.strike::after {
  content: ' ';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  animation-name: strike;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.cross {
  position: relative;
}
.cross::after {
  content: ' ';
  position: absolute;
  top: 50%;
  left: -3%;
  width: 0;
  height: 10px;
  opacity: 25%;
  transform: translateY(-50%);
  background: repeat-x
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAKAQMAAAByjsdvAAAABlBMVEUAAADdMzNrjRuKAAAAAXRSTlMAQObYZgAAADdJREFUCNdj+MMABP8ZGCQY/h9g+MHw/AHzDwbGD+w/GBhq6h8wMNj/b2BgkP8HVMMPUsn+gQEAsTkQNRVnI4cAAAAASUVORK5CYII=);
  animation: cross 1s linear 0.3s 1 forwards;
}
@keyframes cross {
  to {
    width: 106%;
  }
}
</style>
