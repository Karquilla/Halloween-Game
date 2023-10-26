let mapW = 2000;
let mapH = 1000;
let fade = 0;

function preload()
{
    sightlineImg = loadImage('assets/dotted line.png');
    ghost1Img    = loadImage('assets/scoreGhost1.png');
    ghost2Img    = loadImage('assets/scoreGhost2.png');
    nextLevelImg = loadImage('assets/nextLevel.png'  );
    gameOverImg  = loadImage('assets/gameOver.png'   );
    pumpkin5     = loadImage('assets/punkins-5.png')


}

function setup()
{
    new Canvas(mapW,mapH);
    frameRate(60);
    world.gravity.y = 5;
    game = new Game;
    
    level1 = new level(game.lvl1ShotCount);
    buttons = new Buttons;
    //temp run for debug
    game.gameState = game.run;
    // straight to level 1 for debug nomrally after title
    game.levelNum++;
}

function draw()
{

    clear();
    background(100,100,100);
    if (game.gameState == game.run)
    {   
        
        switch(game.levelNum)
        {
            case 1:
            {
                Level1();
                break;
            }

            case 2:
            {
                Level2();
                break;
            }

            case 3:
            {
                Level3();
                break;
            }
        }
        
    }
    allSprites.draw()
    game.game_over();
    game.next_stage();
    //console.log(level1.platforms)
}

class Shot
{
    constructor()
    {
        this.shooting = false;
        this.pwrGoingUp = true;
        this.originX = (mapW / 6) + 150;
        this.originY = mapH - 100;
        this.d = 25;
        this.power = 0;
        this.powerMultiplier = 12;
        this.angle = 0;
        this.shotSpriteGroup = new Group();
        this.sprite = new Sprite(this.originX,this.originY,this.d,"k");
        this.sprite.rotationDrag = 5;
        this.sightline = new this.shotSpriteGroup.Sprite(this.originX,this.originY,100,5,"n");
        this.sightline.img = sightlineImg;
        this.sightline.offset.x = -100;
        this.sprite.overlaps(this.sightline);
        this.barsprite = new this.shotSpriteGroup.Sprite(90,mapH - 75,0.1,25,'n');
        this.barmaxsprite = new this.shotSpriteGroup.Sprite( 290,mapH - 75,5,25,'n');
        this.r = 0
        this.g = 200
    }

    aim()
    {
        this.sightline.rotateTo(mouse.x,mouse.y,10);
        this.sprite.rotation = this.sightline.rotation;
        this.shot_power();
        this.power_bar();

    }

    shoot()
    {
        this.sprite.collider = 'dynamic';
        this.sprite.bearing = this.sightline.rotation;
        this.sprite.applyForce(-(this.power * this.powerMultiplier));
        this.sprite.mass = 1.5;

    }

    power_bar()
    {

        //console.log(this.power)
    }

    shot_power()
    {
        if (frameCount % 1 == 0)
        {
            if (this.pwrGoingUp == true)
            {
                this.power++;
                //power bar goes up
                this.barsprite.w += 2;
                this.barsprite.x += 1;
                this.r += 2;
                this.g -= 2;
                this.barsprite.color = color(this.r,this.g,0)
                if (this.power > 100)
                {
                    this.pwrGoingUp = false;
                }
            }
            else
            {
                this.power--;
                this.r -= 2;
                this.g += 2;
                this.barsprite.color = color(this.r,this.g,0)
                this.barsprite.w -= 2;
                this.barsprite.x -= 1;
                if (this.power < 0)
                {
                    this.pwrGoingUp = true;
                }
            }
        }
    }
}

class level
{
    constructor(shotCnt)
    {
        this.shot = new Shot
        this.shotCount = shotCnt;

        this.levelSprites = new Group();

        this.platforms = new this.levelSprites.Group();
        this.platforms.mass = 30;

        this.targets = new Group();
        this.targets.rotationalDrag = 5;

        this.floor = new this.levelSprites.Sprite(mapW/2 + 200, mapH + 5, mapW + 500, 5, 's');

        this.leftbound = new this.levelSprites.Sprite(-50, mapH/2,5,mapH,'s');
        this.rightbound = new this.levelSprites.Sprite(mapW + 450, mapH/2,5,mapH,'s');

        this.shotCountSprite = new this.levelSprites.Sprite(250,250, 100, 100, 'n');
        this.shotCountSprite.img = ghost1Img;
        this.shotCountSprite.scale = 1.8;
        this.shotCountSprite.offset.y = -5;
        //this.shotScoreSprite = new this.levelSprites.Sprite();
    }

    // creates target on top of platform automatically
    // use to create map by placing x and size of platform
    create_platform(x,w,h)
    {
        var y = this.find_plat_bottom(h);
        new this.platforms.Sprite(x,y,w,h);
        this.create_target(x,(y - (h/2)) - ((w)/2),w+10);
    }

    create_target(x,y,d)
    {
        let target = new this.targets.Sprite(x,y);
        target.img = pumpkin5;
        target.d = d;
    }

