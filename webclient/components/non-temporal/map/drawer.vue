<!-- Params
      Goal: Do not show the shadow so doctor can read the view layer.
            modal=false means -> Do now show shadowing layer

     How to see table in drawer?
        https://element.eleme.io/#/en-US/component/drawer       

     modal = false means esc key will not work.   
     modal = true means 1. esc key will work. 2. Background will have grey ovrelay and becomes hard to read.
  -->
<template>
  <el-drawer
    title="Map"
    :with-header="false"
    :visible="cfMapDrawerVisibility"
    direction="ttb"
    :before-close="handleClose"
    :modal="false"
    :close-on-press-escape="true"
    :show-close="false"
    custom-class="map-drawer"
    size="90%"
  >
    <!-- <img
      src="https://github.com/DataV-Team/DataV/blob/master/demoImg/construction-data.jpg?raw=true"
    />-->
    <el-row :gutter="10">
      <el-col :md="4">
        <div class="small-grid-content">
          <el-row>
            <el-col>
              <div class="map-grid-content reccomendation">
                <el-card class="box-card" shadow="hover">
                  <div class="clearfix header">
                    <span>Reccomendation</span>
                  </div>
                  <div
                    v-for="(rec, index) in arRecData"
                    :key="rec.id"
                    class="map-item-row"
                    :class="{ 'odd-row': index % 2 === 1, 'even-row': index % 2 === 0 }"
                    :title="rec.label"
                  >{{ rec.label }}</div>
                </el-card>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="map-grid-content goal">
                <el-card class="box-card" shadow="hover">
                  <div class="clearfix header">
                    <span>Goal</span>
                  </div>
                  <div
                    v-for="(g, index) in arGData"
                    :key="g.id"
                    class="map-item-row"
                    :class="{ 'odd-row': index % 2 === 1, 'even-row': index % 2 === 0 }"
                    :title="g.label + ' [Rating: ' + g.rating + ']'"
                  >{{ g.label }}</div>
                </el-card>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="map-grid-content body-measurement">
                <el-card class="box-card" shadow="hover">
                  <div class="clearfix header">
                    <span>Vital</span>
                  </div>
                  <div
                    v-for="(bm, index) in cfArOfVitalSignForDisplayInMapDrawer"
                    :key="bm.id"
                    class="map-item-row"
                    :class="{ 'odd-row': index % 2 === 1, 'even-row': index % 2 === 0 }"
                  >
                    <el-row>
                      <el-col :span="18">
                        <div class>{{ bm.label }}</div>
                      </el-col>
                      <el-col :span="6">
                        <div class>{{ bm.value }}</div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :md="4">
        <div class="small-grid-content">
          <el-row>
            <el-col>
              <div class="map-grid-content medication">
                <el-card class="box-card" shadow="hover">
                  <div class="clearfix header">
                    <span>Medication</span>
                  </div>
                  <div style="padding-top: 2px">
                    <el-tabs :tab-position="'top'" style="font-size: 0.75rem">
                      <el-tab-pane
                        v-for="eachMed in arMedData"
                        :key="eachMed.name"
                        :label="eachMed.label"
                      >
                        <!-- <el-row>
                          <el-col :span="7"><div class="med-table-header">Name</div></el-col>
                          <el-col :span="3"><div class="med-table-header">Quantity</div></el-col>
                          <el-col :span="3"><div class="med-table-header">#Refill</div></el-col>
                          <el-col :span="7">
                            <div class="med-table-header">Direction to patient</div>
                          </el-col>
                          <el-col :span="4"><div class="med-table-header">Status</div></el-col>
                        </el-row>-->
                        <el-row
                          v-for="(med, index) in eachMed.medsInfo"
                          :key="med.medId"
                          class="map-item-row"
                          :class="{ 'odd-row': index % 2 === 1, 'even-row': index % 2 === 0 }"
                        >
                          <el-col :span="24">
                            <div
                              class="med-name"
                              :title="med.medName + ' [ Quantity : ' + med.quantity + ']'"
                            >{{ med.medName }}</div>
                          </el-col>
                          <!-- <el-col :span="3">
                            <div class="med-quant">{{ med.quantity }}</div>
                          </el-col>
                          <el-col :span="3">
                            <div class="med-refill">{{ med.refill }}</div>
                          </el-col>
                          <el-col :span="7">
                            <div class="med-direction" :title="med.directionToPatient">
                              {{ med.directionToPatient }}
                            </div>
                          </el-col>
                          <el-col :span="4">
                            <div class="med-status" :title="med.status">{{ med.status }}</div>
                          </el-col>-->
                        </el-row>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="map-grid-content reminders">
                <el-card class="box-card" shadow="hover">
                  <div class="clearfix header">
                    <span>Reminders</span>
                  </div>
                  <div
                    v-for="(rem, index) in cfArOfRemForDisplayInMapDrawer"
                    :key="rem.clientSideUniqRowId"
                    class="map-item-row"
                    :class="{ 'odd-row': index % 2 === 1, 'even-row': index % 2 === 0 }"
                    :title="rem.description"
                  >{{ rem.description }}</div>
                </el-card>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="map-grid-content diagnosis">
                <el-card class="box-card" shadow="hover">
                  <div class="clearfix header">
                    <span>Diagnosis</span>
                  </div>
                  <el-tree
                    class="map-tree-item"
                    :data="arDxData"
                    :props="obDxDataTreeProps"
                    default-expand-all
                  ></el-tree>
                </el-card>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="map-grid-content allergies">
                <el-card class="box-card" shadow="hover">
                  <div class="clearfix header">
                    <span>Allergies</span>
                  </div>
                  <div
                    v-for="(allergy, index) in arAllergiesData"
                    :key="allergy.id"
                    class="map-item-row"
                    :class="{ 'odd-row': index % 2 === 1, 'even-row': index % 2 === 0 }"
                    :title="allergy.allergen + ' [Reaction: ' + allergy.reactions + ']'"
                  >{{ allergy.allergen }}</div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :md="8">
        <div class="large-grid-content">
          <el-row>
            <el-col>
              <div class="map-grid-content examination">
                <el-card class="box-card" shadow="hover">
                  <div class="clearfix header">
                    <span>Examination</span>
                  </div>
                  <div style="padding-top: 2px">
                    <el-tabs :tab-position="'left'" style="height: 200px; font-size: 0.75rem">
                      <el-tab-pane
                        v-for="eachExamination in arExaminationData"
                        :key="eachExamination.name"
                        :label="eachExamination.label"
                      >
                        <div v-if="eachExamination.selectedValues.length > 0">
                          <div
                            v-for="(value, index) in eachExamination.selectedValues"
                            :key="index"
                          >{{ value }}</div>
                        </div>
                        <div v-else>No data found</div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="map-grid-content pros">
                <el-card class="box-card" shadow="hover">
                  <div class="clearfix header">
                    <span>Psych Review of Systems</span>
                  </div>
                  <div style="padding-top: 2px">
                    <el-tabs :tab-position="'left'" style="height: 200px; font-size: 0.75rem">
                      <el-tab-pane
                        v-for="eachPros in arProsData"
                        :key="eachPros.name"
                        :label="eachPros.label"
                      >
                        <div v-if="eachPros.questionAnswers.length > 0">
                          <div
                            v-for="(qnaItem, index) in eachPros.questionAnswers"
                            :key="index"
                            class="pros-row"
                            :class="{ 'odd-row': index % 2 === 1, 'even-row': index % 2 === 0 }"
                          >
                            Q: {{ qnaItem.question }}
                            <span class="ans-elm">
                              A:
                              <span class="ans">{{ qnaItem.answer }}</span>
                            </span>
                          </div>
                        </div>
                        <div v-else>No data found</div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="map-grid-content family-history">
                <el-card class="box-card" shadow="hover">
                  <div class="clearfix header">
                    <span>Family history</span>
                  </div>
                  <div
                    v-for="(familyHxInfo, index) in arFamilyHxData"
                    :key="familyHxInfo.id"
                    class="map-item-row"
                    :class="{ 'odd-row': index % 2 === 1, 'even-row': index % 2 === 0 }"
                    :title="familyHxInfo.relationship + ':' + familyHxInfo.description"
                  >
                    <el-row>
                      <el-col :span="12">
                        <div class="truncate-field">{{ familyHxInfo.relationship }}</div>
                      </el-col>
                      <el-col :span="12">
                        <div class="truncate-field">{{ familyHxInfo.description }}</div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="map-grid-content contacts">
                <el-card class="box-card" shadow="hover">
                  <div class="clearfix header">
                    <span>Contacts</span>
                  </div>
                  <div style="padding-top: 2px">
                    <el-tabs :tab-position="'top'" style="font-size: 0.75rem">
                      <el-tab-pane
                        v-for="eachContactChannel in arContactsData"
                        :key="eachContactChannel.name"
                        :label="eachContactChannel.label"
                      >
                        <el-row
                          v-for="(contact, index) in eachContactChannel.contactInfo"
                          :key="contact.medId"
                          class="map-item-row"
                          :class="{ 'odd-row': index % 2 === 1, 'even-row': index % 2 === 0 }"
                        >
                          <el-col :span="24">
                            <div
                              class
                              :title="
                                '[' + contact.contactType + '] ' + contact.belongingType + ' of ' + contact.contactName
                              "
                            >{{ contact.value }}</div>
                          </el-col>
                        </el-row>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :md="8">
        <div class="large-grid-content">
          <el-row>
            <el-col>
              <div class="map-grid-content screening">
                <el-card class="box-card" shadow="hover">
                  <div class="clearfix header">
                    <span>Screening</span>
                  </div>
                  <div style="padding-top: 2px">
                    <el-tabs :tab-position="'left'" style="height: 200px; font-size: 0.75rem">
                      <el-tab-pane
                        v-for="eachScr in arScrData"
                        :key="eachScr.name"
                        :label="eachScr.label"
                      >
                        <div v-if="eachScr.questionAnswers.length > 0">
                          <div
                            v-for="(qnaItem, index) in eachScr.questionAnswers"
                            :key="index"
                            class="scr-row"
                            :class="{ 'odd-row': index % 2 === 1, 'even-row': index % 2 === 0 }"
                          >
                            Q: {{ qnaItem.question }}
                            <br />
                            <span class="ans-elm">
                              A:
                              <span class="ans">{{ qnaItem.answer }}</span>
                            </span>
                          </div>
                        </div>
                        <div v-else>No data found</div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="map-grid-content social-history">
                <el-card class="box-card" shadow="hover">
                  <div class="clearfix header">
                    <span>Social history</span>
                  </div>
                  <div
                    v-for="(shInfo, index) in arShData"
                    :key="shInfo.id"
                    class="map-item-row"
                    :class="{ 'odd-row': index % 2 === 1, 'even-row': index % 2 === 0 }"
                    :title="shInfo.label + ' : ' + shInfo.value"
                  >
                    <el-row>
                      <el-col :span="12">
                        <div class="truncate-field">{{ shInfo.label }}</div>
                      </el-col>
                      <el-col :span="12">
                        <div class="truncate-field">{{ shInfo.value }}</div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="map-grid-content appointment">
                <el-card class="box-card" shadow="hover">
                  <div class="clearfix header">
                    <span>Appointment</span>
                  </div>
                  <div
                    v-for="(appInfo, index) in arAppointmentData"
                    :key="appInfo.id"
                    class="map-item-row"
                    :class="{ 'odd-row': index % 2 === 1, 'even-row': index % 2 === 0 }"
                    :title="
                      'With ' + appInfo.provider + ' on ' + appInfo.startTime + ' for duration' + appInfo.duration
                    "
                  >
                    <el-row>
                      <el-col :span="10">
                        <div class="truncate-field">{{ appInfo.provider }}</div>
                      </el-col>
                      <el-col :span="14">
                        <div class="truncate-field">{{ appInfo.startTime }}</div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="map-grid-content pharmacy">
                <el-card class="box-card" shadow="hover">
                  <div class="clearfix header">
                    <span>Pharmacy</span>
                  </div>
                  <div
                    v-for="(pharmacyInfo, index) in arPharmacyData"
                    :key="pharmacyInfo.id"
                    class="map-item-row"
                    :class="{ 'odd-row': index % 2 === 1, 'even-row': index % 2 === 0 }"
                    :title="pharmacyInfo.name + ', ' + pharmacyInfo.address"
                  >
                    <el-row>
                      <el-col :span="12">
                        <div class="truncate-field">{{ pharmacyInfo.name }}</div>
                      </el-col>
                      <el-col :span="12">
                        <div class="truncate-field">{{ pharmacyInfo.address }}</div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="map-grid-content documents">
                <el-card class="box-card" shadow="hover">
                  <div class="clearfix header">
                    <span>Documents</span>
                  </div>
                  <el-tree
                    class="map-tree-item"
                    :data="arDocumentsData"
                    :props="obDocumentsDataTreeProps"
                    node-key="id"
                    :default-expanded-keys="[1]"
                  ></el-tree>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </el-drawer>
