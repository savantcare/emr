This is the ideal component for 1 row multiple field type component.

```
vk-tech@vk-mini-layer2-3 ~/g/s/e/p/c/s/1/weight> cloc --counted=/tmp/files-counted.txt .
       7 text files.
       7 unique files.
Wrote /tmp/files-counted.txt
       2 files ignored.

github.com/AlDanial/cloc v 1.86  T=0.01 s (528.1 files/s, 31009.7 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
Vuejs Component                  3              8             35            307
JavaScript                       2              8              5             33
SQL                              1              2              0             12
Markdown                         1              0              0              1
-------------------------------------------------------------------------------
SUM:                             7             18             40            353
-------------------------------------------------------------------------------

```

Features needed for graph:

1. Small animation
2. Notes can be shown in popups (clickable-points-in-Line-chart)
3. Vertical markers like in apexcharts for med dates. (Annotations)
4. Looks good.

```

Options:                          Looks           Animation    OSS      clickable-points-in-Line-chart   Annotations   Heat Map     vue-integration
1. Apex
2. chartjs                          6                6
3. chartlist-js                     4                8
4. zingchart                                                   No
5. Highcharts                       6                8        Yes                Yes                        Yes          Yes         https://github.com/highcharts/highcharts-vue

Ref: https://www.sitepoint.com/best-javascript-charting-libraries/

Decision: vue-highchrts https://github.com/highcharts/highcharts-vue
```