    targets_is_moving()
    {
        for (var i = 0; i < this.targets.length; i++)
        {
            if (this.targets[i].speed < .5 && this.targets[i].speed > 0)
            {
                return true;
            }
            else
            {
                
            }
        }
        return false;
    }

    // Removes target when collides with 
    // floor after 300ms delay
    target_is_destroyed()
    {
        for (var i = 0; i < this.targets.length; i++)
        {
            if (this.targets[i].overlaps(this.shot.sprite) || this.targets[i].collides(this.floor))
            {
                this.targets[i].speed = 0;
                let destroyed = this.targets[i];
                destroyed.remove()
                //setTimeout(() => {destroyed.remove();}, 300);  
            }
        }
    }

    isGameOver()
    {
        if (this.shotCount == 0 && this.targets_is_moving() == false)
        {
            setTimeout(() => {
                if (this.targets_is_moving() == false)
                {
                    game.gameState = game.gameOver;
                }
            }, 500);
        }
    }

    isComplete()
    {
        if (this.targets.length <= 0)
        {
            game.gameState = game.stageClear;
        }
    }

    find_plat_bottom(rectH)
    {
        let newY = mapH - (rectH / 2);
        return newY;
    }

    shooting()
    {
        if (this.shot.shooting == false)
        {
            this.shot.aim();
            if(mouse.presses())
            {
                this.shot.shooting = true;
                setTimeout(() => {this.shot.shoot();
                }, 500);            
            }
            //if(shot.power < 100)
        }
        else if (this.shot.shooting == true)
        {
            if ( (this.shot.sprite.speed < .05 && this.shot.sprite.speed > 0))
            {
                this.shot.shooting = false;
                setTimeout(() => {
                this.shot.sprite.remove();
                this.shot.sightline.remove();
                this.shot.barsprite.remove();
                this.shotCount--;
                this.shot = new Shot;},1000);
            }
            else if (this.shot.sprite.x > mapW + 10)
            {
                this.shot.shooting = false;
                this.shot.sprite.remove();
                this.shot.sightline.remove();
                this.shot.barsprite.remove();
                this.shotCount--;
                this.shot = new Shot;
            }
        }
    }

    UI()
    {
        this.shotCountSprite.textSize = 25;
        this.shotCountSprite.text = this.shotCount;
        this.shotCountSprite.y = (20 * Math.sin(((frameCount/150) % 20 * Math.PI))) + 100
    }
}

class Game
{
    constructor()
    {
        
        this.lvl1ShotCount = 3;
        this.lvl2ShotCount = 3;
        this.gameState = 0; // start, title, run, stageclear/ gameover.
        this.levelisSetup = false;
        this.levelNum = 0;
        // Enum for game states
        this.title = 1;
        this.run = 2;
        this.stageClear = 3;
        this.gameOver = 4;
        this.load = 5;
        this.currLvlObj;
        this.gameOverSetup = false;
        this.nextStageSetup = false;
    }

    game_over()
    {
        if (this.gameState == this.gameOver)
        {
            if (this.gameOverSetup == false)
            {
                setTimeout(() => {
                allSprites.remove();},2000);
                //this.gameOverSprite = new Sprite();
                //this.gameOverSprite.img = gameOverImg;
                //this.gameOverSprite.collider = 'none';
                //this.gameOverSprite.x = mapW/2 
                //this.gameOverSprite.y = mapH/2
                //this.gameOverSprite.w = 500 
                //this.gameOverSprite.h = 500
                fade = 0;
                this.gameOverSetup = true;
            }

            //image fade in
            if (fade <= 255)
            {
                push();
                tint(255,fade);
                image(gameOverImg,60,-25);
                fade += 4;
                pop();
            }
            else
            {
                push();
                image(gameOverImg,60,-25);
                pop();
            }
        }
    }

    next_stage()
    {
        if (this.gameState == this.stageClear)
        {
            if (this.nextStageSetup == false)
            {
                this.currLvlObj.shot.shotSpriteGroup.remove();
                this.currLvlObj.levelSprites.remove();
                buttons.next_stage_setup();
                fade = 0;
                this.nextStageSetup = true;
            }
            buttons.next_stage_check();

            if (fade <= 255)
            {
                push();
                tint(255,fade);
                image(nextLevelImg,100,-5);
                fade += 2;
                pop();
            }
            else
            {
                push();
                image(nextLevelImg,100,-5);
                pop();
            }
            //buttons.startNextSprite.draw();
        }

    }
}

class Buttons
{
    constructor()
    {
        this.nextstagebuttons = new Group();
        this.gameOverButtons     = new Group();
        //this.restartButtonSprite = new this.gameOverButtons.Sprite();
    }

    next_stage_setup()
    {
        this.startNextSprite  = new this.nextstagebuttons.Sprite(mapW/2,900,700,150,'k');
    }


    next_stage_check()
    {
        if(this.ispressed(this.startNextSprite))
        {
            this.startNextSprite.remove();
            game.levelisSetup = false;
            game.nextStageSetup = false
            game.levelNum++;
            game.gameState = game.run;
        }
    }

    ispressed(sprite)
    {
        if (sprite.mouse.presses())
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}



