# Why write a patient file app?

![eye contact](./docs/images/maintain-eye-contact-with-patient.png)

- Be atleast as good as paper
- Maintain eye contact with patient
  [Get out of the way of patient doctor relationship](https://khn.org/news/death-by-a-thousand-clicks/)
- Be helpful

# Show me?

[Demo](http://116.203.134.163/pf/abcd)

Key things to see:

1. Back and forth on a entity
2. Back and forth on the note
3. SS and ROS
4. SC Brain
5. Add task.
6. Patient portal
7. HDR

[Documentation](https://savantcare.github.io)

Todo:

1. complete DB interaction of Cts
2. Only do for reminders. For the unlocked note the amendment icon will not be there. Instead of the amendment icon, show row level and card level actions on mouseover.
3. For appt note of multiple pages there is contnet overflow. Similar question answered on stackoverflow at: https://stackoverflow.com/questions/39486352/a4-page-like-layout-in-html
4. Dont show prev and next if it is the first or last note.
5. Content assist @vikas

Asked question on internet:

1. right click menu: https://github.com/rawilk/vue-context/issues/72

# Should there be a context menu?

```

Comparisons                                   Stars     Weekly download  Last update       Tree of menu      Retain native cut/copy/paste
https://github.com/rawilk/vue-context           205        8047          16 days ago           Yes                 Not sure
https://github.com/vmaimone/vue-context-menu    254        1506            July 17
```

Decisons: 3. Should rem be only on font?
-- It seems that the font-size in REM is important but not relevant for other elements. So its not necessary to use REM throughout your whole project.
Ref: https://stackoverflow.com/questions/26361748/are-rem-units-only-useful-for-font-size

Pirority:

1. get tribute working for Chief complaint
   No match found should not be there
   dropdown is also coming at bottom - it should not be there
   integration with add-form.vue and edit-form.vue. Remove the old chief complaint field of type text and only the tribute type field should be there.
2. Notes not getting locked the 2nd time onwards
3. Addendum not working.
4. Shortcut to set values
5. Focus not working for (Should the code be written with a Object instead of events)
   A. Number field
   B. I click outside the change paper and then open the change paper again.
   C. instead of 200ms hardcoded it needs to be callback so it is smooth
   D. When I use keyboard shortcut to go to a different tab the focus does not change.
   E. When I go to service statement the focus is not on the right area of the form.
6. When header appointments are changed choosing different slides of chief complaint.
7. Enter key to behave better => Check family history. Problem video recorded on 29th Nov
8. Get scBrain to work from button as a paper
9. Internal users like doctors login using oauth Using: https://github.com/dgrubelic/vue-authenticate
10. Protect against tab closed before "Reviewed lock the note" is clicked Phase 1 -> Save to local storage on each chnage. Read from local straoge when load. Phase 2 -> Only If system becomes slow -> if 1. No activity for 5 seconds 2. The data has some edits compared to last time save happened. B. On page reload resotre from local storage and fire api in background for update
11. Put page in full screen using https://mirari.cc/vue-fullscreen/
12. Patient timeline: https://jinfang134.github.io/vue-pipeline/
13. Search in top header using https://theoxiong.github.io/vue-search-panel/
14. Panel for: Medications
15. Reminders multi edit system along with horizontal tabs.
16. A way to mark template values like "All normal"
17. Automated test.
18. For MROS When none is selected others need to removed from vuex-orm
19. For SS mutually exclusive
20. Dx, Screen,
21. Meds list
    add a row with a button at top https://stackoverflow.com/questions/38505806/add-remove-rows-in-ag-grid
    Auto fit cols
    Filters terms at top like https://inspiredehrs.org/medication-list/#
    date in cell editing https://plnkr.co/edit/?p=preview&preview
    note col open when row is clicked like in https://inspiredehrs.org/medication-list/# maybe use https://www.ag-grid.com/javascript-grid-master-detail/
22. Dot phrases
    https://github.com/hasinhayder/javascript-text-expander
    https://github.com/github/text-expander-element
    Ideal: https://www.statnote.com/
