# Specified

## Name (Vikas)

1. Reset form
   1. When I click on reset form the back layer is still orange.
   2. Form fields need to be re-init
2. Submit form
3. Console.error name/cl/table.vue

## Rem (Raj)

1. When changing data

   1. "Saved this session" label is not correctly applied when saving fast.
   2. I change a row then discontinue it. The row does not go away from table. I have to refresh.

2. KB control
   A. Remove tabindex from checkmark of reminder table Line 33 of table.vue otherwise tabs go to right side
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
