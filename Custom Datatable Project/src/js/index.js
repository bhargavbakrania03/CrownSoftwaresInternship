var tableData,
  html = "",
  length,
  updateId;

var registration_id,
  user_type,
  first_name,
  middle_name,
  last_name,
  phone_number,
  country_code,
  email;

// fetching the data from api

function fetchData() {
  $.ajax({
    url: "https://glexas.com/hostel_data/API/test/new_admission_list.php",
    method: "GET",
    dataType: "json",
    success: function (data) {
      tableData = data.response;
      length = tableData.length;

      // looping through the recieved data
      for (var i = 0; i < length; i++) {
        //storing data in variables
        var registrationId = tableData[i].registration_main_id;
        var userCode = tableData[i].user_code;
        var firstName = tableData[i].first_name;
        var middleName = tableData[i].middle_name;
        var lastName = tableData[i].last_name;
        var phone_number = tableData[i].phone_number;
        var country_code = tableData[i].phone_country_code;
        var email = tableData[i].email;

        // adding the data variables into the html page
        html += "<tr>";
        html += "<td>" + registrationId + "</td>";
        html += "<td>" + userCode + "</td>";
        html += "<td>" + firstName + "</td>";
        html += "<td>" + middleName + "</td>";
        html += "<td>" + lastName + "</td>";
        html += "<td>" + country_code + "</td>";
        html += "<td>" + phone_number + "</td>";
        html += "<td>" + email + "</td>";
        html +=
          "<td>" +
          `<button type="button" class="btn btn-primary me-2" data-toggle="modal" data-target="#exampleModalCenter" onclick="fetchEditEntry(${i})">
        Edit
    </button>` +
          `<button class="btn btn-danger" onclick="removeEntry(${registrationId})">Remove</button>` +
          "</td>";
        html += "</tr>";

        //appending the changes into the html page
        document.getElementById("data").innerHTML = html;
      }
    },
  });
}
fetchData();

// function for removing the data entry from data table
function removeEntry(id) {
  console.log(id);
  $.ajax({
    url: "https://glexas.com/hostel_data/API/test/new_admission_delete.php",
    method: "POST",
    data: {
      registration_main_id: id,
    },
    success: function (data) {
      console.log(data);
      if (data.status === true) {
        location.reload();
      } else {
        alert("Data couldn't be deleted !");
      }
    },
  });
}

// function to fetch the data into the modal for the selected data entry
function fetchEditEntry(iterator) {
  // enabling edit entry button and disabling add entry button
  document.getElementById("addentry").style.display = "none";
  document.getElementById("editentry").style.display = "block";

  user_type = document.getElementById("usertype");
  first_name = document.getElementById("first_name");
  middle_name = document.getElementById("middle_name");
  last_name = document.getElementById("last_name");
  phone_number = document.getElementById("phone_number");
  country_code = document.getElementById("country_code");
  email = document.getElementById("email");
  
  registration_id = tableData[iterator].registration_main_id;
  user_type.value = tableData[iterator].user_code;
  first_name.value = tableData[iterator].first_name;
  middle_name.value = tableData[iterator].middle_name;
  last_name.value = tableData[iterator].last_name;
  phone_number.value = tableData[iterator].phone_number;
  country_code.value = tableData[iterator].phone_country_code;
  email.value = tableData[iterator].email;

  document.getElementById("modalTitle").innerText = "Edit Entry";
}

// function to edit the data entry into the data table
function editEntry() {
  $.ajax({
    url: "https://glexas.com/hostel_data/API/test/new_admission_update.php",
    method: "POST",
    data: {
      registration_main_id: registration_id,
      user_code: usertype.value,
      first_name: first_name.value,
      middle_name: middle_name.value,
      last_name: last_name.value,
      phone_number: phone_number.value,
      phone_country_code: country_code.value,
      email: email.value,
    },
    success: function (data) {
      console.log(data);
      if (data.status === true) {
        location.reload();
      } else {
        alert("Data couldn't be updated !");
      }
    },
  });
}

// function to add new data entry into data table
function addEntry() {
  user_type = document.getElementById("usertype");
  first_name = document.getElementById("first_name");
  middle_name = document.getElementById("middle_name");
  last_name = document.getElementById("last_name");
  phone_number = document.getElementById("phone_number");
  country_code = document.getElementById("country_code");
  email = document.getElementById("email");

  $.ajax({
    url: "https://glexas.com/hostel_data/API/test/new_admission_insert.php",
    method: "POST",
    data: {
      user_code: usertype.value,
      first_name: first_name.value,
      middle_name: middle_name.value,
      last_name: last_name.value,
      phone_number: phone_number.value,
      phone_country_code: country_code.value,
      email: email.value,
    },
    success: function (data) {
      console.log(data);
      if (data.status === true) {
        location.reload();
      } else {
        alert("Data couldn't be added !");
      }
    },
  });
}

function shuffleAddButton() {
  document.getElementById("editentry").style.display = "none";
  document.getElementById("addentry").style.display = "block";

  document.getElementById("usertype").value = "";
  document.getElementById("first_name").value = "";
  document.getElementById("middle_name").value = "";
  document.getElementById("last_name").value = "";
  document.getElementById("phone_number").value = "";
  document.getElementById("country_code").value = "";
  document.getElementById("email").value = "";

  document.getElementById("modalTitle").innerText = "Add New Entry";

}
