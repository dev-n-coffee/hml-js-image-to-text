window.addEventListener("load", async () => {
  // (A) INIT - GET VIDEO, BUTTON, TEXT AREA, CREATE TESSERACT WORKER
  var camFeed = document.getElementById("camFeed"),
      camGo = document.getElementById("camGo"),
      textOut = document.getElementById("textOut"),
      worker = await Tesseract.createWorker("eng");

  // (B) GET WEBCAM ACCESS
  navigator.mediaDevices.getUserMedia({ video: true })
  .then(async (stream) => {
    // (B1) PUT WEBCAM LIVE STREAM INTO <VIDEO>
    camFeed.srcObject = stream;

    // (B2) "READ TEXT" BUTTON ACTION
    camGo.onclick = async () => {
      // (B2-1) CREATE AN EMPTY <CANVAS>
      let canvas = document.createElement("canvas");
      canvas.width = camFeed.videoWidth;
      canvas.height = camFeed.videoHeight;

      // (B2-2) CAPTURE CURRENT WEBCAM FRAME ONTO <CANVAS>
      canvas.getContext("2d").drawImage(
        camFeed, 0, 0, camFeed.videoWidth, camFeed.videoHeight
      );

      // (B2-3) PASS THE CURRENT WEBCAM FRAME TO TESSERACT
      let img = canvas.toDataURL("image/png"), // current webcam frame to png image
          res = await worker.recognize(img); // use tesseract to extract text

      // (B2-4) OUTPUT TEXT
      textOut.value = res.data.text; // put text into text area
      navigator.clipboard.writeText(res.data.text); // optional - put into clipboard
    };
  })
  .catch(err => console.error(err));
});