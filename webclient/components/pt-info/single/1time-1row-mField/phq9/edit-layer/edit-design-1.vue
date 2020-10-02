<template>
  <div>
    <el-input placeholder="Filter text" v-model="userTypedKeyword" />
    <!-- 
        Q) Why there is separate section for question 10
        Ans) The question 10 has differeent radio button label and design pattern
        for this we have separated the design using v-if="index === 9" at line 39
    -->
    <div
      v-for="(objQuestion, index) in cfGetMasterListOfPhq9"
      :key="index"
      style="margin-top: 20px"
    >
      <div v-if="index !== 9">
        <el-row v-if="index === 0">
          <strong>
            Over the last 2 weeks, how often have you been bothered by any of the following
            problems?
          </strong>
        </el-row>
        <br />
        <el-row>
          <div>{{ index + 1 }}. {{ objQuestion.phq9QuestionFullText }}</div>
          <br />
          <el-radio-group
            :value="mfGetAnswerValueFromClientSideTblPatient(objQuestion)"
            @input="
              mfSetAnswerValueInClientSideTblPatient($event, objQuestion.phq9QuestionMasterId)
            "
          >
            <el-radio-button :label="0" border>Not at all</el-radio-button>
            <el-radio-button :label="1" border>Several days</el-radio-button>
            <el-radio-button :label="2" border>More then half the days</el-radio-button>
            <el-radio-button :label="3" border>Nearly every day</el-radio-button>
          </el-radio-group>
        </el-row>
      </div>

      <div v-if="index === 9">
        <el-row>
          <strong>{{ objQuestion.phq9QuestionFullText }}</strong>
          <br />
          <br />
          <el-radio-group
            :value="mfGetAnswerValueFromClientSideTblPatient(objQuestion)"
            @input="
              mfSetAnswerValueInClientSideTblPatient($event, objQuestion.phq9QuestionMasterId)
            "
          >
            <el-radio-button :label="0">Not difficult at all</el-radio-button>
            <el-radio-button :label="1">Somewhat difficult</el-radio-button>
            <el-radio-button :label="2">Very difficult</el-radio-button>
            <el-radio-button :label="3">Extremely difficult</el-radio-button>
          </el-radio-group>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import clientSideTblOfMasterPhq9 from '../db/client-side/structure/master-table-of-phq9.js'
import clientSideTblOfPatientPhq9 from '../db/client-side/structure/patient-table-of-phq9.js'
export default {
  data() {
    return {
      userTypedKeyword: '',
    }
  },
  computed: {
    cfGetMasterListOfPhq9() {
      let arOfObjectsFromClientSideMasterDB = clientSideTblOfMasterPhq9
        .query()
        .with('tblPhq9ForPatientLink')
        .where('ROW_END', 2147483647.999999)
        .where((_record, query) => {
          query.where('phq9QuestionFullText', (value) =>
            value.toLowerCase().includes(this.userTypedKeyword.toLowerCase())
          )
        })
        .get()
      console.log(arOfObjectsFromClientSideMasterDB)
      return arOfObjectsFromClientSideMasterDB
    },
  },
  methods: {
    mfGetAnswerValueFromClientSideTblPatient(pObjQuestion) {
      // console.log(pObjQuestion)
      if (pObjQuestion.tblPhq9ForPatientLink) {
        if (pObjQuestion.tblPhq9ForPatientLink.ROW_END === 2147483647.999999) {
          return parseInt(pObjQuestion.tblPhq9ForPatientLink.optionValueChosenByPatient)
        }
      }
      return null
    },
    mfSetAnswerValueInClientSideTblPatient(pEvent, pQuestionMasterId) {
      const exists = clientSideTblOfPatientPhq9
        .query()
        .where('phq9QuestionMasterId', pQuestionMasterId)
        .where('ROW_END', 2147483647.999999)
        .get()
      console.log(exists)
      if (exists.length > 0) {
        clientSideTblOfPatientPhq9.update({
          where: exists[0].clientSideUniqRowId,
          data: {
            optionValueChosenByPatient: pEvent,
          },
        })
      } else {
        clientSideTblOfPatientPhq9.insert({
          data: {
            optionValueChosenByPatient: pEvent,
            phq9QuestionMasterId: pQuestionMasterId,
          },
        })
      }
    },
  },
}
</script>

<style>
.sc-phq9-all-content-body {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* Some other grid-template-columns options are :
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(auto-fit, max(200px)); compared to minmax(200px, 1fr) there is more magin between cols and less content fits.
  */
  grid-gap: 1px;
  grid-auto-flow: row; /* This is default value */
  margin: 1px;
}
.el-radio-group label span {
  margin-right: 10px;
  border-left: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>
