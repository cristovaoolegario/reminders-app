const reminderList = [];

document.addEventListener("DOMContentLoaded", function () {
  const reminderForm = document.getElementById("reminderForm");
  const reminderInput = document.getElementById("reminderInput");
  const reminderDate = document.getElementById("reminderDate");

  reminderForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const reminderText = reminderInput.value.trim();
    const formatedDate = getDateWithoutTime(reminderDate.valueAsDate);
    var reminder = { date: formatedDate, text: reminderText };
    if (reminderText !== "") {
      storeReminder(reminder);
      eraseList();
      sortList(reminderList);
      renderListItems(reminderList);
      reminderInput.value = "";
    }
  });
});

function getDateWithoutTime(date) {
  const dateWithoutTime = new Date(date);
  dateWithoutTime.setHours(0, 0, 0, 0);

  const year = dateWithoutTime.getFullYear();
  const month = String(dateWithoutTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateWithoutTime.getDate() + 2).padStart(2, "0");
  stringDate = `${year}-${month}-${day}`;
  return new Date(stringDate);
}

function storeReminder(reminder) {
  var existingDate = reminderList.find(
    (item) => item.date.getTime() === reminder.date.getTime()
  );

  if (existingDate) {
    existingDate.reminders.push(reminder.text);
    return;
  }

  reminderList.push({
    date: reminder.date,
    reminders: [reminder.text],
  });
  return;
}

function sortList(list) {
  list.sort(function (a, b) {
    return a.date.getTime() - b.date.getTime();
  });
}

function eraseList() {
  const ul = document.getElementById("list");
  ul.innerText = "";
}

function renderListItems(list) {
  const dateList = document.getElementById("list");
  list.forEach((element) => {
    let dateItem = document.createElement("li");
    dateItem.innerText = element.date;
    let reminderList = document.createElement("ul");

    element.reminders.forEach((lembrete) => {
      let reminderItem = document.createElement("li");
      reminderItem.innerText = lembrete;
      reminderList.appendChild(reminderItem);
    });

    dateItem.appendChild(reminderList);
    dateList.appendChild(dateItem);
  });
}
