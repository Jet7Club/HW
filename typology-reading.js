/* Human Wealth loader: preserve typology engine, then load the latest offer flow after the page is fully initialized. */
document.write('<script src="typology-reading-base.js"><\/script>');
window.addEventListener('load',function(){
  var s=document.createElement('script');
  s.src='hw-offer-flow.js?v=20261006-2225';
  s.async=false;
  s.onload=function(){
    document.addEventListener('click',function(e){
      var b=e.target.closest&&e.target.closest('#results .commit-btn');
      if(!b)return;
      e.preventDefault();
      e.stopImmediatePropagation();
      var p=b.closest('.package');
      if(p&&typeof openBox==='function')openBox(p);
    },true);
  };
  document.body.appendChild(s);
});
