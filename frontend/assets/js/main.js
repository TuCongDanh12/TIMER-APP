const buttonStart = document.getElementById("startRuntime");
// console.log(buttonStart);
const countTime = document.getElementById("time");
var isPaused = true;
let isRunning = false;
let timeoutId;
var time = 0;
let arrTime = [];
// console.log(countTime.innerText);

// function showStopwatch() {
//   document.getElementById("stopwatch").classList.add("active-container");
//   document.getElementById("countdown").classList.remove("active-container");
//   document.getElementById("countdown").classList.add("inactive-container");
//   document.getElementById("alarm").classList.add("inactive-container");
//   document.getElementById("alarm").classList.remove("active-container");
// }

// function showCountdown() {
//   document.getElementById("stopwatch").classList.add("inactive-container");
//   document.getElementById("stopwatch").classList.remove("active-container");
//   document.getElementById("countdown").classList.add("active-container");
//   document.getElementById("alarm").classList.add("inactive-container");
//   document.getElementById("alarm").classList.rempve("active-container");
// }

// function showAlarm() {
//   document.getElementById("stopwatch").classList.add("inactive-container");
//   document.getElementById("stopwatch").classList.remove("active-container");
//   document.getElementById("countdown").classList.add("inactive-container");
//   document.getElementById("countdown").classList.remove("active-container");
//   document.getElementById("alarm").classList.add("active-container");
// }
function showStopwatch() {
  const button = document.querySelectorAll("#name button");

  $("#stopwatch").show();
  $("#countdown").hide();
  $("#alarm").hide();
  button[0].classList.add("active");
  button[1].classList.remove("active");
  button[2].classList.remove("active");
}

function showCountdown() {
  const button = document.querySelectorAll("#name button");
  $("#stopwatch").hide();
  $("#countdown").show();
  $("#alarm").hide();
  button[1].classList.add("active");
  button[0].classList.remove("active");
  button[2].classList.remove("active");
}

function showAlarm() {
  const button = document.querySelectorAll("#name button");
  $("#stopwatch").hide();
  $("#countdown").hide();
  $("#alarm").show();
  button[2].classList.add("active");
  button[0].classList.remove("active");
  button[1].classList.remove("active");
}

// function changeButtonState(activeButtonId) {
//   var buttons = document.querySelectorAll("#name button");
//   console.log(buttons)
//   for (var i = 0; i < buttons.length; i++) {
//     if (buttons[i].id === activeButtonId) {
//       buttons[i].classList.add("active");
//       buttons[i].classList.remove("inactive");
//     } else {
//       buttons[i].classList.remove("active");
//       buttons[i].classList.add("inactive");
//     }
//   }
// }
const runTime = () => {
  // var firstRun = true;

  const run = () => {
    // console.log(isPaused);
    let hour = Math.floor(time / 3600);

    let minute = Math.floor((time - hour * 3600) / 60);
    let second = Math.floor(time - hour * 3600 - minute * 60);
    if (hour < 10) hour = "0" + hour.toString();
    if (minute < 10) minute = "0" + minute.toString();
    if (second < 10) second = "0" + second.toString();
    countTime.innerText = `${hour}:${minute}:${second}`;
    time++;
    // console.log(isPaused);
    timeoutId = setTimeout(run, 1000);
  };

  if (isPaused) {
    buttonStart.innerText = "TẠM DỪNG";
    isPaused = false;
    if (!isRunning) {
      isRunning = true;
      run();
    }
  } else if (!isPaused) {
    if (time == 0) {
      buttonStart.innerText = "BẮT ĐẦU";
    } else {
      buttonStart.innerText = "TIẾP TỤC";
    }
    clearTimeout(timeoutId);
    isRunning = false;
    isPaused = true;
  }
};

const resetTime = () => {
  time = 0;
  buttonStart.innerText = "BẮT ĐẦU";
  countTime.innerText = `00:00:00`;
  isPaused = true;
  isRunning = false;
  clearTimeout(timeoutId);
};

