({
    init: function (component, event, helper) {
        helper.simulateServerRequest(
            $A.getCallback(function handleServerResponse(serverResponse) {
                component.set('v.options', serverResponse.numOfRecords);
                component.set('v.selectedValue', serverResponse.selectedNumId);
            })
        );
    },
    onChange: function (component, event, helper) {
        let numberOfEntries = component.find('pageSize').get('v.value');
        var cmpEvent = component.getEvent("cmpEvent");
        cmpEvent.setParams({
            "numberOfEntries": numberOfEntries
        });
        cmpEvent.fire();
    }
});