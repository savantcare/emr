```
Introduction
===============
Psych Review of Systems (PRS in short) has 18 sub sections. The sections are as follows:

Gateway Mood Symptoms,
Depression,
Mania / Hypomania,
Psychosis,
Sleep,
Substance Use,
GAD,
Panic Attacks,
Social Anxiety,
OCD,
PTSD,
ADHD,
Anorexia,
Bulimia,
Dementia,
Suicide Assessment,
Homicide Assessment,
Subjective

Fields of sub section 'Gateway Mood Symptoms':
=============================
In the past 10 days, how many days have you felt depressed for most of the day?
In the past 10 days, how many days have you felt low interest or motivation throughout most of the day?
In the past 10 days, how many days have you been abnormally irritable throughout most of the day?
In the past 10 days, how many days have you been abnormally energetic or high energy throughout most of the day?
In the past 10 days, how many days have you felt abnormal mood elevation throughout most of the day?
How difficult to the above symptoms make your day to day life?



Fields of sub section 'Depression':
====================================
Depressive mood,
Interest,
Sleep,
Guilt / Self Esteem,
Energy,
Conc/Distir,
Appetite,
PMR/PMA,
Sl,
Note



Fields of sub section 'Mania / Hypomania':
==========================================
Mood elevation
Irritable
Energy/GDA/PMA
Sleep need
Talking
Racing Thoughts/FOI
Distractibility
High Risk Behaviour
Note



Fields of sub section 'Psychosis':
===================================
Delusions
Hallucinations
Disorganized Speech
Disorganized or Catatonic Behavior
Negative Sx's
Note



Fields of sub section 'Sleep':
=============================
Average number of hours slept per night (doctors assessment)
Note



Fields of sub section 'Substance Use':
======================================
Used in larger amounts or over longer period than intended
Persistent desire or unsuccessful efforts to cut down or control use
A great deal of time spent in activities necessary to obtain substance, use substance or recover from its effects
Craving
Failure to fulfill major role obligations at work, school, or home due to use
Continued use despite recurrent social or interpersonal problems due to use
Recurrent use in situations in which physically hazardous
Use despite knowledge of physical or psychological problems likely exacerbated by use
Tolerance (need increased amounts or diminished effect)
Withdrawal
Note


Fields of sub section 'GAD':
=============================
Excess worry or anxiety
Difficult to control worry
Restless or on edge
Fatigued
Difficulty Concentrating
Irritability
Muscle Tension
Sleep Disturbance
Note




Fields of sub section 'Panic Attacks':
======================================
Panic Attacks Per Month
Impairment Caused by Panic Attacks
Intensity of Panic Attacks
Note



Fields of sub section 'Social Anxiety':
=======================================
Marked anxiety about 1 or more social situations
Fear that will act in a way that will be negatively evaluated
Social situation(s) almost always provokes anxiety
Social situation(s) is avoided or endured with intense anxiety
Anxiety is out of proportion to actual threat of the situation
Note



Fields of sub section 'OCD':
=============================
Obsessions
Compulsions
Distressing or Impairing or Time-Consuming ( > 1 hr/day)
Insight
Note


Fields of sub section 'PTSD':
=============================
Re-experiencing Symptoms
Avoidance Symptoms
Arousal Symptoms
Negative Mood or Cognitions
Note


Fields of sub section 'ADHD':
=============================
INATTENTION
HYPERACTIVITY
Careless mistakes or poor attention to detail
Problem sustaining attention
Poor listening
Fails to finish tasks
Difficulty organizing tasks
Reluctant to engage in tasks that require sustained mental effort
Loses things often
Distracted by extraneous stimuli
Forgetful daily activities
Fidgets often
Leaves seat often when sitting is expected
Feels restless
Unable to engage in leisurely activities quietly
Seems "on the go" or "driven by motor"
Talks excessively
Blurts out often
Difficulty waiting turn
Interrupts or intrudes on others
Note



Fields of sub section 'Anorexia':
=================================
Food restriction leading to significantly low weight
Intense fear of gaining weight or behavior that interferes with wt gain
Body image disturbance, or excess influence of shape on self evaluation, or denial of seriousness of low body weight
Latest BMI
Note



Fields of sub section 'Bulimia':
=============================
Binge eating (large quantity and lack of control of eating)
Compensatory behaviors (vomiting, laxatives, fasting, exercise)
Self evaluation highly influenced by shape
Note



Fields of sub section 'Dementia':
=============================
Note


Fields of sub section 'Suicide Assessment':
===========================================
Does patient report suicidal ideations ?
Note




Fields of sub section 'Homicide Assessment':
============================================
Does patient report homicidal ideations ?'
Note



Fields of sub section 'Subjective':
============================================
Note






 Layer 1 interaction
 ===================


                                                                                 ┌─────────────────────┐
 ┌──────────────────────────────────────────────────────────────────┐   ┌────────┤ Card header actions ├──────────┐
 │  ┌─────────────────────────────────────────┐          ┌─────────┐│   │        └─────────────────────┘          │
 │  │ Subjective and Psych Review of Systems  │          │    A    ││   │A -> Multi add option                    │
 │  └─────────────────────────────────────────┘          └─────────┘│   │                                         │
 │                                                                  │   │                                         │
 │  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │   └─────────────────────────────────────────┘
 │   Gateway Mood Symptoms                                   A  G   │
 │  │                                                             │ │
 │   ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │              ┌─────────────────┐
 │  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │   ┌──────────┤Data row actions ├─────────────┐
 │   Depression.                                             A  G   │   │          └─────────────────┘             │
 │  │                                                             │ │   │A -> Form to add data                     │
 │   ─ ─ ▲ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │   │                                          │
 │       │                                                          │   │G -> Graph                                │
 │       │                                                          │   │                                          │
 │       │                                                          │   │                                          │
 │       │                                                          │   └──────────────────────────────────────────┘
 │       │                                                          │
 │       │                                                          │
 │       │                                                          │   ┌───────────────────────────────────────┐
 │       │                                                          │   │Only gateway mood and depression has   │
 │       └──────────────────────────────────────────────────────────┼───┤been show for demonstration purpose.   │
 │                                                                  │   │Here will be all 18 sub sections in row│
 │                                                                  │   │wise manner.                           │
 │                                                                  │   │                                       │
 │                                                                  │   └───────────────────────────────────────┘
 │                                                                  │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘





 In layer 2, this is what it will look like when A clicked
 ==========================================================


┌───────────────────────────────────────────────────────────────────────────────────────────────────────┐
│┌────────────────────────┐                                                                             │
││Gateway Mood Symptoms   │                                                                             │
│└────────────────────────┘                                                                             │
│                                                                                                       │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   ┌────┐            │
│  In the past 10 days, how many days have you felt depressed for most of the day? │  │ 2  │◀───────────┼───┐
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   └────┘            │   │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   ┌────┐            │   │
│  In the past 10 days, how many days have you felt low interest or motivation     │  │ 1  │◀───────────┼───┤
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   └────┘            │   │
│                                                                                                       │   │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   ┌────┐            │   │
│                                                                                  │  │    │◀───────────┼───┤
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   └────┘            │   │
│                                                                                                       │   │
│                                                                                                       │   │
│                                                                                                       │   │
│                                                                                                       │   │
│                                                                                                       │   │
│                                                                                                       │   │
│                                                                                                       │   │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  ┌────────────┐     │   │
│  How difficult to the above symptoms make your day to day life?                  │ │ Not at all │◀────┼───┤
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  └────────────┘     │   │
│                                                                                                       │   │
│                                                                                                       │   │
│                                                                                     ┌──────────────┐  │   │
│                                                                                     │     Save     │  │   │
│                                                                                     └──────────────┘  │   │
│                                                                                                       │   │
│                                                                                                       │   │
│                                                                                                       │   │
└───────────────────────────────────────────────────────────────────────────────────────────────────────┘   │
                                                                                                            │
                                                                          ┌──────────────────────────┐      │
                                                                          │   These are dropdowns    ├──────┘
                                                                          └──────────────────────────┘

```
