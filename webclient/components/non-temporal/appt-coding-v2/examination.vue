<template>
  <div>
    <el-card hover>
      <div
        style="display: grid; grid-template-columns: repeat(4, 1fr); grid-template-row: repeat(9, 1fr); border: solid"
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
            border: 1px solid #000;
          "
        >
          Examination
        </div>
        <div
          style="grid-column-start: 2; grid-column-end: 3; font-size: 2rem; border: 1px solid #000; text-align: center"
        >
          System/Body area
        </div>
        <div
          style="grid-column-start: 3; grid-column-end: 5; font-size: 2rem; border: 1px solid #000; text-align: center"
        >
          Examination
        </div>
        <div style="border: 1px solid #000; text-align: center">Constitutional</div>
        <div style="grid-column-start: 3; grid-column-end: 5; border: 1px solid #000">
          * 3/7 vital signs: sitting or standing BP, supine BP, pulse rate and regularity, respiration, temperature,
          height, weight <br />* Generalappearance
        </div>
        <div style="border: 1px solid #000; text-align: center">Musculoskeletal</div>
        <div style="grid-column-start: 3; grid-column-end: 5; border: 1px solid #000">
          * Muscle strength and tone <br />
          * Gait and station
        </div>
        <div style="border: 1px solid #000; text-align: center">Psychiatric</div>
        <div>
          * Speech <br />
          * Thought process<br />
          * Associations<br />
          * Abnormal/psychotic thoughts<br />
          * Judgment and insight<br />
          * Orientation<br />
        </div>
        <div>
          * Recent and remote memory <br />
          * Attention and concentration <br />
          * Language<br />
          * Fund of knowledge<br />
          * Mood and affect
        </div>
        <div style="grid-column-start: 2; grid-column-end: 4; border: 1px solid #000; font-weight: bold">
          Examination elements
        </div>
        <div style="grid-column-start: 4; grid-column-end: 5; border: 1px solid #000; font-weight: bold">
          Examination type
        </div>
        <div style="grid-column-start: 2; grid-column-end: 4; border: 1px solid #000">1-5 bullets</div>
        <div style="grid-column-start: 4; grid-column-end: 5; border: 1px solid #000">Problem focused (PF)</div>
        <div style="grid-column-start: 2; grid-column-end: 4; border: 1px solid #000">At least 6 bullets</div>
        <div style="grid-column-start: 4; grid-column-end: 5; border: 1px solid #000">
          Expanded problem focused (EPF)
        </div>
        <div style="grid-column-start: 2; grid-column-end: 4; border: 1px solid #000">At least 9 bullets</div>
        <div style="grid-column-start: 4; grid-column-end: 5; border: 1px solid #000">Detailed (DET)</div>
        <div style="grid-column-start: 2; grid-column-end: 4; border: 1px solid #000">
          All bullets in Constitutional and Psychiatric (shaded) boxes and 1 bullet in Musculoskeletal (unshaded) box
        </div>
        <div style="grid-column-start: 4; grid-column-end: 5; border: 1px solid #000">Comprehensive (COMP)</div>
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
