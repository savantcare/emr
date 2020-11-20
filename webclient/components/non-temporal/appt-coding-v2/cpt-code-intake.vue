<template>
  <el-card hover>
    <div style="display: grid; grid-template-columns: 5; border: solid">
      <div class="gridItem" style="grid-column-start: 1; grid-column-end: 6">
        <el-button
          round
          size="mini"
          :type="features.isThisIntake ? 'primary' : 'info'"
          :class="features.isThisIntake ? 'notStrike' : 'strike'"
          @click="features.isThisIntake = true"
          >New Patient Office (requires 3 of 3)</el-button
        >
      </div>

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
  border: solid 1px;
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
