(function(){
  const main=document.querySelector('main.wrap');if(main&&!main.id)main.id='app';
  if(!document.querySelector('.ui-skip-link')){const skip=document.createElement('a');skip.className='ui-skip-link';skip.href='#app';skip.textContent='Skip to dashboard';document.body.prepend(skip)}
  const sync=()=>document.querySelectorAll('.tab').forEach(button=>button.classList.contains('active')?button.setAttribute('aria-current','page'):button.removeAttribute('aria-current'));
  document.getElementById('tabs')?.addEventListener('click',()=>requestAnimationFrame(sync));new MutationObserver(sync).observe(document.getElementById('tabs'),{childList:true,subtree:true,attributes:true,attributeFilter:['class']});sync();
})();
