var data = require("sdk/self").data;
 
// Construct a panel, loading its content from the "text-entry.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.
var text_entry = require("sdk/panel").Panel({
  width: 360,
  height: 500,
  contentURL: data.url("calc.html"),
  contentScriptFile: data.url("calc.js")
});
 
// Create a widget, and attach the panel to it, so the panel is
// shown when the user clicks the widget.
require("sdk/widget").Widget({
  label: "Text entry",
  id: "text-entry",
  contentURL: "http://images.webster-dictionary.org/dict/106/408644-percent-sign.gif",
  panel: text_entry
});
 
// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
text_entry.on("show", function() {
  text_entry.port.emit("show");
});
 
// Listen for messages called "text-entered" coming from
// the content script. The message payload is the text the user
// entered.
// In this implementation we'll just log the text to the console.
text_entry.port.on("text-entered", function (text) {
  console.log(text);
  text_entry.hide();
});
