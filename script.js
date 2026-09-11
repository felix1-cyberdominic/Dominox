// script.js — accessible interaction for Dominox demo
(function(){
  const form = document.getElementById('tileForm');
  const tilesList = document.getElementById('tiles');
  const clearAll = document.getElementById('clearAll');

  function createTile(left, right){
    const li = document.createElement('li');
    const id = 'tile-' + Date.now() + '-' + Math.floor(Math.random()*1000);

    // tile button
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tile-btn';
    btn.setAttribute('role','switch');
    btn.setAttribute('aria-checked','false');
    btn.id = id;
    btn.tabIndex = 0;

    const leftSpan = document.createElement('span');
    leftSpan.className = 'value left';
    leftSpan.textContent = left;

    const rightSpan = document.createElement('span');
    rightSpan.className = 'value right';
    rightSpan.textContent = right;

    btn.appendChild(leftSpan);
    const sep = document.createElement('span'); sep.textContent = ' | ';
    btn.appendChild(sep);
    btn.appendChild(rightSpan);

    btn.addEventListener('click', () => toggleTile(btn));
    btn.addEventListener('keydown', (e) => handleTileKeydown(e, btn));

    // remove control
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove-btn';
    remove.textContent = 'Remove';
    remove.setAttribute('aria-label','Remove tile');
    remove.addEventListener('click', () => li.remove());

    const actions = document.createElement('div');
    actions.className = 'tile-actions';
    actions.appendChild(remove);

    li.appendChild(btn);
    li.appendChild(actions);
    return li;
  }

  function toggleTile(btn){
    const checked = btn.getAttribute('aria-checked') === 'true';
    btn.setAttribute('aria-checked', String(!checked));
    if(!checked){
      btn.style.background = '#0b2545';
      btn.style.color = 'white';
    }else{
      btn.style.background = 'white';
      btn.style.color = '';
    }
  }

  function handleTileKeydown(e, btn){
    const li = btn.closest('li');
    if(e.key === 'ArrowRight'){
      e.preventDefault();
      const next = li.nextElementSibling;
      if(next) next.querySelector('.tile-btn').focus();
    }else if(e.key === 'ArrowLeft'){
      e.preventDefault();
      const prev = li.previousElementSibling;
      if(prev) prev.querySelector('.tile-btn').focus();
    }else if(e.key === 'Delete'){
      e.preventDefault();
      li.remove();
      // move focus
      const after = li.nextElementSibling || li.previousElementSibling;
      if(after) after.querySelector('.tile-btn').focus();
    }else if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      toggleTile(btn);
    }
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const left = Number(form.elements['left'].value);
    const right = Number(form.elements['right'].value);
    if(Number.isNaN(left) || Number.isNaN(right)) return;
    const tile = createTile(left,right);
    tilesList.appendChild(tile);
    // focus new tile
    tile.querySelector('.tile-btn').focus();
    form.reset();
    // reset to defaults
    form.elements['left'].value = 6;
    form.elements['right'].value = 6;
  });

  clearAll.addEventListener('click', ()=>{
    tilesList.innerHTML = '';
  });

  // seed with a few tiles for demo
  ['6|6','0|0','3|5','2|4'].forEach(s=>{
    const [l,r] = s.split('|').map(Number);
    tilesList.appendChild(createTile(l,r));
  });
})();
