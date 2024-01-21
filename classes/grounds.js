

function setupGround(level){
   
    if (level % 2 == 0) {
        grounds.push(new BlockCore(
            world,
            {
                x: dim.w / 2 - 200, y: 720 * (level +1) -40, w: dim.w - 300, h: 70 },
            { isStatic: true }
          ));
          groundSensors.push(new BlockCore (
            world, 
            { x: 175, y: 720 * (level  +1) - 760, w: 350, h: 70,
              trigger: (ball, block) => {
                forceBall = { x: 0.25, y: -0.0 };
                setPillarStatus(level, "movingDown"); // Setze Pillar mit Index 0 auf "movingDown"
                  switch (level) {
                      case 2:
                          hitFlashSensor = true;
                          startFlashes();
                          console.log("Level 2 erreicht")
                          break;
                      case 4:
                          clearInterval(flashesInterval); // Beende das aktuelle Intervall, falls vorhanden
                          startArrows();
                        // createArrow();
                        
                          console.log("Level 4 erreicht")
                          break;
                    case 6: 
                    forceBall = {x: 0.4, y: -0.15 }
                    startFirstFishes();
                    bubbleSound.play()
                    console.log("lvl6")
                    break; 
                      case 8:
                        engine.world.gravity.y = 1;
                        forceBall = { x: 0.25, y: -0 }
                        granatapfel.body.frictionAir = 0
                        console.log("Gravity wurde geändert. Unterwasserwelt verlassen", engine.world.gravity.y)
                        console.log("Level 8 erreicht")
                        bgMusic.play();
                        underwaterSound.stop()
                        bubbleSound.stop();
                        clearInterval(luftblasenInterval); 
                        clearInterval(luftblasenInterval2); 
                        granatapfel.attributes.image = granatapfelImg;
                        luftblasen = [];
                        unterweltSound.play()
                          break;
                        case 10: 
                        console.log("lvl10")
                        granatapfel.attributes.image = granatapfelImgNeg;
                        bgMusic.stop()
                        unterweltSound.stop()
                        clearInterval(fishInterval);
                        clearInterval(fireballInterval);
                        Matter.Composite.remove(world, [grounds[10].body]);
                        break; 
                      default:
                          console.log(level+ "1");
                  }
              }
            },
            {isStatic: true, isSensor: true}
          ));
} 
    else {
        grounds.push(new BlockCore(
            world,
            {
                x: dim.w / 2 + 200, y: 720 * (level +1) -40, w: dim.w - 300, h: 70,},
            { isStatic: true }
          ));

        groundSensors.push(new BlockCore(
            world,
            {
                x: dim.w - 175, y: 720 * (level + 1) - 760, w: 350, h: 70,
                trigger: (ball, block) => {
                    forceBall = { x: -0.25, y: -0.0 };
                    setPillarStatus(level, "movingDown"); // Setze Pillar mit Index 0 auf "movingDown"
                    switch (level) {
                      case 3:
                        console.log("level 3 erreicht. Wald erreicht")
                        birdSinging.play(); 
                        clearInterval(flashesInterval)
                      break; 
                        case 5:
                            clearInterval(arrowInterval);
                            Matter.Body.applyForce(granatapfel.body, granatapfel.body.position, {x: 0, y: 0.8});
                            engine.world.gravity.y *= 0.2;
                            console.log(granatapfel.body.frictionAir)
                            granatapfel.body.frictionAir = 0.025
                            forceBall = {x: -0.5, y: -0.15 }
                            startLuftblasen();
                            console.log("Gravity wurde geändert. Unterwasserwelt erreicht" , engine.world.gravity.y)
                            underwaterSound.play()
                            womanTalking.stop()
                            bgMusic.stop();
                            console.log("Level 5 erreicht")
                            birdSinging.stop(); 
                            waterSplash.play()
                            bubbleSound.play();
                            granatapfel.attributes.image = granatapfelImgNeg;
                            break;
                        case 7: 
                        console.log("lvl 6")
                        startSecondFishes();
                        bubbleSound.play()
                        forceBall = {x: -0.25, y: -0.15 }
                            break; 
                            case 9:
                              startFireballs();
                            break; 
                            
                        default:
                            console.log(level);
                    }
                }

            },
            { isStatic: true, isSensor: true }
        ));
    }
}



function startSensorFunc () {

    startSensor = (new BlockCore(
      world,
      {x: 0 + 175, y: 500, w: 350, h: 70,
      trigger: (block, ball) => {
        setPillarStatus(0, "movingDown")
      }},
      {  isStatic: true, isSensor: true }
    ));
    blocks.push(startSensor)
}