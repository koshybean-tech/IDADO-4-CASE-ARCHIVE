const records=[
 {title:"Archive starter record",category:"Document",status:"Unverified",date:"",source:"Administrator placeholder",tags:["starter","archive"],description:"A placeholder record showing how archived material will appear once source material is added."},
 {title:"Court filings collection",category:"Court Filing",status:"Public Source",date:"",source:"Public records",tags:["court","filing"],description:"Collection placeholder for publicly available court filings."},
 {title:"Video and audio index",category:"Video & Audio",status:"Unverified",date:"",source:"Archive index",tags:["video","audio"],description:"Collection placeholder for source-linked video and audio material."}
];
function toggleNav(){document.getElementById('nav').classList.toggle('open');const n=document.getElementById('nav');n.style.display=n.classList.contains('open')?'flex':''}
function renderArchive(){
 const q=(document.getElementById('search')?.value||'').toLowerCase();
 const cat=document.getElementById('category')?.value||'', status=document.getElementById('status')?.value||'';
 const found=records.filter(r=>(!q||JSON.stringify(r).toLowerCase().includes(q))&&(!cat||r.category===cat)&&(!status||r.status===status));
 const el=document.getElementById('archiveGrid'); if(!el)return;
 el.innerHTML=found.length?found.map(r=>`<article class="card"><span class="pill">${r.category}</span><h3>${r.title}</h3><p>${r.description}</p><div class="small"><strong>Status:</strong> ${r.status}<br><strong>Source:</strong> ${r.source}</div></article>`).join(''):'<div class="empty">No matching archive records yet.</div>';
}
function submitDemo(e){e.preventDefault();document.getElementById('submitMessage').hidden=false;e.target.reset()}
renderArchive();
