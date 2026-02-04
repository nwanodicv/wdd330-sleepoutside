// ...existing code...
import ExternalServices from '../js/externalServices.mjs';

/**
 * create a simple alert message that can be used across the checkout flow
 */
export function alertMessage(message, scroll = true) {
  // create element to hold the alert
  const main = document.querySelector('main');
  const alert = document.createElement('div');
  // add a class to style the alert
  alert.classList.add('alert');
  // set the contents. You should have a message and an X or something the user can click on to remove
  const msg = document.createElement('span');
  msg.classList.add('alert-message');
  msg.textContent = typeof message === 'string' ? message : JSON.stringify(message);
  const closeBtn = document.createElement('button');
  closeBtn.classList.add('alert-close');
  closeBtn.setAttribute('aria-label', 'Dismiss alert');
  closeBtn.textContent = 'X';
  alert.appendChild(msg);
  alert.appendChild(closeBtn);

  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener('click', function (e) {
    if (e.target.classList.contains('alert-close')) {
      main.removeChild(this);
    }
  });
  // add the alert to the top of main
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  // you may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);
}

/**
 * collect order data from the form and cart
 */
function getOrderData() {
  const form = document.forms[0];
  const formData = new FormData(form);
  const order = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    street: formData.get('street'),
    city: formData.get('city'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    timestamp: formData.get('timestamp'),
    cardNumber: formData.get('cardNumber'),
    expiration: formData.get('expiration'),
    code: formData.get('code'),
    cart: JSON.parse(localStorage.getItem('cart') || '[]')
  };
  return order;
}

/**
 * send checkout to the ExternalServices and handle success/error
 */
export async function checkout() {
  try {
    const orderData = getOrderData();
    await ExternalServices.checkout(orderData);
    // on success: clear cart and go to success page
    localStorage.removeItem('cart');
    window.location.href = './success.html';
  } catch (err) {
    // err may be { name: 'servicesError', message: {...} } or an Error
    let message = 'An unexpected error occurred';
    if (err && err.name === 'servicesError') {
      message = typeof err.message === 'object' ? JSON.stringify(err.message) : String(err.message);
    } else if (err instanceof Error) {
      message = err.message;
    } else {
      message = JSON.stringify(err);
    }
    alertMessage(message);
  }
}

/**
 * Attach submit click listener that uses HTML form validation before calling checkout()
 */
document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.querySelector('#checkoutSubmit');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const myForm = document.forms[0];
    const chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if (chk_status) checkout();
  });
});