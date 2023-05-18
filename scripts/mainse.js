// Load face-api.js models and dependencies
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startFaceDetection);

// Start face detection on the webcam video stream
function startFaceDetection() {
  // Get a reference to the video element in your HTML
  const videoElement = document.getElementById('myImg');

  // Check if the browser supports getUserMedia (WebRTC)
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Request permission to access the webcam
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        // Set the video element's source to the webcam stream
        videoElement.srcObject = stream;

        // Call the face detection function on each video frame
        videoElement.addEventListener('play', () => {
          const canvas = faceapi.createCanvasFromMedia(videoElement);
          document.body.append(canvas);
          const displaySize = { width: videoElement.width, height: videoElement.height };
          faceapi.matchDimensions(canvas, displaySize);

          setInterval(async () => {
            const detections = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
              .withFaceLandmarks()
              .withFaceExpressions();

            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
          }, 100);
        });
      })
      .catch(error => {
        console.error('Error accessing webcam:', error);
      });
  } else {
    console.error('getUserMedia is not supported in this browser.');
  }
}