const saveTime = () => {
  let currDate = new Date();
  const month = currDate.getMonth();
  const day = currDate.getDate();
  const year = currDate.getFullYear();
  const hour = currDate.getHours();
  const minute = currDate.getMinutes();
  const second = currDate.getSeconds();

  const formattedDate = `${month} ${day}, ${year} ${hour}:${minute}:${second}`;
  const saveNewTime = {
    currTime: countTime.innerText,
    currDate: formattedDate,
  };

  arrTime.push(saveNewTime);

  if (arrTime.length > 0) {
    const dataTime = document.querySelector(".dataTime");
    dataTime.classList.add("openData");
    tbody = document.querySelector("tbody");
    // console.log(arrTime[arrTime.length-1].currDate);
    const trHTML = `<tr>
        <td>${arrTime.length}</td>
        <td>${arrTime[arrTime.length - 1].currTime}</td>
        <td>${arrTime[arrTime.length - 1].currDate}</td>
      </tr>`;

    // console.log(trHTML);
    tbody.insertAdjacentHTML("beforeend", trHTML);
  }
  // console.log(arrTime);
};

const deleteData = () => {
  arrTime.splice(0, arrTime.length);

  // console.log(arrTime);
  if (arrTime.length == 0) {
    const dataTime = document.querySelector(".dataTime");
    tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    dataTime.classList.remove("openData");
  }
};
/////////////////////////////////////////////////////////////////////////////////
const selecMenus = document.querySelectorAll("#countdown select");
console.log(selecMenus);
for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selecMenus[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selecMenus[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selecMenus[2].firstElementChild.insertAdjacentHTML("afterend", option);
}


var disabled = false;
const timeCountdown = () => {
  const hour = document.getElementById("hour").value;
  const minute = document.getElementById("minute").value;
  const second = document.getElementById("second").value;
  if (hour === "00" && minute === "00" && second === "00") {
    alert("Please select");
  } else {
    if (disabled === false) {
      disabled = true;
      
      ringtone = new Audio("./assets/audio/ring.mp3");
      let showTime = new Date();
      let counthour = showTime.setHours(hour);

      // console.log(hour);
      let countminute = showTime.setMinutes(minute);
      // console.log(minute);
      let countsecond = showTime.setSeconds(second);
      // console.log(second);
      // console.log(showTime.getHours())

      let formattedTime =
        (Number(showTime.getHours()) > 9
          ? showTime.getHours()
          : "0" + showTime.getHours()) +
        ":" +
        (Number(showTime.getMinutes()) > 9
          ? showTime.getMinutes()
          : "0" + showTime.getMinutes()) +
        ":" +
        (Number(showTime.getSeconds()) > 9
          ? showTime.getSeconds()
          : "0" + showTime.getSeconds());
      // console.log(showTime)
      // let formattedTime = `${counthour}:${countminute}:${countsecond}`;
      // console.log(formattedTime);
      document.getElementById("timeCountdown").innerHTML = formattedTime;

      let count =
        Number(showTime.getSeconds()) +
        Number(showTime.getMinutes()) * 60 +
        Number(showTime.getHours()) * 3600;
      // console.log(count);
      const run = () => {
        // console.log(isPaused);
        if (count > 0) {
          counthour = Math.floor(count / 3600);

          countminute = Math.floor((count - counthour * 3600) / 60);
          countsecond = Math.floor(count - counthour * 3600 - countminute * 60);
          if (counthour < 10) counthour = "0" + counthour.toString();
          if (countminute < 10) countminute = "0" + countminute.toString();
          if (countsecond < 10) countsecond = "0" + countsecond.toString();
          document.getElementById(
            "timeCountdown"
          ).innerText = `${counthour}:${countminute}:${countsecond}`;
          count--;
          // console.log(isPaused);
          timeId=setTimeout(run, 1000);
        } else {
          document.getElementById("timeCountdown").innerText = "";
          ringtone.play();
          document.querySelector(".selectTime").classList.remove("disabled");
          document.querySelector("#countdown button").innerText = "BẮT ĐẦU";
          clearTimeout(timeId);
        }
      };

      const selectTime = document.querySelector(".selectTime");
      console.log(selectTime);
      selectTime.classList.add("disabled");
      document.querySelector("#countdown button").innerText = "DỪNG";
      run();
    }
    else{
      disabled = false;
      document.querySelector("#countdown button").innerText = "BẮT ĐẦU";

      document.getElementById("timeCountdown").innerText=""
      document.querySelector(".selectTime").classList.remove("disabled");
      clearTimeout(timeId)
      
    }
  }
  // console.log(showTime)
};

///////////////////////////////////////////////////////////////////////
