let weekDayNameFull = document.querySelectorAll(".calendar__day-name");
let weekDayNameCut = document.querySelectorAll(".calendar__name-cut");
let daysHTML = document.querySelector(".calendar__days");
let year = document.querySelector(".calendar__year");
let monthHTML = document.querySelector(".calendar__month");
let buttonPrev = document.querySelector(".calendar__month-prev");
let buttonNext = document.querySelector(".calendar__month-next");
let dataPage = document.querySelector(".tasks__data-text");
let input = document.querySelector(".tasks__input");
let localData = JSON.parse(localStorage.getItem("dayLink"));
let postsArray = [];
let postText;
const arrayofDaysDesc = [];
const pageHeight = document.documentElement.scrollHeight;

const months = [
  {
    monthRu: "Январь",
    monthEng: "January",
    monthToTask: "Января",
    id: 0,
    days: [],
  },
  {
    monthRu: "Февраль",
    monthEng: "February",
    monthToTask: "Февраля",
    id: 1,
    days: [],
  },
  {
    monthRu: "Март",
    monthEng: "March",
    monthToTask: "Марта",
    id: 2,
    days: [],
  },
  {
    monthRu: "Апрель",
    monthEng: "April",
    monthToTask: "Апреля",
    id: 3,
    days: [],
  },
  {
    monthRu: "Май",
    monthEng: "May",
    monthToTask: "Мая",
    id: 4,
    days: [],
  },
  {
    monthRu: "Июнь",
    monthEng: "June",
    monthToTask: "Июня",
    id: 5,
    days: [],
  },
  {
    monthRu: "Июль",
    monthEng: "July",
    monthToTask: "Июля",
    id: 6,
    days: [],
  },
  {
    monthRu: "Август",
    monthEng: "August",
    monthToTask: "Августа",
    id: 7,
    days: [],
  },
  {
    monthRu: "Сентябрь",
    monthEng: "September",
    monthToTask: "Сентября",
    id: 8,
    days: [],
  },
  {
    monthRu: "Октябрь",
    monthEng: "October",
    monthToTask: "Октября",
    id: 9,
    days: [],
  },
  {
    monthRu: "Ноябрь",
    monthEng: "November",
    monthToTask: "Ноября",
    id: 10,
    days: [],
  },
  {
    monthRu: "Декабрь",
    monthEng: "December",
    monthToTask: "Декабря",
    id: 11,
    days: [],
  },
];

// изменение краткой/полной формы названия дней недели

if (year) {
  if (document.documentElement.clientWidth < 1008) {
    for (let i = 0; i < weekDayNameFull.length; i++) {
      weekDayNameFull[i].classList.add("display-none");
      weekDayNameCut[i].classList.remove("display-none");
    }
  }

// определение количества дней в месяце

  let today = new Date();
  let todayDate = today.getDate();
  let todayMonthNumber = today.getMonth();
  let todayMonth = "";
  let correctMonth = "";
  let yearValue = Number(year.textContent);

  months.forEach((item) => {
    if (
      item.id === 0 ||
      item.id === 2 ||
      item.id === 4 ||
      item.id === 6 ||
      item.id === 7 ||
      item.id === 9 ||
      item.id === 11
    ) {
      for (let i = 1; i <= 31; i++) {
        item.days.push(i);
      }
    } else if (
      item.id === 3 ||
      item.id === 5 ||
      item.id === 8 ||
      item.id === 10
    ) {
      for (let i = 1; i <= 30; i++) {
        item.days.push(i);
      }
    } else if (item.id === 1) {
      if (
        yearValue % 400 === 0 ||
        (yearValue % 4 === 0) & (yearValue % 100 !== 0)
      ) {
        for (let i = 1; i <= 29; i++) {
          item.days.push(i);
        }
      } else {
        for (let i = 1; i <= 28; i++) {
          item.days.push(i);
        }
      }
    }
  });

  // автоматическая отрисовка календаря 

  months.forEach((item) => {
    if (item.id === todayMonthNumber) {
      monthHTML.textContent = item.monthRu;
      correctMonth = item.monthEng;
      todayMonth = item.monthEng;
    }
  });

  let createEmptyDays = function (firstDay) {
    for (let clear = 1; clear < firstDay; clear++) {
      let emptyDay = document.createElement("div");
      emptyDay.classList.add("calendar__day");
      daysHTML.appendChild(emptyDay);
    }
  };

  let isTodayDay = function (day, newDay) {
    if ((day === todayDate) & (correctMonth === todayMonth)) {
      newDay.style.borderColor = "brown";
    }
  };

  let createDayDesc = function (day, item) {
    return (objOfDayDesc = {
      number: day,
      month: item.monthToTask,
    });
  };

  let saveClickDayInfo = function (newDay) {
    for (let i = 0; i < arrayofDaysDesc.length; i++) {
      [
        (newDay.onclick = function () {
          localStorage.setItem("dayLink", JSON.stringify(arrayofDaysDesc[i]));
        }),
      ];
    }
  };

  let createDay = function () {
    months.forEach((item) => {
      if (monthHTML.textContent === item.monthRu) {
        item.days.forEach((day) => {
          let newDay = document.createElement("a");
          newDay.classList.add("calendar__day");
          newDay.setAttribute("href", "tasks.html");
          newDay.textContent = `${day}`;

          isTodayDay(day, newDay);

          arrayofDaysDesc.push(createDayDesc(day, item));
          localStorage.setItem("daysDesc", JSON.stringify(arrayofDaysDesc));
          daysHTML.appendChild(newDay);

          saveClickDayInfo(newDay);
        });
      }
    });
  };

  const addDays = () => {
    daysHTML.innerHTML = "";
    let correctDate = correctMonth + " 1 ," + year.textContent;
    let firstDate = new Date(correctDate);
    let firstDay = firstDate.getDay();

    if (firstDay === 0) {
      firstDay = 7;
    }

    createEmptyDays(firstDay);
    createDay();
  };

  addDays();

  console.log(JSON.parse(localStorage.getItem("dayLink")));

  // изменение месяца по кнопкам

  buttonNext.onclick = function () {
    for (let i = 0; i <= months.length; i++) {
      if (monthHTML.textContent === months[i].monthRu) {
        if (months[i].id === 11) {
          monthHTML.textContent = months[0].monthRu;
          correctMonth = months[0].monthEng;
          addDays(correctMonth);
        } else {
          monthHTML.textContent = months[i + 1].monthRu;
          correctMonth = months[i + 1].monthEng;
          addDays(correctMonth);
        }
        break;
      }
    }
  };

  buttonPrev.onclick = function () {
    for (let i = 0; i <= months.length; i++) {
      if (monthHTML.textContent === months[i].monthRu) {
        if (months[i].id === 0) {
          monthHTML.textContent = months[11].monthRu;
          correctMonth = months[11].monthEng;
          addDays(correctMonth);
        } else {
          monthHTML.textContent = months[i - 1].monthRu;
          correctMonth = months[i - 1].monthEng;
          addDays(correctMonth);
        }
        break;
      }
    }
  };
}

