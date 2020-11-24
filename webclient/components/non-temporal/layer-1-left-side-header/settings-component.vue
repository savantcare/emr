<template>
  <div>
    <el-button size="mini" circle type="primary" icon="el-icon-setting" @click="handleClickOnSettingsIcon"></el-button>

    <el-dialog title="" :visible.sync="dIsSettingsDialogVisible" width="30%">
      <h3>5 minute tutorial</h3>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="3 core principles: FET" name="1">
          1. See the final note. <br />
          2. Make quick edits to the note. <br />
          3. See change over time.
        </el-collapse-item>
        <el-collapse-item title="Colors:" name="2">
          Blue: Same as previous note <br />
          Black: Data changed during that appt <br />
          Green: Valid data <br />
          Orange: Data not valid. <br />
        </el-collapse-item>
        <br />
        <h3>Configure</h3>

        <el-collapse-item title="Slider" name="3">
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
        </el-collapse-item>

        <el-collapse-item title="Font size" name="4">
          (In percentage)
          <div class="block">
            <el-slider v-model="fontSizeValue" :min="0" :max="200" show-input @change="fontSliderChanged"> </el-slider>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Walkthrough" name="5">
          <el-checkbox v-model="checked">Invoke walkthrough at start</el-checkbox>
        </el-collapse-item>
      </el-collapse>
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
      activeNames: [],
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
    handleChange(val) {
      console.log(val)
    },
  },
}
</script>
