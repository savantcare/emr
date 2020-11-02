This is same as reason for visit in P1

After the Anthem review in august 2020 it was decided to call it "bmi"

This is reference implementation for Mr1f

# How is this different from 1rMf

1. Mr1f has add. 1rMf does not have add.
2. Mr1f has multi change. 1rMf does not have multichange.
3. Mr1f single row change can only be invoked from view layer action button. Since the row ID is needed.
   1rMf change can be invked dierctly.

# Q) How should data be saved before sending to DB when user is adding?

## Option 1: Local array

## Option 2: vuex-orm

Positive of saving data in vuex-orm

    1. It is state hence it will survice even if user clicks on cross and that removes the tab and hence component local variable is lost

    2. It will make code of all components similar since each field will have computed property and getter setter for each computed property
    field 1 -> computed property 1 -> getter 1 -> setter 1
    When a input field is changed v-model maintain 2 way reactivity and hence v-model will update the field.
    Ref: https://vuejs.org/v2/guide/forms.html#v-model-with-Components

    If we do add through array each component will implement it differently.

    3. Since we will use vuex-orm localforage hence data will also survice browser refresh
       https://github.com/eldomagan/vuex-orm-localforage

    4. Since submit button will be a state value when submit is pressed some other component will watch if submit is pressed and then act on the data. This will make the work more seperate.
    The name of component watchForUserReviewed
        This function will find
        let results = store.getters['entities/allDirty']();
        Ref: https://github.com/client-side/plugin-change-flags

How to do it?
https://stackoverflow.com/questions/57218760/two-way-data-binding-with-vuex-orm
