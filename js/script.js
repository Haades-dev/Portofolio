document.addEventListener('DOMContentLoaded', ()=>{
	const btn = document.querySelector('.actions .btn');
	if(btn){
		btn.addEventListener('click', (e)=>{
			// optional: beri feedback singkat saat mengunduh
			setTimeout(()=>alert('Terima kasih! CV akan diunduh.'), 200);
		});
	}
});