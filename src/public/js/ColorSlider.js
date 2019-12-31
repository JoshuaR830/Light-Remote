window.addEventListener('load', function() {
    var slider = document.getElementById('brightness-slider');
    slider.addEventListener('change', function(event) {
        setRGB(red, green, blue);
    });
});

function updateSlider(red, green, blue) {
    var root = document.documentElement;
    root.style.setProperty('--color', `rgb(${red}, ${green}, ${blue})`)
}