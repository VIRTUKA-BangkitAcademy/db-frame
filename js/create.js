function addFrame() {
  // Hide any existing alerts
  $("#successAlert, #errorAlert").hide();

  // Show loading spinner
  $("#loadingSpinner").show();

  var formData = new FormData($("#addFrameForm")[0]);

  $.ajax({
    url: "https://capst.glng.my.id/api/frames/", // Replace with your actual API endpoint
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (data) {
      // Hide loading spinner on success
      $("#loadingSpinner").hide();

      // Show success alert
      $("#successAlert").show();

      // Reload the page after a short delay
      setTimeout(function () {
        location.reload();
      }, 2000);
    },
    error: function (error) {
      // Hide loading spinner on error
      $("#loadingSpinner").hide();

      // Show error alert
      $("#errorAlert").show();
      console.error("Error adding frame:", error);
    },
  });
}
