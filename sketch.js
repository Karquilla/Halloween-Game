let mapW = 2000;
let mapH = 1000;


 


function preload()
{
    sightlineImg = loadImage('assets/dotted line.png');
}

function setup()
{
    new Canvas(mapW,mapH);
    frameRate(60);
    world.gravity.y = 2;
    game = new Game;
    level1 = new level(game.lvl1ShotCount);
    shot = new Shot;
    //temp run for debug
    game.gameState = game.run;
    // straight to level 1 for debug nomrally after title
    game.levelNum++;
    game.currLvlObj = level1;
}

function draw()
{
    clear();
    if (game.gameState == game.run)
    {   
        background(100,100,100);
        switch(game.levelNum)
        {
            case 1:
            {
                Level1();
                break;
            }
        }
        
    }
    game.game_over()
    //console.log(level1.platforms)
}


function Level1()
{
    //setup
    if (level1.isSetup == false)
    {
        level1.create_platform( 900, 30, 230)
        level1.create_platform(1000, 35, 260)
        level1.create_platform(1100, 40, 290)
        level1.create_platform(1200, 45, 320)
        level1.create_platform(1300, 50, 350)
        level1.create_platform(1400, 55, 380)
        level1.create_platform(1500, 60, 410)
        level1.isSetup = true;
    }
    level1.target_is_destroyed();
    level1.shooting();
    level1.UI();
    level1.isGameOver();

}

class Shot
{
    constructor()
    {
        this.shooting = false;
        this.pwrGoingUp = true;
        this.originX = mapW / 6;
        this.originY = mapH - 75;
        this.d = 30;
        this.power = 0;
        this.powerMultiplier = 8;
        this.angle = 0;
        this.uiElems = new Group();
        this.sprite = new Sprite(this.originX,this.originY,this.d,10,"k");
        this.sightline = new this.uiElems.Sprite(this.originX,this.originY,100,5,"n");
        this.sightline.img = sightlineImg;
        this.sightline.offset.x = -100;
        this.sprite.overlaps(this.sightline);
        this.barsprite = new this.uiElems.Sprite(this.originX - 200,this.originY,100,25,'n');
        this.barmaxsprite = new this.uiElems.Sprite(this.originX - 100,this.originY,5,25,'n');
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
        this.sprite.mass = 1;

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
                this.barsprite.w = this.power;
                this.barsprite.x += .5;
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
                this.barsprite.w = this.power;
                this.barsprite.x -= .5;
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
        this.shotCount = shotCnt;
        this.isSetup = false;
        this.platforms = new Group();
        this.platforms.mass = 30;
        this.targets = new Group();
        this.targets.rotationalDrag = 5;
        this.floor = new Sprite(mapW/2 + 200, mapH + 5, mapW + 500, 5, 's');
        this.leftbound = new Sprite(-50, mapH/2,5,mapH,'s');
        this.rightbound = new Sprite(mapW + 450, mapH/2,5,mapH,'s');
        this.shotCountSprite = new Sprite(250,250, 20, 20, 'n');
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
            if (this.targets[i].overlaps(shot.sprite) || this.targets[i].collides(this.floor))
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
        if (this.shotCount == 0)
        {
            game.gameState = game.gameOver
        }
    }

    isComplete()
    {
        if (this.targets.length <= 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    find_plat_bottom(rectH)
    {
        let newY = mapH - (rectH / 2);
        return newY;
    }

    shooting()
    {
        if (shot.shooting == false)
        {
            shot.aim();
            if(mouse.presses())
            {
                shot.shooting = true;
                setTimeout(() => {shot.shoot();
                }, 500);            
            }
            //if(shot.power < 100)
        }
        else if (shot.shooting == true)
        {
            if ( shot.sprite.speed < .05 && shot.sprite.speed > 0)
            {
                shot.shooting = false;
                setTimeout(() => {
                shot.sprite.remove();
                shot.sightline.remove();
                shot.barsprite.remove();
                this.shotCount--;
                shot = new Shot;},1000);
            }
        }
    }

    UI()
    {
        this.shotCountSprite.text = this.shotCount
    }

}

class Game
{
    constructor()
    {
        this.lvl1ShotCount = 2;
        this.gameState = 0; // start, title, run, stageclear/ gameover.

        this.levelNum = 0;
        // Enum for game states
        this.title = 1;
        this.run = 2;
        this.stageClear = 3;
        this.gameOver = 4;
        this.load = 5;
        this.currLvlObj;
    }

    game_over()
    {
        if (this.gameState == this.gameOver)
        {
            this.currLvlObj.uiElems.remove();
        }
    }

}

//generic level class
//class level1
//{
//    constructor()
//    {
//        this.isSetup = false;
//    }
//
//    Setup()
//    {
//        if (this.isSetup = false)
//        {
//
//        }
//    }
//}



