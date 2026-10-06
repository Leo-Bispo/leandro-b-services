document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });
(() => {
  const container = document.getElementById('online-payment');
  if (!container || typeof PAYMENT_LINK !== 'string' || !PAYMENT_LINK.trim()) return;
  let url;
  try { url = new URL(PAYMENT_LINK); } catch { return; }
  if (url.protocol !== 'https:') return;
  const button = document.createElement('a');
  button.className = 'button';
  button.href = url.href;
  button.textContent = 'Pay securely online';
  container.replaceChildren(button);
  const library = document.createElement('script');
  library.src = 'qrcode.min.js';
  library.onload = () => {
    const qr = document.createElement('div');
    qr.id = 'payment-qr';
    qr.setAttribute('role', 'img');
    qr.setAttribute('aria-label', 'QR code for the secure online payment link');
    container.append(qr);
    try {
      new QRCode(qr, { text: url.href, width: 192, height: 192, colorDark: '#202a26', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M });
      qr.querySelectorAll('img').forEach(img => { img.alt = 'Scan to pay securely online'; });
    } catch { qr.remove(); }
  };
  document.head.append(library);
})();