</template>

<script>
import clientTblForReminder from '@/components/temporal/reminders/db/client-side/structure/reminders-of-a-patient-table.js'

/*
import clientTblForTemperature from '@/components/temporal/vital-signs/sub-cts/temperature/db/client-side/structure/table.js'
import clientTblForBloodPressure from '@/components/temporal/vital-signs/sub-cts/blood-pressure-levels/db/client-side/structure/table.js'
import clientTblForBloodSugar from '@/components/temporal/vital-signs/sub-cts/blood-sugar-levels/db/client-side/structure/table.js'
*/

export default {
  data() {
    return {
      arRecData: [
        { id: 1, label: 'Jaibhole baba' },
        { id: 2, label: 'Recommendation def' },
        { id: 3, label: 'This is a test case when recommendation text is very long' },
        { id: 4, label: 'Recommendation stu' },
        { id: 5, label: 'Some Recommendation' },
        { id: 4, label: 'Dummy Recommendation' },
        { id: 5, label: 'Some other Recommendation' },
      ],
      arRemData: [
        { id: 1, label: 'Jaikalima' },
        { id: 2, label: 'My testing for new one' },
        { id: 3, label: 'Reminder 4' },
        { id: 4, label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
        { id: 5, label: 'reminder data' },
      ],
      arAllergiesData: [
        { id: 1, allergen: 'Egg', reactions: 'Rash' },
        { id: 2, allergen: 'Dust', reactions: 'Sneezing' },
        { id: 3, allergen: 'Sunlight', reactions: 'Red rashes' },
      ],
      arGData: [
        { id: 1, label: 'Meditate daily', rating: 0 },
        { id: 2, label: 'Sleep 8 hrs', rating: 10 },
        { id: 3, label: 'A long text goal to test realtime situation', rating: 50 },
        { id: 4, label: 'Another goal', rating: 20 },
        { id: 5, label: 'Dummy goal', rating: 20 },
        { id: 4, label: 'Sample goal', rating: 20 },
        { id: 5, label: 'Goal sample', rating: 20 },
      ],
      arDxData: [
        {
          id: 1,
          label: 'Acculturation difficulty',
          children: [
            {
              label: 'Some assessment',
            },
          ],
        },
        {
          id: 2,
          label: 'Some other dx',
          children: [
            {
              label: 'Some other assessment',
            },
          ],
        },
      ],
      obDxDataTreeProps: {
        children: 'children',
        label: 'label',
      },
      arBmData: [
        { id: 1, label: 'Weight', value: '80 kgs' },
        { id: 2, label: 'BMI', value: '27.3' },
        { id: 3, label: 'Waist', value: '38 inches' },
        { id: 4, label: 'Blood sugar', value: '135 mg/dL' },
        { id: 5, label: 'Height', value: '69.1 inches' },
        { id: 6, label: 'Blood pressure', value: '120/80 mmHg' },
        { id: 7, label: 'Oxygen saturation', value: '80%' },
        { id: 8, label: 'Pulse', value: '75 /min' },
        { id: 9, label: 'Temperature', value: '97.7 °F' },
      ],
      arExaminationData: [
        {
          label: 'Appearance',
          name: 'appearance',
          selectedValues: [
            'Good grooming and hygiene',
            'No apparent distress',
            'Well-developed, well-nourished',
            'Appears stated age',
            'Appears younger than stated age',
            'Appears older than stated age',
          ],
        },
        {
          label: 'Mood/Affect',
          name: 'mood-or-affect',
          selectedValues: [
            'Euthymic',
            'Dysphoric',
            'Irritable',
            'Angry',
            'Bright',
            'Euphoric',
            'Labile',
            'Stable',
            'Mood congruent',
            'Mood incongruent',
          ],
        },
        {
          label: 'Attitude',
          name: 'attitude',
          selectedValues: [
            'Pleasant and cooperative',
            'Uncooperative',
            'Hostile or defiant',
            'Guarded',
            'Evasive',
            'Apathetic',
            'Disorganized behavior',
          ],
        },
      ],
      arScrData: [
        {
          label: 'Depression',
          name: 'depression',
          questionAnswers: [
            {
              questionid: 1,
              question:
                'Over the last 2 weeks how often have you been bothered by any of the following problems...  Feeling down, depressed, or hopeless?',
              answer: 'Several days',
            },
            {
              questionid: 2,
              question:
                'Over the last 2 weeks how often have you been bothered by any of the following problems...  Trouble falling or staying asleep, or sleeping too much?',
              answer: 'Several days',
            },
            {
              questionid: 3,
              question:
                'Over the last 2 weeks how often have you been bothered by any of the following problems...  Feeling tired or having little energy?',
              answer: 'Not at all',
            },
            {
              questionid: 4,
              question:
                'Over the last 2 weeks how often have you been bothered by any of the following problems...  Poor appetite or overeating?',
              answer: 'Several days',
            },
            {
              questionid: 5,
              question:
                'Over the last 2 weeks how often have you been bothered by any of the following problems...  Feeling bad about yourself -- or that you are a failure or have let yourself or your family down?',
              answer: 'More than half a day',
            },
            {
              questionid: 6,
              question:
                'Over the last 2 weeks how often have you been bothered by any of the following problems...  Trouble concentrating on things, such as reading newspapers or watching television?',
              answer: 'Not at all',
            },
            {
              questionid: 7,
              question:
                'Over the last 2 weeks how often have you been bothered by any of the following problems...  Moving or speaking slowly that other could have noticed. Or the opposite -- being so figety or restless that you have been moving around a lot more than usual?',
              answer: 'Several days',
            },
            {
              questionid: 8,
              question:
                'Over the last 2 weeks how often have you been bothered by any of the following problems...  Thoughts that you would be better off dead, or of hurting yourself?',
              answer: 'Nearly every day',
            },
            {
              questionid: 9,
              question:
                'If you have checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?',
              answer: 'More than half a day',
            },
          ],
        },
        {
          label: 'Anxiety',
          name: 'anxiety',
          questionAnswers: [
            {
              questionid: 1,
              question:
                'Over the last 2 weeks how often have you been bothered by the following problems? Feeling nervous, anxious, or on edge?',
              answer: 'Several days',
            },
            {
              questionid: 2,
              question:
                'Over the last 2 weeks how often have you been bothered by the following problems? Not being able to stop or control worrying?',
              answer: 'Several days',
            },
            {
              questionid: 3,
              question:
                'Over the last 2 weeks how often have you been bothered by the following problems? Worrying too much about different things?',
              answer: 'Not at all',
            },
            {
              questionid: 4,
              question:
                'Over the last 2 weeks how often have you been bothered by the following problems? Trouble relaxing?',
              answer: 'Several days',
            },
            {
              questionid: 5,
              question:
                "Over the last 2 weeks how often have you been bothered by the following problems? Being so restless that it's hard to sit still?",
              answer: 'More than half a day',
            },
            {
              questionid: 6,
              question:
                'Over the last 2 weeks how often have you been bothered by the following problems? Becoming easily annoyed or irritable?',
              answer: 'Not at all',
            },
            {
              questionid: 7,
              question:
                'Over the last 2 weeks how often have you been bothered by the following problems? Feeling afraid as if something awful might happen?',
              answer: 'Several days',
            },
            {
              questionid: 8,
              question:
                'If you checked off any problems, how difficult have these made it for you to do your work, take care of things at home, or get along with other people?',
              answer: 'Nearly every day',
            },
          ],
        },
      ],
      arProsData: [
        {
          label: 'Anxiety',
          name: 'anxiety',
          questionAnswers: [
            {
              questionid: 1,
              question: 'In the past 10 days, how many days have you felt depressed for most of the day?',
              answer: '1',
            },
            {
              questionid: 2,
              question:
                'In the past 10 days, how many days have you felt low interest or motivation throughout most of the day?',
              answer: '3',
            },
            {
              questionid: 3,
              question:
                'In the past 10 days, how many days have you been abnormally irritable throughout most of the day?',
              answer: '2',
            },
            {
              questionid: 4,
              question:
                'In the past 10 days, how many days have you been abnormally energetic or high energy throughout most of the day?',
              answer: '5',
            },
            {
              questionid: 5,
              question:
                'In the past 10 days, how many days have you felt abnormal mood elevation throughout most of the day?',
              answer: '4',
            },
            {
              questionid: 6,
              question: 'How difficult to the above symptoms make your day to day life?',
              answer: 'Somewhat difficult',
            },
          ],
        },
        {
          label: 'Depression',
          name: 'depression',
          questionAnswers: [
            {
              questionid: 1,
              question: 'Depressive mood',
              answer: 'not present',
            },
            {
              questionid: 2,
              question: 'Interest',
              answer: 'sub syndromal',
            },
            {
              questionid: 3,
              question: 'Sleep',
              answer: 'syndromal',
            },
            {
              questionid: 4,
              question: 'Guilt / Self Esteem',
              answer: 'not present',
            },
            {
              questionid: 5,
              question: 'Energy',
              answer: 'sub syndromal',
            },
            {
              questionid: 6,
              question: 'Conc/Distir',
              answer: 'syndromal',
            },
            {
              questionid: 7,
              question: 'Appetite',
              answer: 'sub syndromal',
            },
            {
              questionid: 8,
              question: 'PMR/PMA',
              answer: 'not present',
            },
            {
              questionid: 9,
              question: 'Sl',
              answer: 'syndromal',
            },
            {
              questionid: 10,
              question: 'Note',
              answer: 'Lorem ipsum',
            },
          ],
        },
      ],
      arMedData: [
        {
          label: 'Active',
          name: 'active-medicine',
          medsInfo: [
            {
              medId: 1,
              medName: 'A very very long medicine name to display',
              quantity: '2',
              refill: '10',
              directionToPatient: 'Again a longtext direction to follow',
              status: 'success',
            },
            {
              medId: 2,
              medName: 'Some other med',
              quantity: '2',
              refill: '5',
              directionToPatient: 'Before meal',
              status: 'success',
            },
            {
              medId: 5,
              medName: 'Medicine 2',
              quantity: '2',
              refill: '5',
              directionToPatient: 'Before meal',
              status: 'success',
            },
            {
              medId: 6,
              medName: 'Medicine 3',
              quantity: '2',
              refill: '5',
              directionToPatient: 'Before meal',
              status: 'success',
            },
          ],
        },
        {
          label: 'Requiring refill',
          name: 'orders-requiring-refill',
          medsInfo: [
            {
              medId: 3,
              medName: 'Medicine abc currently need to refill',
              quantity: '2',
              refill: '10',
              directionToPatient: '',
              status: 'success',
            },
            {
              medId: 4,
              medName: 'Med def',
              quantity: '2',
              refill: '5',
              directionToPatient: 'Before meal',
              status: 'success',
            },
          ],
        },
      ],
      arContactsData: [
        {
          label: 'Phone',
          name: 'phone',
          contactInfo: [
            {
              id: 1,
              contactName: 'Allie Grater',
              contactType: 'Emergency',
              belongingType: 'Personal ph',
              value: '+1 123456789',
            },
            {
              id: 2,
              contactName: 'Peg Legge',
              contactType: 'Family member',
              belongingType: 'Work ph',
              value: '+1 123450000',
            },
          ],
        },
        {
          label: 'Email',
          name: 'email',
          contactInfo: [
            {
              id: 3,
              contactName: 'Allie Grater',
              contactType: 'Emergency',
              belongingType: "Assistant's email",
              value: 'someemail@mail.com',
            },
            {
              id: 4,
              contactName: 'Peg Legge',
              contactType: 'Family member',
              belongingType: 'Personal email',
              value: 'anotherother@mail.com',
            },
          ],
        },
      ],
      arShData: [
        { id: 1, label: 'Gender', value: 'Male' },
        { id: 2, label: 'Date of birth', value: '20 Aug, 1980' },
        { id: 3, label: 'Birthplace', value: 'Kolkata' },
        { id: 4, label: 'Lives With', value: 'Parents' },
        { id: 5, label: 'Lives in', value: 'Los Altos, CA' },
        { id: 6, label: 'Number of Living Children', value: '2' },
        { id: 7, label: 'Highest Education', value: 'PhD in Computer Science' },
        { id: 8, label: 'Current Employment Status', value: 'Working in an NGO' },
        { id: 9, label: 'Current Marital Status', value: 'Married' },
      ],
      arAppointmentData: [
        { id: 100, provider: 'Dr. VS', startTime: '4 Aug, 2020 9:00:00', duration: '30 mins' },
        { id: 200, provider: 'Dr. VS', startTime: '11 Aug, 2020 9:00:00', duration: '45 mins' },
        { id: 310, provider: 'Dr. SP', startTime: '18 Aug, 2020 9:00:00', duration: '30 mins' },
        { id: 405, provider: 'Dr. VS', startTime: '25 Aug, 2020 9:00:00', duration: '45 mins' },
        { id: 500, provider: 'Dr. SP', startTime: '4 Sep, 2020 9:00:00', duration: '30 mins' },
        { id: 600, provider: 'Dr. SP', startTime: '11 Sep, 2020 9:00:00', duration: '45 mins' },
        { id: 710, provider: 'Dr. SP', startTime: '18 Sep, 2020 9:00:00', duration: '30 mins' },
        { id: 805, provider: 'Dr. VS', startTime: '25 Sep, 2020 9:00:00', duration: '45 mins' },
      ],
      arFamilyHxData: [
        { id: 1, relationship: 'Brother', description: 'Had depression for a long time' },
        { id: 2, relationship: 'Uncle', description: 'ADHD' },
        { id: 3, relationship: 'Other uncle', description: 'Alcoholic and abusive' },
        { id: 4, relationship: 'Other Brother', description: 'Attempted to suicide' },
      ],
      arPharmacyData: [
        { id: 1, name: 'Walgreens Pharmacy', address: '11795 West Olympic Boulevard' },
        { id: 2, name: 'Dummy Pharmacy', address: 'Dummy address' },
      ],
      arDocumentsData: [
        {
          id: 1,
          label: 'Folder 1 (Medical Records) ',
          children: [
            {
              label: 'Test report 1.pdf',
            },
            {
              label: 'Test report 2.jpg',
            },
          ],
        },
        {
          id: 2,
          label: 'Folder 2 (Other)',
          children: [
            {
              label: 'Case history.pdf',
            },
            {
              label: 'Old prescriptions.jpg',
            },
          ],
        },
      ],
      obDocumentsDataTreeProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  computed: {
    cfArOfRemForDisplayInMapDrawer() {
      const arFromClientTbl = clientTblForReminder.fnGetPresentUniqueUuidNotEmptyRows('description')
      return arFromClientTbl
    },
    cfArOfVitalSignForDisplayInMapDrawer() {
      /*      const arVitalSignsForDisplay = []
      let index = 1

      const arFromClientTblForTemperature = clientTblForTemperature.fnGetRowsToChange()
      if (arFromClientTblForTemperature.length > 0) {
        const objTemperature = {}
        objTemperature.id = index
        objTemperature.label = 'Temperature'
        objTemperature.value = arFromClientTblForTemperature[0].temperatureInFarehnite
        arVitalSignsForDisplay.push(objTemperature)

        index = index + 1
      }

      const arFromClientTblForBloodPressure = clientTblForBloodPressure.fnGetRowsToChange()
      if (arFromClientTblForBloodPressure.length > 0) {
        const objBloodPressure = {}
        objBloodPressure.id = index
        objBloodPressure.label = 'Blood pressure'
        objBloodPressure.value = arFromClientTblForBloodPressure[0].bloodPressureInBpm
        arVitalSignsForDisplay.push(objBloodPressure)

        index = index + 1
      }

      const arFromClientTblForBloodSugar = clientTblForBloodSugar.fnGetRowsToChange()
      if (arFromClientTblForBloodSugar.length > 0) {
        const objBloodSugar = {}
        objBloodSugar.id = index
        objBloodSugar.label = 'Blood sugar'
        objBloodSugar.value = arFromClientTblForBloodSugar[0].bloodSugarInBpm
        arVitalSignsForDisplay.push(objBloodSugar)

        index = index + 1
      }
*/
      return arVitalSignsForDisplay
    },
    cfMapDrawerVisibility: {
      get() {
        return this.$store.state.vstObjMapDrawer.vblIsMapDrawerVisible
      },
      set(value) {
        this.$store.commit('mtfSetMapDrawerVisibility', value)
      },
    },
  },
  mounted() {},
  methods: {
    handleClose(done) {
      this.cfMapDrawerVisibility = false
    },
  },
}
</script>
<style>
.map-drawer .el-drawer__header > span {
  outline: none;
}
.map-drawer .el-drawer__header {
  margin-bottom: 15px;
  padding-top: 15px;
}
.map-drawer .el-drawer__body {
  overflow-y: auto;
  padding-right: 5px;
  padding-left: 5px;
}
.map-drawer div.el-tabs--left {
  overflow-y: auto;
}
.map-drawer .el-card__body {
  padding: 10px;
}
.map-drawer .el-tabs__item {
  font-size: 0.75rem;
}
.even-row {
  background-color: #ffffff;
}
.odd-row {
  background-color: #ebeef5;
}
.map-grid-content .header {
  font-size: 0.75rem;
  font-weight: bold;
  border-bottom: 1px solid #aaa;
}
.map-drawer .truncate-field {
  font-size: 0.75rem;
  padding: 1px;
  cursor: default;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.map-grid-content .map-item-row {
  font-size: 0.75rem;
  padding: 3px;
  cursor: default;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.map-grid-content .pros-row:hover,
.map-grid-content .scr-row:hover {
  cursor: default;
}
.map-grid-content .map-item-row:hover,
.map-grid-content .scr-row:hover,
.map-grid-content .pros-row:hover {
  background-color: #e3e3f8;
}
.map-grid-content .map-tree-item .el-tree-node__label {
  font-size: 0.75rem;
  padding: 2px;
}
.map-drawer .ans-elm {
  font-weight: bold;
}
.map-drawer .ans {
  text-decoration: underline;
}
.map-drawer .med-table-header {
  font-weight: bold;
  cursor: default;
}
.map-drawer .med-name,
.map-drawer .med-quant,
.map-drawer .med-refill,
.map-drawer .med-direction,
.map-drawer .med-status {
  padding: 2px;
  cursor: default;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
