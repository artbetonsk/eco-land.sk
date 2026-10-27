'use strict';
(function(){
 const query=new URLSearchParams(location.search);
 const form=document.querySelector('#contact-form');
 const types={spolupraca:'Všeobecná spolupráca',projekt:'Partnerský environmentálny projekt',esg:'ESG / firemný deň',vzdelavanie:'Environmentálne vzdelávanie',dobrovolnictvo:'Dobrovoľníctvo',bukova:'Projekt Buková',obhliadka:'Projekt Buková',prenajom:'Projekt Buková',tim:'ESG / firemný deň'};
 // Old homepage links keep working and carry the selected interest to the single form.
 const legacy=document.querySelector('#kontakt a[href="kontakt.html"]');
 if(legacy&&query.has('zaujem'))legacy.href='kontakt.html?'+query.toString();
 if(!form)return;
 const selected=types[query.get('zaujem')];
 if(selected)form.elements.interest.value=selected;
 document.querySelector('#form-next').value=new URL('dakujeme.html',location.href).href;
 document.querySelector('#form-url').value=location.href.split('#')[0];
})();
