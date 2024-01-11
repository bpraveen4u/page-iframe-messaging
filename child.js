// child.js
(function () {
    var port2;
  
    // Listen for the intial port transfer message
    window.addEventListener("message", initPort);
  
    // Setup the transfered port
    function initPort(e) {
      if (e.data === "init") {
        port2 = e.ports[0];
        port2.onmessage = onMessage;
      } else {
        var msgObj = e.data;
        onMessage({
          data: msgObj
        });
      }
    }
  
    // Handle messages received on port2
    function onMessage(e) {
      var $messageContainer = document.querySelector("#message-from-parent");
      $messageContainer.textContent = e.data.message;
      port2.postMessage("Message received by iframe");
    }
  
    // Sending message to the parent
    var $form = document.querySelector("#iframe-form");
    $form.addEventListener("submit", function (e) {
      e.preventDefault();
      var message = document.querySelector("#iframe-message").value;
      port2.postMessage(message);
    });
  })();