const postButton = document.getElementById('post-button')

postButton.addEventListener('click', sendDataToServer)

function sendDataToServer(event) {
  event.preventDefault(); 

    console.log("sending Data")
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(getFormData());

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3000/uploadUser", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error)); 
   
}



function getFormData() {
  let fristName = document.getElementById('first-name')
  let secondName = document.getElementById('second-name')
  let applicationId = document.getElementById('application-Id')
  let email = document.getElementById('email')
  let phone = document.getElementById('phone')


  const userForm = {
    "FristName": fristName.value,
    "SecondName": secondName.value,
    "ApplicationId": applicationId.value,
    "Gender": "male",
    "Email": email.value,
    "Phone": phone.value
  }
  return userForm
}

function randomFill() {
  let applicationId = document.getElementById('application-Id')
  let email = document.getElementById('email')
  let phone = document.getElementById('phone')
  let gender = 'male'
  
  applicationId.value = Date.now()
  email.value = `testuser_${Math.floor(Math.random()*10000)}@gmail.com`
  phone.value = `+91-${Math.floor(Math.random()*10000000000)}`
}