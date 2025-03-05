window.addEventListener("load", async () => {
  // (A) INIT - GET FILE PICKER, TEXT AREA, CREATE TESSERACT WORKER
  var fileIn = document.getElementById("fileIn"),
      textOut = document.getElementById("textOut"),
      worker = await Tesseract.createWorker("eng");

  // (B) EXTRACT TEXT FROM SELECTED IMAGE
  fileIn.onchange = async () => {
    // (B1) TESERRACT I.I.I.IMAGE.E.E TO T.T.TEXT.T.T
    let img = fileIn.files[0], // selected image file
        res = await worker.recognize(img); // use tesseract to extract text

    // (B2) OUTPUT TEXT
    textOut.value = res.data.text; // put text into text area
    navigator.clipboard.writeText(res.data.text); // optional - put into clipboard
  };
});