<template>
  <div>
    <div class="display-grid-container">
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Depressive mood</div>
      <div>
        <vue-slider class="slider" v-model="depressive" v-bind="options">
          <template v-slot:tooltip="{ value, focus }">
            <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center; font-size: 0.8rem">
              {{ mf(value, focus) }}
            </div>
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Interest</div>
      <div>
        <vue-slider class="slider" v-model="interest" v-bind="options">
          <template v-slot:tooltip="{ value, focus }">
            <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">
              {{ mf(value, focus) }}
            </div>
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Sleep</div>
      <div>
        <vue-slider class="slider" v-model="sleep" v-bind="options">
          <template v-slot:tooltip="{ value, focus }">
            <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">
              {{ mf(value, focus) }}
            </div>
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Guilt</div>
      <div>
        <vue-slider class="slider" v-model="guilt" v-bind="options">
          <template v-slot:tooltip="{ value, focus }">
            <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">
              {{ mf(value, focus) }}
            </div>
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Energy</div>
      <div>
        <vue-slider class="slider" v-model="energy" v-bind="options">
          <template v-slot:tooltip="{ value, focus }">
            <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">
              {{ mf(value, focus) }}
            </div>
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Concentration</div>
      <div>
        <vue-slider class="slider" v-model="concentration" v-bind="options">
          <template v-slot:tooltip="{ value, focus }">
            <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">
              {{ mf(value, focus) }}
            </div>
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Appetite</div>
      <div>
        <vue-slider class="slider" v-model="appetite" v-bind="options">
          <template v-slot:tooltip="{ value, focus }">
            <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">
              {{ mf(value, focus) }}
            </div>
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Agitation</div>
      <div>
        <vue-slider class="slider" v-model="agitation" v-bind="options">
          <template v-slot:tooltip="{ value, focus }">
            <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">
              {{ mf(value, focus) }}
            </div>
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Sucidal</div>
      <div>
        <vue-slider class="slider" v-model="suicidal" v-bind="options">
          <template v-slot:tooltip="{ value, focus }">
            <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">
              {{ mf(value, focus) }}
            </div>
          </template>
        </vue-slider>
      </div>
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center">Notes</div>
      <div style="grid-column: 20/26">
        <el-input type="textarea" v-model="depressionNotes" placeholder="Notes"></el-input>
      </div>
      <div style="grid-column: 1/26; text-align: center; font-weight: bold">Depression</div>
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
      options: {
        width: 'auto',
        height: 200,
        direction: 'btt',
        tooltip: 'always',
        marks: false,
        internal: 1,
        min: -1,
        max: 2,
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
    mf(value, focus) {
      if (value === -1) return 'not rated'
      else if (value === 0) return 'Not present'
      else if (value === 1) return 'Sub syndromal'
      else if (value === 2) return 'Syndromal'
    },
  },
}
</script>

<style scoped>
.display-grid-container {
  display: grid;
  grid-template-columns: repeat(25, 1fr);
}

.display-grid-container > div {
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
