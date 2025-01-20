document.querySelectorAll('.progress-bar').forEach(function (progressBar) {
    let width = progressBar.style.width;
    progressBar.style.width = '0%';
    setTimeout(function () {
        progressBar.style.transition = 'width 1s ease-in-out';
        progressBar.style.width = width;
    }, 500);
});