function addFrame() {
  var formData = new FormData($("#addFrameForm")[0]);

  $.ajax({
    url: "https://capst.glng.my.id/api/frames/", // Replace with your actual API endpoint
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (data) {
      // Show success alert
      $("#successAlert").show();
      alert("sukses");

      // Reload the page after a short delay
      setTimeout(function () {
        location.reload();
      }, 2000);
    },
    error: function (error) {
      console.error("Error adding frame:", error);
      alert("error, periksa kembali data yang dimasukkan");
    },
  });
}
