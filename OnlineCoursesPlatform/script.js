$(document).ready(function () {
  // Toggle menu on smaller screens
  $("#menuToggle").click(function () {
    $("nav ul").slideToggle();
  });

  // Smooth scrolling for anchor links
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    var target = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      1000
    );
  });

  // Form submission handling with Background Sync
  if ("serviceWorker" in navigator && "SyncManager" in window) {
    navigator.serviceWorker.ready.then((sw) => {
      $("#contactForm").submit(function (e) {
        e.preventDefault();

        const formData = {
          name: $("input[type='text']").val(),
          email: $("input[type='email']").val(),
          message: $("textarea").val(),
        };

        // Save form data locally
        localStorage.setItem("pendingMessage", JSON.stringify(formData));

        // Register sync event
        sw.sync.register("sendFormData").then(() => {
          alert("Message saved! Will be sent when online.");
        });

        this.reset();
      });
    });
  } else {
    // Fallback: Send directly if sync is not supported
    $("#contactForm").submit(function (e) {
      e.preventDefault();

      const formData = {
        name: $("input[type='text']").val(),
        email: $("input[type='email']").val(),
        message: $("textarea").val(),
      };

      fetch("/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then(() => alert("Message sent successfully!"))
        .catch(() => alert("Message failed to send!"));

      this.reset();
    });
  }

  // Service Worker Registration
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    });
  }

  // Push Notification Subscription
  if ("serviceWorker" in navigator && "PushManager" in window) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: "<Your Public VAPID Key>",
        })
        .then((subscription) => {
          console.log("Push Subscription:", JSON.stringify(subscription));
        })
        .catch((error) => console.error("Push subscription failed:", error));
    });
  }
});
