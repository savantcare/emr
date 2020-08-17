<!-- Reference implementation -->
<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          ref="description"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          :value="mfGetCopiedRowFldValue('description')"
          @input="mfSetCopiedRowFldValueUsingCache($event, 'description')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" plain @click="mfSendDataToServer"
          >Submit firstprop is {{ this.firstProp }}</el-button
        >
      </el-form-item>
    </el-form>

    <!-- Goal: show history of this row
    Since this is a single field hence we are showing the history. 
    If it was multiple fields then we do not show the history
     -->
    <el-timeline style="padding-inline-start: 20px;">
      <el-timeline-item
        v-for="row in cfTimeLineDataAr"
        :key="row.ROW_START"
        :timestamp="row.createdAt"
        :type="row.type"
      >
        {{ row.description }}
        <!-- The following come on right of the description that comes in the timeline 
        Since they are part of the same line we do not capitalize the first alphabet. So it is "sending to server"
        and it is not "Sending to server"
        -->
        <span v-if="row.vnRowStateInSession == 345" class="api-response-message el-button--warning"
          >sending to server</span
        >
        <span
          v-if="row.vnRowStateInSession == 34571"
          class="api-response-message el-button--success"
          >saved this session</span
        >
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import objOrm from '../db/vuex-orm/orm.js'
export default {
  /* 
    Q) Why is firstProp needed?
        There are many reminders when a reminder is to be changed there needs to be a way to find out which reminder 
        the user wants to change.
        So firstProp is the remID being changed. The remID is the primary key coming from vuexOrm
    
    Q) Why is this called firstProp
        This Ct is called in a for loop. In the same for loop other Ct are also called.
        So the param name has to be generic and cannot be unique to each Ct
    
    Q) Why is firstprop not needed in 1r type Cts?
        Since we definitely know which row is being edited. I do not need to get a incoming ID.
        In 1r Cts the change form can be invoked directly. But for Mr change can only be invoked by clicking on an 
        action button in the view layer.

    Q) Why we are using 'formType' props?
        This change component has a method named 'mfManageFocus' and it is focusing a form field. 
        Change component is also being used in multi change component. Over there this component is being iterated several times within a slider. 
        The problem is 'mfManageFocus' method is also being called for each iteration and putting its own logic of focusing several times. This is causing the slider malformed. 
        To prevent this malformation we are using 'formType' prop, passing 'mc' string from multichange component and within 'mfManageFocus' method we are bypassing the entire 
        logic if formType value is set to 'mc'.

    Q) What are the diff possible values for formtype?
              1. stand-alone -> it has its own controls
              2. embedded -> that means it has its own submit and other controls. But the same page has other forms also
              3. sub-part-of-another-form -> Data input will be allowed but no action buttons like submit or reset
    */

  props: ['firstProp', 'formType'],
  data() {
    return {
      /* Why is UUID field needed here but not needed in case of weight */
      OrmUuidOfRowToChange: '',
      vnOrmIdOfRowToChange: 0,
      vnOrmIdOfCopiedRowBeingChanged: 0,
    }
  },
  computed: {
    cfRowInEditStateOnClient() {
      return objOrm.fnGetAllChangeRowsInEditState()
    },
    cfTimeLineDataAr() {
      const timelineDataArray = []

      // Insight: to create timeline the uuid will be same but id will be different.
      const arFromOrm = objOrm
        .query()
        .where('uuid', this.OrmUuidOfRowToChange)
        .orderBy('ROW_START', 'desc')
        .get()
      // console.log('Time line for uuid', this.OrmUuidOfRowToChange)
      if (arFromOrm.length) {
        let rowInTimeLine = []
        let date = ''
        for (let i = 0; i < arFromOrm.length; i++) {
          rowInTimeLine = {}
          rowInTimeLine.description = arFromOrm[i].description
          date = new Date(arFromOrm[i].ROW_START * 1000)
          rowInTimeLine.createdAt =
            date.toLocaleString('default', { month: 'long' }) +
            '-' +
            date.getDate() +
            '-' +
            date.getFullYear()
          if (
            arFromOrm[i].vnRowStateInSession === 3 ||
            arFromOrm[i].vnRowStateInSession === 34 ||
            arFromOrm[i].vnRowStateInSession === 3456
          ) {
            rowInTimeLine.type = 'warning' // row is being edited and is not on server
          } else {
            rowInTimeLine.type = ''
          }
          rowInTimeLine.ROW_START = arFromOrm[i].ROW_START
          rowInTimeLine.vnRowStateInSession = arFromOrm[i].vnRowStateInSession

          timelineDataArray.push(rowInTimeLine)
        }
      }
      return timelineDataArray
    },
  },
  mounted() {},
  methods: {
    /* Why is the row copied and then edited/changed?
     We want to show the history of the data. If I edit/change the original data then I will
     not know what the original data to show below the edit/change form.
     */
    async mfCopyRowToOrm(pDesc) {
      /* There is already a function in rowManage class that does this.
       */
      const arFromOrm = await objOrm.insert({
        data: {
          description: pDesc,
          uuid: this.OrmUuidOfRowToChange,
          vnRowStateInSession: 3, // For meaning of diff values read rem/db/vuex-orm/rems.js:71
          ROW_START: Math.floor(Date.now() / 1000), // Ref: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
          // ROW_END: already has a default value inside vuex-orm/orm.js
        },
      })
      this.vnOrmIdOfCopiedRowBeingChanged = arFromOrm.rem[0].id
      this.mfManageFocus()
    },
    mfManageFocus() {
      // Ref: https://stackoverflow.com/questions/60291308/vue-js-this-refs-empty-due-to-v-if
      if (this.$refs.description && this.formType !== 'embedded') {
        const lastElement = this.$refs.description.length
        // this if is needed since when there is only 1 element then description is not an array of objects.
        // with a single form remdesc is just an object.
        if (!lastElement) {
          this.$refs.description.focus()
        } else {
          this.$refs.description[lastElement - 1].focus()
        }
      }
    },
    mfGetCopiedRowFldValue(pFldName) {
      /*
        Q) Why is this called twice when this page is loaded?
         When C is first clicked and the control comes here. This fn is called twice
         Since following console.log is written twice.
         If I remove :value="mfGetCopiedRowFldValue()" then this fn is called 0 times

         Why?
         It is a default browser behavior. Clicking on the <label> will trigger 2 clicks, one for <label> and one for <input>.
         Ref: https://stackoverflow.com/a/58724163

         This fn is fired once when the property is first defined with undefined value and then is fired twice when a value is assigned to it.

        Q) When to get from ORM and when from cache?
         Inside get desc. 1st time it comes from ORM from then on it always come from cache. The cache value is set by setRemDesc

        Q) What are the states for the paramters supplied to this Ct?
                 1. Repeat invocatoion => 1.1 no unsaved data 1.2 there is unsaved data
                 2. First time invocation => 2.1 no unsaved data 2.2 there is unsaved data

        Q) What are the different times this function is called?
          1. User types multiple keystrokes. This fn is called for each keystroke
          2. User click C from the table. Uses esc key to closes the tab and then again clicks C
          3. User click C from table clicks cross to exit the tab and then again click C

          1st click on C -> 1 fti / 1 ri
                      each keystroke -> ri 2 times
                                                    close tab by clicking outside modal ->
                                                                                then click same C -> NO  fti / ri
                                                                                then click different C -> 1 fti / 1 ri
                                                    close tab by clicking cross -> then click same C -> -> 1 fti / 1 ri
        */

      // Goal: decide if it is repeat or first invocation

      /*
          TODO: Instead of sequential programming make it act on state like in name Ct.
      */

      let arOrmRowToChange = []
      if (this.vnOrmIdOfRowToChange === this.firstProp) {
        // this is repeat invocation
        // If 5 times this Ct is invoked then there are 5 different instances of this Ct in the memory
        // Inferences: 1. this.OrmUuidOfRowToChange is already existing 2. New empty row where the user can type is already existing
        this.mfManageFocus()
      } else {
        // Inference: This is first time in this Ct lifetimes that it has been called with this parameter
        // firstProp is the OrmID of the row that the user wants to change.
        this.vnOrmIdOfRowToChange = this.firstProp
        arOrmRowToChange = objOrm.find(this.firstProp)
        this.OrmUuidOfRowToChange = arOrmRowToChange.uuid
        /* Find if there is unsaved data for this.OrmUuidOfRowToChange
          In an alternative design if I sent the ormID then that Fn will need to first find the OrmUuid associated with that orm.id and
          then run a query if a record with same uuid (there might be 100's) had a row status indicating change.
        */
        const ormIdOfCopiedRowBeingChanged = objOrm.fnGetChangeRowIdInEditState(
          this.OrmUuidOfRowToChange
        )
        if (ormIdOfCopiedRowBeingChanged === false) {
          // Adding a new blank record. Since this is temporal DB
          this.mfCopyRowToOrm(arOrmRowToChange[pFldName])
          this.mfManageFocus()
        } else {
          this.vnOrmIdOfCopiedRowBeingChanged = ormIdOfCopiedRowBeingChanged
        }
      }

      // From this point on the state is same for change and add
      return objOrm.fnGetFldValue(this.vnOrmIdOfCopiedRowBeingChanged, pFldName)
    },
    mfSetCopiedRowFldValueUsingCache(pEvent, pFldName) {
      const rowStatus = 34
      objOrm.fnSetFldValue(pEvent, this.vnOrmIdOfCopiedRowBeingChanged, pFldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/fnPutFldValueInCache
    },

    async mfSendDataToServer() {
      try {
        const ormRowIdToSendToServer = this.vnOrmIdOfCopiedRowBeingChanged
        await objOrm.update({
          where: ormRowIdToSendToServer,
          data: {
            vnRowStateInSession: '345',
          },
        })

        /*
            Goal:
            According to our change layer architecture, when i click to open change layer, a duplicate row (copy of row) inserted into objOrm and it displayed on the top of timeline.
            When change api request then we should need to insert a duplicate row (copy of row) again in objOrm for further change.
          */
        const description = this.mfGetCopiedRowFldValue()
        this.mfCopyRowToOrm(description)

        const response = await fetch(objOrm.apiUrl + '/' + this.OrmUuidOfRowToChange, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            // "Authorization": "Bearer " + TOKEN
          },
          body: JSON.stringify({
            description: this.mfGetCopiedRowFldValue(),
          }),
        })
        if (!response.ok) {
          /* Goal: Update the value of 'vnRowStateInSession' to success or failure depending on the api response */
          objOrm.update({
            where: ormRowIdToSendToServer,
            data: {
              vnRowStateInSession: 3458,
            },
          })
          console.log('Failed to update')
        } else {
          /* Goal: Update old version of the reminder's ROW_END to current timestamp if change is successful 
            Edge case: Say id 2 is changed that created id 3. User then closes the change layer. The table now displays id 3. Now when user clicks change for id 3 firstProp is 3.
            vnOrmIdOfRowToChange is = firstProp. So vnOrmIdOfRowToChange is also 3. But 3 is the new changed row. And we want to set ROW_END for id 2 and not id 3
            How to update the ROW_END for id = 2?
              option 1: update that row that has state = "I am from DB" and UUID = UUID of current row
              option 2: This requires adding another state ->  "I am being changed" -> and then -> update that row that has state = "I am being changed" and UUID = UUID of current row
                        Option 2 is rejected. Since ID2 will now require update in following 3 cases:
                          1. When ID 3 is created it will require changing state of id 2. 
                          2. Also when id3 is deleted without saving to DB. 
                          3. Or ID 3 is saved to DB. 

          */

          /*
            Q): Why following where clause needed?
            A): 
                Whenever we change a record and hit save button, we get two records in objOrm with the same uuid and old one needs to be marked as histry by updating ROW_END to current timestamp. 
                In real time 3 cases may happen. 
                  1. User changes an existing record. i.e. rowState = 1
                  2. User already changed a record and then again changes that record i.e. rowState = 34571
                  3. User adds a record and then changes that newly added record again i.e. rowState = 24571

            Following logic of where clause deals with these 3 types of cases.

            Q) What we have done to deal with the above mentioned problem?
            A)
                We are following below mentioned logic in where clause of objOrm update:
                -- The expression looks like: "exp A" && ("exp B1" || "exp B2" || "exp B3")
                  "exp A" -> search record from objOrm whose uuid = this.OrmUuidOfRowToChange
                  "exp B1" -> "vnRowStateInSession === 1",
                      objOrm record that came from database (Case: User changes an existing record)
                  "exp B2" -> "vnRowStateInSession === 34571", 
                      objOrm record that once changed successfully ie: API Success and than going to be change again (Case: User already changed a record and then again changes that record) 
                  "exp B3" -> "vnRowStateInSession === 24571", 
                      objOrm record that once added successfully ie: API Success and than going to be change (Case: User adds a record and then changes that newly added record again)
         */
          await objOrm.update({
            where: (record) => {
              return (
                record.uuid === this.OrmUuidOfRowToChange &&
                (record.vnRowStateInSession === 1 /* Came from DB */ ||
                record.vnRowStateInSession ===
                  34571 /* Created as copy on client -> Changed -> Requested save -> Send to server -> API Success */ ||
                  record.vnRowStateInSession ===
                    24571) /* New -> Changed -> Requested save -> Send to server -> API Success */
              )
            },
            data: {
              ROW_END: Math.floor(Date.now() / 1000),
            },
          })

          /* Goal: Update the value of 'vnRowStateInSession' to success or failure depending on the api response */
          objOrm.update({
            where: ormRowIdToSendToServer,
            data: {
              vnRowStateInSession: 34571,
            },
          })

          console.log('update success')
        }
      } catch (ex) {
        console.log('update error', ex)
      }

      console.log('mfSendDataToServer-> ', this.OrmUuidOfRowToChange, this.mfGetCopiedRowFldValue())
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
