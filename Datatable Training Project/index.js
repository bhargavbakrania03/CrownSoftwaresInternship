$(document).ready(function () {
  var table_data,
    length,
    html,
    registration_main_id,
    user_code,
    first_name,
    middle_name,
    last_name,
    phone_number,
    phone_country_code,
    email,
    created_time;
  $.ajax({
    url: "https://glexas.com/hostel_data/API/test/new_admission_list.php",
    method: "GET",
    dataType: "json",
    success: function (data) {
      table_data = data.response;
      length = table_data.length;

      console.log(length);
      console.log(table_data[0].created_time);
      console.log(typeof table_data[264].created_time);
      var datetime = new Date(table_data[0].created_time);
      console.log(datetime);
      var newdate = new Date();
      console.log(datetime.getDate() - newdate.getDate());
      if (datetime.getDate() - newdate.getDate() === 1){
        console.log((datetime.getTime() - newdate.getTime())%24*60*60*60);
      }

        // looping through the recieved data
        for (var i = 0; i < length; i++) {
          //storing data in variables
          registration_main_id = table_data[i].registration_main_id;
          user_code = table_data[i].user_code;
          first_name = table_data[i].first_name;
          middle_name = table_data[i].middle_name;
          last_name = table_data[i].last_name;
          phone_number = table_data[i].phone_number;
          phone_country_code = table_data[i].phone_country_code;
          email = table_data[i].email;
          created_time = table_data[i].created_time;

          // adding the data variables into the html page
          html += "<tr>";
          html += "<td>" + registration_main_id + "</td>";
          html += "<td>" + user_code + "</td>";
          html += "<td>" + first_name + "</td>";
          html += "<td>" + middle_name + "</td>";
          html += "<td>" + last_name + "</td>";
          html += "<td>" + phone_country_code + "</td>";
          html += "<td>" + phone_number + "</td>";
          html += "<td>" + email + "</td>";
          html +=
            "<td>" +
            `<button type="button" id="edit_btn" class="btn btn-primary me-2" data-iterator="${i}" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit
    </button>` +
            `<button class="btn btn-danger" data-registration_id="${registration_main_id}" id="remove_btn">Remove</button>` +
            "</td>";
          html += "</tr>";

          //appending the changes into the html page
          $("tbody").html(html);
        }
      $("#example").DataTable();
    },
  });

  // removing the entry from the datatable
  $("tbody").on("click", "#remove_btn", function () {
    // console.log($("#remove_btn").id);
    var delete_id = $(this).data("registration_id");

    $.ajax({
      url: "https://glexas.com/hostel_data/API/test/new_admission_delete.php",
      method: "POST",
      data: {
        registration_main_id: delete_id,
      },
      success: function (data) {
        if (data.status === true) {
          location.reload();
        } else {
          alert("Data couldn't be deleted !");
        }
      },
    });
  });

  // displaying the value of the table fields in edit modal
  $("tbody").on("click", "#edit_btn", function () {
    var iterator = $(this).data("iterator");

    $("#update_entry").css("display", "block");
    $("#add_entry").css("display", "none");

    $("#registration_main_id").val(table_data[iterator].registration_main_id);
    // registration_main_id = table_data[iterator].registration_main_id;
    $("#user_code").val(table_data[iterator].user_code);
    $("#first_name").val(table_data[iterator].first_name);
    $("#middle_name").val(table_data[iterator].middle_name);
    $("#last_name").val(table_data[iterator].last_name);
    $("#phone_country_code").val(table_data[iterator].phone_country_code);
    $("#phone_number").val(table_data[iterator].phone_number);
    $("#email").val(table_data[iterator].email);
    $("#modalLabel").text("Edit Entry");
  });

  // editing the existing datatable entry
  $("#exampleModal").on("click", "#update_entry", function () {
    registration_main_id = $("#registration_main_id").val();
    user_code = $("#user_code").val();
    first_name = $("#first_name").val();
    middle_name = $("#middle_name").val();
    last_name = $("#last_name").val();
    phone_country_code = $("#phone_country_code").val();
    phone_number = $("#phone_number").val();
    email = $("#email").val();

    $.ajax({
      url: "https://glexas.com/hostel_data/API/test/new_admission_update.php",
      method: "POST",
      data: {
        registration_main_id: registration_main_id,
        user_code: user_code,
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        phone_number: phone_number,
        phone_country_code: phone_country_code,
        email: email,
      },
      success: function (data) {
        if (data.status === true) {
          location.reload();
        } else {
          alert("Data couldn't be deleted !");
        }
      },
    });
  });

  $("tfoot").on("click", "#add_btn", function () {
    $("#update_entry").css("display", "none");
    $("#add_entry").css("display", "block");
    $("#modalLabel").text("Add New Entry");
    $("#registration_main_id").css("display", "none");
  });

  // adding new entry to the datatable
  $("#exampleModal").on("click", "#add_entry", function () {
    registration_main_id = $("#registration_main_id").val();
    user_code = $("#user_code").val();
    first_name = $("#first_name").val();
    middle_name = $("#middle_name").val();
    last_name = $("#last_name").val();
    phone_country_code = $("#phone_country_code").val();
    phone_number = $("#phone_number").val();
    email = $("#email").val();

    $.ajax({
      url: "https://glexas.com/hostel_data/API/test/new_admission_insert.php",
      method: "POST",
      data: {
        registration_main_id: registration_main_id,
        user_code: user_code,
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        phone_number: phone_number,
        phone_country_code: phone_country_code,
        email: email,
      },
      success: function (data) {
        if (data.status === true) {
          location.reload();
        } else {
          alert("Data couldn't be deleted !");
        }
      },
    });
  });
});
