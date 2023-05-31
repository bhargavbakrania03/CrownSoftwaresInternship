var tableData, html="", length;

// fetching the data from api
$.get(
  "https://glexas.com/hostel_data/API/test/new_admission_list.php",
  function (data, status) {
    tableData = data.response;
    length = tableData.length;

    // looping through the recieved data
    for(var i=0;i<length;i++){
        //storing data in variables
        var registrationId = tableData[i].registration_main_id;
        var userCode = tableData[i].user_code;
        var firstName = tableData[i].first_name;
        var middleName = tableData[i].middle_name;
        var lastName = tableData[i].last_name;
    
        // adding the data variables into the html page
        html+= "<tr>";
        html+= "<td>" + registrationId + "</td>"
        html+= "<td>" + userCode + "</td>"
        html+= "<td>" + firstName + "</td>"
        html+= "<td>" + middleName + "</td>"
        html+= "<td>" + lastName + "</td>"
        html+= "</tr>";
    
        //appending the changes into the html page
        document.getElementById("data").innerHTML = html;
    }
  }
);


