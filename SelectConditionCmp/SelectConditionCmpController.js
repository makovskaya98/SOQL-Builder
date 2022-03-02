({
    init: function (component, event, helper) {
        helper.simulateServerRequest(
            $A.getCallback(function handleServerResponse(serverResponse) {
                component.set('v.options', serverResponse.conditions);
                component.set('v.selectedValue', serverResponse.selectedCondition);
            })
        );
    },
    onChange: function (component, event, helper) {
        let value = component.get('v.value');
        let condition = component.find('selectCondition').get('v.value');
        let result = '';
        switch (condition) {
            case ('equals'):
                result = '= ' + value;
                break;
            case ('not equal'):
                result = '!= ' + "'" + value + "'";
                break;
            case ('less'):
                result = '< ' + "'" + value + "'";
                break;
            case ('less equals'):
                result = '<= ' + "'" + value + "'";
                break;
            case ('more'):
                result = '> ' + "'" + value + "'";
                break;
            case ('more equals'):
                result = '>= ' + "'" + value + "'";
                break;
            case ('starts'):
                result = 'LIKE ' + "'" + value + '%' + "'";
                break;
            case ('ends'):
                result = 'LIKE ' + "'" + '%' + value + "'";
                break;
            case ('contains'):
                result = 'LIKE ' + "'" + '%' + value + '%' + "'";
                break;
            case ('in'):
                result = 'IN ' + '(' + value + ')';
                break;
            case ('not in'):
                result = 'NOT IN ' + '(' + value + ')';
                break;
            case ('includes'):
                result = 'INCLUDES ' + '(' + value + ')';
                break;
            case ('excludes'):
                result = 'EXCLUDES ' + '(' + value + ')';
                break;
        }
        let cmpCondition = component.getEvent("cmpCondition");
        cmpCondition.setParams({
            "condition": result
        });
        cmpCondition.fire();
    }
});