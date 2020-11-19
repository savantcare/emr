
export default class AutoSaveDataToServer {
    static noActivityTime = 10; // 10 second
    static init() {
        console.log('Get notification when data change');
        if (this.objTimeOut) {
            clearTimeout(this.objTimeOut)
        }
        const setTime = this.noActivityTime * 1000; // set second
        this.objTimeOut = setTimeout(
            function (scope) {
                scope.saveDataToServer()
            },
            setTime,
            this
        )
    }
    static saveDataToServer() {
        // const responds = sfSendNewChangedRowsToServer();
        console.log('Save data to server');
    }
}