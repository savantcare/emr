# Specified

## Name

1. Reset form
   1. When I click on reset form the back layer is still orange.
   2. Form fields need to be re-init
2. Submit form

## Rem

1. Better variable name c.vue line 201 requestedToRowId

2. When changing data

   1. all the date in history shows up as the same date.
   2. "Saved this session" label is not correctly applied.

3. Make the X work in a drawer.

   # Method 1: Get discontinued rows from orm using query like: select max(id) where ROW_END < current_time group by 'uuid'

   Problem:- But I am unable to find vuex-orm groupBy query

   # Method 2: Get all the rows having ROW_END is less then current_time. Then after, using forEach loop remove the current record.

   Problem:- But it is not standard method.

   # Method 3: When i click on 'X' button, send a api request to the server and get all the discontinued rows.

   Problem: It is not satisfying our P20 architecture.

   # Method 4: Maintain a 'isDiscontinued' enum(0 ,1) flag in database. But need to approval from Vikas sir.

   - Need to discuss

4. Console.error name/cl/table.vue

5) KB control
   A. Remove tabindex from checkmark of reminder table Line 33 of table.vue
   B. On tab the control should not go to browser back forward and address bar

# Cannot replicate

1. I discontinued 3 reminders at once but those 3 still remained in the table.

# Not specified

1. When I hit submit the form and the form was submittingf and then i entered and saved again. The system got confused.
   Ref: https://github.com/axios/axios/issues/1010

2. Work is done -> make another pull request -> Discontniue and multi discontinue need a response if it was success or not.
   add doc about using map and why a for loop was not used.

# Low priority:

1. In default.json i set config.artificial_delay_in_response_from_node_server=0 but it is not taking effect.
