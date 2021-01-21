<!-- Reference implementation for non numeric hence no graph-->
<template>
  <el-row>
    <el-col :span="4">
      <el-avatar size="custom" src="https://kite.iimb.ac.in/assets/img/vikas_new.png"></el-avatar>
    </el-col>
    <el-col :span="20" class="patient-detail-list">
      <el-row class="patient-detail-list-item">
        <el-col :span="6"> <b>Insurance name:</b> </el-col>
        <el-col :span="18"> Anthem Blue Cross of California </el-col>
      </el-row>
      <el-row class="patient-detail-list-item">
        <el-col :span="6"> <b>Consent forms:</b> </el-col>
        <el-col :span="18"> Signed </el-col>
      </el-row>
      <el-row class="patient-detail-list-item">
        <el-col :span="6"> <b>Pharmacy name:</b> </el-col>
        <el-col :span="18"> CVS Pharmacy</el-col>
      </el-row>
      <el-row class="send-hdr-button" type="flex" justify="space-between">
        <el-col :span="24">
          <el-button size="mini" type="primary" style="margin: 5px 0 0 0" round>Send HDR</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  date: {},
  computed: {},
}
</script>

<style>
.patient-detail-list-item {
  border-bottom: 1px solid rgb(238, 238, 238);
  margin: 0 0 3px 0;
  padding: 0 0 3px 0;
}
.el-avatar.el-avatar--custom {
  height: 75px;
  width: 75px;
}
.el-avatar.el-avatar--custom > img {
  margin-left: -22px;
}
i.el-icon-caret-top {
  font-size: 2.5rem;
  color: #ebeef5;
  position: absolute;
  top: -26px;
  left: 47%;
}
</style>
