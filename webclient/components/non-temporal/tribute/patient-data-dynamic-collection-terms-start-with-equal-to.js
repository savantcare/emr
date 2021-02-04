import allPatientDataTbls from '@/components/non-temporal/form-manager/all-client-tables.js'

const patientDataPoints = [
  { key: '=dob', value: '' },
  { key: '=name', value: '' },
  { key: '=dxlist', value: '' },
  { key: '=medlist', value: '' },
  { key: '=recommendations', value: '' },
  { key: '=reminders', value: '' },
]

patientDataPoints.forEach(async function (data) {
  if (data.key === '=dob') {
    data.value = '02oct2020'
  } else if (data.key === '=name') {
    const arOfObjectsFromClientDB = await allPatientDataTbls['name'].query().where('ROW_END', 2147483648000).get()
    if (arOfObjectsFromClientDB && arOfObjectsFromClientDB[0]) {
      data.value = arOfObjectsFromClientDB[0].firstName + ' ' + arOfObjectsFromClientDB[0].lastName
    }
  } else if (data.key === '=reminders') {
    const arOfObjectsFromClientDB = await allPatientDataTbls['reminders'].fnGetPresentUniqueUuidNotEmptyRows([
      'description',
    ])

    let patientRemList = []
    arOfObjectsFromClientDB.forEach(function (item) {
      patientRemList.push(item.description)
    })

    data.value = patientRemList.join(', ')
  } else if (data.key === '=recommendations') {
    const arOfObjectsFromClientDB = await allPatientDataTbls['recommendations'].fnGetPresentUniqueUuidNotEmptyRows([
      'description',
    ])

    let patientRemList = []
    arOfObjectsFromClientDB.forEach(function (item) {
      patientRemList.push(item.description)
    })

    data.value = patientRemList.join(', ')
  } else if (data.key === '=dxlist') {
    // get diagnosis list assigned to patient
  } else if (data.key === '=medlist') {
    // get medication list assigned to patient
  }
})

export default patientDataPoints
