<template>
    <div style="display: grid; grid-template-columns: repeat(11, 1fr); grid-template-row: repeat(8, 1fr); border: 2px solid #ebeef5; border-radius: 15px;
">
      <div class="verticalHeader" style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">
        History
      </div>

      <div class="gridItem" style="font-weight: bold;grid-column: 2/4">Chief complaint (CC)</div>

      <div class="gridItem" style="font-weight: bold;grid-column: 4/7;">History of present illness</div>

      <div class="gridItem" style="font-weight: bold;grid-column: 7/9;">Past, family, social history (PFSH)</div>

      <div class="gridItem" style="grid-column-start: 5; grid-column: 9/12; font-weight: bold">Review of systems</div>
      <div class="gridItem" style="grid-column: 2/4">Reason for the visit</div>

      <div class="gridItem" style="grid-column: 4/7">
        Location; seveity; timing; quality; duration context;modifying factors; associated signs and symptoms
      </div>

      <div class="gridItem" style="grid-column: 7/9">Past medical, family medical, social</div>

      <div class="gridItem" style="grid-column: 9/12">
        Constitutional; Eyes; Ears, Nose, Mouth, and Throat; Cardiovascular; Respiratory; Genitourinary;
        Musculoskeletal; Gastrointestinal; Skin/Breast; Neurological; Psychiatric; Endocrine; Hematologic/Lymphatic;
        Allergic/Immunologic
      </div>
      <div class="gridItem" style="font-weight: bold;grid-column: 2/4">CC</div>
      <div class="gridItem" style="font-weight: bold;grid-column: 4/7">HPI</div>
      <div class="gridItem" style="font-weight: bold;grid-column: 7/9">PFSH</div>
      <div class="gridItem" style="font-weight: bold;grid-column: 9/10">ROS</div>
      <div class="gridItem" style="font-weight: bold;grid-column: 10/12" @click="features.history.summaryDisplay=!features.history.summaryDisplay">History type (min)</div>
      <div class="gridItem" style="grid-row-start: 4; grid-row-end: 8; text-align: center;grid-column: 2/4">
        <el-button
          round
          size="mini"
          :type="features.history.chiefComplaint ? 'primary' : ''"
          :class="features.history.chiefComplaint ? '' : 'strike'"
          @click="features.history.chiefComplaint = !features.history.chiefComplaint"
        >
          Yes
        </el-button>
      </div>
      <div class="gridItem" style="grid-row-start: 4; grid-row-end: 6; text-align: center;grid-column: 4/7">
        <el-button
          round
          size="mini"
          :class="features.history.hpi === 1 ? '' : 'strike'"
          :type="features.history.hpi === 1 ? 'primary' : ''"
          @click="features.history.hpi = 1"
        >
          Brief </el-button
        ><br />
        <sub>(1-3 elements or 1-2 chronic conditions)</sub>
      </div>
      <div class="gridItem" style="grid-row-start: 4; grid-row-end: 6; text-align: center;grid-column: 7/9">
        <el-button
          round
          size="mini"
          :class="features.history.pfsh === 1 ? '' : 'strike'"
          :type="features.history.pfsh === 1 ? 'primary' : ''"
          @click="features.history.pfsh = 1"
        >
          N/A
        </el-button>
      </div>
      <div class="gridItem" style="grid-column: 9/10">
        <el-button
          round
          style="grid-column: 9/10"
          size="mini"
          :class="features.history.ros === 1 ? '' : 'strike'"
          :type="features.history.ros === 1 ? 'primary' : ''"
          @click="features.history.ros = 1"
        >
          N/A
        </el-button>
      </div>
      <div class="gridItem"
        
          :style="features.history.type.pf ? 'background-color: #67C23A; grid-column: 10/12' : 'background-color: #909399; grid-column: 10/12'"
          :class="
            features.history.chiefComplaint &&
            features.history.hpi >= 1 &&
            features.history.pfsh >= 1 &&
            features.history.ros >= 1
              ? (features.history.type.pf = true)
              : (features.history.type.pf = false)
          "
        >
                    Problem focussed (PF)
                </div>

                <div class="gridItem" style="grid-row-start: 6; grid-row-end: 8; text-align: center; grid-column: 4/7">
                  <el-button
                    round
                    size="mini"
                    style="grid-column: 4/7"
                    :class="features.history.hpi === 2 ? '' : 'strike'"
                    :type="features.history.hpi === 2 ? 'primary' : ''"
                    @click="features.history.hpi = 2"
                  >
                    Extended </el-button
                  ><br />
                  <sub>(4 elements or 3 chronic conditions)</sub>
                </div>
                <div class="gridItem" style="grid-column: 9/10">
                  <el-button
                    round
                    size="mini"
                    :class="features.history.ros === 2 ? '' : 'strike'"
                    :type="features.history.ros === 2 ? 'primary' : ''"
                    @click="features.history.ros = 2"
                  >
                    Problem pertinent </el-button
                  ><br />
                  <sub>(1 system)</sub>
                </div>
                <div
                  :class="[
                    features.history.chiefComplaint &&
                    features.history.hpi >= 1 &&
                    features.history.pfsh >= 1 &&
                    features.history.ros >= 2
                      ? (features.history.type.epf = true)
                      : (features.history.type.epf = false),
                      
                     features.history.type.epf ? 'notStrike' : 'strike'
 
                      ]
                  "
                  style="grid-column: 10/12"
                >
                  Expanded problem focussed (EPF)
                </div>
                <div class="gridItem" style="grid-column: 7/9">
                  <el-button
                    round
                    size="mini"
                    :class="features.history.pfsh === 2 ? '' : 'strike'"
                    :type="features.history.pfsh === 2 ? 'primary' : ''"
                    @click="features.history.pfsh = 2"
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
                    :type="features.history.ros === 3 ? 'primary' : ''"
                    @click="features.history.ros = 3"
                  >
                    Extended </el-button
                  ><br />
                  <sub>2-9 systems</sub>
                </div>
                <div
                    :class="[
                      features.history.chiefComplaint &&
                      features.history.hpi >= 2 &&
                      features.history.pfsh >= 2 &&
                      features.history.ros >= 3
                        ? (features.history.type.det = true)
                        : (features.history.type.det = false),

                      features.history.type.det ? 'notStrike' : 'strike'
                    ]"
                    style="grid-column: 10/12"

                  >
                    Detailed (DET)
                </div>
                <div class="gridItem" style="font-weight: bold;grid-column: 7/9">
                  <el-button
                    round
                    size="mini"
                    :class="features.history.pfsh === 3 ? '' : 'strike'"
                    :type="features.history.pfsh === 3 ? 'primary' : ''"
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
                    :type="features.history.ros === 4 ? 'primary' : ''"
                    @click="features.history.ros = 4"
                  >
                    Complete </el-button
                  ><br />
                  <sub>(10-14 systems)</sub>
                </div>
                <div
                    :class="[
                      features.history.chiefComplaint &&
                      features.history.hpi >= 2 &&
                      features.history.pfsh >= 3 &&
                      features.history.ros >= 4
                        ? (features.history.type.comp = true)
                        : (features.history.type.comp = false),
                    
                      features.history.type.comp ? 'notStrike' : 'strike'
                    ]"

                    style="grid-column: 10/12"

                  >
                    Comprehensive (COMP)
                </div>
              </div>
          </template>

      </div>
    </div>
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
  border: 1px solid #DCDFE6;
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
  color: #909399;

}
</style>
