'use strict';
// Kontaktný formulár používa natívny HTML POST na FormSubmit.co.
// JavaScript iba predvyberie typ záujmu a nastaví návratovú adresu.
(function () {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const interests = {
    obhliadka: 'Obhliadka a kúpa územia',
    esg: 'ESG / firemný deň',
    prenajom: 'Prenájom priestoru',
    tim: 'Teambuilding a zážitky',
    vzdelavanie: 'Workshop / vzdelávanie'
  };
  const selected = interests[new URLSearchParams(location.search).get('zaujem')];
  if (selected && form.elements.interest) form.elements.interest.value = selected;
  const next = document.querySelector('#form-next');
  const origin = document.querySelector('#form-url');
  if (next) next.value = new URL('dakujeme.html', location.href).href;
  if (origin) origin.value = location.href.split('#')[0];
  // Nezachytávať submit ani používať mailto – prehliadač odošle formulár cez POST.
})();
