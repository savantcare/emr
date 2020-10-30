<!-- Reference implementation for Mr1f (Multiple row 1 field) -->
<template>
  <div>
    <el-form>
      <el-form-item>
        <div v-for="(propFieldObj, id) in propFormDef.fieldsDef" :key="id">
          <el-col :span="propFieldObj.span">
            <!-- Field type 1: Do the following when it is auto-complete type field -->
            <el-autocomplete
              v-if="propFieldObj.fieldType === 'autocomplete'"
              v-model="searchKeyword"
              class="inline-input"
              :fetch-suggestions="propFieldObj.selectOptions"
              :placeholder="propFieldObj.fieldNameInUi"
              style="width: 100%"
              :highlight-first-item="true"
              @select="mfSetFldValueUsingCache($event.id, ormRow.clientSideUniqRowId, propFieldObj.fieldNameInDb)"
            ></el-autocomplete>

            <!-- Field type 2: Do the following when it is multi-select-with-buttons type field -->
            <div v-else-if="propFieldObj.fieldType === 'multi-select-with-buttons'">
              {{ propFieldObj.fieldNameInUi }}
              <div
                v-for="item in propFormDef.fnGetAllSelectOptionsAndSelectedForAField(propFieldObj.fieldNameInDb)"
                :key="item.id"
              >
                <el-button
                  :type="item.selected ? 'primary' : 'plain'"
                  @click="mfSetCopiedRowBeingChangedFldVal(item.id, propFieldObj.fieldNameInDb)"
                  >{{ item.value }}</el-button
                >
              </div>
            </div>

            <!-- Field type 3: Do the following when it is heading type field -->
            <div v-else-if="propFieldObj.fieldType === 'heading'">
              <h3>{{ propFieldObj.fieldNameInUi }}</h3>
            </div>

            <!-- Field type 4: Do the following when it is select type field -->
            <el-select
              v-else-if="propFieldObj.fieldType === 'select'"
              v-model="value"
              filterable
              :placeholder="propFieldObj.fieldNameInUi"
            >
              <el-option
                v-for="item in propFieldObj.selectOptions"
                :key="item.value"
                :label="item.label"
                :value="mfGetFldValue(ormRow.clientSideUniqRowId, propFieldObj.fieldNameInDb)"
                @input="mfSetFldValueUsingCache($event, ormRow.clientSideUniqRowId, propFieldObj.fieldNameInDb)"
              >
              </el-option>
            </el-select>

            <el-input
              v-else
              :ref="propFieldObj.fieldNameInDb"
              :type="propFieldObj.fieldType"
              :autosize="{ minRows: 2, maxNumberOfRows: 4 }"
              :value="mfGetCopiedRowBeingChangedFldVal(propFieldObj.fieldNameInDb)"
              @input="mfSetCopiedRowBeingChangedFldVal($event, propFieldObj.fieldNameInDb)"
            ></el-input>
          </el-col>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" plain @click="mfSendDataToServer">Reviewed</el-button>
      </el-form-item>
    </el-form>

    <!-- Goal: Show history of this row. Since this is a single field hence we are showing the history. If it was multiple fields then we do not show the history -->
    <el-timeline style="padding-inline-start: 20px">
      <el-timeline-item
        v-for="row in cfTimeLineDataAr"
        :key="row.ROW_START"
        :timestamp="row.createdAt"
        :type="row.type"
      >
        {{ row.description }}
        <!-- The following come on right of the description that comes in the timeline. 
        Since they are part of the same line we do not capitalize the first alphabet. So it is "sending to server"
        and it is not "Sending to server"
        -->
        <span v-if="row.vnRowStateInSession == 345" class="api-response-message el-button--warning"
          >sending to server</span
        >
        <span v-if="row.vnRowStateInSession == 34571" class="api-response-message el-button--success"
          >saved this session</span
        >
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import allClientTbls from '../all-client-tables.js'

