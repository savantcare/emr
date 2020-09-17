[[toc]]

## Section 1: Graphical representation of end product

<<< @/ptclient/cts/core/manage-cl-tabs/DESIGN.md

## Section 2: Feature to code relationship

| #   | Feature                | Client side state                 | Server side state | Component                          | Client side code                                                                                                                                                                  | Server side code |
| --- | ---------------------- | --------------------------------- | ----------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 1   | Dialog containing tabs | vblIsdialogHoldingTabsInClVisible | None              | ctShowAddAndRemoveTabsInDialog.vue | [Dialog containing tabs](https://github.com/savantcare/emr/blob/3e5abdae677e3621559b65ee9bc33544ceb103b3/ptclient/cts/core/manage-cl-tabs/ctShowAddAndRemoveTabsInDialog.vue#L20) | None             |
| 2   | Add a tab              | arTabs                            | None              | ct-search-inside-add-tab-in-cl.vue | [Add a tab](https://github.com/savantcare/emr/blob/3e5abdae677e3621559b65ee9bc33544ceb103b3/ptclient/cts/core/manage-cl-tabs/ct-search-inside-add-tab-in-cl.vue)                  | None             |
| 3   | Remove a tab           | same as 2                         | None              | same as 1                          | [Remove a tab](https://github.com/savantcare/emr/blob/3e5abdae677e3621559b65ee9bc33544ceb103b3/ptclient/cts/core/manage-cl-tabs/ctShowAddAndRemoveTabsInDialog.vue#L188)          | None             |
| 4   | KB interaction         | vsSelectedTabId                   | None              | same as 1                          | [KB interaction](https://github.com/savantcare/emr/blob/3e5abdae677e3621559b65ee9bc33544ceb103b3/ptclient/cts/core/manage-cl-tabs/ctShowAddAndRemoveTabsInDialog.vue#L121)        | None             |
| 5   | Set of tabs            | same as 2                         | None              | ct-set-of-tabs.vue                 | [Set of tabs](https://github.com/savantcare/emr/tree/master/ptclient/cts/core/manage-cl-tabs/ct-set-of-tabs.vue)                                                                  | None             |
