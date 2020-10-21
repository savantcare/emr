#!/bin/bash

# Reference implementation

# This file is called by /emr/ptserver/copy-files-from-component-to-correct-locations.sh
echo "Running file copy"

echo "Copying: phoneNumber.model.js"
cp /gt/sc-prog-repos/emr/webclient/cts/1time-Mrow-1Field/1-textarea/db/sequalize/phoneNumber.model.js /gt/sc-prog-repos/emr/ptserver/models/

echo "Copying: phoneNumber.route.js"
echo "keeping route files with cts leads in nuxt giving build errors"
echo "# The error is: Module not found: Error: Can't resolve 'fs' in '/System/Volumes/Data/Users/vk-tech/gt/sc-prog-repos/emr/ptserver/node_modules/config/lib'"
# cp /gt/sc-prog-repos/emr/webclient/cts/1time-Mrow-1Field/1-textarea/db/sequalize/phoneNumber.route.js /gt/sc-prog-repos/emr/ptserver/routes/