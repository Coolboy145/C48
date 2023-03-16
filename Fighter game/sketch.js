var blackBackground
var bridge
var enemy
var ally
var enemyGroup
var bullet
var box
var score = 0

function preload(){
  blackBackground = loadImage("Black background 1.jpeg")
  bridge = loadImage("brige.jpeg")
  enemyImg = loadImage("Enemy 2.jpeg")
  ally = loadImage("your fighter 2.png")
  bulletImg = loadImage("bullet.png")
  boxImg = loadImage("box.png")
}

function setup() {
  createCanvas(1520, 750);
  fighter = createSprite(mouseX,700,50,50)
  fighter.addImage(ally)
  fighter.scale = 0.45

  box1 = createSprite(549,357,40,20)
  box1.addImage(boxImg)
  box1.scale = 0.35
  box1.setCollider("rectangle",0,0,200,420)

  box2 = createSprite(843,157,40,20)
  box2.addImage(boxImg)
  box2.scale = 0.35
  box2.setCollider("rectangle",0,0,200,420)

  box3 = createSprite(729,657,40,20)
  box3.addImage(boxImg)
  box3.scale = 0.35
  box3.setCollider("rectangle",0,0,200,420)

  box4 = createSprite(933,467,40,20)
  box4.addImage(boxImg)
  box4.scale = 0.35
  box4.setCollider("rectangle",0,0,200,420)

  box5 = createSprite(1129,257,40,20)
  box5.addImage(boxImg)
  box5.scale = 0.35
  box5.setCollider("rectangle",0,0,200,420)

  box6 = createSprite(1129,637,40,20)
  box6.addImage(boxImg)
  box6.scale = 0.35
  box6.setCollider("rectangle",0,0,200,420)

  box7 = createSprite(1349,67,40,20)
  box7.addImage(boxImg)
  box7.scale = 0.35
  box7.setCollider("rectangle",0,0,200,420)

  enemyGroup = new Group()
  bulletGroup = new Group()
}

function draw() {
  background("black");
  textSize(30)
  text("score:" + score,25,25)
  if(fighter.x >= 1450){
    fighter.velocityX = 0
  }
  if(keyDown(LEFT_ARROW)){
    fighter.x -= 2
  }
  if(keyDown(RIGHT_ARROW)){
    fighter.x += 2
  }
  if(keyDown(UP_ARROW)){
    fighter.y -= 2
  }
  if(keyDown(DOWN_ARROW)){
    fighter.y += 2
  }
  if(keyDown(32)){
    bullet = createSprite(fighter.x, fighter.y, 20,20)
    bullet.addImage(bulletImg)
    bullet.scale = 0.2
    bullet.velocityX = 3
    bulletGroup.add(bullet)
  }
  if(enemyGroup.isTouching(bulletGroup)){
    bulletGroup.destroyEach()
    enemyGroup.destroyEach()
    score =+ 50
  }

  if(fighter.isTouching(box1)||fighter.isTouching(box2)||fighter.isTouching(box3)||fighter.isTouching(box4)
  ||fighter.isTouching(box5)||fighter.isTouching(box6)||fighter.isTouching(box7)){
    fighter.destroy()
  }

  if(bulletGroup.isTouching(box1)||bulletGroup.isTouching(box2)||bulletGroup.isTouching(box3)||bulletGroup.isTouching(box4)
  ||bulletGroup.isTouching(box5)||bulletGroup.isTouching(box6)||bulletGroup.isTouching(box7)){
    bulletGroup.destroyEach()
  }
  if(fighter.isTouching(enemyGroup)){
    fighter.destroy()
    gameOver()
  }
  spawnEnemy()
  drawSprites()

}

function spawnEnemy(){
  if(frameCount%250===0){
  enemy = createSprite(1500,random(50,700),50,50)
  enemy.addImage(enemyImg)
  enemy.scale=0.45
  enemy.velocityX = -2
  enemy.lifetime = 750
  enemyGroup.add(enemy)
  
}
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://th.bing.com/th/id/R.b1dbdbce53751b4b400b9f1f7514eebd?rik=syYSPHosuiyK9A&riu=http%3a%2f%2fwww.frispel.net%2fwp-content%2fuploads%2f2018%2f12%2fvideoblocks-game-over-8-bit-funky-a-funky-colorful-4k-game-over-screen-animation-letters-falling-towards-the-center-8-bit-retro-style-red-and-yellow_hcqx9_kax_thumbnail-full06.png&ehk=SesZSf4Co01khVbPBy4XNafJWynsBBS45fOlp32TcTE%3d&risl=&pid=ImgRaw&r=0",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

