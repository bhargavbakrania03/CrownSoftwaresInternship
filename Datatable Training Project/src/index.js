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
    created_time,
    iterator,
    temp_phone_number; // temporary variable to store the (country code + phone number)

  var p_input = document.getElementById("phone_number");
  window.intlTelInput(p_input, {});

  // validation variables
  var user_code_error = true,
    first_name_error = true,
    middle_name_error = true,
    last_name_error = true,
    phone_number_error = true,
    email_error = true;

  $.ajax({
    url: "https://glexas.com/hostel_data/API/test/new_admission_list.php",
    method: "GET",
    dataType: "json",
    success: function (data) {
      if (data.status === true) {
        table_data = data.response;
        length = table_data.length;

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

          // difference of two dates
          var entry_create_time = new Date(table_data[i].created_time);
          var current_date = new Date();
          var time_diff =
            Math.abs(current_date - entry_create_time) / (1000 * 60 * 60 * 24);
          // console.log(time_diff);
          if (time_diff >= 1) {
            html +=
              "<td>" +
              `<button class="btn btn-danger" data-registration_id="${registration_main_id}" id="remove_btn">Remove</button>` +
              "</td>";
          } else {
            html +=
              "<td>" +
              `<button type="button" id="edit_btn" class="btn btn-primary me-2" data-iterator="${i}" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit</button>` +
              `<button class="btn btn-danger" data-registration_id="${registration_main_id}" id="remove_btn">Remove</button>` +
              "</td>";
          }

          html += "</tr>";

          //appending the changes into the html page
          $("tbody").html(html);
        }
        $("#example").DataTable();
      } else {
        alert("Some error occurred while fetching the data from server");
      }
    },
  });

  // removing the entry from the datatable
  $("tbody").on("click", "#remove_btn", function () {
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
    iterator = $(this).data("iterator");
    console.log(iterator);

    $("#update_entry").css("display", "block");
    $("#add_entry").css("display", "none");

    $("#registration_main_id").val(table_data[iterator].registration_main_id);
    $("#user_code").val(table_data[iterator].user_code);
    $("#first_name").val(table_data[iterator].first_name);
    $("#middle_name").val(table_data[iterator].middle_name);
    $("#last_name").val(table_data[iterator].last_name);

    // storing the country code into the global variable
    phone_country_code = table_data[iterator].phone_country_code;

    // to display the whole phone number (country code + phone number) in the phone number field in modal
    $("#phone_number").val(
      phone_country_code + table_data[iterator].phone_number
    );

    $("#email").val(table_data[iterator].email);

    $("#modalLabel").text("Edit Entry");
  });

  // editing the existing datatable entry
  $("#exampleModal").on("click", "#update_entry", function (event) {
    event.preventDefault();
    registration_main_id = $("#registration_main_id").val();
    user_code = $("#user_code").val();
    first_name = $("#first_name").val();
    middle_name = $("#middle_name").val();
    last_name = $("#last_name").val();

    // fetching the updated phone number and storing it inside the temporary variable
    temp_phone_number = $("#phone_number").val();

    // extracting the country code from the entered phone number
    phone_country_code = temp_phone_number.slice(0, 3);
    // extracting the phone number from the entered phone number
    phone_number = temp_phone_number.slice(3);

    email = $("#email").val();
    created_time = table_data[iterator].created_time;

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
        created_time: created_time,
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
  $("#exampleModal").on("click", "#add_entry", function (event) {
    temp_phone_number;
    event.preventDefault();
    validate_user_code();
    validate_first_name();
    validate_middle_name();
    validate_last_name();
    validate_phone_number();
    validate_email();

    if (
      user_code_error === true ||
      first_name_error === true ||
      middle_name_error === true ||
      last_name_error === true ||
      phone_number_error === true ||
      email_error === true
    ) {
      event.preventDefault();
      return false;
    } else {
      user_code = $("#user_code").val();
      first_name = $("#first_name").val();
      middle_name = $("#middle_name").val();
      last_name = $("#last_name").val();

      // fetching the phone number and storing it inside the temporary variable
      temp_phone_number = $("#phone_number").val();

      // extracting the country code from the entered phone number
      phone_country_code = temp_phone_number.slice(0, 3);

      // extracting the phone number from the entered phone number
      phone_number = temp_phone_number.slice(3);

      email = $("#email").val();
      created_time = new Date();

      $.ajax({
        url: "https://glexas.com/hostel_data/API/test/new_admission_insert.php",
        method: "POST",
        data: {
          user_code: user_code,
          first_name: first_name,
          middle_name: middle_name,
          last_name: last_name,
          phone_number: phone_number,
          phone_country_code: phone_country_code,
          email: email,
          created_time: created_time,
        },
        success: function (data) {
          if (data.status === true) {
            location.reload();
          } else {
            alert("Data couldn't be deleted !");
          }
        },
      });
    }
  });

  function validate_user_code() {
    var validate_user_code = new RegExp("^[a-zA-Z_.,!@#$%^&*₹]+$");
    user_code = $("#user_code").val();
    if (validate_user_code.test(user_code)) {
      user_code_error = false;
      $("#user_code").css("border", "2px solid green");
    } else {
      $("#user_code").css("border", "2px solid red");
      user_code_error = true;
    }
  }
  function validate_first_name() {
    var validate_first_name = new RegExp("^[a-zA-Z]+$");
    first_name = $("#first_name").val();
    if (validate_first_name.test(first_name)) {
      first_name_error = false;
      $("#first_name").css("border", "2px solid green");
    } else {
      first_name_error = true;
      $("#first_name").css("border", "2px solid red");
    }
  }

  function validate_middle_name() {
    var validate_middle_name = new RegExp("^[a-zA-Z]+$");
    middle_name = $("#middle_name").val();
    if (validate_middle_name.test(middle_name)) {
      middle_name_error = false;
      $("#middle_name").css("border", "2px solid green");
    } else {
      $("#middle_name").css("border", "2px solid red");
      middle_name_error = true;
    }
  }

  function validate_last_name() {
    var validate_last_name = new RegExp("^[a-zA-Z]+$");
    last_name = $("#last_name").val();
    if (validate_last_name.test(last_name)) {
      last_name_error = false;
      $("#last_name").css("border", "2px solid green");
    } else {
      $("#last_name").css("border", "2px solid red");
      last_name_error = true;
    }
  }

  function validate_phone_number() {
    var validate_phone_number = new RegExp("^[\+1-9][0-9]{2,12}$");
    phone_number = $("#phone_number").val();
    if (validate_phone_number.test(phone_number)) {
      phone_number_error = false;
      $("#phone_number").css("border", "2px solid green");
    } else {
      $("#phone_number").css("border", "2px solid red");
      phone_number_error = true;
    }
  }

  function validate_email() {
    var validate_email = /^\S+@\S+\.\S+$/;
    email = $("#email").val();
    if (validate_email.test(email)) {
      email_error = false;
      $("#email").css("border", "2px solid green");
    } else {
      $("#email").css("border", "2px solid red");
      email_error = true;
    }
  }
});
