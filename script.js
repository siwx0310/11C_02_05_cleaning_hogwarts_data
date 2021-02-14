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

let newMiddleName;
let newLastName;
let createMiddleName;

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

    const studentNameTrim = jsonObject.fullname.trim();

    // split
    let studentNameSplit = studentNameTrim.split(" ");

    // The big MiddleName LastName Puzzle
    if (studentNameSplit == studentNameSplit[0]) {
      // if the student only has a firstname
      newMiddleName = studentNameSplit.push("null", "null");
      createMiddleName = studentNameSplit[1];
      newLastName = studentNameSplit[2];
    } else if (studentNameSplit >= studentNameSplit[2]) {
      // insert middleName
      createMiddleName = studentNameSplit[1];
      newLastName = studentNameSplit[2];
    } else if (studentNameSplit <= studentNameSplit[1]) {
      // if the student is without a middleName
      newMiddleName = studentNameSplit.splice(1, 0, "null");
      createMiddleName = studentNameSplit[1];

      newLastName = studentNameSplit[2];
    } else if (studentNameSplit >= studentNameSplit[1]) {
      // if the student is without a middleName
      newMiddleName = studentNameSplit.splice(1, 0, "null");
      createMiddleName = studentNameSplit[1];
      newLastName = studentNameSplit[2];
    }

    // FirstName first letter to Upper case
    const studentFirstName =
      studentNameSplit[0].substring(0, 1).toUpperCase() +
      studentNameSplit[0].substring(1).toLowerCase();
    student.name = studentFirstName;

    // MiddleName first letter to upper case
    const studentMiddleName =
      createMiddleName.substring(0, 1).toUpperCase() +
      createMiddleName.substring(1).toLowerCase();
    student.middleName = studentMiddleName;

    // LastName first letter to upper case
    const studentLastName =
      newLastName.substring(0, 1).toUpperCase() +
      newLastName.substring(1).toLowerCase();
    student.lastName = studentLastName;

    console.log(studentNameSplit);
    //profile image

    //house
    const studentHouseTrim = jsonObject.house.trim();
    const studentHouse =
      studentHouseTrim.substring(0, 1).toUpperCase() +
      studentHouseTrim.substring(1).toLowerCase();
    console.log(studentHouse);
    student.house = studentHouse;

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
  clone.querySelector("[data-field=middle_name]").textContent =
    student.middleName;
  clone.querySelector("[data-field=last_name]").textContent = student.lastName;
  clone.querySelector("[data-field=nick_name]").textContent = student.nickName;
  clone.querySelector("[data-field=profile_image]").textContent =
    student.profileImage;
  clone.querySelector("[data-field=House]").textContent = student.house;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
