function init() {
  // ! Elements
  // ?  To grab 
  const grid = document.querySelector('.grid')
  const start = document.querySelector('#start')
  const highScoreDisplay = document.querySelector('#high-score')
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
  const enemyStartPos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  let enemyCurrentPos = enemyStartPos


  // ! On page load 
  highScoreDisplay.innerHTML = getHighScore()
  // landing page 

  // ! Executions
  // ? functions 
  function getHighScore(){
    return localStorage.getItem('spaceinvaders-p1-high-score') ? parseFloat(localStorage.getItem('spaceinvaders-p1-high-score')) : 0
  }

  function setHighScore(score){
    if(!getHighScore() || getHighScore() < score){
      localStorage.setItem('spaceinvaders-p1-high-score', score)
      highScoreDisplay.innerHTML = getHighScore()
    }
  }


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
      
      timer = setInterval(()=> {
        enemyCurrentPos.forEach((position, index) => {
          removeShark(position)
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
            }else{
              endGame()
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
              }else{
                endGame()
              }
              
            }
            
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
      setHighScore(score)
    }, 50)
  }



  //? create variables that switch the direction that the shark is travelling in 
  //? use booleans - so if the statement if true travel to the right
  //? if the statement is false travel to the left



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


}

document.addEventListener('DOMContentLoaded', init)


// getting shot 
// foreach - if i cpontains alien - remove from array 