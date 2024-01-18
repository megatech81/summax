document.addEventListener('DOMContentLoaded', function () {
  // Off-Canvas Menu Scripts
  function openNav() {
    document.getElementById("offCanvasMenu").style.width = "250px";
	document.body.classList.add('menu-open');
  }

  function closeNav() {
    document.getElementById("offCanvasMenu").style.width = "0";
	document.body.classList.remove('menu-open');
  }

  // Attach openNav to your menu button
  document.querySelector('.topnav span').addEventListener('click', openNav);

  // Close button inside off-canvas
  document.querySelector('.off-canvas .closebtn').addEventListener('click', closeNav);

  // Smooth scrolling for navigation links - This part might not work as expected because you do not have <nav> element
  // If you do have a <nav>, replace '.topnav a' with 'nav a' and adjust accordingly
  const navLinks = document.querySelectorAll('.topnav a');
  const navHeight = document.querySelector('.topnav').offsetHeight;

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - navHeight, // Adjust for nav height
          behavior: 'smooth'
        });
      }
    });
  });

  // "Read more / Show less" functionality
  const welcomeText = document.querySelector('.welcome h2');
  const readMoreLink = document.querySelector('.read-more-link');
  const hiddenParagraphs = document.querySelectorAll('.welcome .hidden');

  readMoreLink.addEventListener('click', function () {
    hiddenParagraphs.forEach(paragraph => {
      paragraph.classList.toggle('hidden');
    });

    if (readMoreLink.textContent.includes('Read more')) {
      readMoreLink.textContent = 'Show less';
    } else {
      readMoreLink.textContent = 'Read more';
    }
  });

  // Form validation for the contact form
  const emailForm = document.getElementById('email-form');

  if (emailForm) {
    emailForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageTextarea = document.getElementById('message');

      // Validate form data
      if (!validateEmail(emailInput.value.trim())) {
        alert('Please enter a valid email address.');
        return;
      }

      // Assume other validations are passed...

      // AJAX request - This will not work as you do not have access to the server-side route '/send-email'
      // and you have no internet access in this environment. This code should work in your actual environment where
      // the server-side code exists.
      $.ajax({
        type: 'POST',
        url: '/send-email',
        data: {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          subject: subjectInput.value.trim(),
          message: messageTextarea.value.trim()
        },
        success: function (response) {
          if (response.success) {
            document.querySelector('.success-message').style.display = 'block';
          } else {
            alert('Error sending email. Please try again.');
          }
        },
        error: function () {
          alert('Error sending email. Please try again.');
        }
      });
    });
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
