<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          placeholder="Height in inches"
          :value="mfGetFieldValue('heightInInches')"
          @input="mfSetFieldValueUsingCache($event, 'heightInInches')"
        >
        </el-input>
        <el-date-picker
          v-model="value2"
          :value="mfGetFieldValue('dateOfMeasurement')"
          type="date"
          placeholder="Pick a day"
          :picker-options="pickerOptions"
          format="yyyy/MM/dd"
          value-format="yyyy-MM-dd"
          @input="mfSetFieldValueUsingCache($event, 'dateOfMeasurement')"
        >
        </el-date-picker>
        <el-input
          placeholder="Notes"
          type="textarea"
          :autosize="{ minRows: 2 }"
          :value="mfGetFieldValue('notes')"
          @input="mfSetFieldValueUsingCache($event, 'notes')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="cfIsButtonEnabled" type="primary" plain @click="mfOnSubmit"
          >Submit</el-button
        >
        <el-button :disabled="cfIsButtonEnabled" type="warning" plain @click="mfResetForm"
          >Reset form</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['firstParam'], // if the name was changed 4 times earlier so the id will not be 1. Hence id needs to come as a prop from the Ct calling this Ct.
}
</script>
