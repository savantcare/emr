<template>
  <div :style="_formDef.styleForBoxInPaperTypeView">
    <!-- Goal: Save space. This is Paper view layer. Here the goal is to see the whole note at 1 glance.
    Hence only print a seperate row for heding when needed.

    Following are the cases when a seperate row for heading is not needed.
    If there is only 1 possible row and 1 possible field then no need to show a seperate line for header
    The format for such data will be "Child complaint: Sleep"
    Without the following if statement the format was becoming
    Child complaint
    Sleep

    Explanation of v-if
    !_formDef.maxNumberOfTemporallyValidRows || _formDef.maxNumberOfTemporallyValidRows > 1
    First is checking if Ct has defined _formDef.maxNumberOfTemporallyValidRows. For ct that has not defined this property in the object the heading will come.
    If 1st check fails the heding will come if 2nd check passes.

    There are ptDataTbl like MentalStatusExam that have many fields. For thos I need to show the heading "Mental status exam"
    -->

    <div
      v-if="currentApptObj['apptStatus'] === 'unlocked'"
      style="text-align: left; cursor: pointer; color: #409EFF; border-bottom:1px solid #ebeef5;padding-bottom: 2px;"
      tabIndex="0"
      why1="This div has tabindex since any HTML element other than link and form control is a non focusable element. Eg: <span>, <div>, <span>, <img etc."
      why2="Value of tabindeex is 0 - this is a light touch approach, I am using the built in property of the browser for the navigation to get control. The sequence of focus travel is same as sequence of rendering html."
      why3="Suppose user focusses this div by pressing tab. Once here on pressing entering I want the same behavior as click"
      @keyup.enter="heading_clicked_so_set_up_state(_formDef.id)" @click="heading_clicked_so_set_up_state(_formDef.id)"
    >
      <b :id="'content_heading_' + _formDef.id">{{ _formDef.plural.charAt(0).toUpperCase() + _formDef.plural.slice(1) }} </b>
      <span v-if="contentApptDate !== ''" class="content_appt_date">(Appt date: {{ contentApptDate | moment }})</span> <b>:</b>
      <!--<span v-if="dblIsSavedNotification" style="color: #67c23a;font-weight: bold;font-size: 0.77rem;">Saved successfully</span>-->
    </div>
    <div
      v-else
      style="text-align: left; cursor: pointer; color: #409EFF;border-bottom:1px solid #ebeef5;padding-bottom: 2px;"
      tabIndex="0"
      why1="This div has tabindex since any HTML element other than link and form control is a non focusable element. Eg: <span>, <div>, <span>, <img etc."
      why2="Value of tabindeex is 0 - this is a light touch approach, I am using the built in property of the browser for the navigation to get control. The sequence of focus travel is same as sequence of rendering html."
      why3="Suppose user focusses this div by pressing tab. Once here on pressing entering I want the same behavior as click"
    >
      <el-popover title="Add addendum" placement="right" width="400" v-model="isAddendumPopoverVisible">
        <div style="text-align: right; margin: 0">
          <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
          <!-- Amendment icon -->
          <el-button
            v-if="amendmentData.length > 0"
            type="success"
            icon="el-icon-check"
            style="position: absolute; bottom: 15px; right: 15px"
            size="mini"
            @click="mfSaveAddendum(amendmentData, _formDef.id)"
            circle
          ></el-button>
        </div>
        <b :id="'content_heading_' + _formDef.id" slot="reference">{{ _formDef.plural.charAt(0).toUpperCase() + _formDef.plural.slice(1) }} 
          <span v-if="contentApptDate !== ''" class="content_appt_date">(Appt date: {{ contentApptDate | moment }})</span> <b>:</b>
        </b>
        
      </el-popover>
    </div>
    <!-- Section 2/2: This starts after the header ends -->

    <div :style="cfGetDataRowStyle" class="app" style="position:relative;">
      <!-- This is for each data row -->
      <!-- Design:

        Goal 1: Each data row is made into a grid with 3 columns
          How? display: grid; grid-template-columns: 1fr 1fr 1fr

        Goal 2: Between columns there is some space
          How? style="grid-column-gap: 1rem

        Goal 3: If 1st and 2nd field has no value then 3rd field should be in 1st col and not in 3rd col
          Solution 1:
          How? grid-template-columns: min-content 1fr;
          With 1fr you're telling the second col to consume any and all free space available in the row. Hence, when there is no content in the .first element, the .second element takes the space.
          Ref: https://stackoverflow.com/a/50709699

          Solution 2:
          div for id="each-field-of-data-row" has a if statement. So this div does not get generated if this field does not have content.
          v-if="row[_fieldDef.nameInDb].toString().length > 0"


        Goal 4: Each time a heading type field comes go to the next row   (Not working)
          Ref: https://stackoverflow.com/a/47077596

        Goal 5: Each row should have a gap of 1 rem
          How? grid-row-gap: 1rem;              //not working
        -->

      <!-- This is to loop on fields. Since some rows may have 1 and other rows may have 4 fields
         Using ternary operator for style since some components may not define _formDef.ctrlPlacementOfEveryFieldsNameAndValueInViewNote and for those Ct I want to use default value
         Each appt gets a slide of its own         -->

      <el-button @click="mfArrowClickedLetUsGoToTargetContent(previousSlideNumber, 'prev')" class="el-icon-arrow-left" style="padding: 0; border: none;font-size: 1.5rem;position:absolute;left:-5px;background: transparent;top: 9%;" :style="previousSlideNumber >= 0 ? 'color: rgb(64, 158, 255);font-weight: bold;' : 'color: rgb(222 225 232);font-weight: normal;'"></el-button>

      <ul class="hs full no-scrollbar container-for-all-appointments" :id="'container-for-all-appointments_' + _formDef.id">
        <div class="item" v-if="cf_get_entity_value_during_each_appt.length == 0" style="background:#fff"> No Data found </div>
        <section v-for="(objAppt, index) in cf_get_entity_value_during_each_appt" :key="index">
          <li class="item" :id="'container-for-one-appointment_' + _formDef.id + '_' + index">
            <!--<div v-if="objAppt.apptStatus === 'locked'">
              Appt date: {{ objAppt.apptStartMilliSecsOnCalendar | moment }}
            </div>-->
            <div
              id="container-to-ctrl-placement-of-every-row-in-view-note"
              :style="
                _formDef.ctrlPlacementOfEveryRowInViewNote
                  ? _formDef.ctrlPlacementOfEveryRowInViewNote
                  : 'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr 1fr; grid-column-gap: 1rem'
              "
            >
              <div
                id="container-for-all-rows-of-one-appointment"
                v-for="dataRow in objAppt[_formDef.id]"
                :key="dataRow.clientSideUniqRowId"
              >
                <getRowContent
                  :_dataRow="dataRow"
                  :_formDef="_formDef"
                  :_ApptStatus="objAppt['apptStatus']"
                  :_apptStartMilliSecsOnCalendar="objAppt['apptStartMilliSecsOnCalendar']"
                />
                <!-- end of each-row-of-entity -->
              </div>
            </div>
            <div
              v-if="
                cfArOfAddendumForDisplay[objAppt.clientSideUniqRowId] &&
                cfArOfAddendumForDisplay[objAppt.clientSideUniqRowId].length > 0
              "
              style="
                width: calc(100% - 10px * 2);
                padding: 0px;
                margin: 0px;
                display: grid;
                grid-template-columns: 1fr 3fr;
                grid-column-gap: 1rem;
              "
            >
              <div><h4>Addendum:</h4></div>
              <div
                v-for="dataRow in cfArOfAddendumForDisplay[objAppt.clientSideUniqRowId]"
                :key="dataRow.clientSideUniqRowId"
              >
                <div style="margin: 5px 0">
                  {{ dataRow.description }}
                  <br />
                  <span style="font-size: 0.625rem"
                    >Added by {{ dataRow.addedBy }} at {{ dataRow.ROW_START | moment }}</span
                  >
                </div>
              </div>
            </div>
          </li>
          <!-- end of actions of each row -->
        </section>
      </ul>

      <el-button @click="mfArrowClickedLetUsGoToTargetContent(nextSlideNumber, 'next')" class="el-icon-arrow-right" style="padding: 0; border: none;font-size: 1.5rem;position:absolute;right:0px;background: transparent;top: 9%;" :style="nextSlideNumber < cf_get_entity_value_during_each_appt.length ? 'color: rgb(64, 158, 255);font-weight: bold;' : 'color: rgb(222 225 232);font-weight: normal;'"></el-button>

    </div>
  </div>
