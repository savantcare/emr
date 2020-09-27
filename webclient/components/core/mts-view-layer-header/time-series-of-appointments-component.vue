<!-- Ref
https://stackoverflow.com/questions/47893905/draw-a-line-in-css-between-fa-icons
-->
<template>
  <div class="content-wrap">
    <clientSideTblOfAppointmentsInit />
    <div v-for="appt in cfAllAppointments" :key="appt.clientSideUniqRowId">
      <el-button
        type="success"
        class="el-icon-lock"
        circle
        size="mini"
        plain
        icon1
        @click="handleSliderChangeEvent()"
      ></el-button>
    </div>
  </div>
</template>

<script>
import clientSideTblOfMultiStateViewCards from '@/components/core/manage-mts-view-layer-cards/db/client-side/structure/table.js'
import clientSideTblOfAppointments from '@/components/core/mts-view-layer-header/db/client-side/structure/appointment-client-side-table.js'
import clientSideTblOfAppointmentsInit from '@/components/core/mts-view-layer-header/db/client-side/static-data/insert-into-appointment-client-side-table.vue'

export default {
  data() {
    return {}
  },
  components: { clientSideTblOfAppointmentsInit },
  computed: {
    cfAllAppointments() {
      const arOfObjectsFromClientSideDB = clientSideTblOfAppointments.query().get()

      console.log(arOfObjectsFromClientSideDB)

      return arOfObjectsFromClientSideDB
    },
  },
  methods: {
    async handleSliderChangeEvent() {
      const noteCurrentValue = clientSideTblOfMultiStateViewCards.find(2)
      const updateState = await clientSideTblOfMultiStateViewCards.update({
        clientSideUniqRowId: 2,
        vIfState: 1 - noteCurrentValue['vIfState'],
      })
    },
    handleSliderEndEvent() {
      // console.log(this.sliderCurrentValue);
    },
  },
}
</script>

<style scoped>
.content-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1em;
  overflow: hidden;
}

.content-wrap::before {
  position: absolute;
  top: calc(50% - 1px);
  right: 0;
  left: 0;
  content: '';
  background-color: grey;
  height: 2px;
}

.icon1 {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 6rem;
  font-size: 3rem;
  color: #777;
  border: 2px solid #777777;
  border-radius: 50%;
  padding: 1rem;
  background: #f9f9f9;
  box-shadow: 0 0 0 0.5em #f9f9f9;
}
</style>
