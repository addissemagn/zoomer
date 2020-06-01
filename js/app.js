
$(document).ready(function() {
  const zoomer = new Artyom();
  
  var on = false;

  $('#btnOnOff').click(function() {
    var speech = prompt("whatcha wanna say");
    if (speech != null) {
      zoomer.say(speech)
    }

    startContinuousArtyom();

  })


  zoomer.addCommands({
    indexes: ["Hello", "Hey", "How's it going?"],
    action: function() {
      zoomer.say("What's up gamers?");
    }
  });

  zoomer.on(['Good morning','Good afternoon']).then(function(i){
    console.log("listening");
  })
 })


const artyom = new Artyom();

// This function activates artyom and will listen all that you say forever (requires https conection, otherwise a dialog will request if you allow the use of the microphone)
function startContinuousArtyom(){
  artyom.fatality();// use this to stop any of

  setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
    artyom.initialize({
      lang:"en-GB",// A lot of languages are supported. Read the docs !
      continuous:true,// Artyom will listen forever
      listen:true, // Start recognizing
      debug:true, // Show everything in the console
      speed:1 // talk normally
    }).then(function(){
      console.log("Ready to work !");
              
    });
      },250);
  
}
