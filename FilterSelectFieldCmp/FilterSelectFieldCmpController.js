({
    onChange: function (component, event, helper) {
        let fieldNameApi = component.find('selectField').get('v.value');
        let cmpEventSelectFilterField = component.getEvent("cmpEventSelectFilterField");
        cmpEventSelectFilterField.setParams({
            "fieldNameApi": fieldNameApi
        });
        cmpEventSelectFilterField.fire();
    }
});