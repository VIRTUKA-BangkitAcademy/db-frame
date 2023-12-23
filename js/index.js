var itemsPerPage = 10; // Adjust the number of items per page as needed
var currentPage = 1;

// Function to fetch and display API data in a table
function fetchData() {
  // Replace 'https://capst.glng.my.id/api/frames/' with your actual API endpoint
  $.ajax({
    url: "https://capst.glng.my.id/api/frames/",
    type: "GET",
    dataType: "json",
    success: function (data) {
      displayData(data);
      displayPagination(data);
    },
    error: function (error) {
      console.error("Error fetching data:", error);
    },
  });
}

// Function to display the retrieved data in a table
function displayData(data) {
  var startIndex = (currentPage - 1) * itemsPerPage;
  var endIndex = startIndex + itemsPerPage;
  var framesToShow = data.frames.slice(startIndex, endIndex);

  var output = "";

  // Iterate through each frame in the response and create a table row
  $.each(framesToShow, function (index, frame) {
    output += "<tr>";
    output += "<td>" + frame.name + "</td>";
    output +=
      '<td><img src="' +
      frame.image +
      '" alt="Frame Image" style="max-width: 100px;"></td>';
    output += "<td>" + frame.gender + "</td>";
    output += "<td>" + frame.face + "</td>";
    output +=
      '<td><button class="btn btn-danger" onclick="deleteFrame(\'' +
      frame.id +
      "')\">Delete</button></td>";
    output +=
      '<td><button class="btn btn-info" onclick="redirectToUpdatePage(\'' +
      frame.id +
      "')\">Update</button></td>";

    output += "</tr>";
  });

  // Append the table rows to the 'apiDataTable' tbody
  $("#apiDataTable").html(output);
}

// Function to display pagination
function displayPagination(data) {
  var totalPages = Math.ceil(data.frames.length / itemsPerPage);

  var pagination = "";
  for (var i = 1; i <= totalPages; i++) {
    pagination +=
      '<li class="page-item ' +
      (i === currentPage ? "active" : "") +
      '"><a class="page-link" href="#" onclick="changePage(' +
      i +
      ')">' +
      i +
      "</a></li>";
  }

  $("#pagination").html(pagination);
}

// Function to change the current page and fetch data
function changePage(page) {
  currentPage = page;
  fetchData();
}

// Function to delete a frame
function deleteFrame(frameId) {
  if (confirm("Are you sure you want to delete this frame?")) {
    $.ajax({
      url: "https://capst.glng.my.id/api/frames/" + frameId,
      type: "DELETE",
      success: function () {
        alert("Frame deleted successfully!");
        // Reload the data after deletion
        fetchData();
      },
      error: function (error) {
        console.error("Error deleting frame:", error);
      },
    });
  }
}
function redirectToUpdatePage(frameId) {
  // Redirect to the update page with the frame ID as a parameter
  window.location.href = "update.html?id=" + frameId;
}

// Call the fetchData function when the page loads
$(document).ready(function () {
  fetchData();
});
