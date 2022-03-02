({
    init: function (component, event, helper) {
        helper.getObject(component, event, helper);
    },
    onChange: function (component, event, helper) {
        let objAPIName = component.find('selectObj').get('v.value');
        let cmpEventSelectObj = component.getEvent("cmpEventSelectObj");
        cmpEventSelectObj.setParams({
            "objectApi": objAPIName
        });
        cmpEventSelectObj.fire();
    }
});