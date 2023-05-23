
const startButton = document.getElementById('startButton');
const videoElement = document.getElementById('videoElement');
var captureButton = document.getElementById('captureButton');
var downloadLink = document.createElement('a');

// downloadLink.addEventListener('click', function(event) {
//   event.preventDefault();
// });

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
 

  console.log(firstName, secondName)
  if(secondName === '' || firstName === ''){
    console.log('%cPlease Enter your details', 'color: red; background-color: white')
    return 
  }

  const fileName = firstName.toLowerCase() + '-' + secondName.toLowerCase()

  console.log(fileName)


  var canvasElement = document.getElementById('canvas');
  var canvasContext = canvasElement.getContext('2d');

  // Draw the current video frame onto the canvas
  canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

  // Convert the canvas image to a data URL
  var photoData = canvasElement.toDataURL('image/jpeg');

 

  downloadLink.href = photoData;
  downloadLink.download = fileName;

  
  // Programmatically trigger the download
  document.body.appendChild(downloadLink); // Append the link element to the DOM
  downloadLink.click();
  document.body.removeChild(downloadLink);

}




function randomFill() {
  console.log("Random")
  return 0
}


