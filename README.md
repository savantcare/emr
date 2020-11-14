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

1. complet DB interaction of Cts
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

Pirority:

1. Once vue collabpsible installed the vue-horizontal-list does not work
2. the appt date is visible for that i need to slide a little
3. formdef file should control what buttons show under a form. Using that remove the "reset" button in the add form @vikaskedia
4. Internally change px to rem everywhere.
5. Father added on Oct3rd. Mother added on Nov 11th. Mother also shown on Oct3rd slide.
6. Coding
   https://codepen.io/chillco/pen/BaaXYBO
   https://codepen.io/sustained/pen/Rwbdgob
7. Internal users like doctors login using oauth Using: https://github.com/dgrubelic/vue-authenticate
8. Protect against tab closed before "Reviewed lock the note" is clicked https://github.com/championswimmer/vuex-persist
9. Patient timeline: https://jinfang134.github.io/vue-pipeline/
10. Top header appt slider / search / code / timeline -> expandable
    https://stackoverflow.com/questions/58100158/how-to-use-vue-transition-to-expand-and-shrink-a-div
    https://jsfiddle.net/7bcs2er6/1/
    https://codepen.io/sustained/pen/Rwbdgob
11. Search in top header using https://theoxiong.github.io/vue-search-panel/
12. Put page in full screen using https://mirari.cc/vue-fullscreen/
