# Why write a patient file app?

![eye contact](./docs/images/maintain-eye-contact-with-patient.png)

- Be atleast as good as paper
- Maintain eye contact with patient
  [Get out of the way of patient doctor relationship](https://khn.org/news/death-by-a-thousand-clicks/)
- Be helpful

# Show me?

[Demo](http://116.203.134.163/pf/abcd)

[Documentation](https://savantcare.github.io)

Todo:

1. Left side scroll when work product drawer is open @raj

   1. Possible solution?
      1. https://stackoverflow.com/questions/52384666/vuetify-non-scrolling-navigation-drawer
      2. https://github.com/ElemeFE/element/issues/17713
      3. https://stackoverflow.com/questions/27230955/how-to-disable-scrolling-in-the-background-when-the-mobile-menu-is-open
   2. Should I just use divs instead of drawer. 1. Negatives 1. The slide in effect is not there for Divs
      Maybe solved by 1. Marks where the mouse movement will invoke a component -> If analysis mode is active I cannot activate the analysis mode.

2. For the unlocked note the amendment icon will behave differently. Invoke reminder command if I click on the amendment icon

3. Content assist @vikas

4. Dont show prev and next if it is the first or last note.

5. Slider value does not change when prev and next inside note is clicked

6. On some prev and next multiple icons on the timeline are becoming green

7. On page load in the appt slider the unlocked note should be active.

Asked question on internet:

1. right click menu: https://github.com/rawilk/vue-context/issues/72

# Should there be a context menu?

```

Comparisons                                   Stars     Weekly download  Last update       Tree of menu      Retain native cut/copy/paste
https://github.com/rawilk/vue-context           205        8047          16 days ago           Yes                 Not sure
https://github.com/vmaimone/vue-context-menu    254        1506            July 17

```
