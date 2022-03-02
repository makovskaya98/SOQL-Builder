({
    onMultiSelectChange: function (component, event, helper) {
        let fieldsAPIName = component.find('InputSelectMultiple').get('v.value');
        let cmpEventSelectFields = component.getEvent("cmpEventSelectFields");
        cmpEventSelectFields.setParams({
            "fieldsList": fieldsAPIName
        });
        cmpEventSelectFields.fire();
    },
    selectedObjChange: function (component, event, helper) {
        let selectedObj = component.get("v.selectedObj");
        helper.getFields(component, selectedObj, helper);
    }
});