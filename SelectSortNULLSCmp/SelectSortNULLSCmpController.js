({
    init: function (component, event, helper) {
        helper.simulateServerRequest(
            $A.getCallback(function handleServerResponse(serverResponse) {
                component.set('v.options', serverResponse.sortNullsRecords);
                component.set('v.selectedValue', serverResponse.selectedsortData);
            })
        );
    },
    onChange: function (component, event, helper) {
        let sortNULLSData = component.find('selectSortNULLS').get('v.value');
        let cmpEventSelectSortNULLS = component.getEvent("cmpEventSelectSortNULLS");
        cmpEventSelectSortNULLS.setParams({
            "sortNULLSData": sortNULLSData
        });
        cmpEventSelectSortNULLS.fire();
    }
});