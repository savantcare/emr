<template>
  <el-card hover>
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); grid-template-row: repeat(1, 1fr); border: solid">
      <div class="gridItem" style="font-weight: bold" @click="features.history.summaryDisplay=!features.history.summaryDisplay">History type</div>
      <div class="gridItem"
        
          :style="features.history.type.pf ? 'background-color: #67C23A' : 'background-color: #909399'"
          :class="
            features.history.chiefComplaint &&
            features.history.hpi >= 1 &&
            features.history.pfsh >= 1 &&
            features.history.ros >= 1
              ? (features.history.type.pf = true)
              : (features.history.type.pf = false)
          "
        >
                    Problem focussed (PF)
                </div>

                <div
                  class="gridItem"
                  :class="[
                    features.history.chiefComplaint &&
                    features.history.hpi >= 1 &&
                    features.history.pfsh >= 1 &&
                    features.history.ros >= 2
                      ? (features.history.type.epf = true)
                      : (features.history.type.epf = false),
                      
                     features.history.type.epf ? '' : 'strike'
 
                      ]
                  "
                  :style="features.history.type.epf ? 'background-color: #67C23A' : 'background-color: #909399'"
                >
                  Expanded problem focussed (EPF)
                </div>
                <div class="gridItem"
                    :class="[
                      features.history.chiefComplaint &&
                      features.history.hpi >= 2 &&
                      features.history.pfsh >= 2 &&
                      features.history.ros >= 3
                        ? (features.history.type.det = true)
                        : (features.history.type.det = false),

                      features.history.type.det ? '' : 'strike'
                    ]"
                    :style="features.history.type.det ? 'background-color: #67C23A' : 'background-color: #909399'"

                  >
                    Detailed (DET)
                </div>
                <div class="gridItem"
                    :class="[
                      features.history.chiefComplaint &&
                      features.history.hpi >= 2 &&
                      features.history.pfsh >= 3 &&
                      features.history.ros >= 4
                        ? (features.history.type.comp = true)
                        : (features.history.type.comp = false),
                    
                      features.history.type.comp ? '' : 'strike'
                    ]"

                    :style="features.history.type.comp ? 'background-color: #67C23A' : 'background-color: #909399'"

                  >
                    Comprehensive (COMP)
                </div>
              </div>
            </el-card>
          </template>
          <script>
          export default {
            props: {
              features: {
                type: Object,
                required: true,
              },
            },
            computed: {},
          }
          </script>

          <style scoped>
          .gridItem {
            background-color: #fff;
            border: 1px solid #000;
            padding: 2px;
            font-size: 1rem;
            text-align: center;
          }
          .verticalHeader {
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 1;
            grid-row-end: 8;
            font-size: 5rem;
          }
        </style>
      </div>
    </div></el-card
  >
</template>