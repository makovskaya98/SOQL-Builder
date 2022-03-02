({
    init: function (cmp, event, helper) {
        helper.simulateServerRequest(
            $A.getCallback(function handleServerResponse(serverResponse) {
                cmp.set('v.options', serverResponse.sortByDescOrAsc);
                cmp.set('v.selectedValue', serverResponse.selectedsortData);
            })
        );
    },
    onChange: function (component, event, helper) {
        let sortData = component.find('selectSort').get('v.value');
        let cmpEventSelectSort = component.getEvent("cmpEventSelectSort");
        cmpEventSelectSort.setParams({
            "sortData": sortData
        });
        cmpEventSelectSort.fire();
    }
});