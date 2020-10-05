<template>
  <el-row :gutter="12">
    <el-form ref="form" label-position="top">
      <el-form-item>
        <h4>Patient health questionnaire</h4>

        <el-table :data="questionData" style="width: 100%">
          <el-table-column
            prop="question"
            label="Over the last 2 weeks, how often have you been bothered by any of the following problems?"
            :min-width="350"
          >
          </el-table-column>

          <el-table-column prop="option1" label="Not at all" width="170">
            <template slot-scope="scope">
              <el-radio v-model="scope.row.selectedAnswer" :label="0"></el-radio>
            </template>
          </el-table-column>

          <el-table-column prop="option2" label="Several days" width="170">
            <template slot-scope="scope">
              <el-radio v-model="scope.row.selectedAnswer" :label="1"></el-radio>
            </template>
          </el-table-column>

          <el-table-column prop="option3" label="More than half the days" width="170">
            <template slot-scope="scope">
              <el-radio v-model="scope.row.selectedAnswer" :label="2"></el-radio>
            </template>
          </el-table-column>

          <el-table-column prop="option4" label="Nearly every day" width="170">
            <template slot-scope="scope">
              <el-radio v-model="scope.row.selectedAnswer" :label="3"></el-radio>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <!-- @change="updateAnswer(scope.$index, scope.row)" -->

      <el-form-item class="other-qstn">
        <br />
        <span
          ><b
            >If you checked off any problems, how difficult have these problems made it for you to
            do your work, take care of things at home, or get along with other people?</b
          ></span
        >
        <br />
        <el-radio-group v-model="question10">
          <el-radio :label="0">Not difficult at all</el-radio>
          <el-radio :label="1">Somewhat difficult</el-radio>
          <el-radio :label="2">Very difficult</el-radio>
          <el-radio :label="3">Extremely difficult</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item class="qstn-submit">
        <el-button type="success" size="small" @click="submitForm()">Reviewed</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      screenForm: '',
      updateFlag: false,
      radio: 3,
      question10: null,
      questionData: [
        {
          id: 1,
          selectedAnswer: null,
          question: '1. Little interest or pleasure in doing things...',
          option1: '0',
          option2: '1',
          option3: '2',
          option4: '3',
        },
        {
          id: 2,
          selectedAnswer: null,
          question: '2. Feeling down, depressed, or hopeless...',
          option1: '0',
          option2: '1',
          option3: '2',
          option4: '3',
        },
        {
          id: 3,
          selectedAnswer: null,
          question: '3. Trouble falling or staying asleep, or sleeping too much...',
          option1: '0',
          option2: '1',
          option3: '2',
          option4: '3',
        },
        {
          id: 4,
          selectedAnswer: null,
          question: '4. Feeling tired or having little energy...',
          option1: '0',
          option2: '1',
          option3: '2',
          option4: '3',
        },
        {
          id: 5,
          selectedAnswer: null,
          question: '5. Poor appetite or overeating...',
          option1: '0',
          option2: '1',
          option3: '2',
          option4: '3',
        },
        {
          id: 6,
          selectedAnswer: null,
          question:
            '6. Feeling bad about yourself - or that you are a failure or have let yourself or your family down',
          option1: '0',
          option2: '1',
          option3: '2',
          option4: '3',
        },
        {
          id: 7,
          selectedAnswer: null,
          question:
            '7. Trouble concentrating on things, such as reading the newspaper or watching television',
          option1: '0',
          option2: '1',
          option3: '2',
          option4: '3',
        },
        {
          id: 8,
          selectedAnswer: null,
          question:
            '8. Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual',
          option1: '0',
          option2: '1',
          option3: '2',
          option4: '3',
        },
        {
          id: 9,
          selectedAnswer: null,
          question:
            '9. Thoughts that you would be better off dead or of hurting yourself in some way',
          option1: '0',
          option2: '1',
          option3: '2',
          option4: '3',
        },
      ],
      value: '',
      tabIndex: 2,
      form: {
        desc: 'screening1',
        when: '',
      },
      dialogVisible: true,
      dynamicValidateForm: {
        domains: [
          {
            key: 1,
            value: '',
          },
        ],
      },
    }
  },
  computed: {
    getUserId() {
      return this.$store.state.userId
    },
    userScreenAnswerDetail() {
      return this.$store.state.screening.screenPHQ9AnswerDetail
    },
  },
  mounted() {
    // This is a lifecycle hook. Other lifecycle hooks are created, updated etc. Ref: https://vuejs.org/v2/api/#Options-Lifecycle-Hooks

    const params = {
      patientUUID: this.$route.query.patient_id,
      screentype: 'PHQ9',
      notify: this.$notify,
    }
    this.$store.dispatch('getScreeningDetail', params)
    // console.log(this.$store.state);

    const dbLastScreenAnswerDetail = this.$store.state.screening.screenPHQ9AnswerDetail
    // console.log(Object.keys(dbLastScreenAnswerDetail).length)
    if (Object.keys(dbLastScreenAnswerDetail).length > 0) {
      this.updateFlag = true
      this.question10 =
        dbLastScreenAnswerDetail.question10 == null
          ? null
          : parseInt(dbLastScreenAnswerDetail.question10)
      this.questionData.forEach((row) => {
        const key = 'question' + row.id
        row.selectedAnswer =
          dbLastScreenAnswerDetail[key] == null ? null : parseInt(dbLastScreenAnswerDetail[key])
      })
    }

    // 'Bipolar' 'Schizophrenia' 'Anxiety (GAD-7)' 'ADHD' 'Substance Abuse' 'Alcoholism screening'
    // 'Depression' 'Schizophrenia' 'PTSD' 'Substance Abuse' 'PTSD' 'Drug Use'
  },
  methods: {
    updateAnswer(index, row) {
      console.log(index, row.selectedAnswer)
    },
    onReviewed() {
      console.log('submit!')
    },
    async submitForm() {
      // submit screeniggn answer screen

      // let apptDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
      const screenDetailData = {}

      // create screen data rowSet
      // responseUUID: uniqid(),
      screenDetailData.patientUUID = this.$route.query.patient_id
      screenDetailData.recordChangedByUuid = this.getUserId
      screenDetailData.recordChangedFromIPAddress = ''
      screenDetailData.question10 = this.question10 == null ? null : String(this.question10)

      this.questionData.forEach((row) => {
        const key = 'question' + row.id
        screenDetailData[key] = row.selectedAnswer == null ? null : String(row.selectedAnswer)
      })

      console.log(screenDetailData)

      // let aaa = JSON.parse(JSON.stringify(screenDetailData));

      // console.log(aaa);
      await this.$store.dispatch('storeScreeningDetail', {
        data: [screenDetailData],
        notify: this.$notify,
        patientUUID: this.$route.query.patient_id,
        updateFlag: this.updateFlag,
        screentype: 'PHQ9',
        // date: apptDate
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
