function Level1()
{
    //setup
    if (game.levelisSetup == false)
    {
        game.currLvlObj = level1;
        level1.create_platform( 1000, 30, 230)
        game.levelisSetup = true;
    }
    level1.target_is_destroyed();
    level1.shooting();
    level1.UI();
    level1.isComplete();
    level1.isGameOver();
}

function Level2()
{
    //setup
    if (game.levelisSetup == false)
    {
        level2 = new level(game.lvl2ShotCount);
        game.currLvlObj = level2;
        level2.create_platform(880 , 30, 230)
        level2.create_platform(970 , 30, 260)
        level2.create_platform(1065, 40, 290)
        level2.create_platform(1160, 40, 320)
        level2.create_platform(1260, 50, 350)
        level2.create_platform(1365, 50, 380)
        level2.create_platform(1500, 60, 410)
        
        game.levelisSetup = true;
    }
    level2.target_is_destroyed();
    level2.shooting();
    level2.UI();
    level2.isComplete();
    level2.isGameOver();
}

function Level3()
{
    //setup
    if (game.levelisSetup == false)
    {
        level3 = new level(5);
        game.currLvlObj = level3;
        level3.create_platform(800 , 40, 200)
        level3.create_platform(900 , 45, 230)
        level3.create_platform(1000, 50, 260)

        level3.create_platform(1400, 55, 230)
        level3.create_platform(1500, 60, 200)
        game.levelisSetup = true;
    }
    level3.target_is_destroyed();
    level3.shooting();
    level3.UI();
    level3.isComplete();
    level3.isGameOver();

}

function Level4()
{
    //setup
    if (game.levelisSetup == false)
    {
        level4 = new level(5);
        game.currLvlObj = level4;
        level4.create_platform(900 , 30, 300)

        level4.create_platform(1600, 40, 230)
        level4.create_platform(1700, 40, 700)
        game.levelisSetup = true;
    }
    level4.target_is_destroyed();
    level4.shooting();
    level4.UI();
    level4.isComplete();
    level4.isGameOver();

}

//generic level class
//function Level1()
//{
//    //setup
//    if (game.levelisSetup == false)
//    {
//        game.currLvlObj = level1;
//        level1.create_platform( 1000, 30, 230)
//        game.levelisSetup = true;
//    }
//    level1.target_is_destroyed();
//    level1.shooting();
//    level1.UI();
//    level1.isComplete();
//    level1.isGameOver();
//}

