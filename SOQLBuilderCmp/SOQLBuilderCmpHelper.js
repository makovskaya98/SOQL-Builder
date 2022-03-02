({
    TOAST_TYPE_SUCCESS: "SUCCESS",
    TOAST_TYPE_ERROR: "ERROR",
    getQuery: function (component) {
        let limit = component.get("v.limit");
        let conditionValue = component.get("v.value");
        let objectName = component.get("v.selectedObj");
        let fieldNames = component.get("v.selectedFields");
        let sortInDescOrAsc = component.get("v.selectedSortData");
        let sortByField = component.get("v.selectedSortField");
        let sortByNullsFields = component.get("v.selectedSortNullsData");
        let filterByField = component.get("v.selectedFilterField");
        let condition = component.get("v.condition");

        let action = component.get('c.getMatches');
        action.setParams({sObjectName: objectName, selectedfieldsName: fieldNames});
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            let query;
            if (state === "SUCCESS") {
                component.set("v.isMatches", response.getReturnValue());
                if (component.get("v.isMatches") === true) {
                    let fields = fieldNames.split(';').join(', ');
                    let queryWhere;
                    let selectQuery = `SELECT ${fields} FROM ${objectName}`;
                    if (conditionValue !== undefined) {
                        queryWhere = ` WHERE ${filterByField} ${condition.replace(/undefined/i, `${conditionValue}`)} `;
                    }
                    if (objectName !== undefined && fieldNames !== undefined) {
                        query = `${selectQuery}`;
                        if (sortByField !== undefined) {
                            query = `${selectQuery} ORDER BY ${sortByField} ASC NULLS FIRST`;
                            if (sortInDescOrAsc !== undefined && sortByNullsFields !== undefined) {
                                query = `${selectQuery} ORDER BY ${sortByField} ${sortInDescOrAsc} ${sortByNullsFields}`;
                            } else if (sortInDescOrAsc !== undefined) {
                                query = `${selectQuery} ORDER BY ${sortByField} ${sortInDescOrAsc} NULLS FIRST`;
                            } else if (sortByNullsFields !== undefined) {
                                query = `${selectQuery} ORDER BY ${sortByField} ASC ${sortByNullsFields}`;
                            }
                            if (filterByField !== undefined && conditionValue !== undefined && sortInDescOrAsc !== undefined && sortByNullsFields !== undefined) {
                                query = `${selectQuery} ${queryWhere} ORDER BY ${sortByField} ${sortInDescOrAsc} ${sortByNullsFields}`;
                            } else if (filterByField !== undefined && conditionValue !== undefined && sortInDescOrAsc !== undefined) {
                                query = `${selectQuery} ${queryWhere} ORDER BY ${sortByField} ${sortInDescOrAsc} NULLS FIRST`;
                            } else if (filterByField !== undefined && conditionValue !== undefined && sortByNullsFields !== undefined) {
                                query = `${selectQuery} ${queryWhere} ORDER BY ${sortByField} ASC ${sortByNullsFields}`;
                            }
                        }
                        if (filterByField !== undefined && conditionValue !== undefined) {
                            query = `${selectQuery} ${queryWhere}`;
                        }
                        if (sortByField !== undefined && filterByField !== undefined && conditionValue !== undefined) {
                            query = `${selectQuery} ${queryWhere} ORDER BY ${sortByField} ASC NULLS FIRST`;
                            if (sortInDescOrAsc !== undefined && sortByNullsFields !== undefined) {
                                query = `${selectQuery} ${queryWhere} ORDER BY ${sortByField} ${sortInDescOrAsc} ${sortByNullsFields}`;
                            } else if (sortInDescOrAsc !== undefined) {
                                query = `${selectQuery} ${queryWhere} ORDER BY ${sortByField} ${sortInDescOrAsc} NULLS FIRST`;
                            } else if (sortByNullsFields !== undefined) {
                                query = `${selectQuery} ${queryWhere} ORDER BY ${sortByField} ASC ${sortByNullsFields}`;
                            }
                        }
                        if (limit !== undefined) {
                            query += ` LIMIT ${limit}`;
                        }
                    }
                } else {
                    query = '';
                }
                component.set("v.query", query);
            } else if (state === "ERROR") {
                component.set("v.query", '');
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },
    handleSelectObjectCmpEvent: function (component, objApi) {
        component.set("v.selectedObj", objApi);
        this.getQuery(component);
    },
    handleSelectFieldsCmpEvent: function (component, fieldsApi) {
        component.set("v.selectedFields", fieldsApi);
        this.getQuery(component);
    },
    handleSelectSortFieldCmpEvent: function (component, fieldNameApi) {
        component.set("v.selectedSortField", fieldNameApi);
        this.getQuery(component);
    },
    handleSelectSortDataCmpEvent: function (component, sortData) {
        component.set("v.selectedSortData", sortData);
        this.getQuery(component);
    },
    handleSelectSortNullsDataCmpEvent: function (component, sortNULLSData) {
        component.set("v.selectedSortNullsData", sortNULLSData);
        this.getQuery(component);
    },
    handleLimitCmpEvent: function (component, limitNumber) {
        component.set("v.limit", limitNumber);
        this.getQuery(component);
    },
    handleValueCmpEvent: function (component, valueData) {
        component.set("v.value", valueData);
        this.getQuery(component);
    },
    handleSelectFilterFieldCmpEvent: function (component, fieldApifilter) {
        component.set("v.selectedFilterField", fieldApifilter);
        this.getQuery(component);
    },
    handleConditionCmpEvent: function (component, conditionItem) {
        component.set("v.condition", conditionItem);
        this.getQuery(component);
    },
    getData: function (component, query, helper, pageSize, numPage) {
        var action = component.get('c.getTable');
        var paginationListCount = component.get('v.paginationListCount');
        if (numPage > paginationListCount) {
            numPage = paginationListCount;
        }
        if (numPage <= 0) {
            numPage = 1;
        }
        if (numPage)
            action.setParams({query: query});
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                helper.showToast(component, helper.TOAST_TYPE_SUCCESS, `The request was completed successfully!`);
                let objKeys = [];
                for (let i = 0; i < response.getReturnValue().length; i++) {
                    objKeys.push(Object.keys(response.getReturnValue()[i]));
                }
                let fields = Array.from(new Set(objKeys.flat(1)));
                console.log(fields);
                let fieldsName = [];
                let offset = (numPage - 1) * pageSize;
                let totalNumber = response.getReturnValue().length;
                let paginationNum = Math.ceil(totalNumber / pageSize);
                let paginationList = [];
                for (let i = 0; i < fields.length; i++) {
                    fieldsName.push({label: fields[i], fieldName: fields[i], type: fields[i]})
                }
                for (let i = 1; i <= paginationNum; i++) {
                    paginationList.push(i);
                }
                component.set('v.paginationListCount', paginationList.length);
                component.set('v.pageSize', pageSize);
                component.set('v.numPage', numPage);
                component.set('v.pagination', paginationList);
                component.set('v.columns', fieldsName);
                component.set('v.data', response.getReturnValue().slice(offset, offset + Number(pageSize)));
            } else if (state === "ERROR") {
                component.set('v.columns', null);
                component.set('v.data', null);
                var errors = response.getError();
                helper.showToast(component, helper.TOAST_TYPE_ERROR, `Sorry, no records returned.`);
            }
        }));
        $A.enqueueAction(action);
    },
    showToast: function (component, type, message) {
        let toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            'type': type,
            'message': message
        });
        toastEvent.fire();
    }
});