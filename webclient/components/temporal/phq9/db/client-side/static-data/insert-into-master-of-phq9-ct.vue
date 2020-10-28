<template>
  <div></div>
</template>

<script>
import ClientTblMasterPhq9 from '@/components/temporal/phq9/db/client-side/structure/master-table-of-phq9.js'

export default {
  data() {
    return {}
  },
  mounted() {
    ClientTblMasterPhq9.insert({
      data: {
        phq9QuestionMasterId: 1,
        phq9QuestionFullText: 'Little interest or pleasure in doing things...',
      },
    })
    ClientTblMasterPhq9.insert({
      data: {
        phq9QuestionMasterId: 2,
        phq9QuestionFullText: 'Feeling down, depressed, or hopeless...',
      },
    })
    ClientTblMasterPhq9.insert({
      data: {
        phq9QuestionMasterId: 3,
        phq9QuestionFullText: 'Trouble falling or staying asleep, or sleeping too much...',
      },
    })
    ClientTblMasterPhq9.insert({
      data: {
        phq9QuestionMasterId: 4,
        phq9QuestionFullText: 'Feeling tired or having little energy...',
      },
    })
    ClientTblMasterPhq9.insert({
      data: {
        phq9QuestionMasterId: 5,
        phq9QuestionFullText: 'Poor appetite or overeating...',
      },
    })
    ClientTblMasterPhq9.insert({
      data: {
        phq9QuestionMasterId: 6,
        phq9QuestionFullText:
          'Feeling bad about yourself - or that you are a failure or have let yourself or your family down',
      },
    })
    ClientTblMasterPhq9.insert({
      data: {
        phq9QuestionMasterId: 7,
        phq9QuestionFullText: 'Trouble concentrating on things, such as reading the newspaper or watching television',
      },
    })
    ClientTblMasterPhq9.insert({
      data: {
        phq9QuestionMasterId: 8,
        phq9QuestionFullText:
          'Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual',
      },
    })
    ClientTblMasterPhq9.insert({
      data: {
        phq9QuestionMasterId: 9,
        phq9QuestionFullText: 'Thoughts that you would be better off dead or of hurting yourself in some way',
      },
    })
    ClientTblMasterPhq9.insert({
      data: {
        phq9QuestionMasterId: 10,
        phq9QuestionFullText:
          'If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?',
      },
    })
  },
}
</script>
