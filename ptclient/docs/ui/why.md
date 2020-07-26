[[toc]]

## Q1) Why patient app has left side and right side in layer 1?

Psychiatrist needs to be able to look at multiple historical states to make decisions and change the current state.

Left side shows the state of the :pt: on a particular date.

![state-of-patient](./images/state-of-patient-on-a-specific-date.png)

Right side is to change the current state of the :pt:.

![Change state of patient](./images/change-state-of-the-patient.png)

The same componet is used on left and right hand side of layer 1. Just with different JSON data being returned from server

Left side is "Data as on time X"

Right side is "Data at current time"

## Q2) Why does the left side have two tabs on the top right corner in layer 1?

The 1st tab shows the health components and the 2nd tab shows the non-health components. There is a master table of components. And each component is either a health component or a "not-health" component.
![patient file](./images/two-tabs-in-the-header.png)

## Q3) Why does the 2nd layer multi change tabs have prev and next?

![patient file](./images/page-in-2nd-layer.png)

## Q4) Why is prioritization important?

Most data like recommendations made to paient. Goals of the patient etc .. have a priority to them.

![patient file](./images/rex-ordering-demo.gif)

# Why choose vxe-table for Table component

Features needed:

1. KB control
   https://xuliangzhan_admin.gitee.io/vxe-table/#/table/advanced/highlight
   element.io => Alexey was able to implement it

2. Infinite scroll as a better form of paging
   Element.io has it:
   https://jsfiddle.net/PeachScript/uyjb6z34/
   https://peachscript.github.io/vue-infinite-loading/guide/use-with-el-table.html

3. Drag and drop rows for priority setting
   element io may be able to do it.

   - https://www.npmjs.com/package/element-ui-el-table-draggable
   - https://github.com/ElemeFE/element/issues/5684
   - https://github.com/WakuwakuP/element-ui-el-table-draggable

   https://sortablejs.github.io/Vue.Draggable/#/table-example

   https://github.com/nhn/tui.grid/ -> No

4. Documentation in english

5. Extend to show row details
   https://xuliangzhan_admin.gitee.io/vxe-table/#/table/advanced/expandAccordion
   https://examples.bootstrap-table.com/#options/detail-view.html
   https://element.eleme.io/#/en-US/component/table#expandable-row

6. Hide header. Since components like Rem have self explanatory column heading like description.
   https://xuliangzhan_admin.gitee.io/vxe-table/#/table/base/header
   https://examples.bootstrap-table.com/#options/show-header.html
   elelemt.io/table has show-header

7. Mini size
   https://xuliangzhan_admin.gitee.io/vxe-table/#/table/base/header
   elelemt.io/table has size=mini

8. Good performance
   elkement.io with 100 rows is giving bad performance to VK on 10th July 2020 but paging solves problem
   Ref: https://github.com/ElemeFE/element/issues/6089
   vxe-table implement concept of virtual table.

9. Paging component
   vue-easytable
   http://doc.huangsw.com/vue-easytable/app.html#/pagination  
   element-io: Seperate paging componet integrated with tablk.
   vxe-table: Yes

Features not needed:

1. select column on client side:
   https://xuliangzhan_admin.gitee.io/vxe-table/#/table/advanced/toolbar

2. Print:
   https://xuliangzhan_admin.gitee.io/vxe-table/#/table/advanced/toolbar
