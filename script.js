// 手機版選單切換功能
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.remove('active');
    }
}

// 確保 DOM 完全載入後再執行輪播和大部分的 JavaScript 程式碼
document.addEventListener('DOMContentLoaded', function() {
    // 輪播功能
    const carousel = document.querySelector('.carousel-inner');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    // 檢查是否有輪播元素，避免在元素不存在時報錯
    if (carousel && dots.length > 0) {
        const totalSlides = dots.length; // 根據圓點的數量來決定總投影片數，更具彈性

        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        // 自動輪播函數
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        // 點擊圓點切換
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });

        // 每 3 秒自動切換
        // 為了確保在頁面載入時就顯示第一張投影片，可以在這裡先呼叫一次 updateCarousel
        updateCarousel(); // 初始化顯示第一張投影片和激活第一個點
        setInterval(nextSlide, 3000);
    }


    // 平滑捲動功能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // 手機版選單點擊後自動關閉
            closeMobileMenu();
        });
    });

    // 導覽列滑動效果
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) { // 檢查 header 元素是否存在
            if (window.scrollY > 100) {
                header.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)';
            } else {
                header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
        }
    });

    // 卡片動畫效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 觀察所有卡片
    document.querySelectorAll('.spec-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});