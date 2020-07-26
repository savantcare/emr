1. We use temporal table to delgate a lot of work to DB
https://mariadb.com/kb/en/temporal-data-tables/

2. We use UUID since:

A. UUID values do not expose the information about your data so they are safer to use in a URL. For example, if a customer with id 10 accesses his account via http://www.example.com/customers/10/ URL, it is easy to guess that there is a customer 11, 12, etc., and this could be a target for an attack.

B. UUID values can be generated anywhere that avoid a round trip to the database server. It also simplifies logic in the application. For example, to insert data into a parent table and child tables, you have to insert into the parent table first, get generated id and then insert data into the child tables. By using UUID, you can generate the primary key value of the parent table up front and insert rows into both parent and child tables at the same time within a transaction.

For e.g. Dx and Assessment is added by user. in uuid both can be saved at one time. In case of PKey being int first DX needs to be saved. A pkey needs to be generated and then assessment needs to be saved.


C. There are 2 systems before _V20 and V20. For them to co-exist UUID is needed otherwise there will be primary key clash

Ref: https://www.mysqltutorial.org/mysql-uuid/


3. How is time stored?

A. We use datetime as the field type. Since tiemstamp is 4 bytes and cannot store beyond 2038
B. In the field the value is always in UTC. Hence timezone need not be stored.


Questions:
1. Should I use binary_short?
https://mariadb.com/kb/en/uuid_short/
2. Should I use sequntial UUID?
https://stackoverflow.com/questions/50493449/how-can-i-generate-a-uuid-guid-in-mariadb-10-1


