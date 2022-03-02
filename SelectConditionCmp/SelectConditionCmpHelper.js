({
    simulateServerRequest: function (onResponse) {
        var serverResponse = {
            selectedCondition: 2,
            conditions: [
                {id: 1, label: '=', value: 'equals', selected: true},
                {id: 2, label: '≠', value: 'not equal'},
                {id: 3, label: '<', value: 'less'},
                {id: 4, label: '≤', value: 'less equals'},
                {id: 5, label: '>', value: 'more'},
                {id: 6, label: '≥', value: 'more equals'},
                {id: 7, label: 'starts with', value: 'starts'},
                {id: 8, label: 'ends with', value: 'ends'},
                {id: 9, label: 'contains', value: 'contains'},
                {id: 10, label: 'in', value: 'in',},
                {id: 11, label: 'not in', value: 'not in'},
                {id: 12, label: 'includes', value: 'includes'},
                {id: 13, label: 'excludes', value: 'excludes'}
            ]
        };
        onResponse.call(null, serverResponse);
    }
});