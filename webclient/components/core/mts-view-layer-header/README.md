# Q1) How complex can the code be?

High school student with 1 month experience should be able to read and understand the code.

# Q2) Why use a different slider instead of slider from elemenet.io?

Requirement: The user can only click on marks and not at other locations on slider.

I (VK in June 20) did not find a way to do it on element.io slider.

I tried using element io -> steps component (https://element.eleme.io/#/en-US/component/steps)
But with stepsComponent I could not make 2 steps far away from each other and other 2 steps close to each other. Since each steps represents
an appt date. When a patient has 3 appts. The first 2 may be 100 days apaprt and the 2nd and 3rd may be 10 days apart.

Hence decided to use: https://nightcatsama.github.io/vue-slider-component/#/

# Q3) What is the difference between "appt start time" and "appt lock time"?

Say Patient John has an appointment with Dr. Savant at 10AM on 5th Feb 2020.
At 10AM John is sitting infront of Dr. Savant in her clinic. Hence 10Am is the appt start time.
Support the appt is for 30 minutes.

At 10:30 Dr. Savant has another appointment.

In the evening at 6PM Dr. Savant finally gets time to finalize the medications for John and lock her note.

timeOfApptStart is "5th Feb 2020 10AM"
timeOfApptLock is "5th Feb 2020 6 PM"

# Q4) What is the core conceptual understanding?

There are 6 important variables:

1. timeOfApptStart | Each gets a point on slider
2. timeOfApptLock | When point is clicked timeOfStateSelectedInHeader is set as timeOfApptLock and NOT timeOfApptStart
3. timeOfStateSelectedInHeader | When in future (2038-01-19 03:14:07.999999) then current data is shown. When < current_time then all components REACT and show data "AS OF" "timeOfStateSelectedInHeader"
4. timeOfEvaluation | Defaults to ROW_START but in the form user can provide a different value.
   | For e.g. when adding weight the user can give measurement time that is different from current time.
   | If no value is provided this is set to ROW_START
5. ROW_START_TIME | Maria DB hidden field
6. ROW_END_TIME | Maria DB hidden field

Ref:

1. https://docs.google.com/spreadsheets/d/1X_WMi5kpADxVWtBnxZ2-yJbNArcnLwqmhJ1JWqr1h9g/edit#gid=0
2. 2038-01-19 03:14:07.999999 -> This is default value stored by MariaDB

# Q5) How is timeOfApptLock managed?

DB -> sc_appointments -> table -> patientAppointment -> Field -> stateOfAppt => enum -> 'apptScheduled','apptCancelled','apptNoteNotLocked','apptNoteLocked'
timeOfApptLock is the ROW_START when stateOfAppt changes to 'apptNoteLocked'

# Q6) How do different components store data on client side?

(mts => mysql time staamp)

    Six goals:
    1. When the same component is loaded twice from the search box on the currentStateDisplayArea server side query is not run 2nd time
    2. Once data comes on component being mounted the view changes instantly when the slider in the header is moved. API query is not run.
    3. Query is only run when the component is visible. So if a component is never visible the query is never run.
    4. left and right side should not use 2 different data sets. How to do it? if data exists in state do not run the API
    5. Historical data once loaded is kept till the time Browser cache is cleaned.
    6. To show historical values of weight or recommendations the data loaded at start is used.

    When a component is mounted they create a array called
      componentNameEvalAtEachRowEnd
        For e.g.  recommendationsEvalAtEachRowEnd
                  weightsEvalAtEachRowEnd the structure is weightsEvalAtEachRowEnd[ROW_END_TIME] = data,time_of_eval,ROW_START_TIME

      From appt table:

      | appt start times | appt lock times  |
      | 20th Feb 10AM    | 25th Feb 2 PM    |
      | 16th March 3 pm  | 21st March 1 PM  |

      slider will have markers at (appt start times) 20th Feb 10AM and 16th March 3 pm. When marker on "20th Feb 10AM" is clicked timeOfStateSelectedInHeader is set as "25thFeb 2 PM" (appt lock time)

      For data that can only be 1 at a given time
      -------------------------------------------
        From weight table
        | Value           | timeOfEval    | ROW_START_TIME     | ROW_END_TIME
        | 185             | 5th Feb 10AM  | 20th Feb 10:30 AM  | 2038-01-19 03:14:07.999999 (Explained in Q4 Ref 2)
        | 190             | 2th Jan 11AM  | 10th Jan 10:30 AM  | 20th Feb 10:30 AM

        weightsEvalAtEachRowEnd[2038-01-19 03:14:07.999999] = 185,mts(5th Feb 10AM)
        weightsEvalAtEachRowEnd[mts(20th Feb 10:30 AM)] = 190,mts(2nd Jan 11AM)

        To generate the above array the query executed on the mariaDB server is:
        SELECT *,ROW_END FROM weights FOR SYSTEM_TIME ALL where patientUuid=current_patient_UUID;

        To show data on graph:
        Take all values from weightsEvalAtEachRowEnd as the Y axis and all EvalTime as X axis.
            So the data set will be
              mts(5th Feb 10AM)           =  185
              mts(2nd Jan 10:30 AM)       =  190
        Key insight -> On graph doctors want to see data on eval time and not on entry time

        To show data for an appointment note (timeOfStateSelectedInHeader is set as timeOfApptLock from the slider in the MULTI_STATE_HEADER) on the MULTI_STATE_DISPLAY_AREA
        weightsEvalAtEachRowEnd array filter where (index / ROW_END) >(is after) timeOfStateSelectedInHeader (use nearest value) and ROW_START < (is before) timeOfStateSelectedInHeader
            So the data set will be
              For appt time 20th Feb 10AM    -> need to show data for 25th Feb 2 PM   -> data for ROW_END > 25th Feb 2 PM -> Hence data for ROW_END = 2038-01-19 03:14:07.999999 -> 185
              For appt time 16th March 3 pm  -> need to show data for 21st March 1 PM -> data for ROW_END > 21st March 1 PM -> Hence data for ROW_END = 2038-01-19 03:14:07.999999 -> 185

      To store data on the client side use vuex-orm

      For data that can be N at a given time
      --------------------------------------
        From recommendations table
        |  uuid of rec  | Value           | timeOfEval       | ROW_START          | ROW_END
        |   xdcf        | Loose weight    | 5th Feb 10AM     | 20th Feb 10:30 AM  | 2038-01-19 03:14:07.999999
        |   erfg        | sleep more      | 20th Feb 10:10 AM| 20th Feb 10:30 AM  | 2038-01-19 03:14:07.999999

        recommendationsEvalAtEachRowEnd[xdcf][2038-01-19 03:14:07.999999] = loose weight,mts(5th Feb 10AM)
        recommendationsEvalAtEachRowEnd[erfg][2038-01-19 03:14:07.999999] = sleep more,mts(20th Feb 10AM)

# Q7) Why the index should be ROW_END_TIME?

Two features of index:

1. Index should be something that is unique
2. Most often used

ROW_END_TIME

1. Will always be unique
2. Most often displayed data is current data. To find the current data current time < ROW_END_TIME

# Q8) How does component data caching work?

    The above object is retained till the time the browser cache is cleared.
    When page is refreshed new data is fetched where row_end is > row_end stored in object index.

# Q9) How does this work for multiple patients?

Each patient gets a state of their own.
Ref: https://github.com/vuejs/vuex/issues/414

When the page loads for first time we look inside the map called "patientStateMap"

if there is an existing patientUuid then we use the corresponding stateUUID
If there is no patientUuid then we create the stateUUID and make a new entry in "patientStateMap"

patientUuid | stateUUID
zxcv | state_for_zxcv  
 swed | state_for_swed

# Q10) What are some previous data patterns evaluated and rejected?

    When a component is mounted they create a array called
      componentNameAtDiffApptLockTimes
        For e.g.  recommendationsAtDiffApptLockTimes
                  weightsAtDiffLockTimes

      Say the appt lock times are:
        25th Feb 2 PM
        21st March 1 PM

      weightsAtDiffApptLockTimes[0] = current weight
      weightsAtDiffApptLockTimes[mts(25th Feb 2 PM)] = weight
      weightsAtDiffApptLockTimes[mts(21st March 1 PM)] = weight

      To generate the above array the query executed is:
      SELECT * FROM weights FOR SYSTEM_TIME AS OF mts(25th Feb 2 PM);
      SELECT * FROM weights FOR SYSTEM_TIME AS OF mts(21st March 1 PM);
      SELECT * FROM weights FOR SYSTEM_TIME AS OF mts(CURRENT_TIME);

      Problems:
        When drawing a graph if there were 5 evaluations done between last appt and this appt then those 4 evaluations will not be on the graph.
