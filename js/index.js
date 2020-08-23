import components from './components.js';

if (typeof window.ga !== 'function') {
  window.ga = function (ev, d) {
    console.log(ev, d);
  };
}

if ('ontouchstart' in window) {
  document.documentElement.classList.remove('no-touch');
}

document.addEventListener('DOMContentLoaded', () => {
  components()
  .then(() => {
    const $ = document.querySelectorAll.bind(document);

    Array.from($('#home-clients a, #addresses a, #links a'))
    .forEach((item) => {
      item.addEventListener('click', function () {
        ga('send', {
          eventAction: 'click',
          eventCategory: 'external',
          eventLabel: this.title,
          hitType: 'event'
        });
        return true;
      });
    });

    $('#down-button')[0].addEventListener('click', function () {
      ga('send', {
        eventAction: 'click',
        eventCategory: 'internal',
        eventLabel: this.title,
        hitType: 'event'
      });
    });

    const accordionMenu = $('.accordion-menu .accordion-checkbox');

    // Accordion expand/collapse
    Array.from(accordionMenu)
    .map((checkbox) => {
      checkbox.addEventListener('change', function () {
        if (this.checked) {
          this.parentElement.classList.add('show');
          // log what accordions are getting opened
          ga('send', {
            eventAction: 'change',
            eventCategory: 'accordion',
            eventLabel: this.id,
            hitType: 'event'
          });
        } else {
          this.parentElement.classList.remove('show');
        }
      });
    });

    // const alert = document.getElementById('ajax-message').children[0];
    // function showSuccess(message) {
    //   const alertSuccess = new CustomEvent('success', {
    //     detail: { message }
    //   });
    //   alert.dispatchEvent(alertSuccess);
    // }

    // function showError(message) {
    //   const alertError = new CustomEvent('error', {
    //     detail: { message }
    //   });
    //   alert.dispatchEvent(alertError);
    // }

    // $('#contact-form')[0].addEventListener('submit', function (event) {
    //   event.preventDefault();
    //   const form = new FormData(this);
    //   fetch(this.action, {
    //     method: this.method,
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       first_name: form.get('first_name'),
    //       name: form.get('name'),
    //       email: form.get('email'),
    //       email_confirmation: form.get('email_confirmation'),
    //       website: form.get('website'),
    //       message: form.get('message'),
    //       newsletter: form.get('newsletter'),
    //     })
    //   })
    //   .then(res => res.json())
    //   .then((res) => {
    //     const validationMessage = res.message.length > 1 ? res.message.join(' and ') : res.message;
    //     if (res.status) {
    //       showSuccess(validationMessage);
    //     } else {
    //       showError(validationMessage);
    //     }
    //     ga('send', {
    //       eventAction: 'submit',
    //       eventCategory: 'form',
    //       eventLabel: (res.status) ? 'Success' : 'Fail',
    //       hitType: 'event'
    //     });
    //     return res;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     showError(err.message);
    //     ga('send', {
    //       eventAction: 'submit',
    //       eventCategory: 'form',
    //       eventLabel: 'Fail',
    //       hitType: 'event'
    //     });
    //     return false;
    //   });
    // });
  });
});
