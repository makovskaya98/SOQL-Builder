({
    simulateServerRequest: function (onResponse) {
        var serverResponse = {
            selectedsortData: 1,
            sortByDescOrAsc: [
                {id: 1, label: 'A to Z', value: "ASC", selected: true},
                {id: 2, label: 'Z to A', value: "DESC",}
            ]
        };
        onResponse.call(null, serverResponse);
    }
});