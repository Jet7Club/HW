/* Human Wealth loader: preserve typology engine, then load the latest offer flow after the page is fully initialized. */
document.write('<script src="typology-reading-base.js"><\/script>');
window.addEventListener('load',function(){
  var s=document.createElement('script');
  s.src='hw-offer-flow.js?v=20261006-2105';
  s.async=false;
  document.body.appendChild(s);
});
