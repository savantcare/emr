const selectOptions = {
  substance_list: [
    { label: 'Used in larger amounts or over longer period than intended' },
    { label: 'A great deal of time spent in activities necessary to obtain substance, use substance or recover from its effects' },
    { label: 'Persistent desire or unsuccessful efforts to cut down or control use' },
    { label: 'Craving' },
    { label: 'Failure to fulfill major role obligations at work, school, or home due to use' },
    { label: 'Continued use despite recurrent social or interpersonal problems due to use' },
    { label: 'Recurrent use in situations in which physically hazardous' },
    { label: 'Use despite knowledge of physical or psychological problems likely exacerbated by use' },
    { label: 'Tolerance (need increased amounts or diminished effect)' },
    { label: 'Withdrawal' },
  ],
  suicide_ideations: [{ label: 'Yes' }, { label: 'No' }],
  homicide_ideations: [{ label: 'Yes' }, { label: 'No' }],
}

exports.prosEachFieldAllSelectOptions = selectOptions
