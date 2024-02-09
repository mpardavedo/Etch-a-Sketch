const container = document.querySelector('.container');
const changeSizeButton = document.getElementById('changeSizeButton');
let isMouseDown = false;
const clear = document.querySelector('.clear');
const colorPicker = document.getElementById('button-container');
let hoverColor =  '#000000';

const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach(button => {
    button.addEventListener('change', function(){
        if (this.value === 'black-pen') {
            hoverColor = 'black';
        } else if (this.value === 'red-pen') {
            hoverColor = 'red';
        } else if (this.value === 'blue-pen') {
            hoverColor = 'blue';
        } else if (this.value === 'green-pen') {
            hoverColor = 'green';
        } 
    })
})

const rainbowButton = document.getElementById('rainbow');
rainbowButton.addEventListener('change', function() {
    if (this.checked) {
        container.addEventListener('mouseover', function(event) {
            if (event.target.classList.contains('cell')) {
                const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
                event.target.style.backgroundColor = randomColor;
            }
        });
    } else {
        container.removeEventListener('mouseover', function(event) {
            if (event.target.classList.contains('cell')) {
                event.target.style.backgroundColor = hoverColor;
            }
        });
    }
});

clear.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(function(cell){
        cell.classList.remove('hover-default');

    })
    isMouseDown = false;
})

colorPicker.addEventListener('input', function(){
    hoverColor = colorPicker.value;
})


function createGrid(size) {
    container.innerHTML='';
    size = Math.min(size, 100);
    
    const cellSize = 600 / size;


    for (let i = 0; i < size * size ; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        container.appendChild(cell);
        
    
        cell.addEventListener('mousedown', function(){
            cell.style.backgroundColor = hoverColor;
            isMouseDown = true;
        });    

        cell.addEventListener('mousemove', function() {
            if (isMouseDown) {
                cell.style.backgroundColor = hoverColor;
            }
        });

        cell.addEventListener('mouseup', function(){
            cell.style.backgroundColor = hoverColor;
            isMouseDown = false;
        })
    }
}

changeSizeButton.addEventListener('click', function(){
    let newSize = prompt('Enter grid size');
    newSize = parseInt(newSize);
    createGrid(newSize);

})

createGrid(16);





