<template>
  <li
    v-on-clickaway="away"
    @click="isActive = !isActive"
    :style="`width: ${
      isActive ? itemMaxWidth : itemMinWidth
    }px;min-width: ${itemMinWidth}px;max-width: ${itemMaxWidth}px`"
    class="js-horizontal-collapse-item horizontal-collapse__item"
    :class="{ 'is-active': isActive, [className]: true }"
    tabindex="0"
    role="button"
  >
    <div :style="`width: ${itemMaxWidth}px`" class="js-horizontal-collapse-item-inner horizontal-collapse__item-inner">
      <slot></slot>
    </div>
  </li>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  name: 'HorizontalCollapseItem',
  mixins: [clickaway],
  data() {
    return {
      isActive: false,
      itemMinWidth: 150 /* Space for each is 270*3 = 810. Since .6 * 1440 = 864 annd 54 pixels left for settings. When small then give space of 150 when big give space of 510*/,
      itemMaxWidth: 510,
      allInactiveWidth: 270,
    }
  },
  methods: {
    away() {
      this.isActive = false
    },
  },
  props: ['className'],
}
</script>

<style></style>
