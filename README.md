# The one where OOP and Databases meet!
### exercise in week 9 (14/11/2021 - 19/11/2021) of our BeCode training
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

## To Do

This to do list is for personal use, the full to do list is added at the start of the challenge and as we complete
objectives they will be moved up into the timeline section and ticked off using emotes such as :heavy_check_mark:

### must-haves
1. At least 3 layers of parallax effect at different speeds :heavy_check_mark:

### Nice to have
1. Movable character :heavy_check_mark:
2. Obstacles to avoid
3. Collectables
4. Lives
5. Music?
6. Sound effects?
7. Multiple levels