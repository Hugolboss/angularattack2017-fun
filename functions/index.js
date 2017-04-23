var functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.overrideHugo = functions.database.ref('/rooms/global/{id}')
    .onWrite(function(event){
        var original = event.data.val().message;
        original = original.replace("Hugo", "Super-Duper-Meanie-Pants");
        original = original.replace("hugo", "super-duper-meanie-pants");
        original = original.replace("John Papa", "The Triple Hypocrite");
        original = original.replace("john papa", "the triple hypocrite");
        return event.data.ref.child("message").set(original);
    });

exports.subscribeUserToGameChat = functions.database.ref('/games/{id}/players/{index}')
  .onWrite(function(event){
    var original = event.data.val();
    //var gameName = event.data.ref.parent.parent.child("game");
    event.data.ref.root.child("/users/"+original.uid+"/rooms/").remove().then(
      function(resp) {
        var user = event.data.ref.root.child("/users/" + original.uid + "/rooms/" + event.params.id);
        return user.set("In Game Chat");
      });
  });
