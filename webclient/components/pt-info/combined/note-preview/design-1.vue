<template>
  <el-card>
    <div class="A4">
      Note details for: Name: Vikas Kedia Age: 42 Appt Date:

      <h3>Service statements</h3>
      <h3>Mental status exam</h3>
      <h3>Psych review of systems</h3>
      <h3>Reminders</h3>
      <h3>Recommendations</h3>
      <h3>Medications</h3>
      <el-button>Lock the note </el-button>
    </div>
  </el-card>
</template>

<style scoped>
/* Ref: https://stackoverflow.com/questions/39486352/a4-page-like-layout-in-html  */
.A4 {
  background: white;
  width: 21cm;
  height: 29.7cm;
  display: block;
  margin: 0 auto;
  padding: 10px 25px;
  margin-bottom: 0.5cm;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
}
</style>
