$(document).ready(function () {
  $(".loader").show();
  $(".data-table").hide();
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
    iterator;

  // validation variables
  var user_code_error = true,
    first_name_error = true,
    middle_name_error = true,
    last_name_error = true,
    phone_number_error = true,
    email_error = true;

  var input = document.querySelector("#phone_number"),
    initial_country = "IN";

  // initialise plugin
  const iti = window.intlTelInput(input, {
    separateDialCode: true,
    initialCountry: initial_country,
    preferredCountries: ["us", "in", "gb"],
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  // getting the country code of the selected country and storing it with a plus sign ahead
  var country_code = "+" + iti.getSelectedCountryData().dialCode;

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
        $(".loader").hide();
        $(".data-table").show();
      } else {
        alert("Some error occurred while fetching the data from server");
      }
    },
  });

  // removing the entry from the datatable
  $("tbody").on("click", "#remove_btn", function () {
    var delete_id = $(this).data("registration_id");
    $(".data-table").hide();
    $(".loader").show();
    $.ajax({
      url: "https://glexas.com/hostel_data/API/test/new_admission_delete.php",
      method: "POST",
      data: {
        registration_main_id: delete_id,
      },
      success: function (data) {
        if (data.status === true) {
          $(".loader").hide();
          $(".data-table").show();
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

    $("#update_entry").css("display", "block");
    $("#add_entry").css("display", "none");
    $("#phone_number_output").css("display", "none");

    registration_main_id = table_data[iterator].registration_main_id;
    $("#user_code").val(table_data[iterator].user_code);
    $("#first_name").val(table_data[iterator].first_name);
    $("#middle_name").val(table_data[iterator].middle_name);
    $("#last_name").val(table_data[iterator].last_name);
    phone_country_code = table_data[iterator].phone_country_code;
    // to set the exact phone into the modal field
    iti.setNumber(phone_country_code + table_data[iterator].phone_number);
    $("#phone_number").val(table_data[iterator].phone_number);
    $("#email").val(table_data[iterator].email);

    $("#modalLabel").text("Edit Entry");

    $("#user_code").css("border", "");
    $("#first_name").css("border", "");
    $("#middle_name").css("border", "");
    $("#last_name").css("border", "");
    $("#phone_number").css("border", "");
    $("#email").css("border", "");
  });

  // editing the existing datatable entry
  $("#exampleModal").on("click", "#update_entry", function (event) {
    event.preventDefault();
    $(".data-table").hide();
    $("#exampleModal").hide();
    $(".loader").show();
    user_code = $("#user_code").val();
    first_name = $("#first_name").val();
    middle_name = $("#middle_name").val();
    last_name = $("#last_name").val();
    phone_number = $("#phone_number").val();
    phone_country_code = "+" + iti.getSelectedCountryData().dialCode;
    email = $("#email").val();
    created_time = table_data[iterator].created_time;

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
      return false;
    } else {
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
            $(".loader").hide();
            $(".data-table").show();
            location.reload();
          } else {
            alert("Data couldn't be deleted !");
          }
        },
      });
    }
  });

  $("tfoot").on("click", "#add_btn", function () {
    $("#update_entry").css("display", "none");
    $("#add_entry").css("display", "block");
    $("#modalLabel").text("Add New Entry");

    $("#user_code").val("");
    $("#first_name").val("");
    $("#middle_name").val("");
    $("#last_name").val("");
    $("#phone_number").val("");
    $("#email").val("");

    iti.setCountry(initial_country);
  });

  // adding new entry to the datatable
  $("#exampleModal").on("click", "#add_entry", function (event) {
    event.preventDefault();
    $(".data-table").hide();
    $("#exampleModal").hide();
    $(".loader").show();
    if (
      user_code_error === true ||
      first_name_error === true ||
      middle_name_error === true ||
      last_name_error === true ||
      phone_number_error === true ||
      email_error === true
    ) {
      return false;
    } else {
      user_code = $("#user_code").val();
      first_name = $("#first_name").val();
      middle_name = $("#middle_name").val();
      last_name = $("#last_name").val();
      phone_country_code = country_code;
      phone_number = $("#phone_number").val();
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
            $(".loader").hide();
            $(".data-table").show();
            location.reload();
          } else {
            alert("Data couldn't be deleted !");
          }
        },
      });
    }
  });

  // validation functions for each field to verify the entered data by the user

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
    const input = document.querySelector("#phone_number");
    const output = document.querySelector("#phone_number_output");
    let text, textNode;

    // here, the index maps to the error code returned from getValidationError - see readme
    const errorMap = [
      "Invalid number",
      "Invalid country code",
      "Too short",
      "Too long",
      "Invalid number",
    ];

    const change = () => {
      if (input.value) {
        if (
          iti.isValidNumber() &&
          country_code !== iti.getSelectedCountryData().dialCode
        ) {
          text =
            "Valid number! ✓ Full international format: " + iti.getNumber();
          output.style.color = "green";
          $("#phone_number").css("border", "2px solid green");
          phone_number_error = false;
          country_code = "+" + iti.getSelectedCountryData().dialCode;
          textNode = document.createTextNode(text);
          output.innerHTML = "";
          output.appendChild(textNode);
        } else {
          text = "Invalid number - please try again";
          output.style.color = "red";
          $("#phone_number").css("border", "2px solid red");
          phone_number_error = true;
          textNode = document.createTextNode(text);
          output.innerHTML = "";
          output.appendChild(textNode);
        }
      } else {
        text = "Please enter a valid number above";
        output.style.color = "red";
      }
    };
    change();

    input.addEventListener("countrychange", function () {
      change();
    });
  }

  function validate_email() {
    var validate_email = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    email = $("#email").val();
    if (validate_email.test(email)) {
      email_error = false;
      $("#email").css("border", "2px solid green");
    } else {
      $("#email").css("border", "2px solid red");
      email_error = true;
    }
  }

  $("#user_code").keyup(function () {
    validate_user_code();
  });

  $("#first_name").keyup(function () {
    validate_first_name();
  });

  $("#middle_name").keyup(function () {
    validate_middle_name();
  });

  $("#last_name").keyup(function () {
    validate_last_name();
  });

  $("#phone_number").keyup(function () {
    validate_phone_number();
  });

  $("#email").keyup(function () {
    validate_email();
  });

  //keypress events to detect and avoid unallowed characters to be inputted by the user

  $("#user_code").on("keypress", function (event) {
    var check_user_code = /^[a-zA-Z]+$/;
    if (!check_user_code.test(event.key)) {
      event.preventDefault();
    }
  });

  $("#first_name").on("keypress", function (event) {
    var check_first_name = /^[a-zA-Z]+$/;
    if (!check_first_name.test(event.key)) {
      event.preventDefault();
    }
  });

  $("#middle_name").on("keypress", function (event) {
    var check_middle_name = /^[a-zA-Z]+$/;
    if (!check_middle_name.test(event.key)) {
      event.preventDefault();
    }
  });

  $("#last_name").on("keypress", function (event) {
    var check_last_name = /^[a-zA-Z]+$/;
    if (!check_last_name.test(event.key)) {
      event.preventDefault();
    }
  });

  $("#phone_number").on("keypress", function (event) {
    var check_phone_number = /^[0-9]+$/;
    if (!check_phone_number.test(event.key)) {
      event.preventDefault();
    }
  });
});
