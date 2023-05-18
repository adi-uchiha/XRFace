const MODEL_URL = './models'

let startTime = new Date()
let fullFaceDescriptions
const canvas = document.getElementById('overlay')
let imgFiles

// Get a reference to the video element in your HTML
const videoElement = document.getElementById('videoElement');

// Check if the browser supports getUserMedia (WebRTC)
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Request permission to access the webcam
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      // Set the video element's source to the webcam stream
      videoElement.srcObject = stream;
      videoElement.play();
    })
    .catch(error => {
      console.error('Error accessing webcam:', error);
    });
} else {
  console.error('getUserMedia is not supported in this browser.');
}


async function loadMyModels() {
  await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
  await faceapi.loadFaceLandmarkModel(MODEL_URL)
  await faceapi.loadFaceRecognitionModel(MODEL_URL)

}

loadMyModels().then((res) => {
  let endTime = new Date()
  let executionTime = endTime - startTime

  console.log("%cDone loading the models", 'color: rgb(115, 240, 148); font-weight: light; background-color: black')
  console.log(`Time taken by models to load Execution time %c${executionTime} ms`, 'color: red')
  startTime = new Date()


  analyseFace().then((res) => {
    endTime = new Date()
    executionTime = endTime - startTime
    console.log(`Time taken for analysis %c${executionTime} ms`, 'color: red')

  })

})

const input = document.getElementById('videoElement')



async function analyseFace() {

  fetch('http://localhost:5000/files')
  .then(response => response.json())
  .then(data => {

    imgFiles = data;

    loadStaticFaces().then(()=>{
      setInterval(async () => {
        fullFaceDescriptions = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors()
        canvas.width = 640
        canvas.height = 480
        console.log(fullFaceDescriptions)
    
        faceapi.draw.drawDetections(canvas, fullFaceDescriptions)
        // faceapi.draw.drawFaceLandmarks(canvas, fullFaceDescriptions)
        recogniseFace()
      }, 800)
    })  })
  .catch(error => {
    console.error('Error:', error);
  });

}

let labeledFaceDescriptors

async function loadStaticFaces() {
  // const labels = imgFiles
  const labels = removeExtension(imgFiles)
  

  labeledFaceDescriptors = await Promise.all(
    labels.map(async label => {
      // fetch image data from urls and convert blob to HTMLImage element
      const imgUrl = `./images/${label}.jpeg`
      const img = await faceapi.fetchImage(imgUrl)

      // detect the face with the highest score in the image and compute it's landmarks and face descriptor
      const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()

      if (!fullFaceDescription) {
        throw new Error(`no faces detected for ${label}`)
      }

      const faceDescriptors = [fullFaceDescription.descriptor]
      return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
    })
  )
  console.log("Loaded Static Data")
  
}

async function recogniseFace() {

  const maxDescriptorDistance = 0.6
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance)

  const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))

  results.forEach((bestMatch, i) => {
    const box = fullFaceDescriptions[i].detection.box
    const text = bestMatch.toString()
    console.log(text)
    const drawBox = new faceapi.draw.DrawBox(box, { label: text })
    drawBox.draw(canvas)
    faceapi.draw.drawFaceLandmarks(canvas, fullFaceDescriptions[i])
  })

}

function removeExtension(names) {
  // console.log(names)
  let newNames = []
  names.map((name)=> {
    newName = name.substring(0, name.lastIndexOf('.'))
    newNames.push(newName)
    return
  })
  return newNames
}




