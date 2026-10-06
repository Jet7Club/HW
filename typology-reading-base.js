/* Human Wealth V18.6.1 — local, deterministic profile matching. */
function hwSelectTypology(s,d){
 const values=d.map(k=>Number(s[k]));
 if(values.length!==6||values.some(v=>!Number.isFinite(v)||v<0||v>100))throw new Error('Invalid six-dimensional scores');
 return HW_TYPOLOGIES.reduce((best,p)=>{
  const distance=p.scores.reduce((sum,v,i)=>sum+(v-values[i])**2,0);
  return !best||distance<best.distance?{profile:p,distance}:best;
 },null).profile;
}
const HW_READING_COPY={
 fr:{intro:'Vos réponses dessinent une dynamique actuelle, qui peut évoluer avec vos choix et votre contexte.',
 levels:[
 ['Votre énergie mérite une attention prioritaire : ménagez de la place pour récupérer.','Votre énergie constitue une base à stabiliser au fil de vos journées.','Votre énergie est un point d’appui : employez-la sans négliger la récupération.'],
 ['Votre vision gagnerait à se préciser autour d’un objectif qui compte vraiment pour vous.','Votre direction se dessine ; rendez le prochain résultat attendu plus précis.','Votre vision vous donne une direction forte pour guider vos décisions.'],
 ['Vos priorités gagneraient à être simplifiées pour limiter la dispersion.','Votre organisation peut gagner en régularité avec quelques choix plus sélectifs.','Votre gestion des priorités vous aide à transformer vos intentions en étapes concrètes.'],
 ['Votre réseau pourrait vous apporter davantage de soutien : commencez par un contact de confiance.','Vos relations constituent une base à entretenir avec davantage de régularité.','Vos réseaux représentent un appui précieux pour apprendre et construire avec les autres.'],
 ['Vos ressources financières appellent davantage de visibilité et de consolidation.','Votre base financière peut se renforcer par un suivi régulier et des choix explicites.','Vos réponses indiquent une base financière mobilisable au service de vos objectifs.'],
 ['Les croyances limitantes déclarées sont peu présentes ; appuyez-vous sur cette ouverture pour expérimenter.','Certaines croyances peuvent freiner votre élan ; examinez-les à partir de situations concrètes.','Les croyances limitantes pèsent dans vos réponses ; choisissez-en une à confronter à des faits.']],
 strength:k=>`Votre meilleur point d’appui relatif est « ${k} » : utilisez-le pour soutenir votre progression.`,
 priority:k=>`Votre levier prioritaire est « ${k} » : concentrez-y une première action accessible.`,
 action:'Choisissez une étape réalisable cette semaine et définissez comment vous en observerez le résultat.',
 close:'Vous pouvez avancer sans tout transformer à la fois : une progression régulière compte davantage qu’un départ parfait.',
 note:'Typologie indicative · Profil de référence le plus proche de vos six scores.',
 alt:'Pour rendre cette lecture concrète, choisissez une situation récente qui illustre vos réponses.',
 ending:'À la fin de la semaine, observez ce qui a changé et ajustez votre prochaine étape.'},
 en:{intro:'Your answers describe a current dynamic that can evolve with your choices and circumstances.',
 levels:[
 ['Your energy deserves attention: make room for recovery.','Your energy is a foundation to stabilize throughout your days.','Your energy is an asset: use it while protecting recovery.'],
 ['Your vision would benefit from a clearer goal that truly matters to you.','Your direction is taking shape; make the next intended result more precise.','Your vision gives you a strong direction for your decisions.'],
 ['Simplifying your priorities could help you reduce scattered effort.','Your organization can become more consistent through more selective choices.','Your priority management helps turn intentions into concrete steps.'],
 ['Your network could offer more support: start with one trusted contact.','Your relationships are a foundation to nurture more regularly.','Your networks are a valuable resource for learning and building with others.'],
 ['Your financial resources call for greater visibility and consolidation.','Your financial foundation can grow stronger through regular review and clear choices.','Your answers indicate financial resources you can mobilize toward your goals.'],
 ['You report few limiting beliefs; use this openness to experiment.','Some beliefs may slow your progress; examine them through concrete situations.','Limiting beliefs weigh on your answers; choose one to examine against evidence.']],
 strength:k=>`Your strongest relative asset is “${k}”: use it to support your progress.`,priority:k=>`Your priority lever is “${k}”: focus on one achievable action.`,
 action:'Choose a step you can complete this week and define how you will observe the result.',close:'You can move forward without changing everything at once: steady progress matters more than a perfect start.',note:'Indicative typology · The reference profile closest to your six scores.',alt:'To make this reading concrete, choose a recent situation that illustrates your answers.',ending:'At the end of the week, review what changed and adjust your next step.'},
 es:{intro:'Tus respuestas describen una dinámica actual que puede evolucionar con tus decisiones y circunstancias.',
 levels:[
 ['Tu energía merece atención: reserva espacio para recuperarte.','Tu energía es una base que puedes estabilizar a lo largo del día.','Tu energía es un apoyo: utilízala sin descuidar la recuperación.'],
 ['Tu visión ganaría claridad con un objetivo que realmente te importe.','Tu dirección se perfila; concreta el próximo resultado que buscas.','Tu visión te proporciona una dirección firme para orientar tus decisiones.'],
 ['Simplificar tus prioridades te ayudaría a reducir la dispersión.','Tu organización puede ganar regularidad con decisiones más selectivas.','Tu gestión de prioridades te ayuda a convertir intenciones en pasos concretos.'],
 ['Tu red podría ofrecerte más apoyo: empieza por un contacto de confianza.','Tus relaciones son una base que conviene cuidar con mayor regularidad.','Tus redes son un apoyo valioso para aprender y construir con otras personas.'],
 ['Tus recursos financieros necesitan más visibilidad y consolidación.','Tu base financiera puede reforzarse con seguimiento regular y decisiones claras.','Tus respuestas indican recursos financieros que puedes movilizar para tus objetivos.'],
 ['Declaras pocas creencias limitantes; aprovecha esa apertura para experimentar.','Algunas creencias pueden frenar tu avance; examínalas con situaciones concretas.','Las creencias limitantes pesan en tus respuestas; elige una y contrástala con hechos.']],
 strength:k=>`Tu principal apoyo relativo es «${k}»: úsalo para impulsar tu progreso.`,priority:k=>`Tu prioridad es «${k}»: concentra ahí una primera acción accesible.`,action:'Elige un paso realizable esta semana y define cómo observarás su resultado.',close:'Puedes avanzar sin cambiarlo todo a la vez: la regularidad importa más que un comienzo perfecto.',note:'Tipología orientativa · El perfil de referencia más cercano a tus seis puntuaciones.',alt:'Para concretar esta lectura, elige una situación reciente que ilustre tus respuestas.',ending:'Al final de la semana, observa qué ha cambiado y ajusta tu próximo paso.'}
};
hpReading=function(s,d,refined=false){
 const p=hwSelectTypology(s,d),L=HW_READING_COPY[lang],name=p[lang];
 const order=d.map((k,i)=>({k,v:i===5?100-s[k]:s[k]})).sort((a,b)=>a.v-b.v);
 const lines=[refined?L.alt:L.intro,...d.map((k,i)=>L.levels[i][s[k]<40?0:s[k]<70?1:2]),L.strength(order[5].k),L.priority(order[0].k),L.action,refined?L.ending:L.close];
 return `<div class="hw-typology" data-typology-id="${p.id}"><h3>${name[0]}</h3><div class="hw-typology-dynamic">${name[1]}</div><small>${L.note}</small></div><div class="hw-reading-lines">${lines.map(line=>`<p>${line}</p>`).join('')}</div>`;
};
const hwPreviousRefine=window.hpRefineText;
window.hpRefineText=function(targetId,choice){
 if(targetId!=='hp-reading-text')return hwPreviousRefine(targetId,choice);
 const block=document.getElementById(targetId);if(!block||!window.hpLastScores)return;
 block.innerHTML=`<h2>${T[lang].expressTitle}</h2>`+hpReading(window.hpLastScores,T[lang].dims,true);
 block.insertAdjacentHTML('beforeend',hpSatisfaction(targetId));
};
const hwStyle=document.createElement('style');
hwStyle.textContent='.hw-typology{padding:20px 24px;border-left:4px solid #b5944b;border-radius:12px;background:linear-gradient(110deg,#f5eedf,#fff);margin:12px 0 20px}.hw-typology h3{font-size:26px;letter-spacing:.035em;text-transform:uppercase;margin:0 0 5px;color:#302a20}.hw-typology-dynamic{font-size:19px;color:#745d2e;margin-bottom:12px}.hw-typology small{display:block;color:#68645b;line-height:1.5}.hw-reading-lines{display:grid;gap:9px}.hw-reading-lines p{margin:0!important;line-height:1.6!important;font-size:15px}';
document.head.appendChild(hwStyle);
