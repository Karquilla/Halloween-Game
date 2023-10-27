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
        level2.create_platform( 900, 30, 230)
        level2.create_platform(1000, 35, 260)
        level2.create_platform(1100, 40, 290)
        level2.create_platform(1200, 45, 320)
        level2.create_platform(1300, 50, 350)
        level2.create_platform(1400, 55, 380)
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

