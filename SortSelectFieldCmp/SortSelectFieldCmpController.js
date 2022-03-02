({
    onChange: function (component, event, helper) {
        let fieldNameApi = component.find('selectField').get('v.value');
        let cmpEventSelectField = component.getEvent("cmpEventSelectField");
        cmpEventSelectField.setParams({
            "fieldNameApi": fieldNameApi
        });
        cmpEventSelectField.fire();
    }
});