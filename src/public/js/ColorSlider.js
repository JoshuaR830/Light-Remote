function updateSlider(red, green, blue) {
    var root = document.documentElement;
    root.style.setProperty('--color', `rgb(${red}, ${green}, ${blue})`)
}