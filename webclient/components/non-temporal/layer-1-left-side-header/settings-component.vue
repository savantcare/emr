<template>
  <div>
    <button class="el-icon-setting" @click="handleClickOnSettingsIcon"></button>
    <el-dialog title="Settings" :visible.sync="dIsSettingsDialogVisible" width="30%">
      <hr />
      <br />
      <h3>Slider</h3>
      <br />
      <span
        ><el-radio v-model="dConfigProportionalOrEquiDistant" label="Proportional">Proportional</el-radio>
        <el-radio v-model="dConfigProportionalOrEquiDistant" label="EquiDistant">Equi distant</el-radio></span
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
      (In percentage)
      <div class="block">
        <el-slider v-model="fontSizeValue" :min="0" :max="200" show-input @change="fontSliderChanged"> </el-slider>
      </div>
      <br />
      <hr />
      <br />
      <el-checkbox v-model="checked">Invoke tutorial at start</el-checkbox>
    </el-dialog>
  </div>
</template>

<script>
import clientTblOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  data() {
    return {
      dIsSettingsDialogVisible: false,
      dConfigProportionalOrEquiDistant: 'EquiDistant',
      dConfigChecklistOfApptTypesToShow: ['locked', 'unlocked', 'no-show', 'late-cancellation', 'cancellation'],
      dConfigProviderTypesToShow: [],
      checked: true,
      fontSizeValue: null,
    }
  },
  async mounted() {
    await clientTblOfCommonForAllComponents.$fetch()

    const fontObject = clientTblOfCommonForAllComponents.find('font-size-customized-by-user-value-in-percentage')

    this.fontSizeValue = parseInt(fontObject['fieldValue'])

    if (!this.fontSizeValue) {
      this.fontSizeValue = 100
    }
  },
  methods: {
    fontSliderChanged() {
      clientTblOfCommonForAllComponents.$update({
        data: [
          {
            fieldName: 'font-size-customized-by-user-value-in-percentage',
            fieldValue: this.fontSizeValue,
          },
        ],
      })
    },
    handleClickOnSettingsIcon() {
      console.log('setting to true')
      this.dIsSettingsDialogVisible = true
    },
  },
}
</script>
