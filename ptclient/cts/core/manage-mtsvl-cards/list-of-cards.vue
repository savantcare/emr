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
-->
    <ctRemVl> </ctRemVl><br />
    <ctScrVl> </ctScrVl>
  </div>
</template>
<script>
import ctRemVl from '@/cts/spi/1t-Mr1f/rem/vl/table'
import ctScrVl from '@/cts/spi/scr/vl/table'
// import ctRexVl from '@/cts/spi/rec/vl/table'
// import ctBMVl from '@/cts/spi/bm/bm-vl'
// import ctDXVl from '@/cts/spi/dx/dx-vl'
// import ctGVl from '@/cts/spi/goal/g-vl'

export default {
  components: {
    ctRemVl,
    ctScrVl,
    //    ctRexVl,
    //    ctBMVl,
    //    ctDXVl,
    //    ctGVl,
  },
  data() {
    return {}
  },
}
</script>