</template>

<script>
import clientTblOfAddendums from '~/components/patient-data/amendment/db/client-side/structure/amendment-client-side-table.js'
import clientTblOfAppointments from '@/components/patient-data/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientTblOfLeftSideViewComponents from '@/components/papers/view-appt-note/lhs-split-area/db/client-side/structure/left-hand-side-table-of-components.js'

import clInvokeMixin from '@/components//papers/view-appt-note/templates/cl-invoke-mixin.js'

import moment from 'moment'

import allPatientDataTbls from '@/components/non-temporal/form-manager/all-client-tables.js'
import { rowState } from '@/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'
import getRowContent from './seq5-show-content-for-a-single-appt.vue'
import commonForAllCts from '@/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

import {scroller} from '@/node_modules/vue-scrollto/src/scrollTo'

export default {
  data() {
    return {
      currentApptObj: {},
      amendmentData: '',
      isAddendumPopoverVisible: false,
      currentSlideNumber: 0,
      previousSlideNumber: -1,
      nextSlideNumber: 1,
      dblIsSavedNotification: false,
      contentApptDate: '',
      options: {
        responsive: [
          { end: 576, size: 1 },
          { start: 576, end: 768, size: 1 },
          { start: 768, end: 992, size: 1 },
          { size: 1 },
        ],
        list: {
          // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
          windowed: 900,

          /**
           * Q: Why I am assigning container width to be 556px?
           * -- Here is my calculation:
           *  A4 page width = 17cm
              A4 page left+right padding 0.5cm+0.5cm = 1cm
              Remaining space for page content = 17cm - 1cm = 16cm

              Convert 16cm to pixel:
              Ref: https://www.convert-measurement-units.com/conversion-calculator.php?type=font-size
              16cm = 604px

              Slider previous and next icons width = 24px+24px = 48px
              Remaining width for slider content =
              604px (Remaining space for page content in px) - 48px (Slider previous and next icons width) = 556px
           */
          container: 556,
          // Because: #app {padding: 80px 24px;}
          padding: 4,
        },
        item: {
          padding: 4,
        },
      },
      items: [],
    }
  },
  components: { getRowContent },
  mixins: [clInvokeMixin],

  filters: {
    moment: function (date) {
      return moment(date).format("MMM Do 'YY, h:mm a")
    },
  },
  props: {
    _apptId: {
      type: Number,
      required: true,
    },
    _formDef: {
      type: Object,
      required: true,
    },
  },
  async mounted() {
    if (!this._apptId === 0) {
      return
    }
    this.currentApptObj = await clientTblOfAppointments.find(this._apptId)

    const eventName = 'event-to-set-notification-for-save'
    this.$root.$on(eventName, (pEntity) => {
      if(pEntity === this._formDef.id){
        this.dblIsSavedNotification = true

        let thisDocument = this
        setTimeout(function(){
          thisDocument.dblIsSavedNotification = false
        }, 3000, thisDocument);
      }
    })
  },
  computed: {
    cfGetDataRowStyle() {
      /* When I come to this fn the following scenarios are possible
        clientTblOfLeftSideViewComponents(2) has 2 fields F1. firstParameterGivenToComponentBeforeMounting F2. secondParameterGivenToComponentBeforeMounting
        Possibilities are 1. Both have values 2. Only 1 has value.
        First goal: Find if _apptId is same as F1 or F2. If _apptId == F2 then it is comparison mode. If _apptId != F2 then for certain I can say _apptId == F1. _apptId may or many not be comparison mode.
        if there is value in F2 then _apptId is in comparison mode. If F2 is empty then this is single note render mode.
      */

      let secondaryDuringComparisonApptObj = {}
      let secondaryDuringComparisonDataRows = {}

      const printableApptNoteComponentCardObj = clientTblOfLeftSideViewComponents.find(2)

      if (!printableApptNoteComponentCardObj) return

      // Goal: Find if current ID matches with firstParam or secondParam. It has to match with one of those 2
      if (printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting'] === this._apptId) {
        // Handle the case when the current ID matches with the second param Need to compare with first
        secondaryDuringComparisonApptObj = clientTblOfAppointments.find(
          printableApptNoteComponentCardObj['firstParameterGivenToComponentBeforeMounting']
        )
        secondaryDuringComparisonDataRows = this.mfGetArOfDataRows(secondaryDuringComparisonApptObj)
        if (secondaryDuringComparisonDataRows.length > this.cfGetArOfDataRows.length) {
          return 'border:1px solid #E6A23C'
        } else if (secondaryDuringComparisonDataRows.length < this.cfGetArOfDataRows.length) {
          return 'border:1px solid #67C23A'
        } else {
          // I come here when the length of both rows is same, Now there are 2 possibilities 1. Content is same 2. Content is different.
          return ''
        }
      } else {
        //
        // Case when this appt is not the 2nd param so it is the first param
        //

        // there may or may not be a second paramters. If no second parameter then there is no comparison to be made
        if (printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting']) {
          // Need to compare with second
          secondaryDuringComparisonApptObj = clientTblOfAppointments.find(
            printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting']
          )

          secondaryDuringComparisonDataRows = this.mfGetArOfDataRows(secondaryDuringComparisonApptObj)
          if (secondaryDuringComparisonDataRows.length > this.cfGetArOfDataRows.length) {
            return 'border:1px solid #E6A23C'
          } else if (secondaryDuringComparisonDataRows.length < this.cfGetArOfDataRows.length) {
            return 'border:1px solid #67C23A'
          } else {
            return
          }
        }
      }
      // Nothing to compare with
    },
    cfArOfAddendumForDisplay() {
      const arFromClientTblOfAddendums = clientTblOfAddendums
        .query()
        .where('component', this._formDef.id)
        .orderBy('ROW_START', 'asc')
        .get()

      let arOfAddendumForDisplay = []
      for (let j = 0; j < arFromClientTblOfAddendums.length; j++) {
        if (typeof arOfAddendumForDisplay[arFromClientTblOfAddendums[j].appointmentId] === 'undefined') {
          arOfAddendumForDisplay[arFromClientTblOfAddendums[j].appointmentId] = []
        }
        arOfAddendumForDisplay[arFromClientTblOfAddendums[j].appointmentId].push(arFromClientTblOfAddendums[j])
      }
      return arOfAddendumForDisplay
    },
    cf_get_entity_value_during_each_appt() {
      const arOfAppts = clientTblOfAppointments.query().get()
      let i = arOfAppts.length

      while (i--) {
        // remove those entries where its empty
        const rows = this.mfGetArOfDataRows(arOfAppts[i])

        //debugger
        if (rows.length > 0) {
          arOfAppts[i][this._formDef.id] = rows
        } else {
          arOfAppts.splice(i, 1)
        }
      }

      for (let j = 0; j < arOfAppts.length; j++) {
        if (arOfAppts[j].clientSideUniqRowId === this._apptId) {
          this.currentSlideNumber = j
          this.previousSlideNumber = j - 1
          this.nextSlideNumber = j + 1

        /**
         * Why we added 'scroller' instead of 'scrollTo'?
         * Using the default 'scrollTo' methods allows for only one scroll action at a time for performance reasons.
         * scroller factory use directly and create multiple instances and allows multiple scroll action simultaneously at a time.
         * Ref: https://www.npmjs.com/package/vue-scrollto#simultaneous-scrolling
         */

          const objScrollTo = scroller()
          setTimeout(() => {
            const element = document.getElementById('container-for-one-appointment_' + this._formDef.id + '_' + j)
            //element.style.backgroundColor = 'transparent'
            const container = '#container-for-all-appointments_' + this._formDef.id
            objScrollTo(element, 100, {
              container: container,
              x: true,
              y: false,
            })
          }, 200)
        } 
        /*else {
          setTimeout(() => {
            const element = document.getElementById('container-for-one-appointment_' + this._formDef.id + '_' + j)
            element.style.backgroundColor = ''
          }, 200)
        }*/
      }

      return arOfAppts
    },
    cfGetArOfDataRows() {
      const pApptObj = this.currentApptObj
      const emptyArray = []

      if (!pApptObj) {
        // returning empty array and not null. Since others deprend on the length of the array. If I return null there will be errors when length of that is calculated.
        return emptyArray
      }
      if (!pApptObj['apptStatus']) {
        return emptyArray
      }

      let arOfObjectsFromClientDB = []

      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientDB = allPatientDataTbls[this._formDef.id].fnGetPresentUniqueUuidNotEmptyRows(
          this._formDef.atLeastOneOfFieldsForCheckingIfRowIsEmpty
        )
      } else {
        /* for locked appts*/
        arOfObjectsFromClientDB = allPatientDataTbls[this._formDef.id]
          .query()
          .where('ROW_END', (value) => value > pApptObj['ROW_END']) // Row was locked after the appt was locked. hence row was valid during the appt
          .where('ROW_START', (value) => value < pApptObj['ROW_END']) // Row was created before the appt was locked.
          .get()
      }
      return arOfObjectsFromClientDB
    },
  },
  methods: {
    heading_clicked_so_set_up_state(pFormDefId) {
      const updateState = commonForAllCts.insertOrUpdate({
        data: [{ fieldName: 'form-def-id-for-change-in-vertical-tabs', fieldValue: pFormDefId }],
      })
    },
    mfArrowClickedLetUsGoToTargetContent(slideNumber, direction) {
      const arOfAppts = this.cf_get_entity_value_during_each_appt
      if(slideNumber < 0 && direction == 'prev') return
      if(slideNumber >= arOfAppts.length && direction == 'next') return

      const objScrollTo = scroller()
      setTimeout(() => {
        const element = document.getElementById('container-for-one-appointment_' + this._formDef.id + '_' + slideNumber)
        const container = '#container-for-all-appointments_' + this._formDef.id
        objScrollTo(element, 500, {
          container: container,
          x: true,
          y: false,
        })

        const contentHeadingElement = document.getElementById('content_heading_' + this._formDef.id)
        if(this.currentSlideNumber > slideNumber){
          element.style.backgroundColor = 'rgba(238, 238, 238, 1)'
          contentHeadingElement.style.color = '#666'
        } 
        else if(this.currentSlideNumber < slideNumber){
          element.style.backgroundColor = 'rgba(64, 158, 255, 0.1)'
          contentHeadingElement.style.color = ''
        }
        else {
          element.style.backgroundColor = '#fff'
          contentHeadingElement.style.color = ''
        }

        if(this.currentSlideNumber == slideNumber){
          this.contentApptDate = ''
        } else {
          this.contentApptDate = arOfAppts[slideNumber].apptStartMilliSecsOnCalendar
        }
      }, 200)

      this.previousSlideNumber = slideNumber - 1
      this.nextSlideNumber = slideNumber + 1
    },
    mfGetArOfDataRows(pApptObj) {
      const emptyArray = []

      if (!pApptObj) {
        // returning empty array and not null. Since others deprend on the length of the array. If I return null there will be errors when length of that is calculated.
        return emptyArray
      }
      if (!pApptObj['apptStatus']) {
        return emptyArray
      }

      let arOfObjectsFromClientDB = []

      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientDB = allPatientDataTbls[this._formDef.id].fnGetPresentUniqueUuidNotEmptyRows(
          this._formDef.atLeastOneOfFieldsForCheckingIfRowIsEmpty
        )
      } else {
        /* for locked appts*/
        arOfObjectsFromClientDB = allPatientDataTbls[this._formDef.id]
          .query()
          .where('ROW_END', (value) => value > pApptObj['ROW_END']) // Row was locked after the appt was locked. hence row was valid during the appt
          .where('ROW_START', (value) => value < pApptObj['ROW_END']) // Row was created before the appt was locked.
          .where('vnRowStateInSession', rowState.SameAsDB)
          .orderBy('ROW_START', 'asc')
          .get()

        const uniqueUuidRows = []
        for (let i = 0; i < arOfObjectsFromClientDB.length; i++) {
          let foundInArToReturn = false
          for (let j = 0; j < uniqueUuidRows.length; j++) {
            if (arOfObjectsFromClientDB[i].serverSideRowUuid === uniqueUuidRows[j].serverSideRowUuid) {
              uniqueUuidRows[j] = arOfObjectsFromClientDB[i]
              foundInArToReturn = true
            }
          }
          if (foundInArToReturn) {
          } else {
            uniqueUuidRows.push(arOfObjectsFromClientDB[i])
          }
        }

        return uniqueUuidRows
      }
      return arOfObjectsFromClientDB
    },
    log(item) {
      console.log(item)
    },
    mfOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'multi edit reminders',
      })
    },
    mfOpenAddInEditLayer() {
      const term = 'add ' + this._formDef.id
      // console.log(term)
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: term,
      })
    },
    mfSaveAddendum(pAddendumData, component) {
      clientTblOfAddendums.insert({
        data: {
          appointmentId: this.currentApptObj.clientSideUniqRowId,
          component: component,
          description: pAddendumData,
          ROW_START: Math.floor(Date.now()),
        },
      })

      // remove modal value after save
      this.amendmentData = ''
      this.isAddendumPopoverVisible = false // close popup automatically after amendment saved successfully
    },
  },
}
</script>

