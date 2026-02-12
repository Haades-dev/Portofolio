document.addEventListener("DOMContentLoaded", () => {
    
    // 1. SETUP KURSOR (Hanya Hiasan)
    const body = document.body;
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');

    // Aktifkan kursor custom hanya di Desktop
    if (window.matchMedia("(min-width: 769px)").matches) {
        body.classList.add('custom-cursor-active');
        cursorDot.style.display = 'block';
        cursorCircle.style.display = 'block';

        window.addEventListener('mousemove', (e) => {
            // Menggunakan GSAP jika ada, kalau tidak pakai vanilla JS biar aman
            if (typeof gsap !== 'undefined') {
                gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
                gsap.to(cursorCircle, { x: e.clientX, y: e.clientY, duration: 0.3 });
            }
        });
    }

    // 2. LOGIKA KLIK PROYEK (ACCORDION)
    const projects = document.querySelectorAll('.project-item');

    projects.forEach(item => {
        item.addEventListener('click', () => {
            // Opsi A: Tutup proyek lain saat satu dibuka (Accordion murni)
            // projects.forEach(p => {
            //     if (p !== item) p.classList.remove('active');
            // });

            // Opsi B: Toggle (Bisa buka banyak sekaligus) -> Kita pakai ini
            item.classList.toggle('active');
            
            // Efek interaksi kursor saat klik
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(cursorCircle, 
                    { scale: 1.5 }, 
                    { scale: 1, duration: 0.3 }
                );
            }
        });
    });

    // 3. SMOOTH SCROLL (LENIS)
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({ duration: 1.2, smooth: true });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }
});
