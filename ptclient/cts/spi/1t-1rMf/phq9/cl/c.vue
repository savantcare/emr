<!-- Master doc is at reference implementation name/vl/table.vue. This file has doc unique to this ct
Code synced with ref implementation on 7th august 2020
-->
<template>
  <div>
    <el-form>
      <el-form-item>
        <!-- 
        Q) Why we are using the vaPhq9QuestionFields variable data from  mixins component at line 80

        Ans) the vaPhq9QuestionFields is is required for both VL and CL components. 
        Due to this we fetched data from mixins component.
        Fetched all the fields with v-for loop and displayed in the template.

        Note: The question 10 has differeent radio button label and design pattern
        for this we have saperated the design using v-if="index === 9" at line 46
      -->

        <div v-for="(question, index) in vaPhq9QuestionFields" :key="index">
          <div v-if="index !== 9">
            <el-row v-if="index === 0">
              <strong>
                Over the last 2 weeks, how often have you been bothered by any of the following
                problems?
              </strong>
            </el-row>

            <el-row>
              <el-col :span="12">
                <div>{{ index + 1 }}. {{ question.label }}</div>
              </el-col>
              <el-col :span="12">
                <el-radio-group
                  :value="mfGetFieldNumericValue(question.name)"
                  @input="mfSetFldValueUsingCache($event, question.name)"
                >
                  <el-radio :label="0">Not at all</el-radio>
                  <el-radio :label="1">Several days</el-radio>
                  <el-radio :label="2">More then half the days</el-radio>
                  <el-radio :label="3">Nearly every day</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </div>

          <div v-if="index === 9">
            <el-row>
              <strong>{{ question.label }}</strong>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-radio-group
                  :value="mfGetFieldNumericValue(question.name)"
                  @input="mfSetFldValueUsingCache($event, question.name)"
                >
                  <el-radio :label="0">Not difficult at all</el-radio>
                  <el-radio :label="1">Somewhat difficult</el-radio>
                  <el-radio :label="2">Very difficult</el-radio>
                  <el-radio :label="3">Extremely difficult</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="cfHasSomeFieldChanged" type="success" plain @click="mfOnSubmit"
          >Submit</el-button
        >
        <el-button :disabled="cfHasSomeFieldChanged" type="danger" plain @click="mfOnResetForm"
          >Reset form</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-db-server-mixin'
import orm from '../db/orm-phq9.js'

