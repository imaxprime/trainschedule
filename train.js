  var config = {
    apiKey: "AIzaSyAEyUky7HrvRN1TiPJnebw-HKTnmv3xDbg",
    authDomain: "test-project-1f8eb.firebaseapp.com",
    databaseURL: "https://test-project-1f8eb.firebaseio.com",
    projectId: "test-project-1f8eb",
    storageBucket: "test-project-1f8eb.appspot.com",
    messagingSenderId: "92308991294"
  };

  firebase.initializeApp(config);

var database = firebase.database();

var newTrainName = "";
var newDestination = "";
var newFirstTime = "";
var newFrequency = "";

  $("#newTrainSubmission").click(function(e) {
    e.preventDefault();

    newTrainName = $("#trainName").val().trim();
    newDestination = $("#destination").val().trim();
    newFirstTime = $("#firstTrainTime").val().trim();
    newFrequency = $("#frequency").val().trim();

    var newTrainEntry = {
      trainName: newTrainName,
      destination: newDestination,
      startTime: newFirstTime,
      frequency: newFrequency
      };

    database.ref().push(newTrainEntry);
  });

  database.ref().on("child_added", function(currentSnapshot) {

    var trainTd = currentSnapshot.val().trainName;
    console.log(trainTd);
    var destinationTd = (currentSnapshot.val().destination);
    console.log(destinationTd);
    var startTd = (currentSnapshot.val().startTime);
    console.log(startTd);
    var frequencyTd = (currentSnapshot.val().frequency);
    console.log(frequencyTd);

    var startTimeConverted = moment(startTd, "HH:mm").subtract(1, "years");
    console.log(startTimeConverted);

    var now = moment();
    console.log(moment(now).format("HH:mm"));

    var minutesSinceStart = moment().diff(moment(startTimeConverted), "minutes");
    console.log(minutesSinceStart);

    var minutesDiff  = minutesSinceStart % frequencyTd;
    console.log(minutesDiff);

    var minutesUntil = frequencyTd - minutesDiff;

    var nextTime = moment(now).add(minutesUntil, "minutes").format("HH:mm");
    console.log(nextTime);

    var trainButtonID = trainTd.replace(/ /g,'');

    var newRow = (
    "<tr>" +
    "<td>" + trainTd  + "</td>" +
    "<td>" + destinationTd + "</td>" +
    "<td>" + frequencyTd + "</td>" +
    "<td>" + nextTime + "</td>" +
    "<td>" + minutesUntil + "</td>" +
    // "<td>" + "<button class='edit' id='edit" + trainButtonID + "'> Edit Train </button>"  + "</td>" +
    "<td>" + "<button class='delete' id='" + trainButtonID + "'> Delete</button>"  + "</td>" +
    "</tr>"
    );
    console.log(newRow);

    $(document).on("click", ".delete", function() {
    console.log("delete button clicked");
    deleteID = $(this).attr("id");
    console.log(deleteID);
    
    });


    $("#scheduleTable").append(newRow);
    });