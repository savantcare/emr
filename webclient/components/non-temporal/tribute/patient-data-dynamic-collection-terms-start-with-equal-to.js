import clientTblForNameCt from '@/components/patient-data/name/db/client-side/structure/name-of-a-patient-table.js'

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
  }

  if (data.key === '=name') {
    const arOfObjectsFromClientDB = await clientTblForNameCt.query().where('ROW_END', 2147483648000).get()
    data.value = arOfObjectsFromClientDB[0].firstName + ' ' + arOfObjectsFromClientDB[0].lastName
  }
})

export default patientDataPoints
