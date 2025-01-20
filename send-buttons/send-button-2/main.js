function handleSendClick(button) {
    button.classList.add('clicked');

    setTimeout(() => {
        button.classList.remove('clicked');

        const oldSvg = button.querySelector('svg');
        oldSvg.remove();

        const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        newSvg.setAttribute("viewBox", "0 0 24 24");
        newSvg.setAttribute("fill", "none");
        newSvg.setAttribute("stroke", "currentColor");
        newSvg.setAttribute("stroke-width", "2");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z");

        newSvg.appendChild(path);
        button.appendChild(newSvg);
    }, 1000);
}