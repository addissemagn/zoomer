$(document).ready(function() {
  const zoombot = new Artyom();
  
  var on = false;

  $('#btnOnOff').click(function() {
    var speech = prompt("whatcha wanna say");
    if (speech != null) {
      zoombot.say(speech)
    }
  })
 })
