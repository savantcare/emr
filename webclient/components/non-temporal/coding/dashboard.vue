<template>
  <div>
    <button class="el-icon-setting" @click="handleClickOnSettingsIcon"></button>
    <el-dialog title="" :visible.sync="dIsSettingsDialogVisible" width="30%">
      <code90834 />
    </el-dialog>
  </div>
</template>

<script>
import code90834 from './c90834.vue'

export default {
  data() {
    return {
      dIsSettingsDialogVisible: false,
    }
  },
  components: { code90834 },
  async mounted() {
    console.log(ctAccord)
  },
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
