({
    handleSelectObjectCmpEvent: function (component, event, helper) {
        let objApi = event.getParam("objectApi");
        component.set("v.selectedObj", objApi);
        helper.handleSelectObjectCmpEvent(component, objApi);
    },
    handleSelectFieldsCmpEvent: function (component, event, helper) {
        let fieldsApi = event.getParam("fieldsList");
        helper.handleSelectFieldsCmpEvent(component, fieldsApi);
    },
    handleSelectSortFieldCmpEvent: function (component, event, helper) {
        let fieldNameApi = event.getParam("fieldNameApi");
        helper.handleSelectSortFieldCmpEvent(component, fieldNameApi);
    },
    handleSelectSortDataCmpEvent: function (component, event, helper) {
        let sortData = event.getParam("sortData");
        helper.handleSelectSortDataCmpEvent(component, sortData);
    },
    handleSelectSortNullsDataCmpEvent: function (component, event, helper) {
        let sortNULLSData = event.getParam("sortNULLSData");
        helper.handleSelectSortNullsDataCmpEvent(component, sortNULLSData);
    },
    handleLimitCmpEvent: function (component, event, helper) {
        let limitNumber = event.getParam("limit");
        helper.handleLimitCmpEvent(component, limitNumber);
    },
    handleValueCmpEvent: function (component, event, helper) {
        let valueData = event.getParam("value");
        helper.handleValueCmpEvent(component, valueData);
    },
    handleSelectFilterFieldCmpEvent: function (component, event, helper) {
        let fieldApifilter = event.getParam("fieldNameApi");
        helper.handleSelectFilterFieldCmpEvent(component, fieldApifilter);
    },
    handleConditionCmpEvent: function (component, event, helper) {
        let conditionItem = event.getParam("condition");
        helper.handleConditionCmpEvent(component, conditionItem);
    },
    handleClick: function (component, event, helper) {
        let numPage = 1;
        let query = component.get("v.query");
        let pageSize = component.get("v.pageSize");
        helper.getData(component, query, helper, pageSize, numPage);
    },
    handlePagination: function (component, event, helper) {
        let pageSize = event.getParam("numberOfEntries");
        let query = component.get("v.query");
        let numPage = component.get("v.numPage");
        helper.getData(component, query, helper, pageSize, numPage);
    },
    getNumber: function (component, event, helper) {
        let numPage = event.currentTarget.dataset.value;
        let query = component.get("v.query");
        let pageSize = component.get("v.pageSize");
        helper.getData(component, query, helper, pageSize, numPage);
    },
    prevPage: function (component, event, helper) {
        let query = component.get("v.query");
        let pageSize = component.get("v.pageSize");
        let numPage = component.get("v.numPage");
        numPage--;
        helper.getData(component, query, helper, pageSize, numPage);
    },
    nextPage: function (component, event, helper) {
        let query = component.get("v.query");
        let pageSize = component.get("v.pageSize");
        let numPage = component.get("v.numPage");
        numPage++;
        helper.getData(component, query, helper, pageSize, numPage);
    }
});