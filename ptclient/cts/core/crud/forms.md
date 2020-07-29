# Q1) What is the goal of user experience of the forms?

1. Give visual feedback to the user that the data was added.
   - There are 2 tables below the form:
     - A. Data added this session: rem/cl/add.vue:46
     - Uses rem/cl/add.vue:76:cfDataSavedToDBThisSessionSuccessfully()
     - B. Error: Reminders attempleted but failed to save rem/cl/add.vue:54
     - Uses rem/cl/add.vue:81:cfDataApiErrorThisSession
2. Visual feedback should come close to where the user eyes are. The visual feedback should not be on top right corner.
   - Achived with 2 tables above.
3. Immediately allow the user to add one more.
   - rem/cl/add.vue:Onsubmit:145 is async
4. User should be able to add 1 more without taking another action with their mouse.
   - Description field has focus using v-on on the div.
5. While the data is being sent to the server allow the user to add one more.
   - same as point 3.
6. If user does "add more" and now there are 2 add more forms open. The first rem has 5 charecters and 2nd rem has 2 charecters.
   On clicking submit the 1st should move down and the 2nd should stay up.
   - rem/cl/add.vue:Onsubmit:154 calls the api in the else part

# Q2) How is the state of data entered in the form managed on client side?

vuex orm field: rowStateInThisSession of type int

e.g. cts/spi/rem/db/vuex-orm/rems:71

# Q3) What are the different possible values for rowStateInThisSession?

0 => Not known
1 => Got from DB. Same as DB.
2 => Created new on client
3 => Created as copy on client
4 => Changed on client
After 2 if there is success the state goes back to 1
5 => Client requested save to server. Now data validation on client side will start.
6 => form error on client side
7 => Data sent to server to save
8 => Data saved to server failed.

Data is stored with the timeline

# Q4) What are the different possible user scenarios?

### Before hitting submit the possibilities are:

```
add -> enter 2 charecters -> remove
                          -> reset form
                          -> Close form and destroy Ct Local variables.
      enter 4 charecters  -> remove
                          -> reset form
                          -> Close form and destroy Ct Local variables.
add -> enter 2 charecters -> Add more -> enter 4 charecters -> Submit
```

### After hitting submit the possibilities are:

onsubmit gets N number of rows.
Some rows are in state 234 (Created new -> Changed -> Requested save to server)
Some rows are in state 2345 (Created new -> Changed -> Requested save to server -> form validation errors)
Incoming may be 2345 since user may hit submit without making changes

Once submit button finishes the possibles states are:
2345
23467
23461

New record changed on client but not saved = 23

- See rem/cl/add.vue:114

New record after data is saved on server. rowStateInThisSession = 23461

- See rem/cl/add.vue:189

# Q5) Why not set rowStateInThisSession = 1 when api succeds?

- For the end user it is a matter of comfort to see the previous data in the table.

# Q6) How is change and discontinued handle?

1. Record is discontinued. Query sent is update. Value will be rowStateInThisSession =

2. When a record is changed
   Since temporal DB old is deleted and new is inserted. But from client side the query sent is update
   rowStateInThisSession =

# Q7) Should data be loaded from localstorage or state?

      There are 2 possibilities
        Possibility 1: There is no unsaved data
        Possibility 2: There is unsaved data on the client browser
                      2A: Unsaved data is in state / vuex
                      2B: Unsaved data is in Indexed DB
      When there is unsaved data we need to load the unsaved data

      The query to load data from vuex is:
      const arFromORM = ormRem.query().where('$isNew', true).get()

      The permanence of data is:
      Least permanane: data (local variable) of ct    -> Does not survive Ct remounting
      Less permanance: State                          -> Survives previous. Does not survive browser refresh
      Middle permancne: Index DB                      -> Survives previous. Does not survice clean cache or using from diff browser
      Most permanent: Mysql                           -> Survives all previous scenarios

      When Ct is mounted the data should come from:
        Step1: Mysql to get permanent data
        IndexDB: to get unsaved data in the client browser

      Why IndexDB and not state?
        When control comes here there are 2 possibilities:
          1. This is page refresh
          2. This is just Ct being remounted or mounted for the first time
          In both the above cases IndexDB will have the correct data
          State will have the correct data only when the Ct is being remounted.
      Should IndexDB be used?
        +Ves:
          Scenario 1: When browser is refreshed the first load of data will be very fast.
          Scenario 2: If there is some data edited and browser is refreshed that data is still there.
          Scenario 3: If there is some data edited and browser/laptop is rebooted that data is still there.
          Scenario 4: When user is not online then also the user can load the patient file.
        -ves:
          Scenario 1: Suppose doctor has added 1 rem but that is only on indexDB since doctor did not hit submit
                      Suppose doctor closes laptop for 2 days
                      when they come back after 2 days there are 3 new rems on the server
                      When doctor starts the browser, in the code I will have to:
                        1. Get data from mysql server.
                        2. Find data from indexDB where the isDirty or isNew flag is true
                        3. Then the data that is found to be different (unsaved data) needs to be inserted into the array that came back from mysql server
                        4. This array needs to be inserted into vuex
                        5. The new vuex needs to be synced with the storage.
        Decision on 8th July 2020 by VK/AG/TJ/SS/RR: Not to use indexDB

# Q7) How to save data to state smartly.

Non smart way is to save data to state on every keystroke.
Why do we want a smart way to save data?
So that the system remains responsive.
There are a lot of listeners on this state and they will update themselves everytime there is a write to the vuexORM/rem

### Strategy 1: Save to state once every 5 key strokes,

        Disadvnatage?
        If the user types "jai kali" the state will only have "jai k" even if user exits the form after one hour

### Strategy 2: Each time you save to state you store the time

        Ignore next save if 1 second has not passed.
        Disadvnatage?
        If the user types "ja" within 1 sec and then exits the state will only have j

# Q8) Should bulk created be used Out of 10 reminders set what if 9 got created successfuly but 1 failed?

      // To keep code simple it was decided by VK on 13th July 2020 that for creasting 10 items we will fire 10 API calls.
