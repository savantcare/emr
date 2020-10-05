# 21st July 2020

1. 6 steps of hello world record 1 hour tutorial with 3 developers and then record Q&A
2. Automated testing github CI
3. rowstatus.js works with multiple fields.

# Older:

1. Body measurement component

-- discussed till here.

4. When I refresh with recommendation on right and left. 8 sql queries are made. Is that correct?

4) May depend on 2
   DataTable.vue line 201 code should not be needed
   if (this.typeOfStateDisplayArea == "ptsvl") {
   this.$store.dispatch("dbGetMyRecommendationsInSM", params);
      this.$store.dispatch("dbGetOtherRecommendationsInSM", params);
   }
   since recommendation component during mount will do a if check and call above 3 lines or following 4 lines

   this.\$store.dispatch("dbGetMultiStateMyRecommendationsInSM", {
   date: this.timeOfState,
   patientId: this.patientId,
   userId: this.userId
   });

   depending on value of typeOfStateDisplayArea

5) May depend on 2
   In layer1card.vue this reaction should only happen if the compoent has been instantiated with typeOfDisplay=multiStateDisplay

   watch: {
   timeOfState() {
   console.log("timeOfState is changed");
   const params = {
   date: this.timeOfState,
   patientId: this.patientId,
   userId: this.userId
   };
   this.$store.dispatch("dbGetMultiStateMyRecommendationsInSM", params);
         this.$store.dispatch("dbGetMultiStateOtherRecommendationsInSM", params);
   }
   }

# VK to understand and verify

1. KB focus issues
   When I press C to invoke change "C" goes into textarea.
   When I press M the focus is sometimes not correct.
   When I press A to add the focus is not in the text area.

2. Earlier when I gave a command both the old and new card used to be there. Now the old card goes away.

3. Left and right should depend on a common state.

   cts/recommendations/stateDBSocket.js read comments on line 6
   Store the state in 2 dimensional array with the timeOfState being the key. Reasons:

   1. Caching
   2. Both left and right will operate on same data set. Currently they are operating on 2 different data sets.

# Done - need to demo:

1. On dragging an API needs to be fired that updates the priority in DB. How to maintain the priority in DB is explained in Q13 of howto https://savantcare.github.io/tech/howto.html#q13

2. Use temporal DB concept to show the change history for a recommendation that has been changed
   1. The multichange slider needs a page number component at the bottom

# Milestone 5:

1. Inside cts/common/DataTable.vue:231

   if (this.typeOfStateDisplayArea == "ptsvl") {
   this.$store.dispatch("dbGetMyRecommendations", params);
      this.$store.dispatch("dbGetOtherRecommendations", params);
   } else {
   this.$store.dispatch("dbGetMultiStateMyRecommendations", params);
      this.$store.dispatch("dbGetMultiStateOtherRecommendations", params);
   }

How will this work for 40 components

The data table should recv data to show instead of calling function to get the data.

2. The data for previous appts is not cached. One more dimension should be increased in recs data structure.

Ref: cts/patient/Recommendations/stateDBSocket.js:6 Using apollo solves this problem without increasing the dimensions.

3. Lock
   Before locking -> All health components DB_SC_Components_V20->componentStateReviewedOn > "previous appt lock dateTime"
   There is a button to Lock appt when the point on the slider is clicked.

4. Stage 3: Store addendums in the DB
   apptUuid, componentUUID, AddendumText, recordChangedByUUID, recordChangedOnDateTime, recordChangedFromIPAddress

5. Not reverting back in case of failure to update

6. When I first load 4 queries are getting executed I could have possibly done it with 1 query. Using apollo solves this problem. Curretnly lot of extra data is being returned from the server.

7. In case of "Add" when I click on "Add more" and then I change my mind I want to remove the 2nd domain.

8. 10 components of production quality.

# Milestone 6:

1. Give me a page where I can create a new patient

2. Give me a page where I can choose from a list of patients whose patient file I want to open.

   1. Opening a patient file without a valid patient IDn should redirect to search page.

3. History slider at the bottom when changing a single rec is incorrect.

== Stuck

1. KB interaction

   1. Multi select using KB

2. Search

   1. Highlight the search term in each row of the result. For e.g. https://vuetifyjs.com/en/cts/autocompletes/
      Open soruce components: <vue-simple-suggest> https://github.com/KazanExpress/vue-simple-suggest
      https://github.com/FireLemons/Abbreviation-Autocomplete

3. Animation
   1. When I give the command the card should come from the bottom since that is the chat interface people are used to. Currently the card comes from the top. Reference: See how skype works.

== Not organized

1. Dx is not using CardHeader.vue

2. Should single tab data table and multi tab data table components be 2 different components.

3. Code repeated between components.

   1. DB
   2. KB traverse

4. Code refactor

   1. https://github.com/savantcare/patientfile/blob/62d857092560bb2770611fd9cbef4012adbca00d/vue-client/src/store/modules/recommendation.js#L181 section for "Server connection error" is missing. Why not call deleteRecommendation() in a for loop from inside multiDeleteRecommendations (@jana)

# Dr. Parikh meeting on 2nd June:

1. sort
2. when there is only 1 col it wastes a lot of space.
3. default sort is priority and inside that updated at
4. col headers needs user friendly names
5. on multi select the data row options still come
6. new tab behavior is not ok
7. How to make a card as reviewed on?
8. "Created on" date -> shows computer time -> need to appyly a transform.
9. no need for hospitalization / self harm / rename bodyMeasurement to Vitals.

10) On the left for a previous date:

A. All card header and data row actions are hiden. In the card header only 1 option comes and it is called "Addendum"
(System only allows user to add a addendum. The addendum can be added to any componenet.)

B. It looks like paper.
e.g. Make the blue print black. So we know it is uneditable. If the note is for current time then it should look editable and it should update.

Take ideas of look from https://css-tricks.com/how-to-create-a-notebook-design-with-css/

C. For prev date => On left side when there is no data then it should not take space.

11. The header should make it clear that left side is for current time.

# Wait for doctor to complain

1. Size limitation of Doctors laptop (WDC)
   1. There is wasted column space in data row table.
   2. Too much space being wasted in Ct Name and then yours and others.

# KISS

1. Only 1 doctor gets to choose columns and not other doctors.

- 1. The column names are not user friendly.
- 2. Add new columns "duty" on the "users" table. Columns editing feature is allowed to the "duty - leader" users.