export default {
  /*
    Q) Why is firstProp needed?
        There are many reminders when a reminder is to be changed there needs to be a way to find out which reminder
        the user wants to change.
        So firstProp is the remId being changed. The remId is the primary key coming from vuexOrm

    Q) Why is this called firstProp?
        This Ct is called in a for loop. In the same for loop other Ct are also called.
        So the prop name has to be generic and cannot be unique to each Ct

    Q) Why is firstprop not needed in 1r type Cts?
        Since we definitely know which row is being edited. I do not need to get a incoming ID.
        In 1r Cts the change form can be invoked directly. But for Mr change can only be invoked by clicking on an
        action button in the view layer. Since when action button in VL is clicked i get the ormID of that row

    Q) Why we are using 'formType' props?
        This change component has a method named 'mfManageFocus' and it is focusing a form field.
        Change component is also being used in multi change component. Over there this component is being iterated several times within a slider.
        The problem is 'mfManageFocus' method is also being called for each iteration and putting its own logic of focusing several times. This is causing the slider to now work.
        To prevent this malformation we are using 'formType' prop, passing 'embedded' string from multichange component and within 'mfManageFocus' method we are bypassing the entire
        logic if formType value is set to 'embedded'.

    Q) What are the diff possible values for formtype?
              1. stand-alone -> it has its own controls
              2. embedded -> that means it has its own submit and other controls. But the same page has other forms also
              3. sub-part-of-another-form -> Data input will be allowed but no action buttons like submit or reset
    */

  props: {
    firstProp: {
      type: Number,
    },
    formType: {
      type: String,
    },
    propFormDef: {
      type: Object,
      required: true,
      validator: function (obj) {
        // id and fields must be present
        if (obj.id) {
          if (obj.fieldsDef) {
            if (Object.keys(allClientTbls).includes(obj.id)) {
              return true
            }
          }
        }

        return false
      },
    },
  }, // firstProp is the ClientIdOfRowToChange

  data() {
    return {
      /* TODO: Why is UUID field needed here but not needed in case of weight */
      dnOrmUuidOfRowToChange: '',
      dnClientIdOfRowToChange: this.firstProp, // why not use this.firstProp everywhere? When submit is success this needs to get updated. Not advised to update prop inside Ct. Ref: https://vuejs.org/v2/guide/components-props.html#One-Way-Data-Flow
      dnClientIdOfCopiedRowBeingChanged: -1,
      /* Convention: -1 implies that the system is not ready to have a value. This happens when the DB is still getting loaded.
        null implies that system is ready for pClientIdOfCopiedRowBeingChangedNVal to have a value but does not have a value */
    }
  },
  computed: {
    cfTimeLineDataAr() {
      const timelineDataArray = []

      // TODO: timeline of UUID should be base class
      // Insight: to create timeline the uuid will be same but id will be different.
      const arFromClientTbl = allClientTbls[this.propFormDef.id]
        .query()
        .where('serverSideRowUuid', this.dnOrmUuidOfRowToChange)
        .orderBy('ROW_START', 'desc')
        .get()

      console.log('Time line for uuid', this.dnOrmUuidOfRowToChange, arFromClientTbl)
      if (arFromClientTbl.length) {
        let rowInTimeLine = []
        let date = ''
        for (let i = 0; i < arFromClientTbl.length; i++) {
          rowInTimeLine = {}
          rowInTimeLine.description = arFromClientTbl[i].description
          date = new Date(arFromClientTbl[i].ROW_START * 1000)
          rowInTimeLine.createdAt =
            date.toLocaleString('default', { month: 'long' }) + '-' + date.getDate() + '-' + date.getFullYear()
          if (
            arFromClientTbl[i].vnRowStateInSession === 3 ||
            arFromClientTbl[i].vnRowStateInSession === 34 ||
            arFromClientTbl[i].vnRowStateInSession === 3456
          ) {
            rowInTimeLine.type = 'warning' // row is being edited and is not on server
          } else {
            rowInTimeLine.type = ''
          }
          rowInTimeLine.ROW_START = arFromClientTbl[i].ROW_START
          rowInTimeLine.vnRowStateInSession = arFromClientTbl[i].vnRowStateInSession

          timelineDataArray.push(rowInTimeLine)
        }
      }
      return timelineDataArray
    },
  },

  watch: {
    firstProp: {
      immediate: true,
      handler(pNVal, pOVal) {
        // NVal => New value and OVal => Old Value. Not doing this in mounted since when click on C in 1st rem mounted gets called. When click on C in 2nd rem mounted does not get called.
        console.log(pNVal, pOVal)
        this.dnClientIdOfRowToChange = pNVal
        this.dnClientIdOfCopiedRowBeingChanged = null
      },
    },

    /* Goal: Create a copy of the row to be changed. If a copy is already there then find the id of the copied row.
    By the time this watchFn exits this.dnClientIdOfCopiedRowBeingChanged will have a valid value */
    dnClientIdOfCopiedRowBeingChanged: {
      immediate: true, // setting this calls this watch when the Ct is first initialized
      /*  In V1 getting id of copied row was part of mounted, that is sequential programming,
          In V2 getting id of copied row is part of watch, this is "act on state" programming.

          When called first time:
            pNVal = -1 since data section sets that value
            pOVal is undefined

          When called second time:
            pNVal = null since any other function that wants a new row being copied sets it to null
            pOVal is the old value of pNVal. Hence previous row that was being edited  */

      async handler(pNVal, pOVal) {
        // NVal => New value and OVal => Old Value
        if (this.dnClientIdOfRowToChange === -1) return // Firstprop has not copied itself to this.dnClientIdOfRowToChange. Look at data section.

        if (pNVal === null) {
          /* When called first time this.dnClientIdOfRowToChange is assigned in the data section
              When called 2nd time this.dnClientIdOfRowToChange is the previous row that just got saved. */
          const arOrmRowToChange = allClientTbls[this.propFormDef.id].find(this.dnClientIdOfRowToChange)
          this.dnOrmUuidOfRowToChange = arOrmRowToChange.serverSideRowUuid
          const vnExistingChangeRowId = allClientTbls[this.propFormDef.id].fnGetChangeRowIdInEditState(
            arOrmRowToChange.serverSideRowUuid
          ) // For a given UUID there can be only 1 row in edit state.
          if (vnExistingChangeRowId === false) {
            // Adding a new blank record. Since this is temporal DB. Why is row copied and then edited/changed? See line 176
            this.dnClientIdOfCopiedRowBeingChanged = await allClientTbls[
              this.propFormDef.id
            ].fnCopyRowAndGetCopiedRowId(arOrmRowToChange.clientSideUniqRowId)
          } else {
            this.dnClientIdOfCopiedRowBeingChanged = vnExistingChangeRowId
          }
        }
      },
    },
  },
  methods: {
    /* Why is the row copied and then edited/changed? We want to show the history of the data. If I edit/change the original data then I will not know what the original data to show below the edit/change form. */
    async mfCopyRowToOrm(pOrmRowToChange) {
      this.dnClientIdOfCopiedRowBeingChanged = await allClientTbls[this.propFormDef.id].fnCopyRowAndGetCopiedRowId(
        pOrmRowToChange.clientSideUniqRowId
      )
    },
    mfManageFocus() {
      // Ref: https://stackoverflow.com/questions/60291308/vue-js-this-refs-empty-due-to-v-if
      if (this.$refs.description && this.formType !== 'embedded') {
        const lastElement = this.$refs.description.length
        /* this "if" is needed since when there is only 1 element then description is not an array of objects.
         with a single form "description" is just an object. */
        if (!lastElement) {
          this.$refs.description.focus()
        } else {
          this.$refs.description[lastElement - 1].focus()
        }
      }
    },
    mfGetCopiedRowBeingChangedFldVal(pFldName) {
      /* When C is first clicked and the control comes here. This fn is called twice
         Why?
         It is a default browser behavior. Clicking on the <label> will trigger 2 clicks, one for <label> and one for <input>.
         Ref: https://stackoverflow.com/a/58724163

         This fn is fired once when the property is first defined with undefined value and then is fired twice when a value is assigned to it.

        Q) When to get from ORM and when from cache?
         Inside get desc. 1st time it comes from ORM from then on it always come from cache. The cache value is set by mfSetCopiedRowBeingChangedFldVal */
      // From this point on the state is same for change and add
      return allClientTbls[this.propFormDef.id].fnGetFldValue(this.dnClientIdOfCopiedRowBeingChanged, pFldName)
    },
    mfSetCopiedRowBeingChangedFldVal(pEvent, pFldName) {
      const rowStatus = 34
      allClientTbls[this.propFormDef.id].fnSetValueOfFld(
        pEvent,
        this.dnClientIdOfCopiedRowBeingChanged,
        pFldName,
        rowStatus
      )
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/framework/crud/manage-rows-of-table-in-client-side-orm.js:133/fnPutFldValueInCache
    },
    async mfSendDataToServer() {
      try {
        await allClientTbls[this.propFormDef.id].update({
          where: this.dnClientIdOfCopiedRowBeingChanged,
          data: {
            vnRowStateInSession: '345',
          },
        })

        /**
         * Send socket id to the server for update from socket
         */
        const socketClientObj = await clientTblOfCommonForAllComponents
          .query()
          .where(
            'fieldNameInDb',
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change'
          )
          .first()

        const response = await fetch(allClientTbls[this.propFormDef.id].apiUrl + '/' + this.dnOrmUuidOfRowToChange, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            // "Authorization": "Bearer " + TOKEN
          },
          body: JSON.stringify({
            description: this.mfGetCopiedRowBeingChangedFldVal(
              this.propFormDef.atLeastOneOfFieldsForCheckingIfRowIsEmpty[0]
            ),
            client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change:
              socketClientObj.fieldValue,
          }),
        })

        if (!response.ok) {
          /* Goal: Update the value of 'vnRowStateInSession' to success or failure depending on the api response */
          allClientTbls[this.propFormDef.id].update({
            where: this.dnClientIdOfCopiedRowBeingChanged,
            data: {
              vnRowStateInSession: 3458,
            },
          })
          console.log('Failed to update')
        } else {
          /* Goal: Update old version of the reminder's ROW_END to current timestamp if change is successful
            Edge case: Say id 2 is changed that created id 3. User then closes the change layer. The table now displays id 3. Now when user clicks change for id 3 firstProp is 3.
            dnClientIdOfRowToChange is = firstProp. So dnClientIdOfRowToChange is also 3. But 3 is the new changed row. And we want to set ROW_END for id 2 and not id 3
            How to update the ROW_END for id = 2?
              option 1: update that row that has state = "I am from DB" and UUID = UUID of current row
              option 2: This requires adding another state ->  "I am being changed" -> and then -> update that row that has state = "I am being changed" and UUID = UUID of current row
                        Option 2 is rejected. Since ID2 will now require update in following 3 cases:
                          1. When ID 3 is created it will require changing state of id 2.
                          2. Also when id3 is deleted without saving to DB.
                          3. Or ID 3 is saved to DB.

            Q): Why following where clause needed?
            A):
                Whenever we change a record and hit save button, we get two records in allClientTbls with the same uuid and old one needs to be marked as histry by updating ROW_END to current timestamp.
                In real time 3 cases may happen.
                  1. User changes an existing record. i.e. rowState = 1
                  2. User already changed a record and then again changes that record i.e. rowState = 34571
                  3. User adds a record and then changes that newly added record again i.e. rowState = 24571

            Following logic of where clause deals with these 3 types of cases.

            Q) What we have done to deal with the above mentioned problem?
            A)
                We are following below mentioned logic in where clause of allClientTbls update:
                -- The expression looks like: "exp A" && ("exp B1" || "exp B2" || "exp B3")
                  "exp A" -> search record from allClientTbls whose uuid = this.dnOrmUuidOfRowToChange
                  "exp B1" -> "vnRowStateInSession === 1",
                      allClientTbls record that came from database (Case: User changes an existing record)
                  "exp B2" -> "vnRowStateInSession === 34571",
                      allClientTbls record that once changed successfully ie: API Success and than going to be change again (Case: User already changed a record and then again changes that record)
                  "exp B3" -> "vnRowStateInSession === 24571",
                      allClientTbls record that once added successfully ie: API Success and than going to be change (Case: User adds a record and then changes that newly added record again)
         */
          await allClientTbls[this.propFormDef.id].update({
            where: (record) => {
              return (
                record.uuid === this.dnOrmUuidOfRowToChange &&
                (record.vnRowStateInSession === 1 /* Came from DB */ ||
                  record.vnRowStateInSession ===
                    34571 /* Created as copy on client -> Changed -> Requested save -> Send to server -> API Success */ ||
                  record.vnRowStateInSession ===
                    24571) /* New -> Changed -> Requested save -> Send to server -> API Success */
              )
            },
            data: {
              ROW_END: Math.floor(Date.now()),
            },
          })
          /* Goal: Update the value of 'vnRowStateInSession' to success or failure depending on the api response */
          allClientTbls[this.propFormDef.id].update({
            where: this.dnClientIdOfCopiedRowBeingChanged,
            data: {
              vnRowStateInSession: 34571,
            },
          })
          console.log('update success')
        }

        /*
            Goal:
            According to our change layer architecture, when i click to open change layer, a duplicate row (copy of row) inserted into allClientTbls and it displayed on the top of timeline.
            When change api request then we should need to insert a duplicate row (copy of row) again in allClientTbls for further change.
          */
        this.dnClientIdOfRowToChange = this.dnClientIdOfCopiedRowBeingChanged
        this.dnClientIdOfCopiedRowBeingChanged = null
        this.mfManageFocus()
      } catch (ex) {
        console.log('update error', ex)
      }
      console.log(
        'mfSendDataToServer-> ',
        this.dnOrmUuidOfRowToChange,
        this.mfGetCopiedRowBeingChangedFldVal(this.propFormDef.atLeastOneOfFieldsForCheckingIfRowIsEmpty[0])
      )
    },
  },
}
</script>

<style>
span.api-response-message {
  padding: 0px 8px 3px 8px;
  border-radius: 20px;
  font-size: 12px;
}
</style>
