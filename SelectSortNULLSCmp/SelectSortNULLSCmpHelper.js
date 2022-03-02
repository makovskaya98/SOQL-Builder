({
    simulateServerRequest: function (onResponse) {
        var serverResponse = {
            selectedsortData: 1,
            sortNullsRecords: [
                {id: 1, label: 'Nulls First', value: 'NULLS FIRST', selected: true},
                {id: 2, label: 'Nulls Last', value: 'NULLS LAST',}
            ]
        };
        onResponse.call(null, serverResponse);
    }
});