<style scoped>
.header3:hover .el-button-group {
  display: inline-block !important;
  position: absolute; /* This makes sure there is no jumping when mouse is taken over the icon */
}

h3 {
  /*  border-bottom: 1px solid #dcdfe6; */
  margin-top: 1rem;
  width: 100%;
  float: none;
  display: flex;
}

/* ref:
How to let user see past easily?

Current choice:
  https://codepen.io/vikaskedia/pen/XWjrvZW
  Features?
  1. First view has only one card with a indication that there are more cards.
  2. Card height and width are not fixed. So they change based on content.
  3. In the same timeline different cards can have different hieghts.
  4. When only one single line of content box is thin.

  Not working:
  1. Current slide has 1 line of contnet. Previous slide has 20 lines of content. The width is taken as per the previous slide.


Software that were compared:
1. https://github.com/fuxingloh/vue-horizontal-list
2. https://codeburst.io/how-to-create-horizontal-scrolling-containers-d8069651e9c6
    https://codepen.io/colinlord/pen/oZNoOO
3. https://uxdesign.cc/creating-horizontal-scrolling-containers-the-right-way-css-grid-c256f64fc585
    https://codepen.io/dannievinther/pen/vVydZJ

Designs not being used:
http://jsfiddle.net/rnwa4fv5/
https://stackoverflow.com/questions/41522938/scrolling-on-x-axis-in-a-div-with-overflow
http://jsfiddle.net/kf1y2npw/30/
*/

