// Replace checkForName with a function that checks the URL
import { checkUrl } from './nameChecker'

import axios from 'axios';


// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'

const serverURL = 'https://localhost:8080/api';
const input = document.getElementById("URI");

//handle input change
document.addEventListener('DOMContentLoaded', function () {
    input.addEventListener("change", (event)=>{
        event.preventDefault();
        hideError();
        showResults(false);
    })
}
);


const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);


// This function handles the form submission
async function handleSubmit(event) {
    event.preventDefault();

    const url = input.value;
    if (!checkUrl(url)) {
        showError();
        document.getElementById("error").innerText = "Error: Please enter a valid URL";
        input.value = ""; // Clear the input field
        return; // Stop the function
    }

    // Show loading indicator
    loading(true);

    try {
        // Send the form data to the server
        const response = await axios.post('http://localhost:8080/', form, {
            headers: { 'Content-Type': 'application/json' }
        });

        // Display the results 
        displayResults(response.data);
    } catch (error) {
        // Handle any errors during the request
        console.error("An error occurred:", error);
        showError();
        document.getElementById("error").innerText = "An error occurred. Please try again.";
    } finally {
        loading(false);
    }
};




const displayResults = (data) => {
    loading(false);
    if (data.msg) {
        // Show the error message and hide results
        showError();
        showResults(false);
        document.getElementById("error").innerText = data.msg;
        return; 
    }

    // Hide error messages
    hideError();
    // Show the results 
    showResults(true);

    // Update the page with results from the server
    document.getElementById("agreement").innerText = `Agreement: ${data.sample.agreement}`;
    document.getElementById("subjectivity").innerText = `Subjectivity: ${data.sample.subjectivity}`;
    document.getElementById("confidence").innerText = `Confidence: ${data.sample.confidence}`;
    document.getElementById("irony").innerText = `Irony: ${data.sample.irony}`;
    document.getElementById("score_tag").innerText = `Score Tag: ${data.sample.score_tag}`;
};


//loader 
const loading = (isLoading) => {
    const loader = document.getElementById('loader');

    if (isLoading) {
        loader.style.display = 'block'; // Show the loader
    } else {
        loader.style.display = 'none'; // Hide the loader
    }
};


//show data
// Function to show or hide list items
const showResults = (shouldShow) => {
    const listItems = document.querySelectorAll("ul li");

    // Show or hide each list item based on the boolean value
    listItems.forEach(item => {
        item.style.display = shouldShow ? "block" : "none";
    });
};

const errorElement = document.getElementById("error");
// Function to show the error message
const showError = () => {
    errorElement.style.display = "block"; 
};

// Function to hide the error message
const hideError = () => {
    errorElement.style.display = "none"; 
};



// Export the handleSubmit function
export { handleSubmit };

