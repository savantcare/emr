<template>
  <div>
    <!--  Q) Who determines the set of cards to show here and also the sequence?
                The doctor team leader decides it.
                When they want a change we come into the source code and make the change.
              Q) Why not make this dynamic and have this come from vuex-orm or Maria DB?
                This will change on average once in 1 year. Hence there is no advantage of doing this.
          -->
    <!--        <ctRexVl> </ctRexVl><br />
        
        <ctDXVl> </ctDXVl><br />
        <ctGVl> </ctGVl><br />
-->
    <TheMultiStateDisplayAreaHeader> </TheMultiStateDisplayAreaHeader>
    <ctBMVl> </ctBMVl><br />
    <ctRemVl> </ctRemVl>
    <ctScrVl> </ctScrVl>
  </div>
</template>
<script>
import TheMultiStateDisplayAreaHeader from '@/components/core/mtsvl-header/sub-ct-container.vue'
import ctRemVl from '@/components/pt-info/single/1time-Mrow-1Field/reminder/view-layer/grid-design2-ct'
import ctScrVl from '@/components/pt-info/single/1time-Mrow-mField/scr/view-layer/table-ct'
import ctBMVl from '@/components/pt-info/single/1time-1row-mField/bm/view-layer/grid-ct'
// import ctRexVl from '@/components/pt-info/single/rec/view-layer/table-ct'

// import ctDXVl from '@/components/pt-info/single/dx/dx-vl'
// import ctGVl from '@/components/pt-info/single/goal/g-vl'

export default {
  components: {
    ctScrVl,
    ctBMVl,
    TheMultiStateDisplayAreaHeader,
    ctRemVl,
    //    ctRexVl,
    //    ctDXVl,
    //    ctGVl,
  },
  data() {
    return {}
  },
}
</script>
