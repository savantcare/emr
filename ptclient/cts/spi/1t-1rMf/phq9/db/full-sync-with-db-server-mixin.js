/* Master doc is at reference implementation name/db/full-sync-with-db-server-mixin.js
This file has doc unique to this ct */

import orm from '~/cts/spi/1t-1rMf/phq9/db/orm-phq9.js'
export default {
  data() {
    return {
      vaPhq9QuestionFields: [
        {
          name: 'littleInterestOrPleasureInDoingThings',
          label: 'Little interest or pleasure in doing things...',
        },
        {
          name: 'feelingDownDepressedOrHopeless',
          label: 'Feeling down, depressed, or hopeless...',
        },
        {
          name: 'troubleFallingOrStayingAsleep',
          label: 'Trouble falling or staying asleep, or sleeping too much...',
        },
        {
          name: 'feelingTiredOrHavingLittleEnergy',
          label: 'Feeling tired or having little energy...',
        },
        {
          name: 'poorAppetiteOrOvereating',
          label: 'Poor appetite or overeating...',
        },
        {
          name: 'feelingBadAboutYourself',
          label:
            'Feeling bad about yourself - or that you are a failure or have let yourself or your family down',
        },
        {
          name: 'troubleConcentratingOnThings',
          label:
            'Trouble concentrating on things, such as reading the newspaper or watching television',
        },
        {
          name: 'movingOrSpeakingSoSlowly',
          label:
            'Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual',
        },
        {
          name: 'thoughtsThatYouWouldBeBetterOffDead',
          label: 'Thoughts that you would be better off dead or of hurting yourself in some way',
        },
        {
          name: 'ifYouCheckedOffAnyProblems',
          label:
            'If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?',
        },
      ],
    }
  },
  methods: {
    async mxGetDataFromDb() {
      const pro = await orm.api().get(orm.apiUrl + '/1')
      if (pro.ok) {
      }
    },
  },
}
