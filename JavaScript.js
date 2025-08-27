document.addEventListener('DOMContentLoaded', () => {
    const slide = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let counter = 0;
    const size = images[0].clientWidth;

    nextButton.addEventListener('click', () => {
        if (counter >= images.length - 1) {
            counter = -1; // 最後のスライドに達したら最初に戻る
        }
        counter++;
        slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    prevButton.addEventListener('click', () => {
        if (counter <= 0) {
            counter = images.length; // 最初のスライドに達したら最後に進む
        }
        counter--;
        slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });
});