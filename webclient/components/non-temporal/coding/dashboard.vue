<template>
  <div>
    <button class="el-icon-setting" @click="handleClickOnSettingsIcon"></button>
    <el-dialog title="" :visible.sync="dIsSettingsDialogVisible" width="70%">
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
          <el-card> Human </el-card>
          <el-card>
            Transition
            <div class="block">
              <span class="demonstration">Billing Duration</span>
              <el-slider v-model="features.billingDuration"></el-slider>
            </div>
            <div class="block">
              <span class="demonstration">Was is it a therapy only appointment</span>
              <el-checkbox v-model="features.isItTherapyOnlyAppt"></el-checkbox>
            </div>
            <div class="block">
              <span class="demonstration">Elements of psych review of systems</span>
              <el-slider :max="15" v-model="features.elementsOfPsychReviewOfSystems"></el-slider>
            </div>
            <div class="block">
              <span class="demonstration">Vitals?</span>
              <el-checkbox v-model="features.vitals"></el-checkbox>
            </div>
            <div class="block">
              <span class="demonstration">Mental status exam</span>
              <el-slider :max="15" v-model="features.mentalStatusExam"></el-slider>
            </div>
          </el-card>
          <el-card> Automated </el-card>
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
