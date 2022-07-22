function init() {
  // ! Elements
  // ?  To grab 
  const grid = document.querySelector('.grid')
  const start = document.querySelector('#start')
  const scoreDisplay = document.querySelector('#score')
  const livesDisplay = document.getElementById('lives-display')
  // score 

  // lives display
  // divs 

  // ! Variables
  const width = 15
  const cellCount = width * width 
  const cells = []
  let timer
  let enemyPrevPos 
  let direction = 'right'
  // timer - to be able to end intervals 
  let score = 0
  let lives = 3
  //hightest score
  


  // ! Charcter class 
  const playerChar = 'crab'
  const playerStartPos = 217
  let playerCurrentPos = playerStartPos
  const playerShot = 'bullet'
  const shotStartPos = playerCurrentPos - width
  let shotCurrentPos = shotStartPos
  const enemy = 'shark'
  const row1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const row2 = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
  const row3 = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
  const enemyStartPos = row1.concat(row2,row3)
  let enemyCurrentPos = enemyStartPos

  console.log(enemyStartPos)

  //? 36
  //? indexs - 24-36


  // ! On page load 
  // landing page 

  // ! Executions
  // ? functions

  function createGrid(){
    for(let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      // cell.innerHTML = i
      cell.dataset.index = i
      cells.push(cell)
      grid.appendChild(cell)
      if(enemyStartPos.includes(i)){
        addShark(i)
      }
    }
    
    addCrab(playerStartPos)
  //loop through array and add shark to each position 
  //if enemy start pos includes i - then add shark and pass through i 

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
    //

  // ? remove a shark class 
    function removeShark(position){
      cells[position].classList.remove(enemy)
    }

  //? enemy fire
  function enemyShoot(position){
    cells[position].classList.add('beam')
  }
  function removeEnemyFire(position){
    cells[position].classList.remove('beam')
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
        }
    addCrab(playerCurrentPos)
    }
//! -- Events --- 
    function keys(event){
        const keyCode = event.keyCode 
        const left = 37
        const right = 39
        const space = 32

        if(space === keyCode){
          playerFire(event)
        }else if( keyCode === left || keyCode === right){
          playerMove(event)
        }
    }
  // !
    function playerFire(event){
        console.log('player firing')
        const keyCode = event.keyCode
        const space = 32
        let timer2
        let shotCurrentPos = playerCurrentPos - width

        playerShoot(shotCurrentPos)

        if(space === keyCode){
          timer2 = setInterval(() => {

            if(shotCurrentPos <= width){
              clearInterval(timer2)
              removeShoot(shotCurrentPos)
              return
            }

            removeShoot(shotCurrentPos)
            shotCurrentPos -= width
            console.log('moved up')

            playerShoot(shotCurrentPos)

            if(enemyCurrentPos.includes(shotCurrentPos)){
              let hit = enemyCurrentPos.indexOf(shotCurrentPos)
              console.log(hit)
              enemyCurrentPos.splice(hit, 1)
              score += 50
              scoreDisplay.innerHTML = score
              clearInterval(timer2)
              removeShoot(shotCurrentPos)
            }
          }, 200)
        }
      }
      // create arrays for each position that the crab could be in - then if the array contais a shark - romove if from the sharl current pos array 
      
      //if 

  // //! -- move the enemy around
    function startGame(){
      clearInterval(timer)
      
      timer = setInterval(()=> {
        cells.forEach((cell) => {
          cell.classList.remove('shark')
        })
        if(direction === 'right'){
          let nextMove = enemyCurrentPos.every(index => index % width !== width - 1)
          if(nextMove){
            enemyCurrentPos.forEach((num, index) => {
              enemyCurrentPos[index] = num + 1
              addShark(enemyCurrentPos[index])
            })
          }else{
            let nextMove = enemyCurrentPos.every(index => index + width <= cellCount - width)
            if(nextMove){
              enemyCurrentPos.forEach((num, index) => {
                enemyCurrentPos[index] = num + width   
                addShark(enemyCurrentPos[index])
              })
            direction = 'left'
            }else if (enemyCurrentPos.some(index => index + width === cellCount - width)){
              console.log('some have hit the bootom')
                if(lives === 0){
                  return endGame()
                }
              // clearInterval(timer)
              // resetVariable()
              // lives --
              // livesDisplay.innerHTML = lives ? '❤️'.repeat(lives) : '💔'
              return resetVariable()
            }
          }
        }else {// left
          let nextMove = enemyCurrentPos.every(index => index % width !== 0)
          if(nextMove){
            enemyCurrentPos.forEach((num, index) => {
              enemyCurrentPos[index] = num - 1
              addShark(enemyCurrentPos[index])
            })
          }else{
            let nextMove = enemyCurrentPos.every(index => index + width <= cellCount - width)
            if(nextMove){
              enemyCurrentPos.forEach((num, index) => {
                enemyCurrentPos[index] = num + width   
                addShark(enemyCurrentPos[index])
                })
                direction = 'right'
              }else if (enemyCurrentPos.some(index => index + width === cellCount - width)){
                console.log('some have hit the bootom')
                if(lives === 0){
                  return endGame()
                }
              // clearInterval(timer)
              // lives --
              // livesDisplay.innerHTML = lives ? '❤️'.repeat(lives) : '💔'
              return resetVariable()
              }
            }
          }
          enemyFire()
      }, 1300)
      
    }

    // function resetVariable(){
    //   console.log('variables have reset')
    //   lives --
    //   livesDisplay.innerHTML = lives ? '❤️'.repeat(lives) : '💔'

    //   let timer
    //   let enemyPrevPos 
    //   let direction = 'right'
    
    //   const playerStartPos = 217
    //   let playerCurrentPos = playerStartPos
    //   const shotStartPos = playerCurrentPos - width
    //   let shotCurrentPos = shotStartPos
    //   const row1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    //   const row2 = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
    //   const row3 = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
    //   const enemyStartPos = row1.concat(row2,row3)
    //   let enemyCurrentPos = enemyStartPos

    //   startGame()
    //   }

  //! --- Fire From -- 
  function enemyFire(){

    let fireFrom = Math.floor(Math.random() * enemyCurrentPos.length)
    console.log('player firing')
    let timer3
    let enemyShot = enemyCurrentPos[fireFrom] + width
    console.log(enemyShot, fireFrom)
    // clearInterval(timer3)
    enemyShoot(enemyShot)

      timer3 = setInterval(() => {

        removeEnemyFire(enemyShot)
        enemyShot += width
        console.log('moved down')
          if(enemyShot > cellCount - width){
            clearInterval(timer3)
            return
          }else{
            enemyShoot(enemyShot)
          }
          if(cells[enemyShot].classList.contains(playerChar)){
            console.log('enemy shot player')
            let target = enemyShot.indexOf(playerChar)
            console.log(target)
            removeCrab(target)
            lives -= 1
            livesDisplay.innerHTML = lives ? '❤️'.repeat(lives) : '💔'
            clearInterval(timer3)
            removeEnemyFire(enemyShot)
          }

        }, 400)
      
    }
  //! --- End Game ---
  function endGame(){
    clearInterval(timer)
    removeCrab(playerCurrentPos)

    enemyCurrentPos.forEach((position, index) => {
      removeShark(position)
    })

    setTimeout(() => {
      // Alert score
      alert(score)
      // Update high score
    }, 50)
  }



  //? create variables that switch the direction that the shark is travelling in 
  //? use booleans - so if the statement if true travel to the right
  //? if the statement is false travel to the left



  // document.addEventListener('keyup', playerFire)
  document.addEventListener('keydown', keys)
  start.addEventListener('click', startGame)
  }

  createGrid()
  

}

document.addEventListener('DOMContentLoaded', init)


// getting shot 
// foreach - if i cpontains alien - remove from array 



//! give different rows different arrays and append to starting pos array.

//! how to stop firing when am not hitting the space back 

//Math.random - index 24-35
// if 

//? need to cut background of lazers 


//? if cells.every doesnt include a shark div - then player wins!! 
