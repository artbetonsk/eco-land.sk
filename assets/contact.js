'use strict';
const form = document.querySelector('#contact-form');
if (form) {
  const status = document.querySelector('#form-status');
  const preview = document.querySelector('#email-preview');
  const bodyField = document.querySelector('#email-body');
  const emailLink = document.querySelector('#email-link');
  const interests = {
    obhliadka: 'Obhliadka a kúpa územia',
    esg: 'ESG / firemný deň',
    prenajom: 'Prenájom priestoru',
    tim: 'Teambuilding a zážitky',
    vzdelavanie: 'Workshop / vzdelávanie'
  };
  const selectedInterest = interests[new URLSearchParams(location.search).get('zaujem')];
  if (selectedInterest) form.elements.interest.value = selectedInterest;
  form.addEventListener('input', () => {
    if (!preview.hidden) {
      preview.hidden = true;
      status.textContent = 'Údaje sa zmenili. Znova pripravte e-mail.';
    }
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const value = (key) => String(data.get(key) || '').trim();
    const subject = 'EcoLand Buková – ' + value('interest');
    const body = [
      'Dobrý deň,', '', 'mám záujem o: ' + value('interest'),
      'Meno: ' + value('name'), 'E-mail: ' + value('email'),
      'Firma / organizácia: ' + (value('company') || 'neuvedené'),
      'Preferovaný termín: ' + (value('date') || 'dohodou'),
      'Počet účastníkov: ' + (value('people') || 'neuvedené'),
      '', value('message'), '', 'Ďakujem.'
    ].join('\n');
    bodyField.value = 'Predmet: ' + subject + '\n\n' + body;
    emailLink.href = 'mailto:artbetonsk@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    preview.hidden = false;
    status.textContent = 'Správa je pripravená. Otvorte e-mailovú aplikáciu alebo text skopírujte. Zatiaľ nebola odoslaná.';
  });
  document.querySelector('#copy-message').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(bodyField.value);
      status.textContent = 'Správa bola skopírovaná. Vložte ju do e-mailu pre artbetonsk@gmail.com a odošlite.';
    } catch {
      bodyField.focus();
      bodyField.select();
      status.textContent = 'Označený text skopírujte a vložte do e-mailu pre artbetonsk@gmail.com.';
    }
  });
}
