#!/bin/bash

# This file is called by /emr/ptserver/copy-files-from-component-to-correct-locations.sh
echo "Running file copy"

echo "Copying: reminder.model.js"
cp /gt/sc-prog-repos/emr/ptclient/cts/spi/Nr1f/rem/db/sequalize/reminder.model.js /gt/sc-prog-repos/emr/ptserver/models/

echo "Copying: reminder.route.js"
echo "keeping route files with cts leads in nuxt giving build errors"
echo "# The error is: Module not found: Error: Can't resolve 'fs' in '/System/Volumes/Data/Users/vk-tech/gt/sc-prog-repos/emr/ptserver/node_modules/config/lib'"
# cp /gt/sc-prog-repos/emr/ptclient/cts/spi/Nr1f/rem/db/sequalize/reminder.route.js /gt/sc-prog-repos/emr/ptserver/routes/