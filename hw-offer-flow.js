(function(){
const C={fr:{commit:'Je m’engage',title:'Premier rendez-vous',first:'Prénom *',last:'Nom *',phone:'Téléphone *',email:'E-mail *',linkedin:'LinkedIn',instagram:'Instagram',message:'Message / préférence de rendez-vous',send:'Premier rendez-vous',lead:'Complétez vos informations pour demander votre premier rendez-vous.',mail:'Le PDF spécial rendez-vous a été généré avec les 50 réponses. Votre e-mail est prêt : joignez ce PDF puis envoyez-le.',yes:'Oui',no:'Non'},en:{commit:'I commit',title:'First appointment',first:'First name *',last:'Last name *',phone:'Phone *',email:'Email *',linkedin:'LinkedIn',instagram:'Instagram',message:'Message / appointment preference',send:'First appointment',lead:'Complete your information to request your first appointment.',mail:'The special appointment PDF has been generated with all 50 answers. Your email is ready: attach this PDF, then send it.',yes:'Yes',no:'No'},es:{commit:'Me comprometo',title:'Primera cita',first:'Nombre *',last:'Apellido *',phone:'Teléfono *',email:'Correo electrónico *',linkedin:'LinkedIn',instagram:'Instagram',message:'Mensaje / preferencia para la cita',send:'Primera cita',lead:'Complete sus datos para solicitar su primera cita.',mail:'El PDF especial de la cita se ha generado con las 50 respuestas. Su correo está listo: adjunte este PDF y envíelo.',yes:'Sí',no:'No'}};
function L(){return C[window.lang||'fr']||C.fr}
function audit(){document.querySelectorAll('#hw-answers').forEach(x=>x.remove());document.querySelectorAll('#results .package').forEach(p=>{if((p.querySelector('h3')?.textContent||'').trim().toUpperCase()==='START'){const pr=p.querySelector('.price');const wanted=window.lang==='en'?'€750 <span class="old">€1,000</span>':'750 € <span class="old">1 000 €</span>';if(pr&&pr.innerHTML!==wanted)pr.innerHTML=wanted}const b=p.querySelector('.commit-btn');if(b&&b.textContent!==L().commit)b.textContent=L().commit})}
function style(){if(document.getElementById('hw-appt-css'))return;const s=document.createElement('style');s.id='hw-appt-css';s.textContent='.hw-appt{margin:24px 0;padding:22px;border:1px solid #d1a64e;border-radius:20px;background:linear-gradient(145deg,#fffdf7,#f3e6c9)}.hw-appt-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.hw-appt-grid .full{grid-column:1/-1}.hw-appt label{display:block;font-size:12px;font-weight:800;margin-bottom:5px}.hw-appt input,.hw-appt textarea{width:100%;padding:12px;border:1px solid #cdb77e;border-radius:11px;font:inherit;background:#fff}.hw-appt textarea{min-height:80px}.hw-appt button{width:100%;margin-top:14px;padding:14px;border-radius:12px;border:1px solid #d1a64e;background:#111;color:#f1d184;font-weight:900}@media(max-width:620px){.hw-appt-grid{grid-template-columns:1fr}.hw-appt-grid .full{grid-column:auto}}';document.head.appendChild(s)}
function openBox(pkg){style();document.getElementById('hw-appt')?.remove();const l=L(),plan=(pkg.querySelector('h3')?.textContent||'').trim(),price=(pkg.querySelector('.price')?.textContent||'').trim();const x=document.createElement('section');x.id='hw-appt';x.className='hw-appt';x.dataset.plan=plan;x.dataset.price=price;x.innerHTML=`<h2>${l.title}</h2><p>${l.lead}</p><form><div class="hw-appt-grid"><div><label>${l.first}</label><input name="first" required></div><div><label>${l.last}</label><input name="last" required></div><div><label>${l.phone}</label><input name="phone" type="tel" required></div><div><label>${l.email}</label><input name="email" type="email" required></div><div class="full"><label>${l.linkedin}</label><input name="linkedin"></div><div class="full"><label>${l.instagram}</label><input name="instagram"></div><div class="full"><label>${l.message}</label><textarea name="message"></textarea></div></div><button type="submit">${l.send}</button><p class="muted" id="hw-mail-note"></p></form>`;(pkg.closest('.packages')||pkg).insertAdjacentElement('afterend',x);x.querySelector('form').addEventListener('submit',prepareMail);x.scrollIntoView({behavior:'smooth',block:'center'})}
function pdfParts(){const source=document.getElementById('results');if(!source)return null;const blocks=[...source.querySelectorAll('section.result-block')];return{score:source.querySelector('.scoregrid')?.outerHTML||'',lecture:blocks[0]?.outerHTML||'',potentials:blocks[1]?.outerHTML||'',reco:blocks[2]?.outerHTML||'',offers:source.querySelector('.packages')?.outerHTML||'',title:window.lang==='en'?'Human Wealth Assessment':window.lang==='es'?'Evaluación Human Wealth':'Bilan Human Wealth'}}
function premiumThreePagePdf(){const p=pdfParts();if(!p)return;const w=window.open('','_blank')||window;const logo=new URL('Human_Wealth_Logo_Complet_Premium.png',location.href).href;w.document.write(`<!doctype html><html lang="${window.lang||'fr'}"><head><meta charset="utf-8"><title>${p.title}</title><style>@page{size:A4;margin:0}*{box-sizing:border-box}html,body{margin:0;padding:0;background:#efe8dc;font-family:Inter,Arial,sans-serif;color:#17130d}.page{width:210mm;height:297mm;overflow:hidden;page-break-after:always;background:linear-gradient(145deg,#fffdf8,#f5efe4);padding:15mm 16mm 13mm;position:relative}.page:last-child{page-break-after:auto}.top{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #c9ab62;padding-bottom:7mm;margin-bottom:7mm}.top img{width:48mm;height:auto}.kicker{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:#8b6c2d;font-weight:800}.page h1{font-size:23px;margin:2mm 0 0;color:#14110c}.scoregrid{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm;margin:0 0 6mm}.score{padding:5mm;border:1px solid #d8c28d;border-radius:4mm;background:rgba(255,255,255,.82);box-shadow:0 2mm 6mm rgba(35,25,10,.06);min-height:26mm}.score b{display:block;font-size:20px;color:#8c6a28}.score span{font-size:11px;line-height:1.25}.result-block{margin:0 0 5mm;padding:5mm 5.5mm;border:1px solid #d8c28d;border-radius:4mm;background:rgba(255,255,255,.86);box-shadow:0 2mm 6mm rgba(35,25,10,.05);font-size:10.5px;line-height:1.42}.result-block h2{font-size:15px;margin:0 0 3mm;color:#2b2419}.result-block h3{font-size:12px;margin:2mm 0}.profile-lines,.axes{display:grid;gap:2mm}.profile-line,.axis{padding:2.5mm 3mm;border-radius:2.5mm;background:#faf6ee}.packages{margin-top:2mm}.packagegrid{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}.package{padding:5mm;border:1px solid #d8c28d;border-radius:4mm;background:rgba(255,255,255,.9);box-shadow:0 2mm 6mm rgba(35,25,10,.06);font-size:10px;line-height:1.35;min-height:110mm}.package h3{font-size:16px;margin:0 0 2mm}.price{font-size:20px!important;color:#8c6a28!important}.old{font-size:10px!important}.packages button,.timer,.eyebrow,.hp-phase,.deep-analysis,#hp-workspace-gate,#hw-export-pdf-wrap,.commit-btn{display:none!important}.footer{position:absolute;left:16mm;right:16mm;bottom:7mm;border-top:1px solid #d7c9a8;padding-top:3mm;font-size:8.5px;color:#75684f;display:flex;justify-content:space-between}.page2 .result-block{font-size:10px;line-height:1.35;padding:4.5mm 5mm}.page2 .result-block h2{font-size:14px}.page3 .top{margin-bottom:5mm}@media print{html,body{background:#fff}.page{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body><section class="page page1"><div class="top"><div><div class="kicker">Human Wealth · A brighter future</div><h1>${p.title}</h1></div><img src="${logo}" alt="Human Wealth"></div>${p.score}${p.lecture}<div class="footer"><span>Human Wealth</span><span>1 / 3</span></div></section><section class="page page2"><div class="top"><div><div class="kicker">Human Wealth · A brighter future</div><h1>${window.lang==='en'?'Potential & Recommendations':window.lang==='es'?'Potenciales y Recomendaciones':'Potentiels à développer & Recommandations'}</h1></div><img src="${logo}" alt="Human Wealth"></div>${p.potentials}${p.reco}<div class="footer"><span>Human Wealth</span><span>2 / 3</span></div></section><section class="page page3"><div class="top"><div><div class="kicker">Human Wealth · A brighter future</div><h1>${window.lang==='en'?'Offers':window.lang==='es'?'Ofertas':'Offres Human Wealth'}</h1></div><img src="${logo}" alt="Human Wealth"></div>${p.offers}<div class="footer"><span>Human Wealth</span><span>3 / 3</span></div></section><script>window.onload=()=>setTimeout(()=>window.print(),300)<\/script></body></html>`);w.document.close();w.focus()}
function appointmentPdf(){const p=pdfParts();if(!p)return;const qs=typeof allQ==='function'?allQ():[],l=L(),qa=`<section class="page qa"><h1>50 réponses / 50 answers / 50 respuestas</h1>${Array.from({length:50},(_,i)=>`<p><b>${i+1}. ${qs[i]?.[1]||'Question '+(i+1)}</b><br>${Number(answers[i])===10?l.yes:l.no}</p>`).join('')}</section>`;const w=window.open('','_blank')||window;w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${p.title}</title><style>@page{size:A4;margin:14mm}*{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#17110a}.page{min-height:267mm;page-break-after:always}.page:last-child{page-break-after:auto}.scoregrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.score,.result-block,.package,.qa{padding:12px;border:1px solid #d8c28d;border-radius:10px}.packagegrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.packages button,.timer,.eyebrow,.hp-phase{display:none!important}.qa p{margin:0 0 10px}</style></head><body><section class="page"><h1>${p.title}</h1>${p.score}${p.lecture}</section><section class="page"><h1>${p.title}</h1>${p.potentials}${p.reco}</section><section class="page"><h1>${p.title}</h1>${p.offers}</section>${qa}<script>window.onload=()=>setTimeout(()=>window.print(),300)<\/script></body></html>`);w.document.close();w.focus()}
window.hwExportPdf=premiumThreePagePdf;window.hwExportAppointmentPdf=appointmentPdf;
async function prepareMail(e){
  e.preventDefault();

  const f=e.currentTarget;
  const d=Object.fromEntries(new FormData(f).entries());
  const box=f.closest('.hw-appt');
  const plan=box?.dataset.plan||'';
  const price=box?.dataset.price||'';
  const l=L();

  const note=document.getElementById('hw-mail-note');
  const btn=f.querySelector('button[type="submit"]');

  if(note) note.textContent='Envoi sécurisé en cours…';
  if(btn) btn.disabled=true;

  try{
    const qs=typeof allQ==='function'?allQ():[];

    const qaText=Array.from({length:50},(_,i)=>{
      const question=qs[i]?.[1]||`Question ${i+1}`;
      const answer=Number(answers[i])===10?l.yes:l.no;
      return `${i+1}. ${question}\n${answer}`;
    }).join('\n\n');

    const response=await fetch(
      'https://urasoczbukjlqeywwyik.supabase.co/functions/v1/send-human-wealth-appointment',
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyYXNvY3pidWtqbHFleXd3eWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyODc0MTgsImV4cCI6MjEwNjg2MzQxOH0.c30Se49HqxJItoP445hllukvjkeaD8LhoMJef6Y5Jj0',
          'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyYXNvY3pidWtqbHFleXd3eWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyODc0MTgsImV4cCI6MjEwNjg2MzQxOH0.c30Se49HqxJItoP445hllukvjkeaD8LhoMJef6Y5Jj0'
        },
        body:JSON.stringify({
          first:d.first,
          last:d.last,
          phone:d.phone,
          email:d.email,
          linkedin:d.linkedin||'',
          instagram:d.instagram||'',
          message:d.message||'',
          plan,
          price,
          qaText,
          lang:window.lang||'fr'
        })
      }
    );

    const result=await response.json();

    if(!response.ok||!result.ok){
      throw new Error(result.error||'Erreur envoi');
    }

    if(note){
      note.textContent=
        window.lang==='en'
          ? 'Your first appointment request has been sent successfully.'
          : window.lang==='es'
          ? 'Su solicitud de primera cita se ha enviado correctamente.'
          : 'Votre demande de premier rendez-vous a bien été envoyée.';
    }

  }catch(err){
    console.error(err);

    if(note){
      note.textContent=
        window.lang==='en'
          ? 'Sending failed. Please try again.'
          : window.lang==='es'
          ? 'El envío ha fallado. Inténtelo de nuevo.'
          : 'L’envoi a échoué. Merci de réessayer.';
    }
  }finally{
    if(btn) btn.disabled=false;
  }
}
document.addEventListener('click',e=>{const b=e.target.closest?.('#results .commit-btn');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const p=b.closest('.package');if(p)openBox(p)},true);
function installSafeHooks(){window.setAnswer=function(value){answers[idx]=Number(value);if(idx<49){idx+=1;renderQuiz();return}idx=49;if(typeof window.showResults==='function')window.showResults();setTimeout(audit,0)};document.querySelectorAll('.lang').forEach(b=>{b.onclick=()=>{lang=b.dataset.l;window.lang=lang;localStorage.setItem('hp-lang-v172',lang);if(typeof hpUpdateLanguageButtons==='function')hpUpdateLanguageButtons();if(typeof renderIntro==='function')renderIntro();if(document.getElementById('results')?.style.display==='block'&&typeof window.showResults==='function')window.showResults();else renderQuiz();setTimeout(audit,0)}});audit()}
window.addEventListener('load',()=>setTimeout(installSafeHooks,0));setTimeout(installSafeHooks,0);
})();
