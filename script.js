"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];

const Student = {
  firstName: "",
  lastName: "",
  middleName: "",
  nickName: "",
  profileImage: "",
  house: "",
};

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    // TODO: Create new object with cleaned data - and store that in the allAnimals array
    const student = Object.create(Student);

    const studentDataTrim = jsonObject.fullname.trim();
    let studentData = studentDataTrim.split(" ");
    console.log(studentData);

    const studentFirstName =
      studentData[0].substring(0, 1).toUpperCase() +
      studentData[0].substring(1).toLowerCase();
    student.name = studentFirstName;

    // TODO: MISSING CODE HERE !!!
    allStudents.push(student);
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allStudents.forEach(displayStudents);
}

function displayStudents(student) {
  // create clone
  const clone = document
    .querySelector("template#student")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=first_name]").textContent = student.name;
  clone.querySelector("[data-field=middle_name]").textContent = student.desc;
  clone.querySelector("[data-field=last_name]").textContent = student.type;
  clone.querySelector("[data-field=nick_name]").textContent = student.age;
  clone.querySelector("[data-field=profile_image]").textContent = student.age;
  clone.querySelector("[data-field=House]").textContent = student.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
