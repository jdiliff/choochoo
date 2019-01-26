



// //INITIALIZE FIREBASE
var config = {
    apiKey: "AIzaSyD6V4XCo5y9rALSk0Klm6mcp6T3XTQJSuc",
    authDomain: "the-train-schedule.firebaseapp.com",
    databaseURL: "https://the-train-schedule.firebaseio.com",
    projectId: "the-train-schedule",
    storageBucket: "the-train-schedule.appspot.com",
    messagingSenderId: "724092856801"
  };


firebase.initializeApp(config);
var database = firebase.database();

// var provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// provider.setCustomParameters({
//   'login_hint': 'user@example.com'
// });
// firebase.auth().signInWithPopup(provider).then(function(result) {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;
//   // ...
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });

// firebase.auth().getRedirectResult().then(function(result) {
//   if (result.credential) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // ...
//   }
//   // The signed-in user info.
//   var user = result.user;
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });

    
//USE THE ENTER BUTTON TO TRIGGER EVENT WHATEVER FIELD THE CUROSOR IS IN
$('#train-input').keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
     {
       $('#add-train-button').click();
       return false;  
     }
   });   

   $('#train-destination').keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
     {
       $('#add-train-button').click();
       return false;  
     }
   });  

   $('#train-arrival').keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
     {
       $('#add-train-button').click();
       return false;  
     }
   });  

   $('#train-frequency').keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
     {
       $('#add-train-button').click();
       return false;  
     }
   });  


//ON CLICK FUNCTION FOR THE ADD TRAIN BUTTON
$('#add-train-button').on('click', function(event){
    event.preventDefault(); 
   

//GRAB THE INPUT FROM EACH INPUT FIELD 
    var trainName = $('#train-input').val().trim(); 
    var destInput = $('#train-destination').val().trim(); 
    var arrivalInput = $('#train-arrival').val().trim(); 
    var freqInput = $('#train-frequency').val().trim(); 

  
    var newTrain = {
        name: trainName,
        dest: destInput,
        arrival: arrivalInput,
        freq: freqInput
      };

      database.ref().push(newTrain);

   

    //ADD A RED OUTLINE AND A PLEASE ENTER... PLACEHOLDER IF INPUT FIELD IS EMPTY
      if (trainName === '')

      {
          $('#train-name').attr('placeholder', 'Please enter a Train Name'); 
          $('#train-name').attr('class', 'form-control is-invalid'); 
          
          return false; 
       
      } if (destInput === '') {
          $('#train-destination').attr('placeholder', 'Please enter a Destination');
          $('#train-destination').attr('class', 'form-control is-invalid'); 
          return false; 
      }
      
       if (arrivalInput === '') {
          $('#train-arrival').attr('placeholder', 'Please enter an Arrival Time');
          $('#train-arrival').attr('class', 'form-control is-invalid'); 
          return false; 
      }
  
       if (freqInput === '') {
          $('#train-frequency').attr('placeholder', 'Please enter a Frequency');
          $('#train-frequency').attr('class', 'form-control is-invalid'); 
          return false; 
      }
  
    
      else {
      

      //WHEN INPUT FIELD IS AN EMPTY STRING RETURN THE BOOTSTRAP CLASS TO 'FORM CONTROL' TO REMOVE THE PLACEHOLDER AND RED LINING
          $('#train-input').val('');
          $('#train-input').attr('class', 'form-control'); 
          $('#train-destination').val('');
          $('#train-destination').attr('class', 'form-control'); 
          $('#train-arrival').val('');
          $('#train-arrival').attr('class', 'form-control'); 
          $('#train-frequency').val('');
          $('#train-frequency').attr('class', 'form-control'); 
      
      
  
      
 } }); 


//SAVING INFO TO FIREBASE
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
        
    //STORE EVERYTHING INTO VARIABLES
    var trainName = childSnapshot.val().name;
    var destInput = childSnapshot.val().dest;
    var arrivalInput = childSnapshot.val().arrival;
    var freqInput = childSnapshot.val().freq;

    
  

  // DIFFERENCE BETWEEN TRAIN ARRIVAL AND CURRENT TIME
  var diffTime = moment().diff(moment(arrivalInput, "H:mm"), "minutes");

  // REAMINDER FROM DIVIDING TIME DIFFERENCE AND FREQUENCY
  var tLeft = diffTime % freqInput;
 
  // NUMBER OF MINUTES UNTIL THE NEXT TRAIN
  var minutesToNext = freqInput - tLeft;
 console.log("MINUTES TILL TRAIN: " + minutesToNext);

  // NEXT TRAIN ARRIVAL
  var nextTrainConverted = moment().add(minutesToNext, "minutes").format("H:mm");



 //CREATE A NEW ROW FOR EACH INPUT AND APPEND IT TO THE TABLE
    var newTrain = $('<tr>').append(
        $('<td>').text(trainName),
        $('<td>').text(destInput),
        $('<td>').text(freqInput),
        $('<td>').text(nextTrainConverted),
        $('<td>').text(minutesToNext)
    );

    $('#train-table > tbody').append(newTrain);
    }); 




   


    



  