.app {
  padding: 0px 0;
  display: grid;
  grid-gap: 20px 0;
  grid-template-columns: 20px 1fr 20px;
  align-content: start;
}

/*.app {
  overflow-y: scroll;
}*/

.app > * {
  grid-column: 1 / -1;
}

.app > .full {
  grid-column: 1 / -1;
}

.hs {
  display: grid;
  grid-gap: calc(20px / 2);
  grid-template-columns: 10px;

  grid-auto-flow: column;
  grid-auto-columns: 100%;

  overflow-x: scroll;
  scroll-snap-type: x proximity;
  padding-bottom: calc(0.75 * 20px);
  margin-bottom: calc(-0.25 * 20px);
}

.hs:before,
.hs:after {
  content: '';
  width: 10px;
}
.hs > li,
.item {
  scroll-snap-align: center;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  /*background: rgba(64, 158, 255,0.08);*/
  background: #fff;
  /*border-radius: 8px;
  border-width: 1px;
  border-color: #ebeef5;
  border-style: solid;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);*/
}
.no-scrollbar {
  scrollbar-width: none;
  margin-bottom: 0;
  padding-bottom: 0;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
ul.container-for-all-appointments {
  padding: 0;
}
div#container-for-all-rows-of-one-appointment {
    margin-bottom: 3px;
}
span.content_appt_date {
    color: #888;
    font-size: 0.77rem;
    font-weight: 400;
}
</style>
