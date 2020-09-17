[[toc]]

## Section 1: Graphical representation of end product

<<< @/webclient/cts/spi/rec/design/design.md

## Section 2: Feature to code relationship

| #   | Feature | Client side state | Server side state                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Component | Client side code | Server side code |
| --- | ------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------------- | ---------------- |
| 1   | Add rex |                   | [sql for doctorRecsForPts](https://github.com/savantcare/emr/blob/master/webclient/cts/spi/rec/db/structure/sc_rec/doctorRecsForPts/structure-gen-on-2020-07-01.sql), [testdata for doctorRecsForPts](https://github.com/savantcare/emr/blob/master/webclient/cts/spi/rec/db/structure/sc_rec/doctorRecsForPts/testdata-gen-on-2020-07-01.sql), [sql for recLanguage](https://github.com/savantcare/emr/blob/master/webclient/cts/spi/rec/db/structure/sc_rec/recLanguage/structure-gen-on-2020-07-01.sql) |           |                  | None             |
