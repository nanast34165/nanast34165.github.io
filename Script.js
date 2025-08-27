class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 3;
        this.wrapper = document.getElementById('carouselWrapper');
        this.navDots = document.querySelectorAll('.nav-dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.autoPlayInterval = null;
        
        this.init();
    }

    init() {
        // イベントリスナーの設定
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // ナビゲーションドットのイベント
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // キーボードナビゲーション
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // タッチイベント（スワイプ機能）
        this.setupTouchEvents();

        // 自動再生の開始
        this.startAutoPlay();

        // マウスホバーで自動再生を停止
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
        carouselContainer.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    setupTouchEvents() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        const threshold = 50; // スワイプの最小距離

        this.wrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        this.wrapper.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe(startX, startY, endX, endY, threshold);
        }, { passive: true });
    }

    handleSwipe(startX, startY, endX, endY, threshold) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        // 縦方向のスワイプは無視
        if (Math.abs(deltaY) > Math.abs(deltaX)) return;

        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                this.previousSlide();
            } else {
                this.nextSlide();
            }
        }
    }

    updateSlide() {
        // スライドの移動
        const translateX = -this.currentSlide * 100;
        this.wrapper.style.transform = `translateX(${translateX}%)`;

        // ナビゲーションドットの更新
        this.navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });

        // アニメーション効果の追加
        this.addSlideAnimation();
    }

    addSlideAnimation() {
        const currentSlideElement = this.wrapper.children[this.currentSlide];
        const slideContent = currentSlideElement.querySelector('.slide-content');
        const slideImage = currentSlideElement.querySelector('.slide-image');

        // アニメーションクラスをリセット
        slideContent.style.animation = 'none';
        slideImage.style.animation = 'none';

        // 強制的にリフローを発生させる
        slideContent.offsetHeight;
        slideImage.offsetHeight;

        // アニメーションを適用
        slideContent.style.animation = 'slideInLeft 0.8s ease-out';
        slideImage.style.animation = 'slideInRight 0.8s ease-out';
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlide();
    }

    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlide();
    }

    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.updateSlide();
        }
    }

    startAutoPlay() {
        this.stopAutoPlay(); // 既存の自動再生を停止
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // 5秒ごとにスライド切り替え
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// ページ読み込み完了後にカルーセルを初期化
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();

    // その他のインタラクション
    document.querySelectorAll('.slide-cta, .cta-button').forEach(button => {
        button.addEventListener('click', () => {
            // クリック効果のアニメーション
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
            
            alert('お申し込みページへ移動します！');
        });
    });

    // スムーズなスクロール
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
        });
    });
});