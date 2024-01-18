document.addEventListener('DOMContentLoaded', function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
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

 // "Read more / Show less" functionality
  const welcomeText = document.querySelector('.welcome h2');
  const readMoreLink = document.querySelector('.read-more-link');
  const hiddenParagraphs = document.querySelectorAll('.welcome .hidden');

  readMoreLink.addEventListener('click', function () {
    hiddenParagraphs.forEach(paragraph => {
      paragraph.classList.toggle('hidden');
    });

    if (welcomeText.classList.contains('expanded')) {
      welcomeText.classList.remove('expanded');
      readMoreLink.textContent = 'Read more';
    } else {
      welcomeText.classList.add('expanded');
      readMoreLink.textContent = 'Show less';
    }
  });

  // Move "Read more" link to the left after completing the last paragraph
  const lastParagraph = document.querySelector('.welcome p:last-child');

  readMoreLink.addEventListener('transitionend', function () {
    if (!hiddenParagraphs[0].classList.contains('hidden')) {
      readMoreLink.style.marginLeft = '0';
    } else {
      readMoreLink.style.marginLeft = 'auto';
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
