<template>
  <el-row :gutter="12">
    <el-carousel :interval="5000" arrow="always" :autoplay="false">
      <el-carousel-item v-for="(goalList, index) in carouselList" :key="`carouse-${index}`">
        <el-col v-for="(goal, index) in goalList" :key="`goal-${index}`" :span="8">
          <el-card class="box-card" shadow="hover">
            <el-form ref="form" label-position="top">
              <el-form-item style="font-weight: bold;" label="Description:">
                <el-input
                  v-model="goal.description"
                  :span="8"
                  type="textarea"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item style="font-weight: bold;" label="Score:">
                <el-slider
                  v-model="goal.score"
                  :span="8"
                  :format-tooltip="formatTooltip"
                  show-input
                  :max="10"
                  show-stops
                ></el-slider>
              </el-form-item>
              <el-form-item style="font-weight: bold;" label="Date:">
                <el-date-picker
                  v-model="goal.startDate"
                  :span="8"
                  type="date"
                  placeholder="Pick a day"
                  :picker-options="pickerOptions"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>

              <el-form-item>
                <el-button type="success" size="small" @click="onClickSave(goal)">Save</el-button>
                <el-button type="danger" size="small" @click="onClickDiscontinue(goal)"
                  >Discontinue</el-button
                >
              </el-form-item>
            </el-form>
            <GoalHistoryItem :goal="goal" />
          </el-card>
        </el-col>
      </el-carousel-item>
    </el-carousel>
  </el-row>
</template>

<script>
import GoalHistoryItem from './GoalHistoryItem'
import { GOAL_API_URL } from '@/static/others.js'
import ormGoal from '@/components/pt-info/single/1t-Mrow-mField/goal/db/client-side/Goal.js'
export default {
  components: {
    GoalHistoryItem,
  },
  data() {
    return {
      daGTableForL2: ormGoal.query().get(),
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
    carouselList() {
      const result = []
      let temp = []
      let idx = 0
      this.daGTableForL2.forEach((item) => {
        temp.push(item)
        idx += 1
        if (idx === 3) {
          result.push(temp)
          idx = 0
          temp = []
        }
      })
      if (idx > 0) {
        result.push(temp)
      }
      return result
    },
  },
  methods: {
    async onClickSave(goal) {
      try {
        const response = await fetch(`${GOAL_API_URL}/${goal.uuid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            // "Authorization": "Bearer " + TOKEN
          },
          body: JSON.stringify(goal),
        })
        if (!response.ok) {
          console.log('Failed to update')
        } else {
          console.log('update success')
        }
      } catch (ex) {}
    },
    async onClickDiscontinue(goal) {
      try {
        goal.discontinue = true
        const response = await fetch(`${GOAL_API_URL}/${goal.uuid}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            // Authorization: 'Bearer ' + TOKEN,
          },
          body: JSON.stringify(goal),
        })
        if (!response.ok) {
          console.log('Failed to discontinue')
        } else {
          console.log('Discontinued successfull')
        }
      } catch (ex) {}
    },
    formatTooltip(val) {
      return val
    },
  },
}
</script>

<style>
.el-carousel__container {
  height: 500px !important;
}
.el-carousel__item {
  overflow-y: scroll !important;
}
label.el-form-item__label {
  line-height: 0;
}
</style>
