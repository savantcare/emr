<template>
  <div>
    <!--  Q) Who determines the set of cards to show here and also the sequence?
                The doctor team leader decides it.
                When they want a change we come into the source code and make the change.
              Q) Why not make this dynamic and have this come from vuex-orm or Maria DB?
                This will change on average once in 1 year. Hence there is no advantage of doing this.
          -->
    <!--        <ctRexVl> </ctRexVl><br />
        <ctBMVl> </ctBMVl><br />
        <ctDXVl> </ctDXVl><br />
        <ctGVl> </ctGVl><br />
        <ctScrVl> </ctScrVl><br />
-->
    <ctRemVl> </ctRemVl>
  </div>
</template>
<script>
import ctRemVl from '@/cts/spi/rem/vl/table'
// import ctRexVl from '@/cts/spi/rec/vl/table'
// import ctBMVl from '@/cts/spi/bm/bm-vl'
// import ctDXVl from '@/cts/spi/dx/dx-vl'
// import ctGVl from '@/cts/spi/goal/g-vl'
// import ctScrVl from '@/cts/spi/scr/scr-vl.vue'

export default {
  components: {
    ctRemVl,
    //    ctRexVl,
    //    ctBMVl,
    //    ctDXVl,
    //    ctGVl,
    //    ctScrVl,
  },
  data() {
    return {}
  },
}
</script>
