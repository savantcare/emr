```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│Introduction                                                                                              │
│============                                                                                              │
│                                                                                                          │
│Important points for better understanding work flow of Diagnosis-Assessment:                              │
│                                                                                                          │
│1. Diagnosis (dx in short) can have multiple entries for a patient.                                       │
│2. Each "Diagnosis" can have only one "Assessment".                                                       │
│3. You can not change a "Diagnosis" but can change the "Assessment" written under it.                     │
│4. If any change is needed in the diagnoses list then you have to "Discontinue" the obsolete "Diagnosis"  │
│first then "Add" a new "Diagnosis".                                                                       │
│5. Diagnoses are selected from a predefined list of ICD10 Codes                                           │
│                                                                                                          │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘

 Layer 1 Card:
 =============

┌────────────────────────────────────────────────────────────────────┐      ┌────────────────────────────┐
│                                                       ┌─────┐┌──┐  │      │  Icon to share dx list in  │
│ Diagnosis                                             │ A D ││  ◀──┼──────┤       common screen        │
│                                                       └─────┘└──┘  │      └────────────────────────────┘
├────────────────────────────────────────────────────────────────────┤      ┌────────────────────────────┐
│                                                                    │      │Header icons                │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │      │=============               │
│  Diagnosis 1                                                     │ │      │A: Add new diagnosis        │
│ │                                                                  │      │D: Show discontinued list   │
│                                                                  │ │      └────────────────────────────┘
│ │  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┌───────┐─   │
│     Assessment for Diagnosis 1                        │ C I D │ ││ │  ┌───────────────────────────────────────────┐
│ │  │                                                  └───────┘    │  │Action buttons of card body                │
│     ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘│ │  │==============================             │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │  │When dx has assessment:                    │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┬───────┬ ─  │  │------------------------                   │
│  Diagnosis 2                                          │ A I D │  │ │  │C: Change assessment written under dx      │
│ │                                                     └───────┘    │  │I: Information about activities done on    │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │  │this dx                                    │
│                                                                    │  │D: Discontinue diagnosis                   │
└────────────────────────────────────────────────────────────────────┘  │                                           │
                                                                        │*Note: Please see introduction section to  │
                                                                        │understand why the Assessment has only     │
                                                                        │"Change" and Diagnosis has only            │
                                                                        │"Discontinue"                              │
                                                                        │                                           │
                                                                        │When dx has no assessment                  │
                                                                        │---------------------------                │
                                                                        │A: Add assessment under this diagnosis     │
                                                                        │                                           │
                                                                        │*Note: As Diagnosis 2 do not have any      │
                                                                        │assessment written on hovering "A" icon is │
                                                                        │displayed. Once an assessment is written it│
                                                                        │will be replaced by "C" icon               │
                                                                        │                                           │
                                                                        └───────────────────────────────────────────┘



 Layer 2, Add new diagnosis:
 ===========================
  ┌───────────────────────────────────────────────────────────────────────────────────┐
  │This card will open up when "A" icon is clicked from header icon list of dx layer 1│
  └───────────────────────────────────────────────────────────────────────────────────┘

 ┌───────────────────────────────────────────────────────────────────┐
 │ Add Diagnosis                                                     │
 │                                                                   │
 ├───────────────────────────────────────────────────────────────────┤
 │                           ┌─────────────────────────┐             │
 │         Name *            │Select diagnosis       ▼ │             │
 │                           └─────────────────────────┘             │
 │                           ┌─────────────────────────┐             │
 │         Start date *      │                         │             │
 │                           └─────────────────────────┘             │
 │                           ┌─────────────────────────┐             │
 │         Assessment        │                         │             │
 │                           └─────────────────────────┘             │
 │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │
 │                     ┌──────┐ ┌───────────────┐                    │
 │                     │ Save │ │ Add one more  │                    │
 │                     └──────┘ └───────────────┘                    │
 └───────────────────────────────────────────────────────────────────┘


 Layer 2, Add Assessment:
 ===========================
  ┌───────────────────────────────────────────────────────────────────────────────────┐
  │This card will open up when "A" icon is clicked from diagnosis row of dx layer 1   │
  └───────────────────────────────────────────────────────────────────────────────────┘

 ┌───────────────────────────────────────────────────────────────────┐
 │Add assessment                                                     │
 │                                                                   │
 ├───────────────────────────────────────────────────────────────────┤
 │                                                                   │
 │         ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐           │
 │          Diagnosis name:  Diagnosis 2                             │
 │         └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘           │
 │                                                                   │
 │         ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐           │
 │          Added by:        Dr VS                                   │
 │         └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘           │
 │                      ┌────────────────────────────────┐           │
 │         Assessment:  │                                │           │
 │                      │                                │           │
 │                      │                                │           │
 │                      └────────────────────────────────┘           │
 │                                                      ┌──────┐     │
 │                                                      │ Save │     │
 │                                                      └──────┘     │
 └───────────────────────────────────────────────────────────────────┘
```
