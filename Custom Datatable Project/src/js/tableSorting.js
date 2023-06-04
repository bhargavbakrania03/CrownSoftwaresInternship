var sort_usertype = true,
  sort_first_name = true,
  sort_middle_name = true,
  sort_last_name = true,
  sort_country_code = true,
  sort_phone_number = true,
  sort_email = true,
  sort_registration_main_id;

const sortMapping = {
  0: sort_registration_main_id,
  1: sort_usertype,
  2: sort_first_name,
  3: sort_middle_name,
  4: sort_last_name,
  5: sort_country_code,
  6: sort_phone_number,
  7: sort_email,
};

function sortStrings(columnId) {
  var table, rows, switching, i, x, y, shouldSwitch, table_headings;
  table = document.getElementById("dataTable");
  switching = true;

  console.log();

  if (sortMapping[columnId] === true) {
    while (switching) {
      switching = false;
      rows = table.rows;

      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;

        x = rows[i].getElementsByTagName("TD")[columnId];
        y = rows[i + 1].getElementsByTagName("TD")[columnId];

        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    sortMapping[columnId] = false;
  } else {
    while (switching) {
      switching = false;
      rows = table.rows;

      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;

        x = rows[i].getElementsByTagName("TD")[columnId];
        y = rows[i + 1].getElementsByTagName("TD")[columnId];

        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    sortMapping[columnId] = true;
  }
}

function sortNumbers(columnId) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("dataTable");
  switching = true;

  // if (
  //   sort_usertype === true &&
  //   sort_first_name === true &&
  //   sort_middle_name === true &&
  //   sort_last_name === true &&
  //   sort_country_code === true &&
  //   sort_phone_number === true &&
  //   sort_email === true
  // ) {
  //   sort_registration_main_id = false;
  //   console.log("nahi aave");
  // } else {
  //   console.log("AAve chhe");
  //   sort_registration_main_id = true;
  //   sort_usertype = true;
  //   sort_first_name = true;
  //   sort_middle_name = true;
  //   sort_last_name = true;
  //   sort_country_code = true;
  //   sort_phone_number = true;
  //   sort_email = true;
  // }

  if (sortMapping[columnId] === true) {
    while (switching) {
      switching = false;
      rows = table.rows;

      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;

        x = rows[i].getElementsByTagName("TD")[columnId].innerHTML;
        y = rows[i + 1].getElementsByTagName("TD")[columnId].innerHTML;

        if (parseInt(x) > parseInt(y)) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    sortMapping[columnId] = false;
  } else {
    while (switching) {
      switching = false;
      rows = table.rows;

      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;

        x = rows[i].getElementsByTagName("TD")[columnId].innerHTML;
        y = rows[i + 1].getElementsByTagName("TD")[columnId].innerHTML;

        if (parseInt(x) < parseInt(y)) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    sortMapping[columnId] = true;
  }
}
