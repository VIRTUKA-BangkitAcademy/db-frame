// Function to fetch frame details by ID
function fetchFrameDetails(frameId) {
  console.log("Fetching frame details for ID:", frameId);

  // Replace 'https://capst.glng.my.id/api/frames/' with your actual API endpoint for fetching frame details by ID
  $.ajax({
    url: "https://capst.glng.my.id/api/frames/" + frameId,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log("Fetched frame details successfully:", data);

      // Check if 'frame' property exists in the response
      if (data.frame) {
        // Fill the form fields with the fetched data
        $("#updateName").val(data.frame.name);
        $("#updateLinkBuy").val(data.frame.linkBuy);
        $("#updateFace").val(data.frame.face);
        $("#updateGender").val(data.frame.gender);
        $("#updateDescription").val(data.frame.description);

        // Display the image using the fetched path
        var imagePath = "https://capst.glng.my.id/" + data.frame.image;
        $("#frameImage").attr("src", imagePath);

        // Ensure that the file input value is not cached
        $("#updateImage").val("");
      } else {
        console.error("Frame data not found in the response.");
      }
    },
    error: function (error) {
      console.error("Error fetching frame details:", error);
    },
  });
}

// Function to get URL parameter by name
function getParameterByName(name) {
  var url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Fetch frame details when the page loads
$(document).ready(function () {
  var frameId = getParameterByName("id");
  if (frameId) {
    fetchFrameDetails(frameId);
  } else {
    console.error("Frame ID not provided.");
  }
});
// Function to update a frame
function updateFrame() {
  var frameId = getParameterByName("id");

  // Prepare the data to be updated
  var updateData = new FormData();
  updateData.append("name", $("#updateName").val());
  updateData.append("linkBuy", $("#updateLinkBuy").val());
  updateData.append("face", $("#updateFace").val());
  updateData.append("gender", $("#updateGender").val());
  updateData.append("description", $("#updateDescription").val());

  // Get the selected image file
  var imageInput = document.getElementById("updateImage");
  if (imageInput.files.length > 0) {
    updateData.append("image", imageInput.files[0]);
  }

  // Replace 'https://capst.glng.my.id/api/frames/' with your actual API endpoint for updating a frame by ID
  $.ajax({
    url: "https://capst.glng.my.id/api/frames/" + frameId,
    type: "PATCH",
    contentType: false, // Set to false when using FormData
    processData: false, // Set to false when using FormData
    data: updateData,
    success: function () {
      alert("Frame updated successfully!");
      // Redirect to the main page after updating
      window.location.href = "index.html";
    },
    error: function (error) {
      console.error("Error updating frame:", error);
    },
  });
}
