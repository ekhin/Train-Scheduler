var config = {
    apiKey: "AIzaSyC-U0veMrTRx7m4ACfowxLg0G3xSV6eTDo",
    authDomain: "my-first-project-c1a72.firebaseapp.com",
    databaseURL: "https://my-first-project-c1a72.firebaseio.com",
    projectId: "my-first-project-c1a72",
    storageBucket: "my-first-project-c1a72.appspot.com"
  };

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
	event.preventDefault();

	var trainName = $("#train-name-input").val().trim();
	var trainDest = $("#dest-input").val().trim();
	var firstTrain = $("#first-train-time-input").val().trim();
	var trainFreq = $("#frequency-input").val().trim();

	var newTrain = {
		name: trainName,
		destination: trainDest,
		start: firstTrain,
		frequency: trainFreq
	};

	database.ref().push(newTrain);

	$("#train-name-input").val("");
	$("#dest-input").val("");
	$("#first-train-time-input").val("");
	$("#frequency-input").val("");
	});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var frequency = childSnapshot.val().frequency;

    var timeArray = firstTrain.split(":");
    var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var trainMinutes;
    var arrival;

    if (maxMoment === trainTime) {
        arrival = trainTime.format("hh:mm A");
        trainMinutes = trainTime.diff(moment(), "minutes");
    }else{

        var differenceTimes = moment().diff(trainTime, "minutes");
        var tRemainder = differenceTimes % frequency;
        trainMinutes = frequency - tRemainder;

        arrival = moment().add(trainMinutes, "m").format("hh:mm A");
    }

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + 
    frequency + "</td><td>" + arrival + "</td><td>" + trainMinutes + "</td></tr>");
});

