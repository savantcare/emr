const patientDataPoints = 
[
      { key: '=dob', value: '' },
      { key: '=name', value: '' },
      { key: '=dxlist', value: '' },
      { key: '=medlist', value: '' },
      { key: '=recommendations', value: '' },
      {
        key: '=reminders',
        value:
          '',
      },
    ]
    

  for(keys in patientDataPoints)

  if(key ==="=dob") {
    patientDataPoints.value = vuex.orm.query(get DOB)
  }

  if(key ==="=name") {
    patientDataPoints.value = vuex.orm.query(get name)
  }

export patientDataPoints