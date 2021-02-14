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

    // first name
    const studentFirstName =
      studentNameSplit[0].substring(0, 1).toUpperCase() +
      studentNameSplit[0].substring(1).toLowerCase();
    student.name = studentFirstName;

    // The big MiddleName LastName Puzzle
    if (studentNameSplit == studentNameSplit[0]) {
      // if the student only has a firstname
      // middle name
      newMiddleName = studentNameSplit.push("null", "null");

      const createMiddleName = studentNameSplit[1];
      student.middleName = createMiddleName;

      //last name
      const createLastName = studentNameSplit[2];
      student.lastName = createLastName;
    } else if (studentNameSplit >= studentNameSplit[2]) {
      // insert middleName
      newMiddleName = studentNameSplit[1];
      student.middleName = newMiddleName;

      // insert lastname
      newLastName = studentNameSplit[2];
      student.lastName = newLastName;
    } else if (studentNameSplit <= studentNameSplit[1]) {
      // if the student is without a middleName

      // MiddleName
      newMiddleName = studentNameSplit.splice(1, 0, "null");
      const createMiddleName = studentNameSplit[1];
      student.middleName = createMiddleName;
      // LastName
      newLastName = studentNameSplit[1];
      student.lastName = newLastName;
    } else if (studentNameSplit >= studentNameSplit[1]) {
      // if the student is without a middleName

      // MiddleName
      newMiddleName = studentNameSplit.splice(1, 0, "null");
      const createMiddleName = studentNameSplit[1];
      student.middleName = createMiddleName;
      // LastName
      newLastName = studentNameSplit[2];
      student.lastName = newLastName;
    }

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
