```
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│Introduction                                                                                               │
│============                                                                                               │
│                                                                                                           │
│Screening                                                                                                  │
│------------                                                                                               │
│                                                                                                           │
│1. a provider can add different screen for patient e.g. 'Schizophrenia' 'PTSD'                             │
│                                                                                                           │
│2. For every screen the provider needs to submit the pre-defined questions that are then programmed by the │
│programmer                                                                                                 │
│                                                                                                           │
│3. The record will be stored in a Db response table. e.g.  `phq9PatientResponses`. It is a temporal table  │
│structure in db.                                                                                           │
│                                                                                                           │
│4. In the right screening card need to show the screening graph for all screens and in the left side panel │
│need to show the screening list of the patient.                                                            │
│                                                                                                           │
│5. the screening graph of a screen will be displayed by the all previous history data for the screen.      │
│                                                                                                           │
│                                                                                                           │
│Note                                                                                                       │
│-------                                                                                                    │
│                                                                                                           │
│1. All the PHQ9 related question is based on Columbia University Study                                     │
│ref: http://pdfs.semanticscholar.org/de26/1882049731e262c7ba4a2e0a710cd0cc807c.pdf  , Page 6               │
└───────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│PHQ9 questions                                                                                             │
│--------------                                                                                             │
│                                                                                                           │
│Question group : Over the last 2 weeks, how often have you been bothered by any of the following problems? │
│                                                                                                           │
│ 1. Little interest or pleasure in doing things...                                                         │
│ 2. Feeling down, depressed, or hopeless...                                                                │
│ 3. Trouble falling or staying asleep, or sleeping too much...                                             │
│ 4. Feeling tired or having little energy...                                                               │
│ 5. Poor appetite or overeating...                                                                         │
│ 6. Feeling bad about yourself - or that you are a failure or have let yourself or your family down        │
│ 7. Trouble concentrating on things, such as reading the newspaper or watching television                  │
│ 8. Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety  │
│or restless that you have been moving around a lot more than usual                                         │
│ 9. Thoughts that you would be better off dead or of hurting yourself in some way                          │
│                                                                                                           │
│Option for those every question                                                                            │
│'Not at all',  'Several days', 'More than half the days', 'Nearly every day'                               │
│                                                                                                           │
│                                                                                                           │
│                                                                                                           │
│Additional questions                                                                                       │
│---------------------                                                                                      │
│                                                                                                           │
│1. you checked off any problems, how difficult have these problems made it for you to do your work, take   │
│care of things at home, or get along with other people?                                                    │
│                                                                                                           │
│Answer option for the question.                                                                            │
│                                                                                                           │
│'Not difficult at all', 'Somewhat difficult', 'Very difficult','Extremely difficult'                       │
└───────────────────────────────────────────────────────────────────────────────────────────────────────────┘


           ┌─────────────────────────────────┐
           │  Layer 1 - Current state side   │
           └─────────────────────────────────┘
┌──────────┬──────────────────────────────────┬─────────┐  ┌─────────────────────────────────────────────────┐
│Screening │                                  │  A  G   │  │ The graph is similar to body measurement graph  │
├──────────┼──────────────────────────────────┴─────────┤  └─────────────────────────────────────────────────┘
│          │                                    ┌─────┐ │                 ┌─────────────────────┐
│          │     ▲                              │Take │ │  ┌──────────────┤ Card header actions ├────────────────┐
├──────────┤     │                              └─────┘ │  │              └─────────────────────┘                │
│   PHQ9 ──┼────▶│                                      │  │A -> Add a new screen                                │
├──────────┤     │                                      │  │                                                     │
│          │     │            ┌─────────▶               │  │G -> Graph all screens together                      │
├──────────┤     │            │                         │  │                                                     │
│   ADHD   │     │            │                         │  │                                                     │
├──────────┤     │            │                         │  └─────────────────────────────────────────────────────┘
│          │     │            │                         │
│          │     │            │                         │                    ┌─────────────────┐
│          │     │   ─────────┘                         │  ┌─────────────────┤Data row actions ├─────────────────┐
│          │     │                                      │  │                 └─────────────────┘                 │
│          │     │                                      │  │T -> Take this screen                                │
│          │     │                                      │  │                                                     │
│          │     └──────────────────────────▶           │  └─────────────────────────────────────────────────────┘
│          │                                            │
└──────────┴────────────────────────────────────────────┘

               ┌───────────────────────────┐
               │Layer 1 - Multi state side │
               └───────────────────────────┘


┌┬──────────┬───────────────────────────────────────────────────────────────────────────────────────┬─────────┬──┐
││Screening │                                                                                       │  A  G   │  │
├┴──────────┼───────────────────────────────────────────────────────────────────────────────────────┴─────────┴──┤
│┌──────────┤                                                                                             ┌─────┐│
││   PHQ9   │                                                                                             │Take ││
│└──────────┤                                                                                             └─────┘│
│           │   ┌──────────────────────────────────────────────┐               ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─         │
│           │   │1. Little interest or pleasure in doing things│                      Several days      │        │
│           │   └──────────────────────────────────────────────┘               └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─         │
│           │   ┌──────────────────────────────────────────────┐               ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─         │
│           │   │2. Feeling down, depressed or hopeless.       │                More than half the days │        │
│           │   └──────────────────────────────────────────────┘               └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─         │
│           │   ┌───────────────────────────────────────────────────────────┐  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─         │
│           │   │3. Trouble falling or staying asleep, or sleeping too much │       Nearly every day    │        │
│           │   └───────────────────────────────────────────────────────────┘  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─         │
│           │   ┌───────────────────────────────────────────────────────────┐  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─         │
│           │   │4. Feeling tired or having little energy                   │         Several days      │        │
│           │   └───────────────────────────────────────────────────────────┘  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─         │
│           │   ┌───────────────────────────────────────────────────────────┐  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─         │
│           │   │5. Poor appetite or overeating                             │         Several days      │        │
│           │   └───────────────────────────────────────────────────────────┘  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─         │
│           │                                                                                                    │
│           │                                                                                                    │
│           │   ┌──────────────────────────────────────────────────┐     ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─         │
│           │   │Rest of the questions in row wise manner          │      values chosen for the qusetion│        │
│           │   └──────────────────────────────────────────────────┘     └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─         │
│           │                                                                                                    │
│           │                                                                                                    │
│           │                                                                                                    │
│           │                                                                                                    │
└───────────┴────────────────────────────────────────────────────────────────────────────────────────────────────┘



                                                  ┌──────────┐
                                                  │ Layer 2  │
                                                  └──────────┘
┌──────────────────────────────┐
│ Patient health questionnaire │
├──────────────────────────────┴─────────────────────────────────────────────────────────────────────────────────────┐
│┌────────────────────────────────────────────────┐           ┌──────────┐┌───────────┐ ┌─────────────┐ ┌──────────┐ │
││Over the last 2 weeks, how often ...            │           │  Not at  ││  Several  │ │  More than  │ │  Nearly  │ │
│└────────────────────────────────────────────────┘           │   all    ││   days    │ │half the days│ │every day │ │
│                                                             └──────────┘└───────────┘ └─────────────┘ └──────────┘ │
│┌──────────────────────────────────────────────┐                 ┌──┐       ┌──┐            ┌──┐           ┌──┐     │
││1. Little interest or pleasure in doing things│                 │0 │       │1 │            │2 │           │3 │     │
│└──────────────────────────────────────────────┘                 └──┘       └──┘            └──┘           └──┘     │
│┌──────────────────────────────────────────────┐                 ┌──┐       ┌──┐            ┌──┐           ┌──┐     │
││2. Feeling down, depressed or hopeless.       │                 │0 │       │1 │            │2 │           │3 │     │
│└──────────────────────────────────────────────┘                 └──┘       └──┘            └──┘           └──┘     │
│┌───────────────────────────────────────────────────────────┐    ┌──┐       ┌──┐            ┌──┐           ┌──┐     │
││3. Trouble falling or staying asleep, or sleeping too much │    │0 │       │1 │            │2 │           │3 │     │
│└───────────────────────────────────────────────────────────┘    └──┘       └──┘            └──┘           └──┘     │
│┌───────────────────────────────────────────────────────────┐    ┌──┐       ┌──┐            ┌──┐           ┌──┐     │
││4. Feeling tired or having little energy                   │    │0 │       │1 │            │2 │           │3 │     │
│└───────────────────────────────────────────────────────────┘    └──┘       └──┘            └──┘           └──┘     │
│┌───────────────────────────────────────────────────────────┐    ┌──┐       ┌──┐            ┌──┐           ┌──┐     │
││5. Poor appetite or overeating                             │    │0 │       │1 │            │2 │           │3 │     │
│└───────────────────────────────────────────────────────────┘    └──┘       └──┘            └──┘           └──┘     │
│                                                                                                                    │
│                                                                                                                    │
│                                                                                                                    │
│                                                                                                                    │
│                                                                                                                    │
│┌─────────────────────────────────────────────────────────────────────────────┐                                     │
││If you checked off any problems, how difficult have these problems made it...│                                     │
│└─────────────────────────────────────────────────────────────────────────────┘                                     │
│                                                                                                                    │
│┌─────────────┐   ┌───────────┐   ┌─────────────┐   ┌──────────┐                                                    │
││Not difficult│   │ Somewhat  │   │    Very     │   │Extremely │                                                    │
││   at all    │   │ difficult │   │  difficult  │   │difficult │                                                    │
│└─────────────┘   └───────────┘   └─────────────┘   └──────────┘                                                    │
│                                                                                              ┌──────────┐          │
│                                                                                              │  Submit  │          │
│                                                                                              └──────────┘          │
│                                                                                                                    │
│                                                                                                                    │
│                                                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```
