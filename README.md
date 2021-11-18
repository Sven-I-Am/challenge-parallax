# The one where OOP and Databases meet!
### exercise in week 9 (14/11/2021 - 19/11/2021) of our BeCode training
## Published page
[click here to go to the page](https://sven-i-am.github.io/challenge-parallax/)
## Challenge
This week after we all got done with the database exercises we were given the freedom to create something using a parallax effect.

## The objective of this exercise

* Create a game or animation using the parallax effect
* Be creative and don't just stick to the minimum requirements
* Go crazy on it

## Tools and languages used

|  | Description |
| ----------- | ----------- |
| ![ubuntu](ASSETS/README/ubuntu-logo.png) | Running Ubuntu 20.04 |
| ![php-storm](ASSETS/README/phpstorm-logo.jpeg) | Working with PHPStorm as IDE |
| ![html](ASSETS/README/html-logo.png) | HTML5 |
| ![css](ASSETS/README/CSS-logo.png) | CSS3 |
| ![javascript](ASSETS/README/javascript-logo.png) | Main scripting language used is JavaScript |
| ![git](ASSETS/README/git-logo.png) | Using git for version control |
| ![github](ASSETS/README/github-logo.png) | Hosting my files on github |

## Timeline

* Day 1 (:date:17/11/2021)
    * assignment was given at 9AM with short briefing and Q&A by coach [Tim](https://github.com/Timmeahj)
    * I had a million and one ideas running through my head as soon as  saw the example given (a simple zombie-killer side-scroller)
    * eventually I decided to try and make a flappy-bird type game
    * I created this `repository` first thing in the morning and made the file structure locally
    * Having access to the [school of game design](https://schoolofgamedesign.com/) and it's assets was a big help
    * Coding starts:
      * get basic html structure set up
      * style elements
        * I had to get a quick reminder because I had some trouble moving the background layers without creating white spaces at the edge 
        * turns out I wasn't using the background-position-x property
      * The character movement gave some bugs because the keyDown kept calling the `jump()` multiple times
        * managed to fix it by checking if we were already jumping or not
      * the hours before lunch were spent getting the basic requirements in
      * at lunch-time I had the layer movement and basic character movement down
      * after lunch and the tech-talk I did my first commit and push of the project
      * I managed to spawn obstacles when clicking, have to change that to a randomized interval perhaps?
      * currently working on despawning the obstacles once they move out of the screen
        * for now it despawns all obstacles when the first obstacle gets beyond the screen border
* Day 2 (:date: 18/11/2021)
  * The plan for today:
    * fix character movement => movement now resembles flappy bird :heavy_check_mark:
    * make obstacles that can `kill` 
      * => the floor and ceiling are lava :heavy_check_mark:
    * added "start new game" screen :heavy_check_mark:
    * added "game over" screen :heavy_check_mark:
    * LUNCHTIME :fork_and_knife: :clock12:
    * composed the asset for the lives, using the "frump-art-pack" assets from the [school of game design](https://schoolofgamedesign.com/) :heavy_check_mark:
    * player has 3 lives before `gameOver` :heavy_check_mark:
    * fixed a bug where the player didn't reset position after game over
    * fixed bug where key event was triggered before respawn of player
    * added the link to the published page to this readme

## To Do

This to do list is for personal use, the full to do list is added at the start of the challenge and as we complete
objectives they will be moved up into the timeline section and ticked off using emotes such as :heavy_check_mark:

### must-haves
1. At least 3 layers of parallax effect at different speeds :heavy_check_mark:

### Nice to have
1. Movable character :heavy_check_mark:
   1. Gravity :heavy_check_mark:
   2. Drag :heavy_check_mark:
2. Obstacles to avoid
   1. floor and ceiling :heavy_check_mark:
3. Start screen :heavy_check_mark:
4. Game over screen :heavy_check_mark:
5. Stop all animation on game over and before new game :heavy_check_mark:
6. Collectables
7. Score
8. Lives :heavy_check_mark:
9. Music?
10. Sound effects?
11. Multiple levels