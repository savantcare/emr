<template>
  <el-card hover>
    <div style="display: grid; grid-template-columns: repeat(6, 1fr); grid-template-row: repeat(7, 1fr); border: solid">
      <div class="verticalHeader" style="transform: rotate(-90deg)">History</div>

      <div class="gridItem">Chief complaint</div>

      <div class="gridItem">History of present illness</div>

      <div class="gridItem">Past, family, social history (PFSH)</div>

      <div class="gridItem">Review of systems</div>
      <div class="gridItem">Reason for the visit</div>

      <div class="gridItem">
        Location; seveity; timing; quality; duration context;modifying factors; associated signs and symptoms
      </div>

      <div class="gridItem">Past medical, family medical, social</div>

      <div class="gridItem">
        Constitutional; Eyes; Ears, Nose, Mouth, and Throat; Cardiovascular; Respiratory; Genitourinary;
        Musculoskeletal; Gastrointestinal; Skin/Breast; Neurological; Psychiatric; Endocrine; Hematologic/Lymphatic;
        Allergic/Immunologic
      </div>
      <div class="gridItem">CC</div>
      <div class="gridItem">HPI</div>
      <div class="gridItem">PFSH</div>
      <div class="gridItem">ROS</div>
      <div class="gridItem">History type</div>
      <div class="gridItem">CC</div>
      <div class="gridItem">HPI</div>
      <div class="gridItem">PFSH</div>
      <div class="gridItem">ROS</div>
      <div class="gridItem">History type</div>
      <div class="gridItem">CC</div>
      <div class="gridItem">HPI</div>
      <div class="gridItem">PFSH</div>
      <div class="gridItem">ROS</div>
      <div class="gridItem">History type</div>
      <div class="gridItem">CC</div>
      <div class="gridItem">HPI</div>
      <div class="gridItem">PFSH</div>
      <div class="gridItem">ROS</div>
      <div class="gridItem">History type</div>
      <div class="gridItem">CC</div>
      <div class="gridItem">HPI</div>
      <div class="gridItem">PFSH</div>
      <div class="gridItem">ROS</div>
      <div class="gridItem">History type</div>
    </div>
  </el-card>
</template>
<script>
export default {
  props: {
    features: {
      type: Object,
      required: true,
    },
  },
  computed: {},
}
</script>

<style scoped>
.gridItem {
  background-color: #fff;
  border: 1px solid #000;
  padding: 2px;
  font-size: 1rem;
  text-align: center;
}
.verticalHeader {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 8;
  font-size: 2rem;
}
</style>
