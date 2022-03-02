({
    simulateServerRequest: function (onResponse) {
        var serverResponse = {
            selectedNumId: 1,
            numOfRecords: [
                {id: 1, label: 5, selected: true},
                {id: 2, label: 10},
                {id: 3, label: 25},
                {id: 3, label: 75},
                {id: 3, label: 100},
                {id: 3, label: 250},
                {id: 3, label: 500}
            ]
        };
        onResponse.call(null, serverResponse);
    }
});