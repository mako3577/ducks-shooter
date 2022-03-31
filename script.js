const wall = document.querySelector(".wall");
const duck = document.querySelector(".duck");
const intervals = [];
const bulletHole = document.querySelector(".bullet-hole");
let scoreResult = document.querySelector(".score");
let scoreValue = 0;
let id = 1;
let intervalTime;
let headshot = 0;
let bulletID = 1;

// making new ducks
const makeDuck = function () {
  let clone = duck.cloneNode(true);

  clone.id = `${id}`;
  clone.classList.remove("dead");

  wall.appendChild(clone);
  // let cloneImg = clone.querySelector("img");
  // cloneImg.id = `img${id}`;

  clone.addEventListener("click", shootDuck);
  // clone.addEventListener("click", replyClick);
  id++;

  getRandomInt(2000, 3100);
  intervals.forEach(clearInterval);
  intervals.pop();
  intervals.push(setInterval(makeDuck, intervalTime));
};

//

const shootDuck = function (e) {
  e.stopPropagation();
  let rect = e.target.getBoundingClientRect();
  let x = e.clientX - rect.left; //x position within the element.
  let y = e.clientY - rect.top; //y position within the element.
  let hit;
  console.log(`x: ${x}, y:${y}`);

  // Hitbox settings
  if (x > 10 && x < 37 && y > 0 && y < 21) {
    console.log("headshot");
    hit = true;
    headshot += 1;
  } else if (x > 24 && x < 39 && y > 22 && y < 39) {
    console.log("neckshot");
    hit = true;
  } else if (x > 20 && x < 96 && y > 38 && y < 58) {
    console.log("body-upSide-shot");
    hit = true;
  } else if (x > 17 && x < 87 && y > 57 && y < 78) {
    console.log("body-downSide-shot");
    hit = true;
  } else {
    console.log("miss");
    hit = false;
  }
  console.log(hit);

  if (hit == true) {
    let thisId = this.id;
    shootedDuck = document.getElementById(`${thisId}`);
    // add 'dead' class to duck to run proper animations
    shootedDuck.classList.add("dead");
    scoreValue += 1;
    scoreResult.textContent = `Score: ${scoreValue}`;
    document.querySelector(
      ".headshot-score"
    ).textContent = `Headshots: ${headshot}`;
    // after animations of dying, dead duck will be removed
    setTimeout(function () {
      shootedDuck.remove();
    }, 1000);
  }
};

//

// function to run if shot missed
const shootWall = function (e) {
  let rect = e.target.getBoundingClientRect();
  let x = e.clientX - rect.left; //x position within the element.
  let y = e.clientY - rect.top; //y position within the element.
  console.log(x, y);

  // function to draw bullet holes when duck missed
  const drawBulletHole = function (x, y) {
    let cloneBulletHole = bulletHole.cloneNode(false);

    // assign id to every bullet hole to make deleting them possible
    cloneBulletHole.id = `bullet${bulletID}`;

    // check if there are more than 15 bullets in document
    // if there is, delete first ones to improve performance
    if (bulletID > 15) {
      let toDelete = bulletID - 15;
      console.log(toDelete);
      document.getElementById(`bullet${toDelete}`).remove();
    }
    // add bullet hole to wall element
    wall.append(cloneBulletHole);
    // corection of coordinates to make bullet holes
    // centred relative to cursor
    cloneBulletHole.style.left = `${x - 21}px`;
    cloneBulletHole.style.top = `${y - 16}px`;

    // 'active' class makes bullets fading out due to opacity reduction
    // fading out old bullet holes before removing them makes game more smooth
    cloneBulletHole.classList.add = "active";
    bulletID++;
  };

  drawBulletHole(x, y);
};

// this function exists to make new ducks in non-regular time intervals
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  intervalTime = Math.floor(Math.random() * (max - min)) + min;
  console.log(intervalTime);
  return intervalTime;
}

duck.addEventListener("click", shootDuck);
wall.addEventListener("click", shootWall);

// makeDuck function will make 1st clone duck
// and start interval to create next ones
setTimeout(makeDuck, 600);
