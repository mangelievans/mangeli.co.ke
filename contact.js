const EMAILJS_SERVICE_ID = 'service_pvrmkau';
const EMAILJS_TEMPLATE_ID = 'template_620wgv6';
const EMAILJS_PUBLIC_KEY = '5r0ExdHKOOkdo80MV';

document.querySelectorAll('.contact-form').forEach((form) => {
  const status = form.querySelector('.contact-status');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    if ([EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY].some((value) => value.startsWith('YOUR_'))) {
      status.textContent = 'Email is not configured yet. Please try again later.';
      status.dataset.state = 'error';
      return;
    }

    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    const submitButton = form.querySelector('[type="submit"]');
    submitButton.disabled = true;
    status.textContent = 'Sending your message...';
    status.dataset.state = 'pending';

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
      status.textContent = 'Thanks, your message has been sent.';
      status.dataset.state = 'success';
      form.reset();
    } catch (error) {
      status.textContent = 'Your message could not be sent. Please try again later.';
      status.dataset.state = 'error';
    } finally {
      submitButton.disabled = false;
    }
  });
});