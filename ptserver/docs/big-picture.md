# Designing system versioned table

[[toc]]

## What

### Q) What is the common principle to apply?

At T # of rows = # of occurence possible.

|                      | # possible at time T                     | # of rows in table                  | Options in UI                                                                                            | DB Ops                     |
| -------------------- | ---------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------- |
| Recommendation       | Many                                     | 1 for each rec of patient           | Add in card header <br>Change in data row                                                                | insert<br>update           |
| Reminder             | Many                                     | 1 for each rem of patient           | Add in card header<br>Change in data row                                                                 | insert<br>update           |
| Weight               | One                                      | 1 for the patient                   | Change in data row                                                                                       | update                     |
| Dx                   | Many                                     | 1 for each dx of patient            | Add in card header<br>Since there are children change in data row not allowed<br>Discontinue in data row | insert<br><br>delete       |
| Assessment           | Below a DX only 1 asssemment is possible | 1 for each dx of patient            | Change in data row                                                                                       | update                     |
| Appearence below MSE | One                                      | 1 for the patient.                  | Change in data row                                                                                       | update                     |
| Email address        | Many                                     | 1 for each email address of patient | Add in card header<br>Change in data row<br>Discontinue in data row                                      | insert<br>update<br>delete |

## Why

### Q) A user adds a new weight should existing row be edited or a new row be inserted?

(In both cases system verisoning table is used)

Data row options -> A (Add), D (Discontinue)
D is used when a wrong data has been entered.
If user chooses D then run the "delete query". When delete query is run the temporal DB of mariadb does not delete the data. MariaDB only enters the current timestamp in ROW_END

#### Option 1: Edit of same row

Positives:
"as of" query is easier. So -> select weight from weight where paitentUUID='asdasd' as of 1st Jan 2020
"as of" is a new sql term introduced with temporal DB https://mariadb.com/kb/en/temporal-data-tables/#querying-historical-data
Negatives:
Make a time series graph.
Some data needs to be ignored. Doctor entered it by mistake.
This cannot be done.

#### Option 2: Each weight is a new row

Negatives:
To get data "as of" a particular day the query is a bit complicated.
Suppose I want to know the weight on 1st Jan 2020.
So the query has to be "select weight from weight where ROW_START < 1st Jan 2020 and ROW_START is max"
