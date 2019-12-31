window.addEventListener('load', function() {
    var slider = document.getElementById('brightness-slider');
    console.log("Hi");
    slider.addEventListener('change', function(event) {
        console.log(slider.value);
        setRGB(red, green, blue);
    });
});

function updateSlider(red, green, blue) {
    var root = document.documentElement;
    root.style.setProperty('--color', `rgb(${red}, ${green}, ${blue})`)
}