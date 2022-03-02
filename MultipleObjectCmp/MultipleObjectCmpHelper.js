({
    getFields: function (component, selectedObj, helper) {
        var action = component.get('c.getFields');
        action.setParams({sObjectName: selectedObj});

        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.fieldNames', response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    }
});