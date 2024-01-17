 // Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Form validation for the contact form
document.addEventListener('DOMContentLoaded', function () {
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

      // Other validations...

      // AJAX request
      $.ajax({
        type: 'POST',
        url: '/send-email', // Server-side route
        data: {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          subject: subjectInput.value.trim(),
          message: messageTextarea.value.trim()
        },
        success: function (response) {
          if (response.success) {
            // Show success message or redirect user
            document.querySelector('.success-message').style.display = 'block';
          } else {
            // Show error message
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
