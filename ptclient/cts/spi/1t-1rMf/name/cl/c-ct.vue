<!-- Reference implementation -->
<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          placeholder="First name"
          :value="mfGetCopiedRowFldValue('firstName')"
          @input="mfSetCopiedRowFldValueUsingCache($event, 'firstName')"
        >
        </el-input>
        <el-input
          placeholder="Middle name"
          :value="mfGetCopiedRowFldValue('middleName')"
          @input="mfSetCopiedRowFldValueUsingCache($event, 'middleName')"
        ></el-input>
        <el-input
          placeholder="Last name"
          :value="mfGetCopiedRowFldValue('lastName')"
          @input="mfSetCopiedRowFldValueUsingCache($event, 'lastName')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <!-- as per element.io the default value of disabled is false -->
        <el-button :disabled="cfHasSomeFldChanged" type="success" plain @click="mfOnSubmit"
          >Submit</el-button
        >
        <el-button :disabled="cfHasSomeFldChanged" type="danger" plain @click="mfOnResetForm"
          >Reset form</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import mxc from '../mixins/change-layer.js'

export default {
  mixins: [mxc],
}
</script>
