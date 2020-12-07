<template>
  <div>
    <div class="depression-grid-container">
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Depressive mood</div>
      <div>
        <vue-slider class="slider" v-model="depressive" v-bind="depressionOptions">
          <template v-slot:tooltip="{ value, focus }">
            <span v-html="depressedTooltip(value, focus)" />
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Interest</div>
      <div>
        <vue-slider class="slider" v-model="interest" v-bind="depressionOptions">
          <template v-slot:tooltip="{ value, focus }">
            <span v-html="depressedTooltip(value, focus)" />
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Sleep</div>
      <div>
        <vue-slider class="slider" v-model="sleep" v-bind="depressionOptions">
          <template v-slot:tooltip="{ value, focus }">
            <span v-html="depressedTooltip(value, focus)" />
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Guilt</div>
      <div>
        <vue-slider class="slider" v-model="guilt" v-bind="depressionOptions">
          <template v-slot:tooltip="{ value, focus }">
            <span v-html="depressedTooltip(value, focus)" />
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Energy</div>
      <div>
        <vue-slider class="slider" v-model="energy" v-bind="depressionOptions">
          <template v-slot:tooltip="{ value, focus }">
            <span v-html="depressedTooltip(value, focus)" />
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Concentration</div>
      <div>
        <vue-slider class="slider" v-model="concentration" v-bind="depressionOptions">
          <template v-slot:tooltip="{ value, focus }">
            <span v-html="depressedTooltip(value, focus)" />
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Appetite</div>
      <div>
        <vue-slider class="slider" v-model="appetite" v-bind="depressionOptions">
          <template v-slot:tooltip="{ value, focus }">
            <span v-html="depressedTooltip(value, focus)" />
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Agitation</div>
      <div>
        <vue-slider class="slider" v-model="agitation" v-bind="depressionOptions">
          <template v-slot:tooltip="{ value, focus }">
            <span v-html="depressedTooltip(value, focus)" />
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Sucidal</div>
      <div>
        <vue-slider class="slider" v-model="suicidal" v-bind="depressionOptions">
          <template v-slot:tooltip="{ value, focus }">
            <span v-html="depressedTooltip(value, focus)" />
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Notes</div>
      <div style="grid-column: 20/26">
        <el-input :rows="7" type="textarea" v-model="depressionNotes" placeholder="Notes"></el-input>
      </div>
      <div style="grid-column: 1/26; text-align: center; font-weight: bold; background: #67c23a">Depression</div>
    </div>

    <!-- GW moood symptoms -->
    <br />
    <div class="gw-mood-grid-container">
      <div style="grid-column: 1/11; text-align: center; font-weight: bold; background: #67c23a">
        In past 10 days, how many days have you been? (For most of the day)
      </div>
      <div style="grid-column: 11/13; text-align: center; font-weight: bold"></div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Depressed?</div>
      <div>
        <vue-slider class="slider" v-model="gwMoodSymptoms.depressed" v-bind="moodSymptomOptions">
          <template v-slot:tooltip="{ value, focus }">
            <span v-html="gwMoodTooltip(value, focus)" />
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">
        Felt low interest or motivation?
      </div>
      <div>
        <vue-slider class="slider" v-model="gwMoodSymptoms.interest" v-bind="moodSymptomOptions">
          <template v-slot:tooltip="{ value, focus }">
            <span v-html="gwMoodTooltip(value, focus)" />
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Abnormally irritable?</div>
      <div>
        <vue-slider class="slider" v-model="gwMoodSymptoms.irritable" v-bind="moodSymptomOptions">
          <template v-slot:tooltip="{ value, focus }">
            <span v-html="gwMoodTooltip(value, focus)" />
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">
        Abnormally energetic or high energy?
      </div>
      <div>
        <vue-slider class="slider" v-model="gwMoodSymptoms.energetic" v-bind="moodSymptomOptions">
          <template v-slot:tooltip="{ value, focus }">
            <span v-html="gwMoodTooltip(value, focus)" />
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">
        Abnormal mood elevation?
      </div>
      <div>
        <vue-slider class="slider" v-model="gwMoodSymptoms.elevated" v-bind="moodSymptomOptions">
          <template v-slot:tooltip="{ value, focus }">
            <span v-html="gwMoodTooltip(value, focus)" />
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">
        How difficult to the above symptoms make your day to day life?
      </div>
      <div>
        <vue-slider class="slider" v-model="gwMoodSymptoms.dayToDay" v-bind="moodSymptomOptions">
          <template v-slot:tooltip="{ value, focus }">
            <span v-html="gwMoodTooltip(value, focus)" />
          </template>
        </vue-slider>
      </div>

      <div style="grid-column: 1/13; text-align: center; font-weight: bold; background: #67c23a">
        Gateway mood symptoms
      </div>
    </div>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/note-change/templates/add-form.vue'
import psychReviewOfSystemsOfAPatientTbl from '@/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'

import { psychReviewOfSystemFormDef } from '@/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: psychReviewOfSystemFormDef,
      depressionNotes: '',
      depressive: -1,
      interest: -1,
      sleep: -1,
      guilt: -1,
      energy: -1,
      concentration: -1,
      appetite: -1,
      agitation: -1,
      suicidal: -1,
      gwMoodSymptoms: {
        depressed: -1,
        interest: -1,
        irritable: -1,
        energetic: -1,
        elevated: -1,
        dayToDay: -1,
      },
      depressionOptions: {
        width: 'auto',
        height: 200,
        direction: 'btt',
        tooltip: 'always',
        marks: false,
        internal: 1,
        min: -1,
        max: 2,
      },
      moodSymptomOptions: {
        width: 'auto',
        height: 200,
        direction: 'btt',
        tooltip: 'always',
        marks: false,
        internal: 1,
        min: -1,
        max: 10,
      },
    }
  },
  created() {
    // Inside this fn 'this' will refer to this ct (parent) https://stackoverflow.com/questions/59826155/vue-callback-via-props-and-this
  },

  components: {
    ctAddForm,
  },
  methods: {
    depressedTooltip(value, focus) {
      if (value === -1)
        return '<div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center"> <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center; font-size: 0.8rem; color: rgb(144, 147, 153);">Not rated</div> </div>'
      else if (value === 0)
        return '<div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center"> <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center; font-size: 0.8rem; color: rgb(144, 147, 153);">Not present</div> </div>'
      else if (value === 1)
        return '<div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center"> <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center; font-size: 0.8rem; color: rgb(144, 147, 153);">Sub syndromal</div> </div>'
      else if (value === 2)
        return '<div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center"> <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center; font-size: 0.8rem; color: rgb(144, 147, 153);">Syndromal</div> </div>'
    },
    gwMoodTooltip(value, focus) {
      if (value === -1)
        return '<div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center"> <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center; font-size: 0.8rem; color: rgb(144, 147, 153);">Not rated</div> </div>'
      else return value
    },
  },
}
</script>

<style scoped>
.depression-grid-container {
  display: grid;
  grid-template-columns: repeat(25, 1fr);
}

.depression-grid-container > div {
  text-align: center;
  border-right: 1px solid rgb(175, 175, 175);
}

.gw-mood-grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

.gw-mood-grid-container > div {
  text-align: center;
  border-right: 1px solid rgb(175, 175, 175);
}

.container {
  position: fixed;
  top: 10px;
  right: 20px;
  width: 5px;
}

.slider {
  padding: 0 !important;
  margin: 7px 0;
}
</style>
