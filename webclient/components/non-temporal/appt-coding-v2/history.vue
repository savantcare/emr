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
      <div class="gridItem" style="grid-row-start: 4; grid-row-end: 8; text-align: center">
        <el-button
          round
          size="mini"
          :type="features.history.chiefComplaint ? 'primary' : 'info'"
          :class="features.history.chiefComplaint ? '' : 'strike'"
          @click="features.history.chiefComplaint = !features.history.chiefComplaint"
        >
          Yes
        </el-button>
      </div>
      <div class="gridItem" style="grid-row-start: 4; grid-row-end: 6; text-align: center">
        <el-button
          round
          size="mini"
          :class="features.history.hpi === '1' ? '' : 'strike'"
          :type="features.history.hpi === '1' ? 'primary' : 'info'"
          @click="features.history.hpi = '1'"
        >
          Brief </el-button
        ><br />
        <sub>(1-3 elements or 1-2 chronic conditions)</sub>
      </div>
      <div class="gridItem" style="grid-row-start: 4; grid-row-end: 6; text-align: center">
        <el-button
          round
          size="mini"
          :class="features.history.pfsh === '1' ? '' : 'strike'"
          :type="features.history.pfsh === '1' ? 'primary' : 'info'"
          @click="features.history.pfsh = '1'"
        >
          N/A
        </el-button>
      </div>
      <div class="gridItem">
        <el-button
          round
          size="mini"
          :class="features.history.ros === '1' ? '' : 'strike'"
          :type="features.history.ros === '1' ? 'primary' : 'info'"
          @click="features.history.ros = '1'"
        >
          N/A
        </el-button>
      </div>
      <div class="gridItem">
        <el-button
          round
          size="mini"
          :type="
            features.history.chiefComplaint &&
            features.history.hpi >= '1' &&
            features.history.pfsh >= '1' &&
            features.history.ros >= '1'
              ? 'primary'
              : 'info'
          "
          :class="
            features.history.chiefComplaint &&
            features.history.hpi >= '1' &&
            features.history.pfsh >= '1' &&
            features.history.ros >= '1'
              ? (features.history.type.pf = true)
              : 'strike'
          "
        >
          Problem focussed (PF)
        </el-button>
      </div>

      <div class="gridItem" style="grid-row-start: 6; grid-row-end: 8; text-align: center">
        <el-button
          round
          size="mini"
          :class="features.history.hpi === 2 ? '' : 'strike'"
          :type="features.history.hpi === 2 ? 'primary' : 'info'"
          @click="features.history.hpi = 2"
        >
          Extended </el-button
        ><br />
        <sub>(4 elements or 3 chronic conditions)</sub>
      </div>
      <div class="gridItem">
        <el-button
          round
          size="mini"
          :class="features.history.ros === '2' ? '' : 'strike'"
          :type="features.history.ros === '2' ? 'primary' : 'info'"
          @click="features.history.ros = '2'"
        >
          Problem pertinent </el-button
        ><br />
        <sub>(1 system)</sub>
      </div>
      <div class="gridItem">
        <el-button
          round
          size="mini"
          :type="
            features.history.chiefComplaint &&
            features.history.hpi >= '1' &&
            features.history.pfsh >= '1' &&
            features.history.ros >= '2'
              ? 'primary'
              : 'info'
          "
          :class="
            features.history.chiefComplaint &&
            features.history.hpi >= '1' &&
            features.history.pfsh >= '1' &&
            features.history.ros >= '2'
              ? (features.history.type.epf = true)
              : 'strike'
          "
        >
          Expanded problem focussed (EPF)
        </el-button>
      </div>
      <div class="gridItem">
        <el-button
          round
          size="mini"
          :class="features.history.pfsh === '2' ? '' : 'strike'"
          :type="features.history.pfsh === '2' ? 'primary' : 'info'"
          @click="features.history.pfsh = '2'"
        >
          Pertinent </el-button
        ><br />
        <sub>(1 element) </sub>
      </div>
      <div class="gridItem">
        <el-button
          round
          size="mini"
          :class="features.history.ros === 3 ? '' : 'strike'"
          :type="features.history.ros === 3 ? 'primary' : 'info'"
          @click="features.history.ros = 3"
        >
          Extended </el-button
        ><br />
        <sub>2-9 systems</sub>
      </div>
      <div class="gridItem">
        <el-button
          round
          size="mini"
          :type="
            features.history.chiefComplaint &&
            features.history.hpi >= 2 &&
            features.history.pfsh >= '2' &&
            features.history.ros >= 3
              ? 'primary'
              : 'info'
          "
          :class="
            features.history.chiefComplaint &&
            features.history.hpi >= 2 &&
            features.history.pfsh >= '2' &&
            features.history.ros >= 3
              ? (features.history.type.det = true)
              : 'strike'
          "
        >
          Detailed (DET)
        </el-button>
      </div>
      <div class="gridItem">
        <el-button
          round
          size="mini"
          :class="features.history.pfsh === 3 ? '' : 'strike'"
          :type="features.history.pfsh === 3 ? 'primary' : 'info'"
          @click="features.history.pfsh = 3"
        >
          Complete </el-button
        ><br />
        <sub> (2 elements (est) or 3 elements (new/initial) </sub>
      </div>
      <div class="gridItem">
        <el-button
          round
          size="mini"
          :class="features.history.ros === 4 ? '' : 'strike'"
          :type="features.history.ros === 4 ? 'primary' : 'info'"
          @click="features.history.ros = 4"
        >
          Complete </el-button
        ><br />
        <sub>(10-14 systems)</sub>
      </div>
      <div class="gridItem">
        <el-button
          round
          size="mini"
          :type="
            features.history.chiefComplaint &&
            features.history.hpi >= 2 &&
            features.history.pfsh >= 3 &&
            features.history.ros >= 4
              ? 'primary'
              : 'info'
          "
          :class="
            features.history.chiefComplaint &&
            features.history.hpi >= 2 &&
            features.history.pfsh >= 3 &&
            features.history.ros >= 4
              ? (features.history.type.comp = true)
              : 'strike'
          "
        >
          Comprehensive (COMP)
        </el-button>
      </div>
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
