(() => {
  document.querySelectorAll('.author__email').forEach((contact) => {
    const address = contact.querySelector('.author__email-address');
    const button = contact.querySelector('.author__email-copy');
    const status = contact.querySelector('.author__email-status');
    button.hidden = false;

    button.addEventListener('click', async () => {
      button.disabled = true;
      status.textContent = '';
      try {
        await navigator.clipboard.writeText(address.textContent.trim());
        status.textContent = 'Copied!';
      } catch (_) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(address);
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = 'Please copy the selected address manually.';
      } finally {
        button.disabled = false;
      }
    });
  });
})();
