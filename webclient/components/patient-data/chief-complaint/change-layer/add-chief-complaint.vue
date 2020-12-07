<template>
  <div>
    <ctAddForm :_formDef="formDef"></ctAddForm>

    <vue-tribute :options="options" ref="tributeRef">
      <el-input ref="tributeElInput" placeholder="Please input" v-model="input"></el-input>
    </vue-tribute>
    <div class="menu-tribute-list" ref="menuTributeContainer"></div>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/note-change/templates/add-form.vue'
import { chiefComplaintFormDef } from '@/components/patient-data/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'
import VueTribute from 'vue-tribute'

export default {
  data: function () {
    return {
      input: '',
      formDef: chiefComplaintFormDef,
      options: {
        autocompleteMode: true,
        values: [
          { key: 'depression', value: 'Patient has history of depression' },
          { key: 'anxiety', value: 'Patient has history of anxiety' },
        ],
        positionMenu: false,
        menuContainer: document.body,
      },
    }
  },
  components: {
    ctAddForm,
    VueTribute,
  },
  mounted() {
    // Vue Tribute display menu list position reference with menuTributeContainer
    this.options.menuContainer = this.$refs.menuTributeContainer
    // Update VueTribute slots
    this.$refs.tributeRef.$slots.default[0].elm = this.$refs.tributeElInput.$refs.input
    // debugger
  },
  methods: {
    append() {
      let kv = Math.random().toString(36).slice(2)
      this.options.values.push({
        key: kv,
        value: kv,
      })
    },
  },
}
</script>

<style lang="scss">
.scroll {
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  position: relative;
}
.container {
  max-width: 355px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;
}
// .v-tribute {
//   width: 100%;
//   position: relative;
// }
input[type='text'],
textarea {
  padding: 1rem;
  width: 100%;
  border-radius: 0.25rem;
  outline: none;
  &:focus {
    background: #fff;
  }
}
// .menu-tribute-list {
//   width: 100%;
//   height: 100%;
// }
// Tribute-specific styles
.tribute-container {
  // position: absolute;
  top: 0;
  left: 0;
  height: auto;
  max-height: 300px;
  max-width: 500px;
  overflow: auto;
  display: block;
  z-index: 999999;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(#000, 0.13);
}
.tribute-container ul {
  margin: 0;
  margin-top: 2px;
  padding: 0;
  list-style: none;
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(#000, 0.13);
  background-clip: padding-box;
  overflow: hidden;
}
.tribute-container li {
  color: #3f5efb;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
}
.tribute-container li.highlight,
.tribute-container li:hover {
  background: #3f5efb;
  color: #fff;
}
.tribute-container li span {
  font-weight: bold;
}
.tribute-container li.no-match {
  cursor: default;
}
.tribute-container .menu-highlighted {
  font-weight: bold;
}
</style>
