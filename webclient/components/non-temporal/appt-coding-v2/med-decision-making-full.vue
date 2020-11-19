<template>
  <div>
    <el-card hover>
      <div
        style="display: grid; grid-template-columns: repeat(5, 1fr); grid-template-row: repeat(9, 1fr); border: solid"
      >
        <div
          style="
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            text-align: center;
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 1;
            grid-row-end: 32;
            font-size: 5rem;
            border: 1px solid #000;
          "
        >
          Medical decision making
        </div>
        <div
          style="grid-column-start: 2; grid-column-end: 4; font-size: 2rem; border: 1px solid #000; text-align: center"
        >
          Medical Decision Making Element
        </div>
        <div
          style="grid-column-start: 4; grid-column-end: 6; font-size: 2rem; border: 1px solid #000; text-align: center"
        >
          Determined by
        </div>
        <div
          style="grid-column-start: 2; grid-column-end: 4; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          Number of diagnoses or management options
        </div>
        <div
          style="grid-column-start: 4; grid-column-end: 6; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          Problem points chart
        </div>
        <div
          style="grid-column-start: 2; grid-column-end: 4; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          Amount and/or complexity of data to be reviewed
        </div>
        <div
          style="grid-column-start: 4; grid-column-end: 6; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          Data points chart
        </div>
        <div
          style="grid-column-start: 2; grid-column-end: 4; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          Risk of significant complications, morbidity, and/or mortality
        </div>
        <div
          style="grid-column-start: 4; grid-column-end: 6; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          Table of risk
        </div>
        <div
          style="
            grid-column-start: 2;
            grid-column-end: 6;
            font-size: 1.5rem;
            border: 1px solid #000;
            text-align: center;
          "
        >
          Problem Points
        </div>
        <div
          style="
            grid-column-start: 2;
            grid-column-end: 5;
            font-size: 1.2rem;
            border: 1px solid #000;
            text-align: center;
            font-weight: bold;
          "
        >
          Category or Problems/Major New Symptoms
        </div>
        <div
          style="
            grid-column-start: 5;
            grid-column-end: 6;
            font-size: 1.2rem;
            border: 1px solid #000;
            text-align: center;
            font-weight: bold;
          "
        >
          Points per problem
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          Self-limiting or minor (stable, improved, or worsening (max=2)
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          1
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          Established problem (to examining physician); stable or improved
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          2
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          Established problem (to examining physician); worsening
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          3
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          New problem (to examining physician); no additional workup or diagnostic procedures ordered (max=1)
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          4
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          New problem (to examining physician); additional workup planned (Additional workup does not include referring
          patient to another physician for future care)
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          5
        </div>
        <div
          style="grid-column-start: 2; grid-column-end: 6; font-size: 2rem; border: 1px solid #000; text-align: center"
        >
          Data points
        </div>

        <div
          style="
            grid-column-start: 2;
            grid-column-end: 5;
            font-size: 1.5rem;
            border: 1px solid #000;
            text-align: center;
          "
        >
          Categories of Data to be Reviewed (max=1 for each)
        </div>
        <div
          style="
            grid-column-start: 5;
            grid-column-end: 6;
            font-size: 1.5rem;
            border: 1px solid #000;
            text-align: center;
          "
        >
          Points ({{ dataPoints }})
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button
            round
            size="mini"
            :class="features.medDecisionMaking.dataPoints.reviewOrderClinical === true ? '' : 'strike'"
            :type="features.medDecisionMaking.dataPoints.reviewOrderClinical === true ? 'primary' : 'info'"
            @click="
              features.medDecisionMaking.dataPoints.reviewOrderClinical = !features.medDecisionMaking.dataPoints
                .reviewOrderClinical
            "
          >
            Review and/or order of clinical lab tests</el-button
          >
        </div>
        <div :class="features.medDecisionMaking.dataPoints.reviewOrderClinical === true ? 'notStrike' : 'strike'">
          1
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button
            round
            size="mini"
            :class="features.medDecisionMaking.dataPoints.reviewOrderRadiology === true ? '' : 'strike'"
            :type="features.medDecisionMaking.dataPoints.reviewOrderRadiology === true ? 'primary' : 'info'"
            @click="
              features.medDecisionMaking.dataPoints.reviewOrderRadiology = !features.medDecisionMaking.dataPoints
                .reviewOrderRadiology
            "
          >
            Review and/or order of tests in the radiology section of CPT</el-button
          >
        </div>
        <div :class="features.medDecisionMaking.dataPoints.reviewOrderRadiology === true ? 'notStrike' : 'strike'">
          1
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button
            round
            size="mini"
            :class="features.medDecisionMaking.dataPoints.reviewOrderMedicine === true ? '' : 'strike'"
            :type="features.medDecisionMaking.dataPoints.reviewOrderMedicine === true ? 'primary' : 'info'"
            @click="
              features.medDecisionMaking.dataPoints.reviewOrderMedicine = !features.medDecisionMaking.dataPoints
                .reviewOrderMedicine
            "
          >
            Review and/or order of tests in the medicine section of CPT</el-button
          >
        </div>
        <div :class="features.medDecisionMaking.dataPoints.reviewOrderMedicine === true ? 'notStrike' : 'strike'">
          1
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button
            round
            size="mini"
            :class="features.medDecisionMaking.dataPoints.discussionTestResults === true ? '' : 'strike'"
            :type="features.medDecisionMaking.dataPoints.discussionTestResults === true ? 'primary' : 'info'"
            @click="
              features.medDecisionMaking.dataPoints.discussionTestResults = !features.medDecisionMaking.dataPoints
                .discussionTestResults
            "
          >
            Discussion of test results with performing physician</el-button
          >
        </div>
        <div :class="features.medDecisionMaking.dataPoints.discussionTestResults === true ? 'notStrike' : 'strike'">
          1
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button
            round
            size="mini"
            :class="features.medDecisionMaking.dataPoints.decisionOldRecords === true ? '' : 'strike'"
            :type="features.medDecisionMaking.dataPoints.decisionOldRecords === true ? 'primary' : 'info'"
            @click="
              features.medDecisionMaking.dataPoints.decisionOldRecords = !features.medDecisionMaking.dataPoints
                .decisionOldRecords
            "
          >
            Decision to obtain old records</el-button
          ><sub><br />And/or obtain history from someone other than patient</sub>
        </div>
        <div :class="features.medDecisionMaking.dataPoints.decisionOldRecords === true ? 'notStrike' : 'strike'">1</div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button
            round
            size="mini"
            :class="features.medDecisionMaking.dataPoints.reviewOldRecords === true ? '' : 'strike'"
            :type="features.medDecisionMaking.dataPoints.reviewOldRecords === true ? 'primary' : 'info'"
            @click="
              features.medDecisionMaking.dataPoints.reviewOldRecords = !features.medDecisionMaking.dataPoints
                .reviewOldRecords
            "
          >
            Review and summarization of old records </el-button
          ><sub
            ><br />Obtaining history from someone other than patient and/or discussion of case with another health care
            provider</sub
          >
        </div>
        <div :class="features.medDecisionMaking.dataPoints.reviewOldRecords === true ? 'notStrike' : 'strike'">2</div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button
            round
            size="mini"
            :class="features.medDecisionMaking.dataPoints.independentTracing === true ? '' : 'strike'"
            :type="features.medDecisionMaking.dataPoints.independentTracing === true ? 'primary' : 'info'"
            @click="
              features.medDecisionMaking.dataPoints.independentTracing = !features.medDecisionMaking.dataPoints
                .independentTracing
            "
          >
            Independent visualization of image, tracing, or specimen itself</el-button
          >
          <sub><br />(not simply review report)</sub>
        </div>
        <div :class="features.medDecisionMaking.dataPoints.independentTracing === true ? 'notStrike' : 'strike'">2</div>
        <div
          style="grid-column-start: 2; grid-column-end: 6; font-size: 2rem; border: 1px solid #000; text-align: center"
        >
          Table of risk
        </div>

        <div
          style="
            grid-column-start: 2;
            grid-column-end: 3;
            font-size: 1rem;
            text-align: center;
            border: 1px solid;
            font-weight: bold;
          "
        >
          Level of risk
        </div>
        <div
          style="
            grid-column-start: 3;
            grid-column-end: 4;
            font-size: 1rem;
            text-align: center;
            border: 1px solid;
            font-weight: bold;
          "
        >
          Presenting problems
        </div>
        <div
          style="
            grid-column-start: 4;
            grid-column-end: 5;
            font-size: 1rem;
            text-align: center;
            border: 1px solid;
            font-weight: bold;
          "
        >
          Diagnostic procedure ordered
        </div>
        <div
          style="
            grid-column-start: 5;
            grid-column-end: 6;
            font-size: 1rem;
            text-align: center;
            border: 1px solid;
            font-weight: bold;
          "
        >
          Management options selected
        </div>

        <div
          style="grid-column-start: 2; grid-column-end: 3; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          Minimal
        </div>
        <div style="grid-column-start: 3; grid-column-end: 4; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button
            round
            size="mini"
            :class="features.medDecisionMaking.risk.problem >= 1 ? '' : 'strike'"
            :type="features.medDecisionMaking.risk.problem >= 1 ? 'primary' : 'info'"
            @click="features.medDecisionMaking.risk.problem = 1"
            >One self-limited</el-button
          >
          <br />
          <sub>or minor problem</sub>
        </div>
        <div style="grid-column-start: 4; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button round size="mini">Venipuncture; EKG; urinalysis</el-button>
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button round size="mini">Rest</el-button>
        </div>

        <div
          style="grid-column-start: 2; grid-column-end: 3; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          Low
        </div>
        <div style="grid-column-start: 3; grid-column-end: 4; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button round size="mini">Stable</el-button><br />
          <sub>Two or more self-limited or minor problems; One stable chronic illness; Acute uncomplicated illness</sub>
        </div>
        <div style="grid-column-start: 4; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button round size="mini">Arterial puncture</el-button>
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button round size="mini">OTC drugs</el-button>
        </div>

        <div
          style="grid-column-start: 2; grid-column-end: 3; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          Moderate
        </div>
        <div style="grid-column-start: 3; grid-column-end: 4; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button round size="mini">Systemic symptoms</el-button><br />
          <sub
            >One or more chronic illnesses with mild exacerbation, progression, or side effects; Two or more stable
            chronic illnesses; Undiagnosed new problem with uncertain prognosis; Acute illness with systemic
            symptoms</sub
          >
        </div>
        <div
          style="grid-column-start: 4; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid"
        ></div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button round size="mini">Prescription drug management</el-button>
        </div>

        <div
          style="grid-column-start: 2; grid-column-end: 3; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          High
        </div>
        <div style="grid-column-start: 3; grid-column-end: 4; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button round size="mini">Threat to bodily function</el-button> <br /><sub>
            One or more chronic illnesses with severe exacerbation, progression, or side effects; Acute or chronic
            illnesses that pose a threat to life or bodily function</sub
          >
        </div>
        <div
          style="grid-column-start: 4; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid"
        ></div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          <el-button round size="mini">Drug therapy</el-button>
          <br /><sub>Requiring intensive monitoring for toxicity</sub>
        </div>

        <div
          style="
            grid-column-start: 2;
            grid-column-end: 3;
            font-size: 1rem;
            border: 1px solid #000;
            text-align: center;
            font-weight: bold;
          "
        >
          Problem points
        </div>
        <div
          style="
            grid-column-start: 3;
            grid-column-end: 4;
            font-size: 1rem;
            text-align: center;
            border: 1px solid;
            font-weight: bold;
          "
        >
          Data points
        </div>
        <div
          style="
            grid-column-start: 4;
            grid-column-end: 5;
            font-size: 1rem;
            text-align: center;
            border: 1px solid;
            font-weight: bold;
          "
        >
          Risk
        </div>
        <div
          style="
            grid-column-start: 5;
            grid-column-end: 6;
            font-size: 1rem;
            text-align: center;
            border: 1px solid;
            font-weight: bold;
          "
          @click="features.medDecisionMaking.summaryDisplay = !features.medDecisionMaking.summaryDisplay"
        >
          Complexity of decison making
        </div>

        <div
          style="grid-column-start: 2; grid-column-end: 3; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          0-1
        </div>
        <div :class="features.medDecisionMaking.dataPoints.points >= 0 ? 'notStrike' : 'strike'">0-1</div>
        <div style="grid-column-start: 4; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          Minimal
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          Straight forward
        </div>

        <div
          style="grid-column-start: 2; grid-column-end: 3; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          2
        </div>
        <div :class="features.medDecisionMaking.dataPoints.points >= 2 ? 'notStrike' : 'strike'">2</div>
        <div style="grid-column-start: 4; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          Low
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          Low
        </div>

        <div
          style="grid-column-start: 2; grid-column-end: 3; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          3
        </div>
        <div :class="features.medDecisionMaking.dataPoints.points >= 3 ? 'notStrike' : 'strike'">3</div>
        <div style="grid-column-start: 4; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          Moderate
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          Moderate
        </div>

        <div
          style="grid-column-start: 2; grid-column-end: 3; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          4
        </div>
        <div :class="features.medDecisionMaking.dataPoints.points >= 4 ? 'notStrike' : 'strike'">4</div>
        <div style="grid-column-start: 4; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          High
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          High
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
  computed: {
    dataPoints: function () {
      let points = 0
      points = points + (this.features.medDecisionMaking.dataPoints.reviewOrderClinical ? 1 : 0)

      points = points + (this.features.medDecisionMaking.dataPoints.reviewOrderRadiology ? 1 : 0)

      points = points + (this.features.medDecisionMaking.dataPoints.reviewOrderMedicine ? 1 : 0)
      points = points + (this.features.medDecisionMaking.dataPoints.discussionTestResults ? 1 : 0)
      points = points + (this.features.medDecisionMaking.dataPoints.decisionOldRecords ? 1 : 0)
      points = points + (this.features.medDecisionMaking.dataPoints.reviewOldRecords ? 2 : 0)
      points = points + (this.features.medDecisionMaking.dataPoints.independentTracing ? 2 : 0)

      this.features.medDecisionMaking.dataPoints.points = points
      return points
    },
  },
}
</script>
