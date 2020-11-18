<template>
  <section class="js-horizontal-collapse horizontal-collapse">
    <ul class="horizontal-collapse__inner">
      <HorizontalCollapseItem className="horizontal-collapse__item--1">
        <div class="horizontal-collapse__inactive-content">
          <h2 class="horizontal-collapse__heading">Appt</h2>
        </div>
        <div class="horizontal-collapse__active-content">
          <p class="horizontal-collapse__body">Appt Time line</p>
        </div>
      </HorizontalCollapseItem>

      <HorizontalCollapseItem className="horizontal-collapse__item--2">
        <div class="horizontal-collapse__inactive-content">
          <h2 class="horizontal-collapse__heading">Search</h2>
        </div>
        <div class="horizontal-collapse__active-content">
          <h2 class="horizontal-collapse__heading">Patient</h2>
          <p class="horizontal-collapse__body">Search box</p>
        </div>
      </HorizontalCollapseItem>

      <HorizontalCollapseItem className="horizontal-collapse__item--3">
        <div class="horizontal-collapse__inactive-content">
          <h2 class="horizontal-collapse__heading">Patient</h2>
        </div>
        <div class="horizontal-collapse__active-content">
          <p class="horizontal-collapse__body">Data timeline</p>
        </div>
      </HorizontalCollapseItem>
    </ul>
  </section>
</template>

<script>
import HorizontalCollapseItem from './HorizontalCollapseItem'

export default {
  name: 'HorizontalCollapse',
  components: {
    HorizontalCollapseItem,
  },
}
</script>

<style lang="scss">
$transitionDurationMs: 0.5s;

.horizontal-collapse {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 5rem;
  color: #fff;

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  &__inner {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
  }

  &__item {
    list-style: none;
    padding: 0;
    overflow: hidden;
    position: relative;
    transition: width $transitionDurationMs;

    &--1 {
      background-color: grey;
    }

    &--2 {
      background-color: lightgrey;
    }

    &--3 {
      background-color: grey;
    }

    &.is-active {
      // color: #fff;

      .horizontal-collapse__inactive-content {
        opacity: 0;
      }

      .horizontal-collapse__active-content {
        opacity: 1;
      }
    }
  }

  &__item-inner {
    padding: 0.1rem;
  }

  &__inactive-content {
    opacity: 1;
    transition: opacity $transitionDurationMs;
    position: absolute;
    bottom: 0.1rem;
    left: 0.1rem;

    .horizontal-collapse__heading {
      user-select: none;
      cursor: default;
      font-size: 1rem;
      line-height: 0;
      margin-bottom: 0;
      text-orientation: mixed;
    }
  }

  &__active-content {
    opacity: 0;
    transition: opacity $transitionDurationMs;
    cursor: default;
  }

  &__heading {
    margin-top: 0;
    margin-bottom: 0.1rem;
  }

  &__body {
    margin-bottom: 0.1rem;
  }

  &__link {
    display: inline-block;
    background-color: #fff;
    color: #333;
    text-decoration: none;
    line-height: 1;
    padding: 0.1rem 0.1rem;
    border-radius: 2rem;
    font-size: 1rem;
    font-weight: bold;
  }
}
</style>
