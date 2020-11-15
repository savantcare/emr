<template>
  <div>
    <el-button type="primary" size="mini" @click="handleClickOnSettingsIcon">99213</el-button>
    <el-dialog title="" :visible.sync="dIsSettingsDialogVisible" width="70%" top="5vh">
      <div style="display: grid; grid-template-columns: 1fr 1fr">
        <div>
          <el-card>
            Medical Intake
            <c99201 :features="features" />
            <c99202 :features="features" />
            <c99203 :features="features" />
            <c99204 :features="features" />
            <c99205 :features="features" />
          </el-card>
        </div>
        <div>
          <el-card>
            Medical Followup
            <c99211 :features="features" />
            <c99212 :features="features" />
            <c99213 :features="features" />
            <c99214 :features="features" />
            <c99215 :features="features" />
          </el-card>
        </div>
        <div>
          <el-card>
            Therapy singular codes
            <c90832 :features="features" />
            <c90834 :features="features" />
            <c90837 :features="features" />
          </el-card>
        </div>
        <div>
          <el-card>
            <div slot="header" hover>
              <b>Best estimate - manual update. </b><span class="demonstration">Show details?</span>
              <el-checkbox v-model="features.showDetails"></el-checkbox>
            </div>
            <div class="block">
              <span class="demonstration">Billing Duration</span>
              <el-slider v-model="features.billingDuration"></el-slider>
            </div>
            <el-divider></el-divider>
            <div class="block">
              <span class="demonstration">Was is it a therapy only appointment</span>
              <el-checkbox v-model="features.isItTherapyOnlyAppt"></el-checkbox>
            </div>
          </el-card>
          <el-card v-if="features.showDetails">
            <div slot="header" hover>
              <b>System determined</b>
            </div>
            <div class="block">
              <span class="demonstration">Elements of medical review of systems</span>
              <el-slider :max="15" v-model="features.elementsOfPsychReviewOfSystems"></el-slider>
            </div>
            <el-divider></el-divider>
            <div class="block">
              <span class="demonstration">Vitals?</span>
              <el-checkbox v-model="features.vitals"></el-checkbox>
            </div>
            <el-divider></el-divider>
            <div class="block">
              <span class="demonstration">Mental status exam</span>
              <el-slider :max="15" v-model="features.mentalStatusExam"></el-slider>
            </div>
            <el-divider></el-divider>
            <div class="block">
              <span class="demonstration">Intake?</span>
              <el-checkbox v-model="features.itIsIntakeAppt"></el-checkbox>
            </div>
            <el-divider></el-divider>
            <div class="block">
              <span class="demonstration">Past psych history?</span>
              <el-checkbox v-model="features.pphx"></el-checkbox>
            </div>
            <el-divider></el-divider>
            <div class="block">
              <span class="demonstration">Social history?</span>
              <el-checkbox v-model="features.shx"></el-checkbox>
            </div>
            <el-divider></el-divider>
            <div class="block">
              <span class="demonstration">Family history?</span>
              <el-checkbox v-model="features.fhx"></el-checkbox>
            </div>
          </el-card>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import c90832 from './c90832.vue'
import c90834 from './c90834.vue'
import c90837 from './c90837.vue'

import c99201 from './c99201.vue'
import c99202 from './c99202.vue'
import c99203 from './c99203.vue'
import c99204 from './c99204.vue'
import c99205 from './c99205.vue'
import c99211 from './c99211.vue'
import c99212 from './c99212.vue'
import c99213 from './c99213.vue'
import c99214 from './c99214.vue'
import c99215 from './c99215.vue'

export default {
  data() {
    return {
      dIsSettingsDialogVisible: false,
      features: {
        billingDuration: 36,
        pphx: false,
        shx: false,
        fhx: false,
      },
    }
  },
  components: {
    c90832,
    c90834,
    c90837,
    c99201,
    c99202,
    c99203,
    c99204,
    c99205,
    c99211,
    c99212,
    c99213,
    c99214,
    c99215,
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
    background: #f56c6c;
    height: 2px;
  }
  100% {
    width: 100%;
    background: #e6a23c;
    height: 2px;
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
  opacity: 50%;
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
