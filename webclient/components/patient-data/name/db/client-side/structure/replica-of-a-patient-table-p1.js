import clientTblManage from '~/components/non-temporal/form-manager/crud/manage-rows-of-table-in-client-side-orm.js'

export default class pfName extends clientTblManage {
  static p1ApiUrl = 'https://staging.savantcare.com/my/api/public/index.php/api/getUserBiodata'

  static postData = {
    activityDoneByUserId: '19724',
    clientTimeOfActivity: '', //this.getTimeFormat(),
    clientTimeZoneAbbreviationOfActivity: 'India Standard Time',
    userId: '19724',
  }
  getTimeFormat() {
    var date = new Date()
    var str =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds()
    return str
  }
}
