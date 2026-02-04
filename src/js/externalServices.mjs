// ...existing code...
/**
 * Convert a fetch Response into JSON and provide detailed errors.
 * If the response is not ok, throw an object { name, message } where
 * message contains the parsed JSON body from the server.
 */
export async function convertToJson(res) {
  let jsonResponse = null;
  try {
    jsonResponse = await res.json();
  } catch (e) {
    // response had no JSON body or was invalid JSON; keep jsonResponse null
  }

  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse ?? res.statusText ?? 'Bad Response' };
  }
}

/**
 * Minimal external services wrapper. Uses VITE_SERVER_URL from env, if available.
 */
const SERVER = import.meta.env.VITE_SERVER_URL || '/';
const CHECKOUT_URL = new URL('api/checkout', SERVER).toString();

const ExternalServices = {
  async checkout(orderData) {
    // helpful for debugging during development
    // console.log('ExternalServices.checkout -> POST', CHECKOUT_URL);
    const res = await fetch(CHECKOUT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return convertToJson(res);
  }
};

export default ExternalServices;