async function fetchEmployees() {
  await fetch("http://localhost:3000/api/v1/employee")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("dataTable");
      tableBody.innerHTML = "";
      const list = data.data;
      list.forEach((item) => {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error(error));
  deleteButtonsListeners();
}

// TODO
// add event listener to submit button
document
  .querySelector('button[type="submit"]')
  .addEventListener("click", createEmployee);

// TODO
// add event listener to delete button
function deleteButtonsListeners() {
  document.querySelectorAll("button.btn-danger")?.forEach((btn) => {
    btn.addEventListener("click", deleteEmployee);
  });
  // console.log(document.querySelectorAll("button.btn-danger"));
}

// TODO
function createEmployee(e) {
  e.preventDefault();

  // get data from input field
  const form = document.getElementById("employeeForm");
  const name = form.querySelector("#name").value;
  const id = form.querySelector("#id").value;
  console.log("name:", name, ", id:", id);
  if (!name || !id) {
    alert("Please fill all fields");
    return;
  }

  // send data to BE
  fetch("http://localhost:3000/api/v1/employee/", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ id, name }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // call fetchEmployees
      fetchEmployees();
    })
    .catch((error) => console.error(error));
}

// TODO
function deleteEmployee(e) {
  // get id
  const row = e.target.parentElement.parentElement;
  console.log("row", row);
  const id = row.children[0].textContent;
  console.log("id", id);

  // send id to BE
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // call fetchEmployees
      fetchEmployees();
    })
    .catch((error) => console.error(error));
}

fetchEmployees();
