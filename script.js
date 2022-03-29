const floor = document.querySelector(".floor");
const duck = document.querySelector(".duck");
const intervals = [];
const bulletHole = document.querySelector(".bullet-hole");
let scoreResult = document.querySelector(".score");
let scoreValue = 0;
let id = 2;
let intervalTime;
let headshot = 0;
let bulletID = 1;

const makeDuck = function () {
  let clone = duck.cloneNode(true);

  clone.id = `${id}`;
  clone.classList.remove("dead");

  // floor.after(clone);
  floor.appendChild(clone);
  let cloneImg = clone.querySelector("img");
  cloneImg.id = `img${id}`;

  clone.addEventListener("click", shootDuck);
  clone.addEventListener("click", replyClick);
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
    shootedDuck.classList.add("dead");
    scoreValue += 1;
    scoreResult.textContent = `Score: ${scoreValue}`;
    document.querySelector(
      ".headshot-score"
    ).textContent = `Headshots: ${headshot}`;
    setTimeout(function () {
      shootedDuck.remove();
    }, 1000);
  }
};

//

// function to run when shot missed
const shootFloor = function (e) {
  let rect = e.target.getBoundingClientRect();
  let x = e.clientX - rect.left; //x position within the element.
  let y = e.clientY - rect.top; //y position within the element.
  console.log(x, y);
  const drawBuleltHole = function (x, y) {
    let cloneBulletHole = bulletHole.cloneNode(false);
    cloneBulletHole.id = `bullet${bulletID}`;

    if (bulletID > 10) {
      let toDelete = bulletID - 15;
      document.getElementById(`bullet${toDelete}`).remove();
    }
    floor.append(cloneBulletHole);
    cloneBulletHole.style.left = `${x - 21}px`;
    cloneBulletHole.style.top = `${y - 16}px`;

    cloneBulletHole.classList.add = "active";
    bulletID++;
  };
  drawBuleltHole(x, y);
};

const replyClick = function () {
  console.log(`id` + this.id);
};

duck.addEventListener("click", shootDuck);
duck.addEventListener("click", replyClick);
floor.addEventListener("click", shootFloor);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  intervalTime = Math.floor(Math.random() * (max - min)) + min;
  console.log(intervalTime);
  return intervalTime;
}

intervals.push(setInterval(makeDuck, intervalTime));
