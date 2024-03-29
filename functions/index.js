var functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

var db = admin.database();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.overrideHugo = functions.database.ref('/rooms/global/{id}')
    .onWrite(function(event){
        var original = event.data.val().message;
        original = original.replace("Hugo", "Super-Duper-Meanie-Pants");
        original = original.replace("hugo", "super-duper-meanie-pants");
        original = original.replace("John Papa", "The Triple Hypocrite");
        original = original.replace("john papa", "the triple hypocrite");
        return event.data.ref.child("message").set(original);
    });

exports.subscribeUserToGameChat = functions.database.ref('/games/{id}/players/{index}/uid')
  .onWrite(function(event){
    var uid = event.data.val();
    event.data.ref.root.child("/users/"+uid+"/rooms/").remove().then(
      function(resp) {
        var user = event.data.ref.root.child("/users/" + uid + "/rooms/" + event.params.id);
        return user.set("In Game Chat");
      });
  });

exports.createUserModel = functions.auth.user().onCreate(function(event) {
    const user = event.data; // The Firebase user.
    console.log(user);
    var subUser = {
      email: user.email,
      username: user.displayName,
      profile_picture: user.photoURL,
      uid: user.uid,
      records : {
        tictactoe: {
          w: 0, l: 0, d:0
        },
        othello: {
          w: 0, l: 0, d:0
        },
        checkers: {
          w: 0, l: 0, d:0
        }
      }
    };

    var ref = db.ref("/users/"+user.uid);
    return ref.set(subUser).then(function(resp) {
      var ref2 = db.ref("/rooms/global/");
      ref2.push({username:subUser.username, message:"has signed in for the first time!"});
    });
});

exports.reactToGameState = functions.database.ref('/games/{id}/state')
  .onWrite(function(event) {
    var original = event.data.val();
    var ref = db.ref("/gameStats/");
    ref.once("value", function(snapshot) {
      var stats = snapshot.val()||{};
      (stats[original])?stats[original]++:stats[original]=1;
      ref.set(stats);
    });
    var date = new Date();
    return event.data.ref.parent.child("last_state_change").set(date.getTime());
});

exports.reactToGameState = functions.database.ref('/games/{id}/state')
  .onWrite(function(event) {
    var original = event.data.val();
    var ref = db.ref("/gameStats/");
    ref.once("value", function(snapshot) {
      var stats = snapshot.val()||{};
      (stats[original])?stats[original]++:stats[original]=1;
      ref.set(stats);
    });
    var date = new Date();
    return event.data.ref.parent.child("last_state_change").set(date.getTime());
  });
