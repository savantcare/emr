# Q1) Should ROW_START and ROW_END be string or numnber?

        vuex-orm does not have a native type called Date. The native data types are at: https://vuex-orm.org/guide/model/defining-models.html#generic-type
           + ves of storing as a number:
             1.  When using data
                    At a lot of places in the code I will need to compare the current time with ROW_END
                    For e.g. 1. To decide if the row is discontinued.
                           2. For a previous appt to decide if the row was discontinued before that appt time.
             2. Whhen reading data
                  MariaDB is already storing the ROW_START and ROW_END as numbers.
             3. When saving data
                  I can again use numbers. No need to change from string to numbers.

# Q2) On the client side should I work with seconds or microseconds?

          ROW_START and ROW_END are stored as timestamp(6). This mneans there is 6 digits of precision hence in microseconds
              Ref: https://mariadb.com/kb/en/timestamp/ and
              https://mariadb.com/kb/en/temporal-data-tables/

           Goal is to do monimum number of conversions. Hence we will store the data the way it is given to us.

# Q3) What should be the primary key?

     Option1: uuid -> Not possible since there are duplicate uuid as this is temporal DB
                      if there are 10 data rows and 2 are duplicate then entities will only get 8 entries.

     Option2: composite primary key.
            ['uuid', 'ROW_START'] // Ref: https://vuex-orm.org/guide/model/defining-models.html#primary-key

            Finding data from primary key is much faster then finding data by running a loop over all the data rows.

            Update with primary key:
                 ormRem.update({
                  where: uniqueRowID              // vuex-orm knows that it needs to match with primary key
                  data: {
                    description: pEvent,
                    },
                  })


            update with composite primary ley:
             ormRem.update({
              where: [remUUID, this.reminderRowStart],    // The index is bigger and it will take longer to match
              data: {
                description: pEvent,
                },
              })


     Option3: Let vuex-orm give auto generated string primary key of auto increment numbers like $uid1

     Option 4: Generate a numerical ID
     Better performance. Ref: https://stackoverflow.com/questions/10639488/faster-to-access-numeric-property-by-string-or-integer


     Choice made in July 2020: Option 4

# Q4) How to give numeric ID to each row ?

      Solution comes from cue on slack given on 10th July 2020
        The closure passed into this.uid(() => intUniqueID()) simply invokes the closure when the model is instructed to generate a uid. The callback simply needs to return a value.
        In it’s simplest form, all you need for a primitive value is:
        let count = 0
        const intUniqueID = () => ++count
        this.uid(() => intUniqueID())
