

function simulateCache() {
    // alert('Simulating Cache...');
    // Get input values from the form fields
    const capacity = document.getElementById("capacity").value;
    const policy = document.getElementById("policy").value;
    const accessPattern = document.getElementById("input").value.split(',');

    // Validate input: ensure capacity is provided and access pattern is not empty
    if (!capacity || !accessPattern.length) {
        alert("Please provide valid inputs.");
        return;// Stop execution if input is invalid
    }
    
    // Prepare the data to send to the backend
    const requestData = {
        capacity: Number(capacity),// Convert capacity from string to number
        policy,                     // Selected cache policy (FIFO, LRU, LFU)
        accessPattern: accessPattern.map(item => item.trim())// Clean whitespace from input pattern
    };
    
    // Send a POST request to the backend Flask API
    fetch('http://127.0.0.1:5000/simulate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specify JSON content
        },
        body: JSON.stringify(requestData) // Convert request data to JSON string

    })
    .then(response => response.json())   // Parse the JSON response from the server
    .then(data => {
         // Optional: Handle errors (e.g., server not running)
        document.getElementById("output").textContent = JSON.stringify(data, null, 2);
    });
}
