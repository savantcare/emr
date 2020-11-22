<template>
  <div>
    <el-card hover>
      <div
        style="
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          grid-template-row: repeat(9, 1fr);
          border: 2px solid #ebeef5;
        "
      >
        <div
          style="
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            text-align: center;
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 1;
            grid-row-end: 10;
            font-size: 5rem;
            color: #909399;
          "
        >
          Examination
        </div>
        <div
          style="grid-column: 2/4; font-size: 1rem; font-weight: bold; border: 1px solid #dcdfe6; text-align: center"
        >
          System/Body area
        </div>
        <div
          style="grid-column: 4/9; font-size: 1rem; font-weight: bold; border: 1px solid #dcdfe6; text-align: center"
        >
          Examination
        </div>
        <div style="border: 1px solid #dcdfe6; text-align: center; grid-column: 2/4">Constitutional</div>
        <div style="grid-column: 4/9; border: 1px solid #dcdfe6">
          * 3/7 vital signs: sitting or standing BP, supine BP, pulse rate and regularity, respiration, temperature,
          height, weight <br />* General appearance
        </div>
        <div style="border: 1px solid #dcdfe6; text-align: center; grid-column: 2/4">Musculoskeletal</div>
        <div style="grid-column: 4/9; border: 1px solid #dcdfe6">
          * Muscle strength and tone <br />
          * Gait and station
        </div>
        <div style="border: 1px solid #dcdfe6; text-align: center; grid-column: 2/4">Psychiatric</div>
        <div style="border: 1px solid #dcdfe6; text-align: center; grid-column: 4/9">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr)">
            <div>
              uiui * Speech <br />
              * Thought process<br />
              * Associations<br />
              * Abnormal/psychotic thoughts<br />
            </div>
            <div>
              * Judgment and insight<br />
              * Orientation<br />
              * Recent and remote memory <br />
              * Attention and concentration <br />
            </div>
            <div>
              * Language<br />
              * Fund of knowledge<br />
              * Mood and affect
            </div>
          </div>
        </div>
        <div
          style="
            grid-column-start: 2;
            grid-column-end: 6;
            border: 1px solid #dcdfe6;
            font-weight: bold;
            text-align: center;
          "
        >
          Examination elements
        </div>
        <div
          style="
            grid-column-start: 6;
            grid-column-end: 9;
            border: 1px solid #dcdfe6;
            font-weight: bold;
            text-align: center;
          "
          @click="features.examination.summaryDisplay = !features.examination.summaryDisplay"
        >
          Examination type (min)
        </div>
        <div style="grid-column: 2/6; border: 1px solid #dcdfe6">
          <el-button
            round
            size="mini"
            :class="features.examination.bullets === 1 ? 'notStrike' : 'strike'"
            :type="features.examination.bullets === 1 ? 'primary' : ''"
            @click="features.examination.bullets = 1"
            >1-5 bullets</el-button
          >
        </div>
        <div
          style="grid-column: 6/9; border: 1px solid #dcdfe6"
          :class="[
            features.examination.bullets >= 1
              ? (features.examination.type.pf = true)
              : (features.examination.type.pf = false),
            features.examination.type.pf ? 'notStrike' : 'strike',
          ]"
        >
          Problem focused (PF)
        </div>
        <div style="grid-column: 2/6; border: 1px solid #dcdfe6">
          <el-button
            round
            size="mini"
            :class="features.examination.bullets === 6 ? '' : 'strike'"
            :type="features.examination.bullets === 6 ? 'primary' : ''"
            @click="features.examination.bullets = 6"
            >At least 6 bullets</el-button
          >
        </div>
        <div
          style="grid-column: 6/9; border: 1px solid #dcdfe6"
          :class="[
            features.examination.bullets >= 6
              ? (features.examination.type.epf = true)
              : (features.examination.type.epf = false),
            features.examination.type.epf ? 'notStrike' : 'strike',
          ]"
        >
          Expanded problem focused (EPF)
        </div>
        <div style="grid-column: 2/6; border: 1px solid #dcdfe6">
          <el-button
            round
            size="mini"
            :class="features.examination.bullets === 9 ? '' : 'strike'"
            :type="features.examination.bullets === 9 ? 'primary' : ''"
            @click="features.examination.bullets = 9"
            >At least 9 bullets</el-button
          >
        </div>
        <div
          style="grid-column: 6/9; border: 1px solid #dcdfe6"
          :class="[
            features.examination.bullets >= 9
              ? (features.examination.type.det = true)
              : (features.examination.type.det = false),
            features.examination.type.det ? 'notStrike' : 'strike',
          ]"
        >
          Detailed (DET)
        </div>
        <div style="grid-column: 2/6; border: 1px solid #dcdfe6">
          <el-button
            round
            size="mini"
            :class="features.examination.bullets === 10 ? '' : 'strike'"
            :type="features.examination.bullets === 10 ? 'primary' : ''"
            @click="features.examination.bullets = 10"
            >All bullets in Const/ Psych boxes and 1 bullet in Musculoskeletal box</el-button
          >
        </div>
        <div
          style="grid-column: 6/9; border: 1px solid #dcdfe6"
          :class="[
            features.examination.bullets >= 10
              ? (features.examination.type.comp = true)
              : (features.examination.type.comp = false),
            features.examination.type.comp ? 'notStrike' : 'strike',
          ]"
        >
          Comprehensive (COMP)
        </div>
      </div>
    </el-card>
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
