<template>
  <div>
    <el-button type="primary" size="mini" @click="handleClickOnSettingsIcon">99213</el-button>
    <el-dialog title="Insurance: Anthem" :visible.sync="dIsSettingsDialogVisible" width="100%" top="5vh">
      <span v-if="features.history.summaryDisplay"> <historySummary :features="features"> </historySummary></span>
      <span v-else> <historyFull :features="features"> </historyFull></span>

      <span v-if="features.examination.summaryDisplay"> <examinationSummary :features="features" /></span>
      <span v-else> <examinationFull :features="features"> </examinationFull></span>

      <span v-if="features.medDecisionMaking.summaryDisplay"> <medDecisionMakingSummary :features="features" /></span>
      <span v-else><medDecisionMakingFull :features="features" /></span>

      <div style="display: grid; grid-template-columns: 11; border: solid">
        <div class="gridItem" style="grid-column-start: 2; grid-column-end: 7">
          <el-button
            round
            size="mini"
            :type="features.isThisIntake ? 'primary' : 'info'"
            :class="features.isThisIntake ? '' : 'strike'"
            @click="features.isThisIntake = true"
            >New Patient Office (requires 3 of 3)</el-button
          >
        </div>

        <div class="gridItem" style="grid-column-start: 7; grid-column-end: 12">
          <el-button
            round
            size="mini"
            :type="features.isThisIntake ? 'info' : 'primary'"
            :class="features.isThisIntake ? 'strike' : ''"
            @click="features.isThisIntake = false"
            >Established Patient Office (requires 2 of 3)</el-button
          >
        </div>

        <div
          style="
            grid-row-start: 1;
            grid-row-end: 8;
            font-size: 3rem;
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            text-align: center;
            background-color: #92a8d1;
          "
        >
          CPT Codes
        </div>
        <div class="gridItem" style="font-weight: bold">Time</div>
        <div class="gridItem" style="font-weight: bold">CPT code</div>
        <div class="gridItem" style="font-weight: bold">History</div>
        <div class="gridItem" style="font-weight: bold">Exam</div>
        <div class="gridItem" style="font-weight: bold">MDM</div>
        <div class="gridItem" style="font-weight: bold">Time</div>
        <div class="gridItem" style="font-weight: bold">CPT code</div>
        <div class="gridItem" style="font-weight: bold">History</div>
        <div class="gridItem" style="font-weight: bold">Exam</div>
        <div class="gridItem" style="font-weight: bold">MDM</div>

        <div
          class="gridItem"
          :style="!features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? '' : 'strike'"
        >
          Time
        </div>
        <div
          class="gridItem"
          :style="!features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? '' : 'strike'"
        >
          99201
        </div>

        <div
          class="gridItem"
          :style="features.history.type.pf ? 'background-color: #67C23A' : 'background-color: #909399'"
        >
          PF
        </div>
        <div
          class="gridItem"
          :style="features.examination.type.pf ? 'background-color: #67C23A' : 'background-color: #909399'"
        >
          PF
        </div>
        <div class="gridItem">Straight forward</div>
        <div
          class="gridItem"
          :style="features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? 'strike' : ''"
        >
          Time
        </div>
        <div
          class="gridItem"
          :style="features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? 'strike' : ''"
        >
          99211
        </div>
        <div class="gridItem">N/A</div>
        <div class="gridItem">N/A</div>
        <div class="gridItem">N/A</div>

        <div
          class="gridItem"
          :style="features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? '' : 'strike'"
        >
          Time
        </div>
        <div
          class="gridItem"
          :style="!features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? '' : 'strike'"
        >
          99202
        </div>
        <div
          class="gridItem"
          :style="features.history.type.epf ? 'background-color: #67C23A' : 'background-color: #909399'"
        >
          EPF
        </div>
        <div
          class="gridItem"
          :style="features.examination.type.epf ? 'background-color: #67C23A' : 'background-color: #909399'"
        >
          EPF
        </div>
        <div class="gridItem">Straight forward</div>
        <div
          class="gridItem"
          :style="features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? 'strike' : ''"
        >
          Time
        </div>
        <div
          class="gridItem"
          :style="features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? 'strike' : ''"
        >
          99212
        </div>
        <div
          class="gridItem"
          :style="features.history.type.pf ? 'background-color: #67C23A' : 'background-color: #909399'"
        >
          PF
        </div>
        <div
          class="gridItem"
          :style="features.examination.type.pf ? 'background-color: #67C23A' : 'background-color: #909399'"
        >
          PF
        </div>
        <div class="gridItem">Straight forward</div>
        <div
          class="gridItem"
          :style="features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? '' : 'strike'"
        >
          Time
        </div>
        <div
          class="gridItem"
          :style="!features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? '' : 'strike'"
        >
          99203
        </div>
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
        <div class="gridItem">Low</div>
        <div
          class="gridItem"
          :style="features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? 'strike' : ''"
        >
          Time
        </div>
        <div
          class="gridItem"
          :style="features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? 'strike' : ''"
        >
          99213
        </div>
        <div
          class="gridItem"
          :style="features.history.type.epf ? 'background-color: #67C23A' : 'background-color: #909399'"
        >
          EPF
        </div>
        <div
          class="gridItem"
          :style="features.examination.type.epf ? 'background-color: #67C23A' : 'background-color: #909399'"
        >
          EPF
        </div>
        <div class="gridItem">Low</div>
        <div
          class="gridItem"
          :style="features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? '' : 'strike'"
        >
          Time
        </div>
        <div
          class="gridItem"
          :style="!features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? '' : 'strike'"
        >
          99204
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
        <div class="gridItem">Moderate</div>
        <div
          class="gridItem"
          :style="features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? 'strike' : ''"
        >
          Time
        </div>
        <div
          class="gridItem"
          :style="features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? 'strike' : ''"
        >
          99214
        </div>
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
        <div class="gridItem">Moderate</div>
        <div
          class="gridItem"
          :style="features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? '' : 'strike'"
        >
          Time
        </div>

        <div
          class="gridItem"
          :style="!features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? '' : 'strike'"
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
        <div class="gridItem">High</div>
        <div
          class="gridItem"
          :style="features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? 'strike' : ''"
        >
          Time
        </div>

        <div
          class="gridItem"
          :style="features.isThisIntake ? 'background-color: #909399' : 'background-color: #92a8d1'"
          :class="features.isThisIntake ? 'strike' : ''"
        >
          99215
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
        <div class="gridItem">High</div>
        {{ features }}
      </div>
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

export default {
  data() {
    return {
      dIsSettingsDialogVisible: false,
      features: {
        billingDuration: 36,
        isThisIntake: true,

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
            straightForward: false,
            low: false,
            moderate: false,
            high: false,
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
  },
  async mounted() {},
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

<style>
.gridItem {
  background-color: #fff;
  border: 1px solid #000;
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
  background-color: #909399;
}
.notStrike {
  text-align: center;
  background-color: #67c23a;
  border: solid 1px;
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
