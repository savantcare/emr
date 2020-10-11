<template>
  <div>
    <button class="el-icon-setting"></button>
    <el-dialog title="Settings" :visible.sync="dIsSettingsDialogVisible" width="30%">
      <hr />
      <br />
      <h3>Slider</h3>
      <br />
      <span
        ><el-radio v-model="dConfigProportionalOrEquiDistant" label="Proportional"
          >Proportional</el-radio
        >
        <el-radio v-model="dConfigProportionalOrEquiDistant" label="EquiDistant"
          >Equi distant</el-radio
        ></span
      ><br />
      <br />

      <el-checkbox-group v-model="dConfigChecklistOfApptTypesToShow">
        <el-checkbox label="locked">Locked</el-checkbox>
        <el-checkbox label="unlocked">Unlocked</el-checkbox>
        <el-checkbox label="late-cancellation">Late cancellation</el-checkbox>
        <el-checkbox label="no-show">No show</el-checkbox>
        <el-checkbox label="cancellation">Cancellation</el-checkbox> </el-checkbox-group
      ><br />

      <el-checkbox-group v-model="dConfigChecklistOfApptTypesToShow">
        <el-checkbox label="All providers"></el-checkbox>
        <el-checkbox label="Only me"></el-checkbox> </el-checkbox-group
      ><br />
      <hr />
      <br />
      <h3>Font tize</h3>
      <div class="block">
        <el-slider v-model="value" show-input> </el-slider>
      </div>
      <br />
      <hr />
      <br />
      <el-checkbox v-model="checked">Invoke tutorial at start</el-checkbox>
    </el-dialog>
  </div>
</template>

<script>
export default {}
</script>
