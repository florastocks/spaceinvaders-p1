function init() {
// ! Elements
// ?  To grab 
const grid = document.querySelector('.grid')
const start = document.querySelector('#start')
// high score 
// score 
// lives display
// divs 

// ! Variables
const width = 15
const cellCount = width * width 
const cells = []
let timer
let enemyPrevPos 
// timer - to be able to end intervals 
// score
// lives 
//hightest score

// ! Charcter class 
const playerChar = 'crab'
const playerStartPos = 217
let playerCurrentPos = playerStartPos
const enemy = 'shark'
const enemyStartPos = 0
let enemyCurrentPos = enemyStartPos

// ! On page load 
// the high scorefrom local storage 
// landing page 

// ! Executions
// ? functions 

function createGrid(){
  for(let i = 0; i < cellCount; i++){
    const cell = document.createElement('div')
    cell.innerHTML = i
    cell.dataset.index = i
    // console.log(cell.dataset.index = i )
    cells.push(cell)
    grid.appendChild(cell)
  }
  addShark(enemyStartPos)
  addCrab(playerStartPos)
}

//! --- creating characters ------
// * ---player---
// //? add a player class to a cell
function addCrab(position){
  cells[position].classList.add(playerChar)
}

// //? remove player class from cell
function removeCrab(position){
  cells[position].classList.remove(playerChar)
}

// * --- shark ---
// ? add a shark class to a cell
function addShark(position){
  cells[position].classList.add(enemy)
}

// ? remove a shark class 

function removeShark(position){
  cells[position].classList.remove('shark')
}

//! moving the player left and right
function playerMove(event){
  const keyCode = event.keyCode 
  const left = 37
  const right = 39

  //remove player from previous position - prevent repeat
  removeCrab(playerCurrentPos)

  if (left === keyCode && playerCurrentPos % width !== 0){
    console.log('CLICKED LEFT')
    playerCurrentPos -= 1
  }else if (right === keyCode && playerCurrentPos % width !== width - 1){
    console.log('CLICKED RIGHT')
    playerCurrentPos += 1
  }else {
    console.log('INVALID KEY')
  }
  addCrab(playerCurrentPos)
}

//! -- move the enemy around
function startGame(){
  clearInterval(timer)
  console.log(enemyPrevPos)

  timer = setInterval(() => {
    enemyPrevPos = enemyCurrentPos 
    removeShark(enemyCurrentPos)

  //   if(enemyCurrentPos < width - 1){
  //     enemyCurrentPos += 1
  //     //move enemy right
  //     console.log('moved right')
  //   }else if(enemyCurrentPos === width - 1){
  //       enemyCurrentPos += width
  //       //move enemy down a row
  //       console.log('moved down')
  //   }else if(enemyCurrentPos < enemyPrevPos && enemyCurrentPos !== 0){
  //     enemyCurrentPos -= 1
  //     console.log('moves left')
  //   }else if(enemyCurrentPos === width - 1 && enemyCurrentPos === enemyPrevPos - width){
  //     enemyCurrentPos -= 1
  //     //enemy moves one to the left
  //     console.log('moves left from edge ')
  //   }
  //   // }else if(enemyCurrentPos < enemyPrevPos){
  //   //   if(enemyCurrentPos !== 0){
  //   //     enemyCurrentPos -= 1
  //   //   }else if(enemyCurrentPos === 0){
  //   //     enemyCurrentPos += width
  //   //   }
  // addShark(enemyCurrentPos)
  // }, 500)

// }
 
    // }else if(enemyPrevPos === enemyCurrentPos - width && enemyCurrentPos === 0 ){
    //   enemyCurrentPos += 1
    // }else if (enemyPrevPos > enemyCurrentPos && enemyCurrentPos === 0){
    //   enemyCurrentPos += width
    //   console.log('move down')
    // }else if (enemyPrevPos > enemyCurrentPos && enemyCurrentPos !== 0 || enemyPrevPos === enemyCurrentPos - width){
    //   enemyCurrentPos -= 1
    //   //moves enemy left
    //   console.log(enemyPrevPos)
    // }else if(enemyPrevPos <= enemyCurrentPos && enemyCurrentPos % width !== width - 1){
    //   enemyCurrentPos += 1
    //   console.log(enemyPrevPos)
    //   console.log('moving right')
    // //   //moves enemy right
    // } 
    
  


    if(enemyCurrentPos === width - 1 ){
      enemyCurrentPos += width
      console.log(enemyPrevPos, enemyCurrentPos)
      console.log('move down on right')
      // moves enemy down 
    }else if(enemyPrevPos === enemyCurrentPos && enemyCurrentPos === width -1){
      enemyCurrentPos -= 1
      console.log(enemyPrevPos, enemyCurrentPos)
      console.log('move left')
      //move enemy left
    }else if(enemyPrevPos === enemyCurrentPos - width && enemyCurrentPos === 0 ){
      enemyCurrentPos += 1
    }else if (enemyPrevPos > enemyCurrentPos && enemyCurrentPos === 0){
      enemyCurrentPos += width
      console.log('move down on left')
    }else if (enemyPrevPos > enemyCurrentPos && enemyCurrentPos !== 0 || enemyPrevPos === enemyCurrentPos - width){
      enemyCurrentPos -= 1
      //moves enemy left
      console.log(enemyPrevPos)
    }else if(enemyPrevPos <= enemyCurrentPos && enemyCurrentPos % width !== width - 1){
      enemyCurrentPos += 1
      console.log(enemyPrevPos)
      console.log('moving right')
      //moves enemy right
    }
    addShark(enemyCurrentPos)
  
  }, 500)
}

document.addEventListener('keydown', playerMove)
document.addEventListener('click', startGame)

createGrid()


//add a little

}
document.addEventListener('DOMContentLoaded', init)



// enemy current position > enemy previous position - 
// if previous position was 14 then move left - if current position and previous position is 0 move right

// if enemy previous position < current position && enemyCurrentPos % width !== width - 1 > then enemyCurrentPos += 1

//link local to global repo

// place the interval into another function - then the shark will be removed. 
//if enemy previous === enemy current ppositions - width