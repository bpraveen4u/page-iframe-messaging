/* Step 1 : Message channel is created */
var channel = new MessageChannel();
var port1 = channel.port1;

/* Step 2: Using the copy of port1 */
// Hooking up onMessage handler to receive messages from iframe, listening to mesages on port1.
port1.onmessage = onMessage;

// Message handler for port1
function onMessage(e) {
  var output = document.getElementById("message-output");
  output.innerHTML = e.data;
}

/* Step 3: Sending out the port2 on load */
var iframe = document.querySelector("#iframe");
// Wait for the iframe to load to send the port2.
iframe.addEventListener("load", onLoad);

function onLoad() {
  // Transfer port2 to the iframe
  iframe.contentWindow.postMessage("init", "*", [channel.port2]);
}

// Listen for button clicks
$form = document.querySelector("#channel-form");
$form.addEventListener("submit", onSubmit);
// Post a message on port1 when the button is clicked
function onSubmit(e) {
  e.preventDefault();
  var message = document.getElementById("message").value;
  var msgObj = {
    message: message
  };
  port1.postMessage(msgObj);
}