export default {
  mixins: [mxFullSyncWithDbServer],

  data() {
    return {
      vnOrmIdOfRowToChange: -1,
      vnOrmIdOfCopiedRowBeingChanged: -1,
    }
  },
  computed: {
    cfHasSomeFieldChanged() {
      if (this.vnOrmIdOfCopiedRowBeingChanged === -1) return true
      if (this.vnOrmIdOfCopiedRowBeingChanged === null) return true

      const objFieldsComparisonResults = orm.fnIsDataFieldsOfRowSame(
        this.vnOrmIdOfRowToChange,
        this.vnOrmIdOfCopiedRowBeingChanged
      )

      if (objFieldsComparisonResults === true) {
        this.$root.$emit('event-from-ct-phq9-cl-copied-row-same')
      } else {
        objFieldsComparisonResults.vnOrmIdOfCopiedRowBeingChanged = this.vnOrmIdOfCopiedRowBeingChanged
        this.$root.$emit('event-from-ct-phq9-cl-copied-row-diff', objFieldsComparisonResults)
      }

      if (objFieldsComparisonResults === true) {
        return true
      } else {
        return false
      }
    },
  },
  watch: {
    vnOrmIdOfCopiedRowBeingChanged: {
      immediate: true,
      async handler(pOrmIdOfCopiedRowBeingChangedNVal, pOrmIdOfCopiedRowBeingChangedOVal) {
        if (this.vnOrmIdOfRowToChange === -1) return
        if (pOrmIdOfCopiedRowBeingChangedNVal === null) {
          const arFromOrm = orm.find(this.vnOrmIdOfRowToChange)
          const vnExistingChangeRowId = orm.fnGetChangeRowIdInEditState(arFromOrm.uuid)
          if (vnExistingChangeRowId === false) {
            this.vnOrmIdOfCopiedRowBeingChanged = await orm.fnCopyRow(arFromOrm.id)
          } else {
            this.vnOrmIdOfCopiedRowBeingChanged = vnExistingChangeRowId
          }
        }
      },
    },
  },

  async created() {
    if (orm.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb()
    }
    const arFromOrm = orm.fnGetRowsToChange('littleInterestOrPleasureInDoingThings')
    this.vnOrmIdOfRowToChange = arFromOrm[0].id
    this.vnOrmIdOfCopiedRowBeingChanged = null
  },

  mounted() {
    this.$root.$on('event-from-ct-phq9-vl-save-this-row', (pRowID) => {
      this.vnOrmIdOfCopiedRowBeingChanged = pRowID
      this.mfOnSubmit()
    })
    this.$root.$on('event-from-ct-phq9-vl-reset-this-form', () => {
      this.mfOnResetForm()
    })
  },
  methods: {
    async mfOnSubmit() {
      const rowToUpsert = orm.find(this.vnOrmIdOfCopiedRowBeingChanged)
      const response = await fetch(orm.apiUrl + '/' + rowToUpsert.uuid, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          // "Authorization": "Bearer " + TOKEN
        },
        body: JSON.stringify({
          uuid: rowToUpsert.uuid,
          littleInterestOrPleasureInDoingThings: rowToUpsert.littleInterestOrPleasureInDoingThings,
          feelingDownDepressedOrHopeless: rowToUpsert.feelingDownDepressedOrHopeless,
          troubleFallingOrStayingAsleep: rowToUpsert.troubleFallingOrStayingAsleep,
          feelingTiredOrHavingLittleEnergy: rowToUpsert.feelingTiredOrHavingLittleEnergy,
          poorAppetiteOrOvereating: rowToUpsert.poorAppetiteOrOvereating,
          feelingBadAboutYourself: rowToUpsert.feelingBadAboutYourself,
          troubleConcentratingOnThings: rowToUpsert.troubleConcentratingOnThings,
          movingOrSpeakingSoSlowly: rowToUpsert.movingOrSpeakingSoSlowly,
          thoughtsThatYouWouldBeBetterOffDead: rowToUpsert.thoughtsThatYouWouldBeBetterOffDead,
          ifYouCheckedOffAnyProblems: rowToUpsert.ifYouCheckedOffAnyProblems,
        }),
      })
      if (response.status === 200) {
        await orm.update({
          where: (record) => {
            return (
              record.uuid === rowToUpsert.uuid &&
              (record.vnRowStateInSession === 1 ||
                record.vnRowStateInSession === 34571 ||
                record.vnRowStateInSession === 24571)
            )
          },
          data: {
            ROW_END: Math.floor(Date.now() / 1000),
          },
        })

        orm.update({
          where: this.vnOrmIdOfCopiedRowBeingChanged,
          data: {
            vnRowStateInSession: 34571,
          },
        })
        this.vnOrmIdOfRowToChange = this.vnOrmIdOfCopiedRowBeingChanged
        this.vnOrmIdOfCopiedRowBeingChanged = null
      }
    },
    mfOnResetForm() {
      orm.fnDeleteChangeRowsInEditState()

      this.vnOrmIdOfCopiedRowBeingChanged = null

      orm.arOrmRowsCached = []
    },

    mfGetFldValue(pFldName) {
      const value = orm.fnGetFldValue(this.vnOrmIdOfCopiedRowBeingChanged, pFldName)
      return value
    },
    mfGetFieldNumericValue(pFieldName) {
      /**
       * For String data type, the el-radio-group will not show the previous data
       * fetched from DB as the label has numeric value
       * due to this fetched the field's numeric value
       */
      const value = orm.fnGetFldValue(this.vnOrmIdOfCopiedRowBeingChanged, pFieldName)
      console.log(value, this.vnOrmIdOfCopiedRowBeingChanged, pFieldName)
      return parseInt(value)
    },
    mfSetFldValueUsingCache(pEvent, pFldName) {
      const rowStatus = 34
      orm.fnSetFldValue(pEvent, this.vnOrmIdOfCopiedRowBeingChanged, pFldName, rowStatus)
      this.$forceUpdate()
    },
  },
}
</script>
