let sliderCont = document.querySelector('.product-showcase-slider');
let items = document.querySelectorAll('.slider');
let nextBtn = document.querySelector('.next-btn');
let prevBtn = document.querySelector('.prev-btn');

let active = 2;
let other_1 = 1;
let other_2 = 3;

function removePrevStates(){
    let activeItem = document.querySelector('.next .active');
    if(activeItem) activeItem.classList.remove('active');
    let other_1Item = document.querySelector('.next .other_1');
    if(other_1Item) other_1Item.classList.remove('other_1');
    let other_2Item = document.querySelector('.next .other_2');
    if(other_2Item) other_2Item.classList.remove('other_2');
}

function changeSlider(){
    clearInterval(autoswitch);
    autoswitch = setInterval(() => {
        nextBtn.click();
    }, 5000)

    items.forEach(item => {
        //reseting the animations so that they
        //refresh when we assign the new classes
        item.style.animation = 'none';
        void item.offsetHeight;
        item.style.animation = '';
    })

    items[active].classList.add('active');
    items[other_1].classList.add('other_1');
    items[other_2].classList.add('other_2');
}

nextBtn.addEventListener('click', () => {
    //console.log('clicked')
    sliderCont.classList.remove('prev');
    removePrevStates()
    changeSlider()
    active = active + 1 >= items.length ? 0 : active + 1;
    other_1 = other_1 + 1 >= items.length ? 0 : other_1 + 1;
    other_2 = other_2 + 1 >= items.length ? 0 : other_2 + 1;
});

prevBtn.addEventListener('click', () => {
    //console.log('clicked')
    sliderCont.classList.add('prev');
    //sliderCont.classList.remove('next');
    removePrevStates()

    active = active - 1 < 0 ? items.length - 1 : active - 1;
    other_1 = other_1 - 1 < 0 ? items.length - 1 : other_1 - 1;
    other_2 = other_2 - 1 < 0 ? items.length - 1 : other_2 - 1;

    changeSlider();
})

let autoswitch = setInterval(() => {
    nextBtn.click();
}, 5000);