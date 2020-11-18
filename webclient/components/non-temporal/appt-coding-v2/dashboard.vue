<template>
  <div>
    <el-button type="primary" size="mini" @click="handleClickOnSettingsIcon">99213</el-button>
    <el-dialog title="Insurance: Anthem" :visible.sync="dIsSettingsDialogVisible" width="100%" top="5vh">
      <history :features="features"> </history>
      <examination :features="features" />
      <medDecisionMaking :features="features" />
      <div style="display: grid; grid-template-columns: 9; border: solid">
        <div class="gridItem" style="grid-column-start: 2; grid-column-end: 6">
          <el-button
            round
            size="mini"
            :type="features.isThisIntake ? 'primary' : 'info'"
            :class="features.isThisIntake ? '' : 'strike'"
            @click="features.isThisIntake = true"
            >New Patient Office (requires 3 of 3)</el-button
          >
        </div>

        <div class="gridItem" style="grid-column-start: 6; grid-column-end: 10">
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

        <div class="gridItem" style="font-weight: bold">CPT code</div>
        <div class="gridItem" style="font-weight: bold">History</div>
        <div class="gridItem" style="font-weight: bold">Exam</div>
        <div class="gridItem" style="font-weight: bold">MDM</div>
        <div class="gridItem" style="font-weight: bold">CPT code</div>
        <div class="gridItem" style="font-weight: bold">History</div>
        <div class="gridItem" style="font-weight: bold">Exam</div>
        <div class="gridItem" style="font-weight: bold">MDM</div>

        <div class="gridItem" style="background-color: #92a8d1">
          <el-button round size="mini" :class="features.isThisIntake ? '' : 'strike'">99201</el-button>
        </div>
        <div class="gridItem">PF</div>
        <div class="gridItem">PF</div>
        <div class="gridItem">Straight forward</div>
        <div class="gridItem" style="background-color: #92a8d1">
          <el-button round size="mini" :class="features.isThisIntake ? 'strike' : ''">99211</el-button>
        </div>
        <div class="gridItem">N/A</div>
        <div class="gridItem">N/A</div>
        <div class="gridItem">N/A</div>

        <div class="gridItem" style="background-color: #92a8d1">
          <el-button round size="mini" :class="features.isThisIntake ? '' : 'strike'">99202</el-button>
        </div>
        <div class="gridItem">EPF</div>
        <div class="gridItem">EPF</div>
        <div class="gridItem">Straight forward</div>
        <div class="gridItem" style="background-color: #92a8d1">
          <el-button round size="mini" :class="features.isThisIntake ? 'strike' : ''">99212</el-button>
        </div>
        <div class="gridItem">PF</div>
        <div class="gridItem">PF</div>
        <div class="gridItem">Straight forward</div>

        <div class="gridItem" style="background-color: #92a8d1">
          <el-button round size="mini" :class="features.isThisIntake ? '' : 'strike'">99203</el-button>
        </div>
        <div class="gridItem">DET</div>
        <div class="gridItem">DET</div>
        <div class="gridItem">Low</div>
        <div class="gridItem" style="background-color: #92a8d1">
          <el-button round size="mini" :class="features.isThisIntake ? 'strike' : ''">99213</el-button>
        </div>
        <div class="gridItem">EPF</div>
        <div class="gridItem">EPF</div>
        <div class="gridItem">Low</div>

        <div class="gridItem" style="background-color: #92a8d1">
          <el-button round size="mini" :class="features.isThisIntake ? '' : 'strike'">99204</el-button>
        </div>
        <div class="gridItem">COMP</div>
        <div class="gridItem">COMP</div>
        <div class="gridItem">Moderate</div>
        <div class="gridItem" style="background-color: #92a8d1">
          <el-button round size="mini" :class="features.isThisIntake ? 'strike' : ''">99214</el-button>
        </div>
        <div class="gridItem">DET</div>
        <div class="gridItem">DET</div>
        <div class="gridItem">Moderate</div>

        <div class="gridItem" style="background-color: #92a8d1">
          <el-button round size="mini" :class="features.isThisIntake ? '' : 'strike'">99205</el-button>
        </div>
        <div class="gridItem">COMP</div>
        <div class="gridItem">COMP</div>
        <div class="gridItem">High</div>
        <div class="gridItem" style="background-color: #92a8d1">
          <el-button round size="mini" :class="features.isThisIntake ? 'strike' : ''">99215</el-button>
        </div>
        <div class="gridItem">COMP</div>
        <div class="gridItem">COMP</div>
        <div class="gridItem">High</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import history from './history.vue'
import examination from './examination.vue'
import medDecisionMaking from './med-decision-making.vue'

export default {
  data() {
    return {
      dIsSettingsDialogVisible: false,
      features: {
        billingDuration: 36,
        isThisIntake: true,

        history: {
          chiefComplaint: true, // 0 -> false 1-> true
          hpi: '1', // 1. 1 or 2. extended
          pfsh: '1', // 1. not-applicable 2. pertinent or 3. complete
          ros: '1', // 1. not-applicable 2. pertinent or 3. extended or 4. complete
        },
      },
    }
  },
  components: {
    history,
    medDecisionMaking,
    examination,
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
