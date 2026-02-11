// interactive.js: dark theme toggle, project modal, toast feedback, reveal animations

document.addEventListener('DOMContentLoaded', ()=>{
	// Splash screen auto hide
	const splash = document.getElementById('splash-screen');
	if(splash){
		setTimeout(()=>{
			splash.style.pointerEvents = 'none';
		}, 2600);
	}

	// Auto dark theme detection
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const saved = localStorage.getItem('theme');
	const initialTheme = saved || (prefersDark ? 'dark' : 'light');
	document.documentElement.setAttribute('data-theme', initialTheme);
	localStorage.setItem('theme', initialTheme);
	updateDarkToggleIcon();

	// Dark mode toggle button
	const darkToggle = document.getElementById('dark-mode-toggle');
	if(darkToggle){
		darkToggle.addEventListener('click', ()=>{
			const current = document.documentElement.getAttribute('data-theme') || 'light';
			const next = current === 'dark' ? 'light' : 'dark';
			document.documentElement.setAttribute('data-theme', next);
			localStorage.setItem('theme', next);
			updateDarkToggleIcon();
			showToast(next === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode');
		});
	}

	// Keyboard shortcut: Ctrl+D to toggle dark mode
	document.addEventListener('keydown', (e)=>{
		if((e.ctrlKey || e.metaKey) && e.key === 'd'){
			e.preventDefault();
			const current = document.documentElement.getAttribute('data-theme') || 'light';
			const next = current === 'dark' ? 'light' : 'dark';
			document.documentElement.setAttribute('data-theme', next);
			localStorage.setItem('theme', next);
			updateDarkToggleIcon();
			showToast(next === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode');
		}
	});

	// Download CV feedback
	const dl = document.getElementById('download-cv');
	if(dl){
		dl.addEventListener('click', (e)=>{
			const link = document.createElement('a');
			link.href = 'assets/CV Fariz Arkan.pdf';
			link.download = 'CV Fariz Arkan.pdf';
			link.click();
			showToast('Terima kasih! CV akan diunduh.');
		});
	}

	// Project modal
	const modal = document.getElementById('project-modal');
	const modalTitle = document.getElementById('modal-title');
	const modalDesc = document.getElementById('modal-desc');
	const modalLink = document.getElementById('modal-link');
	const projects = document.querySelectorAll('.project');
	projects.forEach(p=>{
		p.style.cursor = 'pointer';
		p.addEventListener('click', ()=>{
			const title = p.querySelector('h3')?.textContent || 'Proyek';
			const desc = p.querySelector('p')?.textContent || '';
			const a = p.querySelector('a')?.getAttribute('href') || '#';
			modalTitle.textContent = title;
			modalDesc.textContent = desc;
			modalLink.href = a;
			modal.setAttribute('aria-hidden','false');
		});
	});
	// modal close
	modal.addEventListener('click', (ev)=>{
		if(ev.target === modal || ev.target.classList.contains('modal-close')){
			modal.setAttribute('aria-hidden','true');
		}
	});
	document.addEventListener('keydown',(e)=>{if(e.key==='Escape') modal.setAttribute('aria-hidden','true')});

	// reveal sections
	document.querySelectorAll('.about, .portfolio').forEach(s=>{setTimeout(()=>s.classList.add('visible'),200)});
});

// Update dark toggle icon based on current theme
function updateDarkToggleIcon(){
	const darkToggle = document.getElementById('dark-mode-toggle');
	if(!darkToggle) return;
	const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
	const emojiIcon = darkToggle.querySelector('.emoji-icon');
	if(emojiIcon){
		emojiIcon.textContent = isDark ? '☀️' : '🌙';
	}
}

// Toast helper
function showToast(text=''){
	const t = document.getElementById('toast');
	if(!t) return;
	t.textContent = text;
	t.classList.add('show');
	t.setAttribute('aria-hidden','false');
	setTimeout(()=>{t.classList.remove('show');t.setAttribute('aria-hidden','true')},2500);
}
