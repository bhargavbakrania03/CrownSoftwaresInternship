var tableData,
  html = "",
  length,
  updateId;

var rid, userType, fname, mname, lname;

rid = document.getElementById("registrationId");
userType = document.getElementById("usertype");
fname = document.getElementById("fname");
mname = document.getElementById("mname");
lname = document.getElementById("lname");

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

        // adding the data variables into the html page
        html += "<tr>";
        html += "<td>" + registrationId + "</td>";
        html += "<td>" + userCode + "</td>";
        html += "<td>" + firstName + "</td>";
        html += "<td>" + middleName + "</td>";
        html += "<td>" + lastName + "</td>";
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
  document.getElementById("addentry").style.display = "none";
  document.getElementById("editentry").style.display = "block";
  rid = tableData[iterator].registration_main_id;
  userType = document.getElementById("usertype");
  fname = document.getElementById("fname");
  mname = document.getElementById("mname");
  lname = document.getElementById("lname");

  userType.value = tableData[iterator].user_code;
  fname.value = tableData[iterator].first_name;
  mname.value = tableData[iterator].middle_name;
  lname.value = tableData[iterator].last_name;
}

// function to edit the data entry into the data table
function editEntry() {
  $.ajax({
    url: "https://glexas.com/hostel_data/API/test/new_admission_update.php",
    method: "POST",
    data: {
      registration_main_id: rid,
      user_code: userType.value,
      first_name: fname.value,
      middle_name: mname.value,
      last_name: lname.value,
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
  userType = document.getElementById("usertype");
  fname = document.getElementById("fname");
  mname = document.getElementById("mname");
  lname = document.getElementById("lname");

  $.ajax({
    url: "https://glexas.com/hostel_data/API/test/new_admission_insert.php",
    method: "POST",
    data: {
      user_code: userType.value,
      first_name: fname.value,
      middle_name: mname.value,
      last_name: lname.value,
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

function shuffleAddButton(){
  document.getElementById("editentry").style.display = "none";
  document.getElementById("addentry").style.display = "block";

  userType = document.getElementById("usertype").value = "";
  fname = document.getElementById("fname").value = "";
  mname = document.getElementById("mname").value = "";
  lname = document.getElementById("lname").value = "";
}
