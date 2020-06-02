/*
TODO:
- [  ] Listen for speech and print input to console
- [  ] Simple commands & resonses
    - if "___" in speech then respond with....
- [  ] Set up AI api to get smarter resonses
- [  ] For pics, try # of syllabyls (how the heck do u spell that) to try to match with number of photos
*/

const zoomer = new Artyom();

// Trigger to wake up Zoomer
const command = "Yo Addis";

// Initialize Zooomer
window.onload = function() {
  zoomer.initialize({
    lang: "en-US",
    debug: false,
    continuous: true, // TODO: Make False to process command at a time
    listen: true,
    speed: 1.7, // Voice speed
    soudex: true // better command recognitions
  }).then(function() {
    console.log("Zoomer is ready!")
  }).catch(function() {
    console.error("Zoomer is shy :( Try again.");
  })
}

$(document).ready(function() {
  var on = false;

  $('#toggle').click(function() {
    if (on) {
      $(this).text("Start");
      on = false;

      zoomer.dontObey(); // Stop listening
    } else {
      $(this).text("Stop");
      on = true;

      zoomer.obey(); // Start listening
      
      zoomer.addCommands({
        smart: true,
        indexes: ["Addis *"],
        action: function(i, wildcard) {
          zoomer.say(wildcard);
        }
      })

      process();
    }
 })
})

// Process voice input
function process() {
  zoomer.redirectRecognizedTextOutput(function(recognizedSpeech) {
    console.log(recognizedSpeech);
    console.log("Syllable count: " + syllables(recognizedSpeech));
    
    zoomer.sayRandom(randomResponses);

    //getReply(recognizedSpeech);
  })
}



const trigger = [
  ["hi", "hey", "hello"],
  ["how are you", "how are things"],
  ["what is going on", "what is up"]
];

const response = [
  ["hello!", "hi!", "hey!"],
  ["not too bad, I mean the world is ending but what's new"],
  ["not much"]
];

const randomResponses = [
  "Please shut up for the love of all things good, please stop talking",
  "Why are you like this? Have you ever thought of that?",
  "Go away and close the door on your way out."
]

// Following the same process as animations
// Omg tea what if I made a whole engine
function cartoonMe() {
  return false;
}

function reply(speech, zoomer) {
  console.log("speech: " + speech);
  for (let i = 0; i < trigger.length; i++) {
    console.log("option: " + trigger[i][0]);
    if (speech == trigger[i][0]) {
      zoomer.say(response[i][0]);

      $('#pics').css('background-image', 'url(img/me/smile.jpg');
      setTimeout(function(){$('#pics').css('background-image', 'url(img/me/' + rand(9) + '.jpg)')}, 500);
      setTimeout(function(){$('#pics').css('background-image', 'url(img/me/' + rand(9) + '.jpg)')}, 700);
      setTimeout(function(){$('#pics').css('background-image', 'url(img/me/' + rand(9) + '.jpg)')}, 1000);
      setTimeout(function(){$('#pics').css('background-image', 'url(img/me/' + rand(9) + '.jpg)')}, 1500);
    }
  }
}

function rand(num) {
  return Math.floor(Math.random() * num) + 1;
}

function startContinuousArtyom(){
  zoomer.fatality();// use this to stop any of

  setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
    zoomer.initialize({
      lang:"en-GB",// A lot of languages are supported. Read the docs !
      continuous: true,// Artyom will listen forever
      listen:true, // Start recognizing
      debug:true, // Show everything in the console
      speed:1 // talk normally
    }).then(function(){
      console.log("Ready to work !");
    });
      },250);
}

// Return numbers of syllables in sentence 
// TODO: test accuracy
function syllables(sentence) {
  var wordSyl = function(word) {
    word = word.toLowerCase();                                     
    word = word.replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, '');   
    word = word.replace(/^y/, '');                                 
    var syl = word.match(/[aeiouy]{1,2}/g);
    if(syl) {
      return syl.length;
    } else {
      return 1;
    }
  }
  
  // Total num syllables in sentence
  var words = sentence.split(" ");
  var count = 0;

  for (var i = 0; i < words.length; i++) {
    count += wordSyl(words[i]);
  }

  return count;
}
