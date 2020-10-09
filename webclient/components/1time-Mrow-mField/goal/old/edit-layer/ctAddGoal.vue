<template>
  <div>
    <!-- <el-tab-pane> -->
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card" shadow="hover">
          <el-form ref="daGoalForm" label-position="top" :model="daGoalForm" class="demo-dynamic">
            <el-card
              v-for="(domain, index) in daGoalForm.goals"
              :key="index"
              class="box-card"
              style="margin-bottom: 20px"
            >
              <el-row>
                <el-col :span="2" :offset="24">
                  <i class="el-icon-close" @click.prevent="removeDomain(domain)"></i>
                </el-col>
              </el-row>
              <el-form-item
                :prop="'goals.' + index + '.description'"
                style="font-weight: bold"
                label-position="top"
                label="Description"
                :rules="{
                  required: true,
                  message: 'Description can not be blank',
                  trigger: 'blur',
                }"
              >
                <el-input
                  v-model="domain.description"
                  :span="8"
                  type="textarea"
                  placeholder="You may enter multi line text"
                  :autosize="{ minRows: 4 }"
                  :autofocus="true"
                ></el-input>
              </el-form-item>

              <el-form-item
                :prop="'goals.' + index + '.startDate'"
                style="font-weight: bold"
                label-position="top"
                label="Start date of goal"
                :rules="{
                  required: true,
                  message: 'Start date of goal can not be blank',
                  trigger: 'blur',
                }"
              >
                <el-date-picker
                  v-model="domain.startDate"
                  :span="8"
                  type="date"
                  placeholder="Pick a day"
                  :picker-options="pickerOptions"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
              <el-form-item
                :prop="'goals.' + index + '.score'"
                label-position="top"
                style="font-weight: bold"
                label="Score"
              >
                <el-slider
                  v-model="domain.score"
                  :format-tooltip="formatTooltip"
                  show-input
                  :max="10"
                  show-stops
                ></el-slider>
              </el-form-item>
            </el-card>

            <el-form-item>
              <el-button type="success" size="small" @click="submitForm('daGoalForm')"
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
import { RATE_GOAL, GOAL_API_URL } from '@/static/others.js'
export default {
  data() {
    return {
      id: this.$route.query.patient_id,
      daGoalForm: { goals: [{ description: '', startDate: '', score: 0 }] },
      pickerOptions: {
        shortcuts: [
          {
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
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
      this.daGoalForm = {
        goals: [
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
      this.daGoalForm = {
        goals: [
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
      this.daGoalForm.goals.push({
        description: '',
        startDate: '',
        score: 0,
      })
    },
    removeDomain(item) {
      const index = this.daGoalForm.goals.indexOf(item)
      if (index !== -1) {
        this.daGoalForm.goals.splice(index, 1)
      }
    },
    submitForm(formName) {
      // const vm = this
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // Add
          const goalList = []
          this.daGoalForm.goals.forEach((item) => {
            goalList.push({
              description: item.description,
              startDate: item.startDate,
              score: item.score,
              patientUuid: 'bfe041fa-073b-4223-8c69-0540ee678ff8',
              // uuid: uniqid(),
              recordChangedByUuid: 'bfe041fa-073b-4223-8c69-0540ee678ff8',
            })
          })
          console.log('goalList=> ', goalList)
          try {
            const response = await fetch(GOAL_API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                // Authorization: 'Bearer ' + TOKEN,
              },
              body: JSON.stringify({
                data: goalList,
                patientUuid: 'bfe041fa-073b-4223-8c69-0540ee678ff8',
              }),
            })
            console.log('response=> ', response)
            if (!response.ok) {
            } else {
            }
          } catch (ex) {}
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
