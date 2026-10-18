// Open and close the mobile navigation menu.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("is-open", !isOpen);
});

// Close the mobile menu after a visitor chooses a section.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navLinks.classList.remove("is-open");
  });
});

const contactForm = document.querySelector("#contact-form");
const formSuccess = document.querySelector("#form-success");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Check each field in the browser and show a message without sending email.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = [
    { input: document.querySelector("#name"), error: document.querySelector("#name-error"), message: "Please enter your name." },
    { input: document.querySelector("#email"), error: document.querySelector("#email-error"), message: "Please enter a valid email address.", validate: (value) => emailPattern.test(value) },
    { input: document.querySelector("#message"), error: document.querySelector("#message-error"), message: "Please write a message." }
  ];

  let isValid = true;
  formSuccess.textContent = "";

  fields.forEach(({ input, error, message, validate }) => {
    const value = input.value.trim();
    const fieldIsValid = value !== "" && (!validate || validate(value));
    input.classList.toggle("input-invalid", !fieldIsValid);
    input.setAttribute("aria-invalid", String(!fieldIsValid));
    error.textContent = fieldIsValid ? "" : message;

    if (!fieldIsValid) {
      isValid = false;
    }
  });

  if (isValid) {
    formSuccess.textContent = "Thanks for your message! The form is valid, but it does not send email.";
    contactForm.reset();
    fields.forEach(({ input }) => {
      input.classList.remove("input-invalid");
      input.removeAttribute("aria-invalid");
    });
  }
});