allTasksArray = JSON.parse(localStorage.getItem("array"));

if (input) {
  let tasksContentHTML = document.querySelector(".tasks__content");
  let btnAdd = document.querySelector(".tasks__btn-add");
  let form = document.querySelector(".tasks__form");
  let btnDataPrev = document.querySelector(".tasks__data-prev");
  let btnDataNext = document.querySelector(".tasks__data-next");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  let task = "";
  let noTask = document.createElement("div");

  let isTasks = function () {
    if (allTasksArray && allTasksArray.length === 0) {
      noTask.classList.add("tasks__no-task");
      noTask.innerHTML = `Задач на сегодня нет`;
      tasksContentHTML.appendChild(noTask);
      noTask.classList.remove("display-none");
      
    } else {
      noTask.classList.add("display-none");
    }
  };

  isTasks();

  let taskCheck = function (task) {
    let warning = false;
    for (let j = 0; j < allTasksArray.length; j++) {
      if (
        task === allTasksArray[j].text &&
        allTasksArray[j].data === dataPage.textContent
      ) {
        warning = true;
      }
    }
    console.log(warning);
    return warning;
  };

  btnAdd.onclick = function () {
    task = input.value;
    input.value = "";
    if (allTasksArray) {
      if (taskCheck(task) === false && task !== "") {
        addTask(task);
      }
    } else addTask(task);
  };

  input.addEventListener("keypress", function (e) {
    let key = e.which || e.keyCode;
    if (key === 13) {
      btnAdd.onclick();
    }
  });

  let createNewTask = function (task) {
    return `
    <p class="tasks__item-text">${task}</p>
    <button class="tasks__btn-done" type="button">
    <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(107, 72, 27)" height="24" viewBox="0 -960 960 960" width="24">
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
    </svg>
    </button>
    <button class="tasks__btn-delete" type="button">
    <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(107, 72, 27)" height="24" viewBox="0 -960 960 960" width="24">
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
    </svg>
    </button>
  `;
  };

  let addTask = function (task, done = false) {
    let newTask = document.createElement("div");
    newTask.classList.add("tasks__item");
    newTask.innerHTML = createNewTask(task);

    tasksContentHTML.prepend(newTask);

    let taskObj = {
      data: localData.number + " " + localData.month,
      text: task,
      done: done,
    };

    let someArray = [];
    if (!allTasksArray) {
      someArray.push(taskObj);
      localStorage.setItem("array", JSON.stringify(someArray));
    } else {
      if (taskCheck(task) === false) {
        someArray.push(taskObj);
        localStorage.setItem("array", JSON.stringify(someArray));
        allTasksArray.push(taskObj);
        localStorage.setItem("array", JSON.stringify(allTasksArray));
      }
    }

    isTasks();

    let btnDone = document.querySelector(".tasks__btn-done");
    let taskText = document.querySelector(".tasks__item-text");
    let btnDelete = document.querySelector(".tasks__btn-delete");

    btnDone.onclick = function () {
      taskText.classList.toggle("line-through");
      let index = allTasksArray.findIndex((el) => el.text === task);
      if (taskText.classList.contains("line-through")) {
        allTasksArray[index].done = true;
      } else {
        allTasksArray[index].done = false;
      }
      localStorage.setItem("array", JSON.stringify(allTasksArray));
    };

    btnDelete.onclick = function () {
      let index = allTasksArray.findIndex((el) => el.text === task);
      allTasksArray.splice(index, 1);
      localStorage.setItem("array", JSON.stringify(allTasksArray));
      newTask.remove();
      isTasks();
    };

    isDone(taskObj, taskText);
  };

  let isDone = function (taskObj, taskText) {
    if (taskObj.done === true) {
      taskText.classList.add("line-through");
    } else {
      taskText.classList.remove("line-through");
    }
  };

  window.onload = function () {
    dataPage.textContent = localData.number + " " + localData.month;
    return dataPage.textContent;
  };

  window.onload();

  if (allTasksArray) {
    allTasksArray.forEach((item) => {
      if (item.data === window.onload()) {
        task = item.text;
        done = item.done;
        addTask(task, done);
      } else {
        allTasksArray = [];
        isTasks(allTasksArray);
      }
    });
  }

  btnDataPrev.onclick = function () {
    localData.number = localData.number - 1;
    localStorage.setItem("dayLink", JSON.stringify(localData));
    location.reload();
  };

  btnDataNext.onclick = function () {
    localData.number = localData.number + 1;
    localStorage.setItem("dayLink", JSON.stringify(localData));
    location.reload();
  };
}

