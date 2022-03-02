({
    onChange: function (component, event, helper) {
        let enteredValue = component.find('value').get('v.value');
        let cmpEventValue = component.getEvent("cmpEventValue");
        cmpEventValue.setParams({
            "value": enteredValue
        });
        cmpEventValue.fire();
    }
});