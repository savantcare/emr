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
    <ctRecVl> </ctRecVl>
    <ctScrVl> </ctScrVl>
  </div>
</template>
<script>
import TheMultiStateDisplayAreaHeader from '@/components/core/mtsvl-header/sub-ct-container.vue'
import ctRemVl from '@/components/pt-info/single/1t-Mrow-1Field/reminder/view-layer/grid-design2-ct'
import ctRecVl from '@/components/pt-info/single/1t-Mrow-1Field/recommendation/view-layer/grid-design2-ct'
import ctScrVl from '@/components/pt-info/single/1t-Mrow-mField/scr/view-layer/table-ct'
import ctBMVl from '@/components/pt-info/single/1t-1row-mField/bm/view-layer/grid-ct'
export default {
  components: {
    ctScrVl,
    ctBMVl,
    ctRecVl,
    TheMultiStateDisplayAreaHeader,
    ctRemVl,
  },
  data() {
    return {}
  },
}
</script>
