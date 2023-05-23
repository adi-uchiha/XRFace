const postButton = document.getElementById('post-button')

postButton.addEventListener('click', sendDataToServer)

function sendDataToServer(event) {
  event.preventDefault(); 
  getFormData()

    console.log("sending Data")
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "frist": "Aditya"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

// fetch("http://localhost:3000/uploadUser", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error)); 
}



function getFormData() {
  let fristName = document.getElementById('first-name')
  let secondName = document.getElementById('second-name')
  let applicationId = document.getElementById('application-Id')


  fristName.value = 'YOOOOO'
  let userForm = {fristName, secondName, applicationId}
  console.log(userForm)
}