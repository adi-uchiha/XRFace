
const startButton = document.getElementById('startButton');
const videoElement = document.getElementById('videoElement');
var captureButton = document.getElementById('captureButton');
captureButton.addEventListener('click', capturePhoto);

startButton.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;
    videoElement.play()
  } catch (error) {
    console.error('Error accessing webcam:', error);
  }
});

function capturePhoto() {

  const firstName = document.getElementById('first-name').value
  const secondName = document.getElementById('second-name').value

  const fileName = firstName.toLowerCase() + '-' + secondName.toLowerCase()

  console.log(fileName)


  var canvasElement = document.getElementById('canvas');
  var canvasContext = canvasElement.getContext('2d');

  // Draw the current video frame onto the canvas
  canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

  // Convert the canvas image to a data URL
  var photoData = canvasElement.toDataURL('image/jpeg');

  // Create a link element to download the photo
  var downloadLink = document.createElement('a');
  downloadLink.href = photoData;
  downloadLink.download = fileName;

  // Programmatically trigger the download
  downloadLink.click();
}
