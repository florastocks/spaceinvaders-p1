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
  let timer2
  let enemyPrevPos 
  // timer - to be able to end intervals 
  // score
  // lives 
  //hightest score

  // ! Charcter class 
  const playerChar = 'crab'
  const playerStartPos = 217
  let playerCurrentPos = playerStartPos
  const playerShot = 'bullet'
  const shotStartPos = playerCurrentPos - width
  let shotCurrentPos
  const enemy = 'shark'
  const enemyStartPos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
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
// * player fire
  function playerShoot(position){
    cells[position].classList.add(playerShot)
  }
  
  function removeShoot(position){
    cells[position].classList.remove(playerShot)
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
    const space = 32

  //remove player from previous position - prevent repeat
  removeCrab(playerCurrentPos)

    if (left === keyCode && playerCurrentPos % width !== 0){
      console.log('CLICKED LEFT')
      playerCurrentPos -= 1
    }else if (right === keyCode && playerCurrentPos % width !== width - 1){
      console.log('CLICKED RIGHT')
      playerCurrentPos += 1
      }
  addCrab(playerCurrentPos)
  }

// !
  // function playerFire(event){
  //     console.log('player firing')
  //     const keyCode = event.keyCode
  //     const space = 32
    
  //     playerShoot(shotStartPos)
  //     if(space === keyCode){
  //       setInterval(() => {
  //         removeShoot(shotCurrentPos)
  //         shotCurrentPos -= width 
  //       }, 400)
  //       playerShoot(shotCurrentPos)
  //     }
  //   }
    

// //! -- move the enemy around
  function startGame(){
    clearInterval(timer)
    console.log(enemyPrevPos)
  timer = setInterval(()=> {
    for(i = 0; i < cells.length; i++){

      }
    })
  }


// create an array of starting pos - aliens - makes them move as a pac
//check they can all move - not just some - every()
//if true then can move right +1
// if false move down if can!! 
// change the variable to be left 
//if variable == left check if all items in the array can move left - if they can currentposition +1 
// if false - move down - and swap the variable to right 
//if variable = right etc etc/ 




//? create variables that switch the direction that the shark is travelling in 
//? use booleans - so if the statement if true travel to the right
//? if the statement is false travel to the left

//! would i use a for loop - i = 0 and iterate through 
//! of do i use forEach 

// previous place = i 
// if i > prev i - move left


// width - 1 only works for the first line 





//   timer = setInterval(() => {
//     enemyPrevPos = enemyCurrentPos 
//     removeShark(enemyCurrentPos)


//     if(enemyCurrentPos === width - 1 ){
//       enemyCurrentPos += width
//       console.log(enemyPrevPos, enemyCurrentPos)
//       console.log('move down on right')
//       // moves enemy down 
//     }else if(enemyPrevPos === enemyCurrentPos && enemyCurrentPos === width -1){
//       enemyCurrentPos -= 1
//       console.log(enemyPrevPos, enemyCurrentPos)
//       console.log('move left')
//       //move enemy left
//     }else if(enemyPrevPos === enemyCurrentPos - width && enemyCurrentPos === 0 ){
//       enemyCurrentPos += 1
//     }else if (enemyPrevPos > enemyCurrentPos && enemyCurrentPos === 0){
//       enemyCurrentPos += width
//       console.log('move down on left')
//     }else if (enemyPrevPos > enemyCurrentPos && enemyCurrentPos !== 0 || enemyPrevPos === enemyCurrentPos - width){
//       enemyCurrentPos -= 1
//       //moves enemy left
//       console.log(enemyPrevPos)
//     }else if(enemyPrevPos <= enemyCurrentPos && enemyCurrentPos % width !== width - 1){
//       enemyCurrentPos += 1
//       console.log(enemyPrevPos)
//       console.log('moving right')
//       //moves enemy right
//     }// add else
    // switch direction variable
    // boolean 
//     addShark(enemyCurrentPos)
  
//   }, 500)
// }
// document.addEventListener('keyup', playerFire)
document.addEventListener('keydown', playerMove)
start.addEventListener('click', startGame)
}
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




//moving left - need to check that the current position % the width is not === 0 (makes it not wrap)
//if currentpos and prevpos === current pos % width === 0 move right 
// cant move left if current pos % width === 0 || current pos % width === width - 1 