let btnSave = document.querySelector(".posts__button-save");
let postTextHTML = document.querySelector(".posts__textarea");
let postData = document.querySelector(".posts__data");

let localPosts = JSON.parse(localStorage.getItem("localPosts"));

if (btnSave) {
  postData.textContent = localData.number + " " + localData.month;

  let isPostRepeat = function () {
    let choosenPost;
    for (let i = 0; i < localPosts.length; i++) {
      if (
        localPosts[i].number === localData.number &&
        localPosts[i].month === localData.month
      ) {
        choosenPost = localPosts[i];
      }
    }
    return choosenPost;
  };

  if (localPosts && localPosts.length > 0) {
    if (isPostRepeat() === undefined) {
      postTextHTML.textContent = "";
    } else postTextHTML.textContent = isPostRepeat().post;
  }

  let postsArray = [];
  let changePost = function () {
    console.log(isPostRepeat());
    if (isPostRepeat() === undefined) {
      localPosts.push(localData);
      localStorage.setItem("localPosts", JSON.stringify(localPosts));
    } else {
      isPostRepeat().post = localData.post;
      localStorage.setItem("localPosts", JSON.stringify(localPosts));
    }
  };

  btnSave.onclick = function () {
    localData.post = postTextHTML.value;
    if (postsArray.length === 0) {
      postsArray.push(localData);
      localStorage.setItem("localPosts", JSON.stringify(postsArray));
      if (localPosts) {
        localPosts.push(localData);
        localStorage.setItem("localPosts", JSON.stringify(localPosts));
      }
    } else changePost();
  };
}

let allPosts = document.querySelector(".allPosts__content");

if (allPosts) {

  let createOnePost = function (data, month, post) {
    let onePost = document.createElement("div");
    onePost.innerHTML = `
      <a class="allPosts__item" href="posts.html">
        <span class="allPosts__item-data">
          <strong>${data}</strong></span>
        <span class="allPosts__item-month">
          <strong>${month}</strong></span>
        ${post}
      </a>
    `;
    allPosts.prepend(onePost);
  };

  for (let i = 0; i < localPosts.length; i++) {
    createOnePost(
      localPosts[i].number,
      localPosts[i].month,
      localPosts[i].post
    );
  }

  let shortPost = document.querySelectorAll(".allPosts__item");

  for (let j = 0; j < shortPost.length; j++) {
    shortPost[j].onclick = function () { 
      let postData = document.querySelectorAll(".allPosts__item-data");
      let postMonth = document.querySelectorAll(".allPosts__item-month");

      localData.number = Number(postData[j].textContent.trim());
      localData.month = postMonth[j].textContent.trim();
      localStorage.setItem("dayLink", JSON.stringify(localData));
    };
  }
}

