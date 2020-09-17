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
import TheMultiStateDisplayAreaHeader from '@/cts/core/mtsvl-header/sub-ct-container.vue'
import ctRemVl from '@/cts/spi/1t-Mrow-1Field/rem/vl/grid-design2-ct'
import ctScrVl from '@/cts/spi/1t-Mrow-mField/scr/vl/table-ct'
import ctBMVl from '@/cts/spi/1t-1row-mField/bm/vl/grid-ct'
// import ctRexVl from '@/cts/spi/rec/vl/table-ct'

// import ctDXVl from '@/cts/spi/dx/dx-vl'
// import ctGVl from '@/cts/spi/goal/g-vl'

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
