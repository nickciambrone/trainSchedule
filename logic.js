var config = {
    apiKey: "AIzaSyAICgsTNBoGU1gaEw7qSxq4G3n6bZI2Js0",
    authDomain: "trainschedule-c8123.firebaseapp.com",
    databaseURL: "https://trainschedule-c8123.firebaseio.com",
    projectId: "trainschedule-c8123",
    storageBucket: "trainschedule-c8123.appspot.com",
    messagingSenderId: "905790521562"
  };
  
  firebase.initializeApp(config);
  

  var database=firebase.database();

  $("#addTrain").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var frequency = $("#frequency").val().trim();
   

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    var newArr={
        trainName: trainName,
        destination:destination,
        trainTime: trainTime,
        frequency: frequency
    }
    
    database.ref().push(newArr);

    alert("Train successfully added!")

    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");

})
//when something is added to the database (line 35) snap a shot
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    //log the snapshot of all of the data that we "pushed" into the "ref" (the newArr object)

    console.log(childSnapshot.val());
    //make a variable called trainName and store the property "trainName" from the snapshot
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;

    //make a variable called trainTimeConverted and set it equal to trainTime minus one year
    var trainTimeConverted=moment(trainTime, "HH:mm").subtract(1,"years")
    console.log(trainTimeConverted)
    console.log("Train Time:" + moment(trainTimeConverted).format("hh:mm"));
    //make a variable called diffTime and set it equal to the difference between the current time and the train time 
    //converted (in minutes)
    var diffTime= moment().diff(moment(trainTimeConverted), "minutes")
    console.log(moment(diffTime).format("hh:mm"));
    //make a variable called remainder and set it equal to the remainder of diffTime/ the frequency
    var remainder= diffTime%frequency
    //frequency minus remainder is how many minutes until the train gets there 
    var minutesUntilTrain= frequency-remainder;
    //the next train is the time now plus how many minutes until the next train
    var nextTrain=moment().add(minutesUntilTrain, "minutes");
    console.log(moment())
    //the next arivval is the same thing as the last guy but we just format it 
    var nextArrival=moment(nextTrain).format("hh:mm")
    console.log(nextArrival)
    //apppend them shits
    $("tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextArrival  + "</td><td>" + minutesUntilTrain + "</td></tr>");


 })
