function createNewElement(name, fieldSideSize, imgPath) {
    let x = getRandomInt(fieldSideSize);
    let y = getRandomInt(fieldSideSize);
    const img = document.createElement('img');
    img.setAttribute('src', `${imgPath}`);
    img.setAttribute('width', 50);
    img.setAttribute('height', 46);
    img.setAttribute('id', `${name}`)
    let whereToCreate = document.getElementById(`${x}${y}`);
    while(checkIfNodeBusy(whereToCreate)) {
        x = getRandomInt(fieldSideSize);
        y = getRandomInt(fieldSideSize);
        whereToCreate = document.getElementById(`${x}${y}`)
    }
    whereToCreate.classList.add('busy', `${name}`);
    whereToCreate.append(img);

    return [img, x, y, whereToCreate];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function getNextStepCoords(x, y, size) {
    switch (x) {
        case size + 1: {
            x = 1;
            break;
        }
        case 0: {
            x = size;
            break;
        }
        default: {
            break;
        }
    }
    switch (y) {
        case size + 1: {
            y = 1;
            break;
        }
        case 0: {
            y = size;
            break;
        }
        default: {
            break;
        }
    }
    return [x,y];
}


function checkIfNodeBusy(node) {
    return node.classList.contains('busy') ? true : false;
}

function createObstacles(quantity, fieldSideSize) {
    const obstacleImg = document.createElement('img');
    obstacleImg.setAttribute('src', './images/obstacle.jpeg');
    obstacleImg.setAttribute('width', 50);
    obstacleImg.setAttribute('height', 46);
    obstacleImg.classList.add('obstacle')
    for(let i = 1 ; i <= quantity ; i++) {
        const coordX = getRandomInt(fieldSideSize);
        const coordY = getRandomInt(fieldSideSize);
        const whereIsObstacle = document.getElementById(`${coordX}${coordY}`);
        if(checkIfNodeBusy(whereIsObstacle)) {
            i--;
            continue;
        }
        whereIsObstacle.setAttribute('class', 'busy');
        whereIsObstacle.append(obstacleImg.cloneNode(true));  
    }
}


const fieldSize = document.getElementById('size'); 
const field = document.getElementById('field');
const tbody = document.querySelector('tbody');

const newGame = document.getElementById('new game');

newGame.addEventListener('click', (e) => {
    window.location.reload();
})


fieldSize.addEventListener('change',(e) => {
    const fieldSideSize = parseInt(e.target.value);
    fieldSize.setAttribute('onclick', 'this.blur();');
    for(let i = 1 ; i <= fieldSideSize ; i++) {
        const tr = document.createElement('tr');
        
        tbody.append(tr);
        for(let j = 1 ; j <= fieldSideSize ; j++) {
            const td = document.createElement('td');
            td.setAttribute('id', `${i}${j}`);
            td.setAttribute('height', 50);
            td.setAttribute('width', 50);
            tr.append(td);
        }
    }

    createObstacles(Math.round(fieldSideSize*0.5), fieldSideSize);


    createNewElement('home', fieldSideSize, './images/home.jpeg');

    let [rabbitImg, rabbitX, rabbitY, startPoint] = createNewElement('rabbit', fieldSideSize, './images/littledragon.jpeg');

    const allWolfs = [];





    for(let i = 1 ; i <= Math.round(fieldSideSize * 0.5) ; i++) {
        allWolfs.push(createNewElement('wolf', fieldSideSize, './images/wolf.jpg'));
    }



    // let [wolfImg, wolfX, wolfY, coord] = allWolfs[0];

    // allWolfs.forEach(arr => {
    //     arr[3].classList.remove('busy', 'wolf')
    // })

    const moveRabbit = (e) =>{
        startPoint.classList.remove('busy');
        rabbitImg.remove();
        const [reserveX, reserveY] = [rabbitX, rabbitY];
        switch (e.key) {
            case 'ArrowLeft': {
                [rabbitX, rabbitY] = getNextStepCoords(rabbitX , rabbitY - 1, fieldSideSize);
                break;
            }     
            case 'ArrowRight': {
                [rabbitX, rabbitY] = getNextStepCoords(rabbitX , rabbitY + 1, fieldSideSize);
                break;
            }
            case 'ArrowUp': {
                [rabbitX, rabbitY] = getNextStepCoords(rabbitX - 1, rabbitY, fieldSideSize);
                break;
            }
            case 'ArrowDown': {
                [rabbitX, rabbitY] = getNextStepCoords(rabbitX + 1, rabbitY, fieldSideSize);
                break;
            }
            default: {
                break;
            }
        }

        let nextPoint = document.getElementById(`${rabbitX}${rabbitY}`);

        wolfMove = (wolfImg ,wolfX, wolfY, wolfPoint) => {
            const [reserveWolfX, reserveWolfY] = [wolfX, wolfY];
    
            wolfPoint.classList.remove('wolf', 'busy')
            
    
            wolfImg.remove();
        
        
            if(rabbitX === wolfX) {
                if(wolfY > rabbitY) {
                    wolfY--;
                } else {
                    wolfY++;
                }
            } else {
                if(wolfX > rabbitX) {
                    wolfX--;
                } else {
                    wolfX++;
                }
            }
    
            wolfPoint = document.getElementById(`${wolfX}${wolfY}`);
            if(checkIfNodeBusy(wolfPoint)) {
                [wolfX, wolfY] = [reserveWolfX, reserveWolfY];
                wolfPoint = document.getElementById(`${wolfX}${wolfY}`)
            }
            wolfPoint.classList.add('busy', 'wolf')
            wolfPoint.append(wolfImg);
        }

        allWolfs.forEach(arr => {
            wolfMove(...arr);
        })

        // const [reserveWolfX, reserveWolfY] = [wolfX, wolfY];


        // let wolfPoint = document.getElementById(`${wolfX}${wolfY}`);

        // wolfPoint.classList.remove('wolf', 'busy')
        

        // wolfImg.remove();
    
    
        // if(rabbitX === wolfX) {
        //     if(wolfY > rabbitY) {
        //         wolfY--;
        //     } else {
        //         wolfY++;
        //     }
        // } else {
        //     if(wolfX > rabbitX) {
        //         wolfX--;
        //     } else {
        //         wolfX++;
        //     }
        // }

        // wolfPoint = document.getElementById(`${wolfX}${wolfY}`);
        // // if(checkIfNodeBusy(wolfPoint)) {
        // //     [wolfX, wolfY] = [reserveWolfX, reserveWolfY];
        // //     wolfPoint = document.getElementById(`${wolfX}${wolfY}`)
        // // }
        // wolfPoint.classList.add('busy', 'wolf')
        // wolfPoint.append(wolfImg);
    


        if (nextPoint.classList.contains('home')) {
            rabbitImg.remove();
            alert('You Won!!!');
            document.removeEventListener('keydown', moveRabbit);
        } else if (nextPoint.classList.contains('wolf')) {
            rabbitImg.remove();
            alert('You lose!!!');
            document.removeEventListener('keydown', moveRabbit);
        } else if (checkIfNodeBusy(nextPoint)) {
            [rabbitX, rabbitY] = [reserveX, reserveY];
            nextPoint = document.getElementById(`${reserveX}${reserveY}`);
            nextPoint.append(rabbitImg);
        } else {
            nextPoint.append(rabbitImg);
        }
        
    }


    document.addEventListener('keydown', moveRabbit)


}, {once: true})