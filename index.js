const weekDayNameFull = document.querySelectorAll(".calendar__day-name");
const weekDayNameCut = document.querySelectorAll(".calendar__name-cut");
const daysHTML = document.querySelector(".calendar__days");
const year = document.querySelector(".calendar__year");
const monthHTML = document.querySelector(".calendar__month");
const buttonPrev = document.querySelector(".calendar__month-prev");
const buttonNext = document.querySelector(".calendar__month-next");
const dataPage = document.querySelector(".tasks__data-text");
const input = document.querySelector(".tasks__input");
const commonTasks = document.querySelector(".common-tasks__body");
const pageHeight = document.documentElement.scrollHeight;
let postsArray = [];
let postText;
let arrayofDaysDesc = [];

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

const saveLocalStorage = function (name, value) {
  return localStorage.setItem(name, JSON.stringify(value));
};

const getLocalStorage = function (name) {
  return JSON.parse(localStorage.getItem(name));
};

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
  year.textContent = today.getFullYear();
  let yearValue = today.getFullYear();

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
  saveLocalStorage("months", months);

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
      newDay.style.borderColor = "rgb(71 37 5)";
      newDay.style.borderWidth = "3px";
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
          saveLocalStorage("dayLink", arrayofDaysDesc[i]);
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
          saveLocalStorage("daysDesc", arrayofDaysDesc);
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

allTasksArray = getLocalStorage("array");
allCommonTasksArray = getLocalStorage("commonTasksArray");
allScheduleArray = getLocalStorage("scheduleLocalArr");
let localData = getLocalStorage("dayLink");

