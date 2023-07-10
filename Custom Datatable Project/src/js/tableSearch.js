function tableSearch() {
  let input,
    filter,
    table,
    tr,
    td = [],
    txtValue = [],
    active = [];

  //Intialising Variables
  input = document.getElementById("search_input");
  filter = input.value.toLowerCase();
  table = document.getElementById("dataTable");
  tr = table.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    td[0] = tr[i].getElementsByTagName("td")[0];
    td[1] = tr[i].getElementsByTagName("td")[1];
    td[2] = tr[i].getElementsByTagName("td")[2];
    td[3] = tr[i].getElementsByTagName("td")[3];
    td[4] = tr[i].getElementsByTagName("td")[4];
    td[5] = tr[i].getElementsByTagName("td")[5];
    td[6] = tr[i].getElementsByTagName("td")[6];
    td[7] = tr[i].getElementsByTagName("td")[7];

    if (td[0] || td[1] || td[2] || td[3] || td[4] || td[5] || td[6] || td[7]) {
      txtValue[0] = td[0].textContent || td[0].innerText;
      txtValue[1] = td[1].textContent || td[1].innerText;
      txtValue[2] = td[2].textContent || td[2].innerText;
      txtValue[3] = td[3].textContent || td[3].innerText;
      txtValue[4] = td[4].textContent || td[4].innerText;
      txtValue[5] = td[5].textContent || td[5].innerText;
      txtValue[6] = td[6].textContent || td[6].innerText;
      txtValue[7] = td[7].textContent || td[7].innerText;
      for (let j = 0; j < 8; j++) {
        if (txtValue[j].toLowerCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          active.push(tr[i]);
        } else {
          active.includes(tr[i])
            ? (tr[i].style.display = "")
            : (tr[i].style.display = "none");
        }
      }
    }
  }

  if(input.value !== ""){
    document.getElementById("close_button").style.display = "block";
  }
  else if(input.value === ""){
    document.getElementById("close_button").style.display = "none";
  }
}

function clearFilter() {
  input = document.getElementById("search_input");
  filter = input.value.toLowerCase();
  table = document.getElementById("dataTable");
  tr = table.getElementsByTagName("tr");

  for(var i=0;i<tr.length;i++){
    tr[i].style.display = "";
  }

  input.value = "";
  document.getElementById("close_button").style.display = "none";
}
