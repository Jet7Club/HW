(function(){
const C={fr:{commit:'Je m’engage',title:'Premier rendez-vous',first:'Prénom *',last:'Nom *',phone:'Téléphone *',email:'E-mail *',linkedin:'LinkedIn',instagram:'Instagram',message:'Message / préférence de rendez-vous',send:'Préparer mon e-mail',lead:'Complétez vos informations pour demander votre premier rendez-vous.',ready:'Votre e-mail est prêt à être envoyé.',yes:'Oui',no:'Non'},en:{commit:'I commit',title:'First appointment',first:'First name *',last:'Last name *',phone:'Phone *',email:'Email *',linkedin:'LinkedIn',instagram:'Instagram',message:'Message / appointment preference',send:'Prepare my email',lead:'Complete your information to request your first appointment.',ready:'Your email is ready to send.',yes:'Yes',no:'No'},es:{commit:'Me comprometo',title:'Primera cita',first:'Nombre *',last:'Apellido *',phone:'Teléfono *',email:'Correo electrónico *',linkedin:'LinkedIn',instagram:'Instagram',message:'Mensaje / preferencia para la cita',send:'Preparar mi correo',lead:'Complete sus datos para solicitar su primera cita.',ready:'Su correo está listo para enviar.',yes:'Sí',no:'No'}};
function L(){return C[window.lang||'fr']||C.fr}
function audit(){document.querySelectorAll('#hw-answers').forEach(x=>x.remove());document.querySelectorAll('#results .package').forEach(p=>{if((p.querySelector('h3')?.textContent||'').trim().toUpperCase()==='START'){const pr=p.querySelector('.price');const wanted=window.lang==='en'?'€750 <span class="old">€1,000</span>':'750 € <span class="old">1 000 €</span>';if(pr&&pr.innerHTML!==wanted)pr.innerHTML=wanted}const b=p.querySelector('.commit-btn');if(b&&b.textContent!==L().commit)b.textContent=L().commit})}
function style(){if(document.getElementById('hw-appt-css'))return;const s=document.createElement('style');s.id='hw-appt-css';s.textContent='.hw-appt{margin:24px 0;padding:22px;border:1px solid #d1a64e;border-radius:20px;background:linear-gradient(145deg,#fffdf7,#f3e6c9)}.hw-appt-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.hw-appt-grid .full{grid-column:1/-1}.hw-appt label{display:block;font-size:12px;font-weight:800;margin-bottom:5px}.hw-appt input,.hw-appt textarea{width:100%;padding:12px;border:1px solid #cdb77e;border-radius:11px;font:inherit;background:#fff}.hw-appt textarea{min-height:80px}.hw-appt button{width:100%;margin-top:14px;padding:14px;border-radius:12px;border:1px solid #d1a64e;background:#111;color:#f1d184;font-weight:900}@media(max-width:620px){.hw-appt-grid{grid-template-columns:1fr}.hw-appt-grid .full{grid-column:auto}}';document.head.appendChild(s)}
function openBox(pkg){style();document.getElementById('hw-appt')?.remove();const l=L(),plan=(pkg.querySelector('h3')?.textContent||'').trim(),price=(pkg.querySelector('.price')?.textContent||'').trim();const x=document.createElement('section');x.id='hw-appt';x.className='hw-appt';x.dataset.plan=plan;x.dataset.price=price;x.innerHTML=`<h2>${l.title}</h2><p>${l.lead}</p><form><div class="hw-appt-grid"><div><label>${l.first}</label><input name="first" required></div><div><label>${l.last}</label><input name="last" required></div><div><label>${l.phone}</label><input name="phone" type="tel" required></div><div><label>${l.email}</label><input name="email" type="email" required></div><div class="full"><label>${l.linkedin}</label><input name="linkedin"></div><div class="full"><label>${l.instagram}</label><input name="instagram"></div><div class="full"><label>${l.message}</label><textarea name="message"></textarea></div></div><button type="submit">${l.send}</button><p class="muted" id="hw-mail-note"></p></form>`;(pkg.closest('.packages')||pkg).insertAdjacentElement('afterend',x);x.querySelector('form').addEventListener('submit',prepareMail);x.scrollIntoView({behavior:'smooth',block:'center'})}
async function prepareMail(e){
  e.preventDefault();

  const f=e.currentTarget;
  const d=Object.fromEntries(new FormData(f).entries());
  const box=f.closest('.hw-appt');
  const plan=box?.dataset.plan||'';
  const price=box?.dataset.price||'';
  const l=L();

  const qs=typeof allQ==='function'?allQ():[];

  const qaText=Array.from({length:50},(_,i)=>{
    const question=qs[i]?.[1]||`Question ${i+1}`;
    const answer=Number(answers?.[i])===10?l.yes:l.no;
    return `${i+1}. ${question}\n${answer}`;
  }).join('\n\n');

  const note=document.getElementById('hw-mail-note');
  const btn=f.querySelector('button[type="submit"]');

  if(note) note.textContent='Envoi en cours…';
  if(btn) btn.disabled=true;

  try{
    const response=await fetch('https://api.web3forms.com/submit',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify({
        access_key:'d76a6e80-bb1e-4c88-b6cd-0c2d28653582',
        subject:`Human Wealth - ${plan} - ${d.first} ${d.last}`,
        from_name:'Human Wealth',
        email:d.email,
        replyto:d.email,
        first_name:d.first,
        last_name:d.last,
        phone:d.phone,
        linkedin:d.linkedin||'',
        instagram:d.instagram||'',
        offer:plan,
        price:price,
        message:d.message||'',
        answers_50:qaText
      })
    });

    const result=await response.json();

    if(!result.success) throw new Error(result.message);

    if(note) note.textContent='Votre demande a bien été envoyée.';
    f.reset();

  }catch(err){
    console.error(err);
    if(note) note.textContent='Erreur d’envoi. Merci de réessayer.';
  }finally{
    if(btn) btn.disabled=false;
  }
}
function installSafeHooks(){window.setAnswer=function(value){answers[idx]=Number(value);if(idx<49){idx+=1;renderQuiz();return}idx=49;if(typeof window.showResults==='function')window.showResults();setTimeout(audit,0)};document.querySelectorAll('.lang').forEach(b=>{b.onclick=()=>{lang=b.dataset.l;window.lang=lang;localStorage.setItem('hp-lang-v172',lang);if(typeof hpUpdateLanguageButtons==='function')hpUpdateLanguageButtons();if(typeof renderIntro==='function')renderIntro();if(document.getElementById('results')?.style.display==='block'&&typeof window.showResults==='function')window.showResults();else if(typeof renderQuiz==='function')renderQuiz();setTimeout(audit,0)}});audit()}
window.addEventListener('load',()=>setTimeout(installSafeHooks,0));setTimeout(installSafeHooks,0);
})();
