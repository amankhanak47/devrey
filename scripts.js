
// const locationDropdown = document.getElementById('locationDropdown');
// const searchBtn = document.getElementById('searchBtn');
// const centersList = document.getElementById('centersList');
// const centers = document.getElementById('centers');
// const bookingForm = document.getElementById('bookingForm');
// const slotForm = document.getElementById('slotForm');
// const selectedCenterInput = document.getElementById('selectedCenter');
// const selectedDateInput = document.getElementById('selectedDate');


// locationDropdown.addEventListener('change', () => {
//   // Enable or disable the search button based on the selection
//   const selectedLocation = locationDropdown.value;
//   searchBtn.disabled = selectedLocation === '';
// });

// // Search button click event listener
// searchBtn.addEventListener('click', () => {
//   const selectedLocation = locationDropdown.value;
//   if (selectedLocation !== '') {
//     // Perform search for vaccination centers based on the selected location
//     // Replace the following code with your actual search implementation

//     // Clear the previous results
//     centers.innerHTML = '';

//     // Simulate the search results
//     const searchResults = [
//       { name: 'Vaccination Center 1', date: '2023-06-23' },
//       { name: 'Vaccination Center 2', date: '2023-06-24' },
//       { name: 'Vaccination Center 3', date: '2023-06-25' },
//     ];

//     // Display the search results
//     searchResults.forEach(result => {
//       const listItem = document.createElement('li');
//       listItem.textContent = `${result.name} - Date: ${result.date}`;
//       listItem.addEventListener('click', () => {
//         // Set the selected center and date for booking
//         selectedCenterInput.value = result.name;
//         selectedDateInput.value = result.date;
//         showBookingForm();
//       });
//       centers.appendChild(listItem);
//     });

//     // Show the vaccination centers list
//     centersList.classList.remove('hide');
//   }
// });

// // Function to show the booking form
// function showBookingForm() {
//   centersList.classList.add('hide');
//   bookingForm.classList.remove('hide');
// }

// slotForm.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const name = document.getElementById('name').value;
//     const age = document.getElementById('age').value;
//     const selectedCenter = selectedCenterInput.value;
//     const selectedDate = selectedDateInput.value;
//     const bookingStatus = document.getElementById('bookingStatus');
//     bookingStatus.innerHTML = `
//       <h2 color: green; >Booking Successful!</h2>
//       <div class="booking-details">
//         <h3>Booking Details</h3>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Age:</strong> ${age}</p>
//         <p><strong>Vaccination Center:</strong> ${selectedCenter}</p>
//         <p><strong>Date:</strong> ${selectedDate}</p>
//       </div>
//     `;
//     bookingStatus.classList.remove('hide');
//   });
  if (localStorage.getItem("devray" )== null) {
  //console.log("first")
   window.location.href = "./index.html";
}
const locationDropdown = document.getElementById('locationDropdown');
const searchBtn = document.getElementById('searchBtn');
const centersList = document.getElementById('centersList');
const centers = document.getElementById('centers');
const bookingForm = document.getElementById('bookingForm');
const slotForm = document.getElementById('slotForm');
const selectedCenterInput = document.getElementById('selectedCenter');
const selectedDateInput = document.getElementById('selectedDate');

fetchcenters()
let centersData=[];
async function fetchcenters() {
  const response = await fetch(`https://devray1.onrender.com/auth/getallcenter`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
   
  });
  centersData = await response.json();
  console.log(centersData)
    displaylocations();
}
function displaylocations() {
  let vaccinationCenters=[]
  centersData.forEach(k => {
    vaccinationCenters.push(k.address)
    const optionElement = document.createElement('option');
  
    // Set the text content of the <option> to the item value
    optionElement.textContent = k.address;
  
    // Append the <option> to the <select> element
    locationDropdown.appendChild(optionElement);
  }) 

  
}


locationDropdown.addEventListener('change', () => {
  // Enable or disable the search button based on the selection
  const selectedLocation = locationDropdown.value;
  searchBtn.disabled = selectedLocation === '';
});

// Search button click event listener
searchBtn.addEventListener('click', async() => {
  const selectedLocation = locationDropdown.value;

  const response = await fetch(`https://devray1.onrender.com/auth/get_loc_center`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify({"address":selectedLocation})
   
  });
  console.log(centersData)
  let selectedCenters = await response.json();

  if (selectedLocation !== '') {
    // Perform search for vaccination centers based on the selected location
    // Replace the following code with your actual search implementation

    // Clear the previous results
    centers.innerHTML = '';

    // Get the vaccination centers for the selected location
    // const selectedCenters = vaccinationCenters[selectedLocation];

    // Display the search results
    selectedCenters.forEach(result => {
      const listItem = document.createElement('li');
      listItem.textContent = `${result.name} - Date: ${result.date}`;
      listItem.addEventListener('click', () => {
        // Set the selected center and date for booking
        selectedCenterInput.value = result.name;
        selectedDateInput.value = result.date;
        showBookingForm(result.name);
      });
      centers.appendChild(listItem);
    });

    // Show the vaccination centers list
    centersList.classList.remove('hide');
  }
});

// Function to show the booking form
function showBookingForm() {
  centersList.classList.add('hide');
  bookingForm.classList.remove('hide');
  // book_slot();
}

slotForm.addEventListener('submit', async(event) => {
  event.preventDefault();
  // Replace the following code with your actual booking implementation

  // Display the booking status
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const selectedCenter = selectedCenterInput.value;
  const selectedDate = selectedDateInput.value;

  const bookingStatus = document.getElementById('bookingStatus');
  bookingStatus.innerHTML = `
    <h2 style="color: green;">Booking Successful!</h2>
    <div class="booking-details">
      <h3>Booking Details</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Vaccination Center:</strong> ${selectedCenter}</p>
      <p><strong>Date:</strong> ${selectedDate}</p>
    </div>
  `;

  const response = await fetch(`https://devray1.onrender.com/auth/bookslot`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
   body: JSON.stringify({name:selectedCenter}),
  });
  centersData = await response.json();
  console.log(centersData)
  bookingStatus.classList.remove('hide');
});

