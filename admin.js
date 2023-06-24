


const summary = document.getElementById("summary");
const centersList = document.getElementById("centersList");
const addCenterForm = document.getElementById("addCenterForm");
let currentCenterIndex = -1;

// Example data for demonstration
// let centersData = [
//   {
//     name: "Vaccination Center 1",
//     address: "Address 1",
//     contact: "Contact 1",
//     slots: 10,
//   },
//   {
//     name: "Vaccination Center 2",
//     address: "Address 2",
//     contact: "Contact 2",
//     slots: 5,
//   },
//   {
//     name: "Vaccination Center 3",
//     address: "Address 3",
//     contact: "Contact 3",
//     slots: 8,
//   },
// ];
fetchcenters()
let centersData=[];
async function fetchcenters() {
  const response = await fetch(`http://localhost:5000/auth/getallcenter`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
   
  });
  centersData = await response.json();
  console.log(centersData)
  displayCenters();
  displayDashboard()
}


// Display the admin dashboard summary
function displayDashboard() {
  summary.innerHTML = `
    <p>Total Centers: ${centersData.length}</p>
    <p>Total Slots Available: ${calculateTotalSlots()}</p>
  `;
}

// Calculate the total slots available across all centers
function calculateTotalSlots() {
  let totalSlots = 0;
  centersData.forEach((center) => {
    totalSlots += center.slot;
  });
  console.log(totalSlots)
  return totalSlots;
}

// Display the manage centers table
function displayCenters() {
  centersList.innerHTML = "";
  centersData.forEach((center, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${center.name}</td>
      <td>${center.address}</td>
      <td>${center.contact}</td>
      <td>${center.slot}</td>
      <td>${center.date}</td>
      <td>
        <button onclick="editCenter('${center.name}')">Edit</button>
        <button onclick="deleteCenter('${center.name}')">Delete</button>
      </td>
    `;
    centersList.appendChild(row);
  });
}

// Add or update a vaccination center
async function addOrUpdateCenter(event) {
  event.preventDefault();

  // Get the form input values
  const name = document.getElementById("centerName").value;
  const address = document.getElementById("centerAddress").value;
  const contact = document.getElementById("centerContact").value;
  const date = document.getElementById("date").value;
  const slots = parseInt(document.getElementById("centerSlots").value);

  // Create a new center object
  const newCenter = {
    name: name,
    address: address,
    contact: contact,
    slot: slots,
    date:date
  };
  // async function addcenters() {
  const response = await fetch(`http://localhost:5000/auth/addcenter`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
   body: JSON.stringify(newCenter),
  });
  centersData = await response.json();
  console.log(centersData)
    fetchcenters();
// }

  // if (currentCenterIndex === -1) {
  //   // Add a new center
  //   centersData.push(newCenter);
  // } else {
  //   // Update an existing center
  //   centersData[currentCenterIndex] = newCenter;
  //   currentCenterIndex = -1; // Reset currentCenterIndex after update
  // }

  // // Clear the form fields
  // addCenterForm.reset();

  // // Display the updated centers table and dashboard summary

  // displayDashboard();
}

// Edit a vaccination center
async function editCenter(center) {


  // Populate the form fields with the center details
  document.getElementById("centerName").value = center.name;
  document.getElementById("centerAddress").value = center.address;
  document.getElementById("centerContact").value = center.contact;
  document.getElementById("centerSlots").value = center.slots;

  // Change the form button text to 'Update Center'
  
  document.getElementById("centerFormBtn").textContent = "Add";
}

// Delete a vaccination center
async function deleteCenter(index) {
  // centersData.splice(index, 1);
  console.log(index)

    const response = await fetch(`http://localhost:5000/auth/deletecenter`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({ "name": index })
   
  });
  centersData = await response.json();
  console.log(centersData)
  // displayCenters();

  // Display the updated centers table and dashboard summary
  fetchcenters();
  // displayDashboard();
}

// Event listener for form submission
addCenterForm.addEventListener("submit", addOrUpdateCenter);

// Initial display on page load
displayDashboard();
displayCenters();
