({
    onChange: function (component, event, helper) {
        let enteredValue = component.find('limit').get('v.value');
        let cmpEventLimit = component.getEvent("cmpEventLimit");
        cmpEventLimit.setParams({
            "limit": enteredValue
        });
        cmpEventLimit.fire();
    }
});