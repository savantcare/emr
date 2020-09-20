<template>
  <div>
    <!-- <el-tab-pane> -->
    <el-row :gutter="12">
      <el-col :span="24">
        <!-- If I make style="border: 0;" then when tab is activated the bottom border of the tab does not go away -->
        <el-card class="box-card">
          <el-form ref="daDxForm" label-position="top" :model="daDxForm" class="demo-dynamic">
            <el-card
              v-for="(diagnosis, index) in daDxForm.diagnosis"
              :key="index"
              class="box-card"
              style="margin-bottom: 20px"
            >
              <el-row>
                <el-col :span="2" :offset="24">
                  <i class="el-icon-close" @click.prevent="removeDomain(diagnosis)"></i>
                </el-col>
              </el-row>

              <el-form-item
                :prop="'diagnosis.' + index + '.description'"
                style="font-weight: bold"
                label-position="top"
                label="Search Diagnosis"
                :rules="{
                  required: true,
                  message: 'Diagnosis can not be blank',
                  trigger: 'blur',
                }"
              >
                <el-select
                  v-model="diagnosis.value"
                  filterable
                  placeholder="Select"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in diagnosesList"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                :prop="'diagnosis.' + index + '.startDate'"
                style="font-weight: bold"
                label-position="top"
                label="Start date of diagnosis"
                :rules="{
                  required: true,
                  message: 'Start date of diagnosis can not be blank',
                  trigger: 'blur',
                }"
              >
                <el-date-picker
                  v-model="diagnosis.when"
                  type="date"
                  placeholder="Pick a date"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item>
            </el-card>

            <el-form-item>
              <el-button type="success" size="small" @click="submitForm('daDxForm')"
                >Save</el-button
              >
              <el-button type="primary" size="small" @click="addDomain">Add one more</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <!-- </el-tab-pane> -->
  </div>
</template>

<script>
/**
 * Multi Add Goal form.
 * @displayName Add Goal
 */
import { RATE_GOAL } from '@/static/others.js'
export default {
  data() {
    return {
      id: this.$route.query.patient_id,
      daDxForm: { diagnosis: [{ value: '', when: '' }] },
      diagnosesList: [
        {
          value: 'Bacterial intestinal infection, unspecified',
          label: 'Bacterial intestinal infection, unspecified',
        },
        {
          value: 'Adjustment disorder, With depressed mood',
          label: 'Adjustment disorder, With depressed mood',
        },
        {
          value: 'Adjustment disorder, With anxiety',
          label: 'Adjustment disorder, With anxiety',
        },
        {
          value: 'Generalized anxiety disorder',
          label: 'Generalized anxiety disorder',
        },
        {
          value: 'Other specified bacterial intestinal infections',
          label: 'Other specified bacterial intestinal infections',
        },
        {
          value: 'Catatonia associated with another mental disorder (catatonia specifier)',
          label: 'Catatonia associated with another mental disorder (catatonia specifier)',
        },
        {
          value: 'Adult antisocial behavior',
          label: 'Adult antisocial behavior',
        },
        {
          value: 'Spouse or partner abuse, Psychological, Confirmed, Initial encounter',
          label: 'Spouse or partner abuse, Psychological, Confirmed, Initial encounter',
        },
        {
          value: 'Adjustment disorder, Unspecified',
          label: 'Adjustment disorder, Unspecified',
        },
        {
          value: 'Child neglect or abandonment, confirmed subsequent encounter',
          label: 'Child neglect or abandonment, confirmed subsequent encounter',
        },
      ],
    }
  },
  computed: {
    type() {
      return this.$store.state.vstObjTabsInCL.goalTabType
    },
    updateData() {
      return this.$store.state.vstObjTabsInCL.goalData
    },
    userId() {
      return this.$store.state.userId
    },
  },
  watch: {
    updateData() {
      this.daDxForm = {
        diagnosis: [
          {
            description: this.updateData.description,
            startDate: this.updateData.startDate,
            score: this.updateData.score,
          },
        ],
      }
    },
  },
  mounted() {
    if (this.type === RATE_GOAL) {
      this.daDxForm = {
        diagnosis: [
          {
            description: this.updateData.description,
            startDate: this.updateData.startDate,
            score: this.updateData.score,
          },
        ],
      }
    }
  },
  methods: {
    addDomain() {
      this.daDxForm.diagnosis.push({
        description: '',
        startDate: '',
        score: '',
      })
    },
    removeDomain(item) {
      const index = this.daDxForm.diagnosis.indexOf(item)
      if (index !== -1) {
        this.daDxForm.diagnosis.splice(index, 1)
      }
    },
    submitForm(formName) {
      const vm = this
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.type === RATE_GOAL) {
            this.updateData.description = this.daDxForm.diagnosis[0].description
            this.updateData.startDate = this.daDxForm.diagnosis[0].startDate
            this.updateData.score = this.daDxForm.diagnosis[0].score
            this.updateData.discontinuedByUserId = this.userId
            this.updateData.recordChangedByUUID = this.userId
            this.$store.dispatch('updateGoal', {
              data: this.updateData,
              notify: this.$notify,
            })
          } else {
            // Add
            const goalList = []
            this.daDxForm.diagnosis.forEach((item) => {
              goalList.push({
                description: item.description,
                startDate: item.startDate,
                score: item.score,
                patientUUID: vm.id,
                // uuid: uniqid(),
                recordChangedByUUID: this.userId,
              })
            })
            await this.$store.dispatch('addGoal', {
              data: goalList,
              notify: this.$notify,
              patientUUID: this.id,
            })
            await this.$store.dispatch('getGoals', {
              patientUUID: this.id,
              notify: this.$notify,
            })
            this.daDxForm = {
              diagnosis: [{ description: '', startDate: '', score: '' }],
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    formatTooltip(val) {
      return val
    },
  },
}
</script>

<style>
.el-form--label-top .el-form-item__label {
  line-height: 0 !important;
}
</style>