if (input) {
  const tasksContentHTML = document.querySelector(".tasks__content");
  const btnAdd = document.querySelector(".tasks__btn-add");
  const form = document.querySelector(".tasks__form");
  const btnDataPrev = document.querySelector(".tasks__data-prev");
  const btnDataNext = document.querySelector(".tasks__data-next");
  const scheduleHTML = document.querySelector(".tasks__schedule-text");
  const scheduleSaveBtn = document.querySelector(".tasks__schedule-btn");

  const createScheduleObj = function (text) {
    return {
      data: localData.number + " " + localData.month,
      schedule: text,
    };
  };

  if (scheduleHTML) {
    scheduleSaveBtn.onclick = function () {
      let firstArr = [];
      if (!allScheduleArray && scheduleHTML.value !== '') {
        firstArr.push(createScheduleObj(scheduleHTML.value));
        saveLocalStorage("scheduleLocalArr", firstArr);
      } else {
        if (isNewSchedule(createScheduleObj(scheduleHTML.value)) === false) {
          firstArr.push(createScheduleObj(scheduleHTML.value));
          saveLocalStorage("scheduleLocalArr", firstArr);
          allScheduleArray.push(createScheduleObj(scheduleHTML.value));
          saveLocalStorage("scheduleLocalArr", allScheduleArray);
        } 
      }
    };

    let isNewSchedule = function (text) {
      for (let i = 0; i < allScheduleArray.length; i++) {
        if (
          text.data === allScheduleArray[i].data
        ) {
          if (text.schedule === allScheduleArray[i].schedule) {
            return;
          } else if (text.schedule === '') {
            allScheduleArray.splice(i, 1);
            saveLocalStorage("scheduleLocalArr", allScheduleArray);
            return;
          }
          else {
            allScheduleArray[i].schedule = text.schedule;
            saveLocalStorage("scheduleLocalArr", allScheduleArray);
          return;
          }
        } 
      }
      return false;
    };

    if (allScheduleArray) {
      for (let i = 0; i < allScheduleArray.length; i++) {
        if (
          localData.number + " " + localData.month ===
          allScheduleArray[i].data
        ) {
          scheduleHTML.textContent = allScheduleArray[i].schedule;
        }
      }
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  let task = "";
  const noTask = document.createElement("div");

  const isTasks = function (noTaskToday) {
    if (
      (allTasksArray && allTasksArray.length === 0) ||
      noTaskToday === false
    ) {
      noTask.classList.add("tasks__no-task");
      noTask.innerHTML = `Задач на сегодня нет`;
      tasksContentHTML.appendChild(noTask);
      noTask.classList.remove("display-none");
      if (commonTasks) {
        noTask.innerHTML = `Задач нет`;
      }
    } else {
      noTask.classList.add("display-none");
    }
  };

  isTasks();

  const taskCheck = function (task, array) {
    let warning = false;
    for (let j = 0; j < array.length; j++) {
      if (task === array[j].text && array[j].data === dataPage.textContent) {
        warning = true;
      }
    }
    return warning;
  };

  const commonTaskCheck = function (task, array) {
    let warning = false;
    for (let j = 0; j < array.length; j++) {
      if (task === array[j].text) {
        warning = true;
      }
    }
    return warning;
  };

  btnAdd.onclick = function () {
    task = input.value;
    input.value = "";
    if (commonTasks) {
      addTask(task);
    } else if (
      allTasksArray &&
      taskCheck(task, allTasksArray) === false &&
      task !== ""
    ) {
      addTask(task);
    } else if (!allTasksArray) {
      addTask(task);
    }
  };

  input.addEventListener("keypress", function (e) {
    let key = e.which || e.keyCode;
    if (key === 13) {
      btnAdd.onclick();
    }
  });

  const createNewTask = function (task) {
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

  const createTaskObj = function (task, done) {
    return {
      data: localData.number + " " + localData.month,
      text: task,
      done: done,
    };
  };

  let addTask = function (task, done = false) {
    let newTask = document.createElement("div");
    newTask.classList.add("tasks__item");
    newTask.innerHTML = createNewTask(task);
    tasksContentHTML.prepend(newTask);

    let someArray = [];
    if (!allTasksArray && btnDataPrev) {
      someArray.push(createTaskObj(task, done));
      saveLocalStorage("array", someArray);
    } else if (allTasksArray && btnDataPrev) {
      if (taskCheck(task, allTasksArray) === false) {
        someArray.push(createTaskObj(task, done));
        saveLocalStorage("array", someArray);
        allTasksArray.push(createTaskObj(task, done));
        saveLocalStorage("array", allTasksArray);
      }
    }

    let firstArr = [];
    if (!allCommonTasksArray && commonTasks) {
      firstArr.push(createTaskObj(task, done));
      saveLocalStorage("commonTasksArray", firstArr);
    } else if (allCommonTasksArray && commonTasks) {
      if (commonTaskCheck(task, allCommonTasksArray) === false) {
        firstArr.push(createTaskObj(task, done));
        saveLocalStorage("commonTasksArray", firstArr);
        allCommonTasksArray.push(createTaskObj(task, done));
        saveLocalStorage("commonTasksArray", allCommonTasksArray);
      }
    }

    isTasks();

    const btnDone = document.querySelector(".tasks__btn-done");
    const taskText = document.querySelector(".tasks__item-text");
    const btnDelete = document.querySelector(".tasks__btn-delete");

    btnDone.onclick = function () {
      taskText.classList.toggle("line-through");
      if (btnDataPrev) {
        taskDone(allTasksArray, "array");
      } else if (commonTasks) {
        taskDone(allCommonTasksArray, "commonTasksArray");
      }
    };

    let taskDone = function (array, localArrayName) {
      let index = array.findIndex(
        (el) =>
          el.text === task &&
          el.data === localData.number + " " + localData.month
      );
      if (taskText.classList.contains("line-through")) {
        array[index].done = true;
      } else {
        array[index].done = false;
      }
      saveLocalStorage(localArrayName, array);
    };

    btnDelete.onclick = function () {
      if (btnDataPrev) {
        taskDelete(allTasksArray, "array");
      } else if (commonTasks) {
        taskDelete(allCommonTasksArray, "commonTasksArray");
      }
    };

    const taskDelete = function (array, localArrayName) {
      let index = array.findIndex(
        (el) =>
          el.text === task &&
          el.data === localData.number + " " + localData.month
      );
      array.splice(index, 1);
      saveLocalStorage(localArrayName, array);
      newTask.remove();
      isTasks();
    };
    isDone(createTaskObj(task, done), taskText);
  };

  let isDone = function (taskObj, taskText) {
    if (taskObj.done === true) {
      taskText.classList.add("line-through");
    } else {
      taskText.classList.remove("line-through");
    }
  };

  if (dataPage) {
    window.onload = function () {
      dataPage.textContent = localData.number + " " + localData.month;
      return dataPage.textContent;
    };
    window.onload();
  }

  const printTasks = function (array) {
    let isTaskToday;
    if ((array && dataPage) || commonTasks) {
      array.forEach((item) => {
        if (commonTasks || item.data === window.onload()) {
          isTaskToday = true;
          task = item.text;
          done = item.done;
          addTask(task, done);
        }
      });
      if (isTaskToday !== true) {
        isTasks(false);
      }
    }
  };

  if (commonTasks && allCommonTasksArray) {
    printTasks(allCommonTasksArray);
  } else if (allTasksArray) {
    printTasks(allTasksArray);
  }

  let monthsLocal = JSON.parse(localStorage.getItem("months"));

  if (btnDataPrev || btnDataNext) {
    btnDataPrev.onclick = function () {
      for (let i = 0; i < monthsLocal.length; i++) {
        if (monthsLocal[i].monthToTask === localData.month) {
          localData.number = localData.number - 1;
          if (localData.number < 1) {
            localData.month = monthsLocal[i - 1].monthToTask;
            localData.number =
              monthsLocal[i - 1].days[monthsLocal[i - 1].days.length - 1];
            saveLocalStorage("dayLink", localData);
            location.reload();
          } else {
            saveLocalStorage("dayLink", localData);
            location.reload();
          }
        }
      }
    };

    btnDataNext.onclick = function () {
      for (let i = 0; i < monthsLocal.length; i++) {
        if (monthsLocal[i].monthToTask === localData.month) {
          localData.number = localData.number + 1;
          if (
            localData.number >
            monthsLocal[i].days[monthsLocal[i].days.length - 1]
          ) {
            localData.month = monthsLocal[i + 1].monthToTask;
            localData.number = 0;
            saveLocalStorage("dayLink", localData);
            location.reload();
          } else {
            saveLocalStorage("dayLink", localData);
            location.reload();
          }
        }
      }
    };
  }
}

const btnSave = document.querySelector(".posts__button-save");
const postTextHTML = document.querySelector(".posts__textarea");
const postData = document.querySelector(".posts__data");
let localPosts = getLocalStorage("localPosts");

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
    if (isPostRepeat() === undefined) {
      localPosts.push(localData);
      saveLocalStorage("localPosts", localPosts);
    } else {
      isPostRepeat().post = localData.post;
      saveLocalStorage("localPosts", localPosts);
    }
  };

  btnSave.onclick = function () {
    localData.post = postTextHTML.value;
    if (postsArray.length === 0 && postTextHTML.value !== "") {
      postsArray.push(localData);
      saveLocalStorage("localPosts", postsArray);
      if (localPosts && isPostRepeat() === undefined) {
        localPosts.push(localData);
        saveLocalStorage("localPosts", localPosts);
      } else changePost();
    }
  };
}

const allPosts = document.querySelector(".allPosts__content");

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

  if (localPosts) {
    for (let i = 0; i < localPosts.length; i++) {
      createOnePost(
        localPosts[i].number,
        localPosts[i].month,
        localPosts[i].post
      );
    }
  }

  let shortPost = document.querySelectorAll(".allPosts__item");

  for (let j = 0; j < shortPost.length; j++) {
    shortPost[j].onclick = function () {
      let postData = document.querySelectorAll(".allPosts__item-data");
      let postMonth = document.querySelectorAll(".allPosts__item-month");

      localData.number = Number(postData[j].textContent.trim());
      localData.month = postMonth[j].textContent.trim();
      saveLocalStorage("dayLink", localData);
    };
  }
}
