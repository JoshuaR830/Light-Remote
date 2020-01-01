window.addEventListener('load', function(event) {
    var card = this.document.getElementById('charade-card');
    card.classList.add('appear');



    
    
    function reveal() {
    
    }
});

function appear() {
    changeContent();
    var card = this.document.getElementById('charade-card');
    card.classList.remove('dissapear');
    card.classList.add('appear');
}

function changeContent() {
    var card = this.document.getElementById('charade-card');
    var title = card.querySelector('.title');
    var body = card.querySelector('.body');

    title.innerText = "Hello";
    body.innerText = "Act like a duck"
}

function dissapear() {
    var card = this.document.getElementById('charade-card');
    card.classList.remove('appear');
    card.classList.add('dissapear');
}

function newCard() {
    dissapear();
    setTimeout(appear, 500);    
}
