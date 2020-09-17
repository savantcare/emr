<template>
  <el-row :gutter="12">
    <el-carousel :interval="5000" arrow="always" :autoplay="false">
      <el-carousel-item v-for="(dxList, index) in sliderSet" :key="`dxCarousel-${index}`">
        <el-col v-for="(dx, index) in dxList" :key="index" :span="8">
          <el-card class="box-card" shadow="hover" style="font-family: Helvetica;">
            <div><b>Name:</b> {{ dx.dxName }}</div>
            <div><b>Diagnosed On:</b> {{ dx.dxOnDate }}</div>
            <el-divider></el-divider>
            <el-form ref="dx" label-position="top" :model="dx">
              <el-form-item style="font-weight: bold;" label="Change assessment">
                <el-input
                  v-model="dx.currentAssessment"
                  :span="8"
                  type="textarea"
                  :autosize="{ minRows: 4 }"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" size="small" @click="onClickSave(dx)">Save</el-button>
                <el-button type="danger" size="small" @click="onClickDiscontinue(dx)"
                  >Discontinue</el-button
                >
              </el-form-item>
            </el-form>
            <DxaHistoryItem :dx="dx"></DxaHistoryItem>
          </el-card>
        </el-col>
      </el-carousel-item>
    </el-carousel>
  </el-row>
</template>
<script>
import DxaHistoryItem from './ctDxaHistory'
import ormDx from '@/models/Dx'
export default {
  components: {
    DxaHistoryItem,
  },
  data() {
    return {}
  },
  computed: {
    dxList() {
      return ormDx.query().get()
    },
    sliderSet() {
      const result = []
      let temp = []
      let idx = 0
      console.log(this.dxList)
      this.dxList.forEach((item) => {
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
    userId() {
      return this.$store.state.userId
    },
  },
  methods: {
    async onClickSave(dx) {
      const newAssementData = {
        uuid: dx.uuid,
        diagnosisName: dx.diagnosisName,
        assessmentList: dx.assessmentList,
        currentAssessment: dx.currentAssessment,
        recordChangedByUUID: this.userId,
        patientUUID: this.$route.query.patient_id,
      }
      await this.$store.dispatch('changeDiagnosisAssessment', {
        data: newAssementData,
        notify: this.$notify,
      })
    },
    onClickDiscontinue(dx) {
      console.log(dx)
      this.$store.dispatch('discontinueDiagnosisAssessment', {
        data: dx,
        notify: this.$notify,
      })
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
</style>
