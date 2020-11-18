<template>
  <el-card hover>
    <div style="display: grid; grid-template-columns: repeat(6, 1fr); grid-template-row: repeat(8, 1fr); border: solid">
      <div class="verticalHeader" style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">
        History
      </div>

      <div class="gridItem" style="font-weight: bold">Chief complaint (CC)</div>

      <div class="gridItem" style="font-weight: bold">History of present illness</div>

      <div class="gridItem" style="font-weight: bold">Past, family, social history (PFSH)</div>

      <div class="gridItem" style="grid-column-start: 5; grid-column-end: 7; font-weight: bold">Review of systems</div>
      <div class="gridItem">Reason for the visit</div>

      <div class="gridItem">
        Location; seveity; timing; quality; duration context;modifying factors; associated signs and symptoms
      </div>

      <div class="gridItem">Past medical, family medical, social</div>

      <div class="gridItem" style="grid-column-start: 5; grid-column-end: 7">
        Constitutional; Eyes; Ears, Nose, Mouth, and Throat; Cardiovascular; Respiratory; Genitourinary;
        Musculoskeletal; Gastrointestinal; Skin/Breast; Neurological; Psychiatric; Endocrine; Hematologic/Lymphatic;
        Allergic/Immunologic
      </div>
      <div class="gridItem" style="font-weight: bold">CC</div>
      <div class="gridItem" style="font-weight: bold">HPI</div>
      <div class="gridItem" style="font-weight: bold">PFSH</div>
      <div class="gridItem" style="font-weight: bold">ROS</div>
      <div class="gridItem" style="font-weight: bold">History type</div>
      <div class="gridItem" style="grid-row-start: 4; grid-row-end: 8; text-align: center">Yes</div>
      <div class="gridItem" style="grid-row-start: 4; grid-row-end: 6; text-align: center">
        <el-button
          round
          size="mini"
          :class="features.history.hpi === 'brief' ? '' : 'strike'"
          :type="features.history.hpi === 'brief' ? 'primary' : 'info'"
          @click="features.history.hpi = 'brief'"
        >
          Brief (1-3 elements or 1-2 chronic conditions)
        </el-button>
      </div>
      <div class="gridItem" style="grid-row-start: 4; grid-row-end: 6; text-align: center">N/A</div>
      <div class="gridItem">N/A</div>
      <div class="gridItem">Problem focussed (PF)</div>
      <div class="gridItem" style="grid-row-start: 6; grid-row-end: 8; text-align: center">
        <el-button
          round
          size="mini"
          :class="features.history.hpi === 'extended' ? '' : 'strike'"
          :type="features.history.hpi === 'extended' ? 'primary' : 'info'"
          @click="features.history.hpi = 'extended'"
        >
          Extended (4 elements or 3 chronic conditions)
        </el-button>
      </div>
      <div class="gridItem">Problem pertinent (1 system)</div>
      <div class="gridItem">Expanded problem focussed (EPF)</div>

      <div class="gridItem">Pertinent (1 element)</div>
      <div class="gridItem">Extended 2-9 systems</div>
      <div class="gridItem">Detailed (DET)</div>
      <div class="gridItem">Complete (2 elements (est) or 3 elements (new/initial))</div>
      <div class="gridItem">Complete (10-14 systems)</div>
      <div class="gridItem">Comprehensive (COMP)</div>
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
  font-size: 5rem;
}
</style>
