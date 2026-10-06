/* Human Wealth loader: preserve typology engine, then load the latest offer flow after the page is fully initialized. */
document.write('<script src="typology-reading-base.js"><\/script>');

(function(){
  const SCALE={
    fr:['Pas du tout','Rarement','Parfois','Souvent','Tout à fait'],
    en:['Not at all','Rarely','Sometimes','Often','Completely'],
    es:['Nada','Raramente','A veces','A menudo','Totalmente']
  };
  const LABELS={
    fr:{title:'HUMAN WEALTH — BILAN PERSONNEL',scores:'LES 6 NOTES',express:'LECTURE EXPRESS',develop:'POINTS À DÉVELOPPER',reco:'RECOMMANDATIONS',answers:'LES 50 RÉPONSES',comment:'MESSAGE DU CLIENT'},
    en:{title:'HUMAN WEALTH — PERSONAL ASSESSMENT',scores:'6 SCORES',express:'EXPRESS READING',develop:'POINTS TO DEVELOP',reco:'RECOMMENDATIONS',answers:'50 ANSWERS',comment:'CLIENT MESSAGE'},
    es:{title:'HUMAN WEALTH — EVALUACIÓN PERSONAL',scores:'LAS 6 NOTAS',express:'LECTURA EXPRESS',develop:'PUNTOS A DESARROLLAR',reco:'RECOMENDACIONES',answers:'LAS 50 RESPUESTAS',comment:'MENSAJE DEL CLIENTE'}
  };
  const LINE='────────────────────────────────';
  function clean(el){
    return (el?.innerText||el?.textContent||'').replace(/\u00a0/g,' ').replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim();
  }
  function section(title,body){
    return `${LINE}\n${title}\n${LINE}\n${body}`;
  }
  function report(){
    const lg=window.lang||'fr';
    const labels=SCALE[lg]||SCALE.fr;
    const t=LABELS[lg]||LABELS.fr;
    const qs=typeof allQ==='function'?allQ():[];
    const scores=window.hpLastScores||{};
    const scoreText=Object.entries(scores).map(([k,v])=>`• ${k} : ${v}/100`).join('\n');
    const blocks=Array.from(document.querySelectorAll('#results .result-block'));
    const express=clean(blocks[0]);
    const profile=clean(blocks[1]);
    const develop=clean(blocks[2]);
    const deep=clean(document.querySelector('#results .deep-analysis'));
    const answerText=Array.from({length:50},(_,i)=>{
      const q=(qs[i]&&qs[i][1])?qs[i][1]:`Question ${i+1}`;
      const n=Math.max(1,Math.min(5,Number(answers?.[i])||1));
      return `${i+1}. ${q} — ${labels[n-1]}`;
    }).join('\n\n');

    return [
      t.title,
      '',
      section(t.scores,scoreText),
      section(t.express,express),
      section(t.develop,develop),
      section(t.reco,[profile,deep].filter(Boolean).join('\n\n')),
      section(t.answers,answerText)
    ].join('\n\n');
  }
  document.addEventListener('submit',function(e){
    const form=e.target;
    if(!form.closest?.('#hw-appt'))return;
    const textarea=form.querySelector('textarea[name="message"]');
    if(!textarea)return;
    const original=textarea.value.trim();
    const lg=window.lang||'fr';
    const t=LABELS[lg]||LABELS.fr;
    textarea.value=(original?section(t.comment,original)+'\n\n':'')+report();
  },true);

  const nativeFetch=window.fetch.bind(window);
  window.fetch=function(input,init){
    try{
      const url=typeof input==='string'?input:(input&&input.url)||'';
      if(url.includes('api.web3forms.com/submit')&&init&&typeof init.body==='string'){
        const body=JSON.parse(init.body);
        delete body.answers_50;
        init={...init,body:JSON.stringify(body)};
      }
    }catch(err){console.error('Human Wealth mail cleanup:',err)}
    return nativeFetch(input,init);
  };

  function updateAppointmentButton(){
    const btn=document.querySelector('#hw-appt button[type="submit"]');
    if(!btn)return;
    const lg=window.lang||'fr';
    const wanted=lg==='en'?'Your first appointment':lg==='es'?'Tu primera cita':'Votre premier rendez-vous';
    if(btn.textContent!==wanted) btn.textContent=wanted;
  }
  new MutationObserver(updateAppointmentButton).observe(document.documentElement,{childList:true,subtree:true});
})();

window.addEventListener('load',function(){
  var s=document.createElement('script');
  s.src='hw-offer-flow.js?v=20261006-2358';
  s.async=false;
  document.body.appendChild(s);
});
