document.getElementById('exploreBtn').addEventListener('click', () => {
    const dateInput = document.getElementById('dateInput').value;
    if (!dateInput) {
        alert('Please select a date.');
        return;
    }
    const date = new Date(dateInput);
    const month = date.getMonth() + 1; // getMonth() is zero-based
    const day = date.getDate();

    fetchHistoricalData(month, day);
});

function fetchHistoricalData(month, day) {
    const eventsList = document.getElementById('eventsList');
    const birthsList = document.getElementById('birthsList');
    const factsList = document.getElementById('factsList');

    // Clear previous results
    eventsList.innerHTML = '';
    birthsList.innerHTML = '';
    factsList.innerHTML = '';

    // Using the History API from https://history.muffinlabs.com/
    const url = `https://history.muffinlabs.com/date/${month}/${day}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.data) {
                displayItems(eventsList, data.data.Events);
                displayItems(birthsList, data.data.Births);
                displayItems(factsList, data.data.Holidays);
            } else {
                eventsList.innerHTML = '<li>No data found for this date.</li>';
                birthsList.innerHTML = '<li>No data found for this date.</li>';
                factsList.innerHTML = '<li>No data found for this date.</li>';
            }
        })
        .catch(error => {
            eventsList.innerHTML = '<li>Error fetching data.</li>';
            birthsList.innerHTML = '<li>Error fetching data.</li>';
            factsList.innerHTML = '<li>Error fetching data.</li>';
            console.error('Error fetching historical data:', error);
        });
}

function displayItems(container, items) {
    if (!items || items.length === 0) {
        container.innerHTML = '<li>No data available.</li>';
        return;
    }
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.year + ': ' + item.text;
        container.appendChild(li);
    });
}
