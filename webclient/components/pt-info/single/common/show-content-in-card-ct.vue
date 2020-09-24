<template>
  <el-card shadow="hover" class="box-card sc-mental-status-exam-all-content">
    <div slot="header" class="sc-mental-status-exam-all-content-header clearfix">
      <span>{{ mainCardName }}</span>
      <el-button-group style="float: right; display: none">
        <el-button
          style="padding: 3px; color: #c0c4cc; border: none"
          plain
          tabindex="-1"
          @click="mfOpenCCtInCl"
          class="el-icon-edit"
        ></el-button>
      </el-button-group>
    </div>
    <div class="sc-mental-status-exam-all-content-body">
      <el-card
        v-for="mse in childCardsArray"
        :key="mse.clientSideUniqRowId"
        class="box-card sc-mental-status-exam-individual-card"
        shadow="hover"
      >
        <el-button-group style="float: right; display: none">
          <el-button
            class="el-icon-discover"
            style="padding: 3px; color: #c0c4cc; border: none"
            plain
            tabindex="-1"
          >
            <el-tooltip
              class="item"
              effect="light"
              content="info"
              placement="top-end"
              :open-delay="500"
            >
            </el-tooltip>
          </el-button>
          <el-button
            class="el-icon-circle-close"
            style="padding: 3px; color: #c0c4cc; border: none"
            plain
            tabindex="-1"
            @click="mfDeleteMentalStatusExam(mse.clientSideUniqRowId)"
          >
            <el-tooltip
              class="item"
              effect="light"
              content="Click to delete"
              placement="top-end"
              :open-delay="500"
            >
            </el-tooltip>
          </el-button>
        </el-button-group>
        {{ mse.tblMentalStatusExamMasterLink.mentalStatusExamCategory }}:
        {{ mse.tblMentalStatusExamMasterLink.mentalStatusExamDescription }}
      </el-card>
    </div>
  </el-card>
</template>

<script>
export default {
  props: { mainCardName: String, childCardsArray: Array },
  date: {},
  computed: {},
  methods: {
    mfOpenCCtInCl() {
      this.$parent.mfOpenCCtInCl()
    },
  },
}
</script>
