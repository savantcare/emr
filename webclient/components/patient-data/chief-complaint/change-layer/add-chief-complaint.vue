<template>
  <div>
    <ctAddForm :_formDef="formDef"></ctAddForm>
    <vue-tribute :options="options">
      <input type="text" placeholder="@..." @tribute-no-match="noMatchFound" ref="foo" />
    </vue-tribute>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/note-change/templates/add-form.vue'
import { chiefComplaintFormDef } from '@/components/patient-data/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'
import VueTribute from 'vue-tribute'

export default {
  data: function () {
    return {
      formDef: chiefComplaintFormDef,
      options: {
        autocompleteMode: true,
        values: [
          { key: 'depression', value: 'Patient has history of depression' },
          { key: 'anxiety', value: 'Patient has history of anxiety' },
        ],
        positionMenu: true,
        menuContainer: document.querySelector('.menu-container'),
      },
    }
  },
  components: {
    ctAddForm,
    VueTribute,
  },
  mounted() {
    this.options.menuContainer = this.$refs.menuContainer
  },
  methods: {
    noMatchFound() {
      console.log('No matches found!')
    },
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
body {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
}
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
.v-tribute {
  width: 100%;
  position: relative;
}
input[type='text'],
.content-editable {
  appearance: none;
  border: none;
  background: #eee;
  padding: 1rem 1rem;
  color: #666;
  width: 100%;
  border-radius: 0.25rem;
  font-size: 16px;
  outline: none;
  &:focus {
    background: #fff;
  }
}
.content-editable:empty:before {
  content: attr(placeholder);
  display: block;
  color: #666;
}
textarea {
  appearance: none;
  border: none;
  background: #eee;
  padding: 1rem;
  width: 100%;
  border-radius: 0.25rem;
  font-size: 16px;
  height: 100px;
  outline: none;
  &:focus {
    background: #fff;
  }
}
.btn {
  appearance: none;
  border: none;
  cursor: pointer;
  margin: 20px 0;
  background: #fc466b;
  color: #fff;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(#000, 0.18);
  &:hover {
    background: darken(#fc466b, 3%);
  }
}
// Tribute-specific styles
.tribute-container {
  position: absolute;
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
