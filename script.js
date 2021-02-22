"use strict";

window.addEventListener("DOMContentLoaded", start);

let allStudents = [];

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

  // TODO: Add event-listeners to filter and sort buttons
  // Filter
  document
    .querySelector("[data-filter=gryffindor]")
    .addEventListener("click", clickGryffindorBtn);
  document
    .querySelector("[data-filter=slytherin]")
    .addEventListener("click", clickSlytherinBtn);

  document
    .querySelector("[data-filter=hufflepuff]")
    .addEventListener("click", clickHufflepuffBtn);

  document
    .querySelector("[data-filter=ravenclaw]")
    .addEventListener("click", clickRavenclawBtn);
  document
    .querySelector("[data-filter=all]")
    .addEventListener("click", clickAllBtn);

  loadJSON();
}

async function loadJSON() {
  console.log("loadJS");
  const response = await fetch(
    "https://petlatkea.dk/2021/hogwarts/students.json"
  );
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  console.log("prepareJSObjects");

  allStudents = jsonData.map(prepareObject);

  // TODO: This might not be the function we want to call first
  displayList(allStudents);
}

function prepareObject(jsonObject) {
  // TODO: Create new object with cleaned data - and store that in the allAnimals array
  const student = Object.create(Student);
  const studentNameTrim = jsonObject.fullname.trim();

  // split get firstName
  let studentNameSplit = studentNameTrim.split(" ");

  // FirstName first letter to Upper case
  const studentFirstName =
    studentNameSplit[0].substring(0, 1).toUpperCase() +
    studentNameSplit[0].substring(1).toLowerCase();
  student.firstName = studentFirstName;

  // adding middlename, lastname
  if (studentNameSplit == studentNameSplit[0]) {
    const newMiddleName = studentNameSplit.push("null");
    const newLastName = studentNameSplit.push("null");
  } else if (studentNameSplit <= studentNameSplit[1]) {
    const newMiddleName = studentNameSplit.splice(1, 0, "null");
  } else if (studentNameSplit >= studentNameSplit[1]) {
    const newMiddleName = studentNameSplit.splice(1, 0, "null");
  }

  const studentFullName = `${studentNameSplit}`; // putting the name together

  // firstComma & lastComma
  const firstComma = studentFullName.indexOf(",");
  const lastComma = studentFullName.lastIndexOf(",");

  // TODO nickName or middleName
  const setMiddleName = studentFullName.substring(firstComma + 1, lastComma);

  student.middleName =
    setMiddleName.substring(0, 1).toUpperCase() +
    setMiddleName.substring(1).toLowerCase();

  // TODO: nickName = middleName || nickname = null
  if (setMiddleName.includes('"')) {
    const nickName = setMiddleName.substring(
      setMiddleName.indexOf('"') + 1,
      setMiddleName.lastIndexOf('"')
    );
    student.nickName =
      nickName.substring(0, 1).toUpperCase() +
      nickName.substring(1).toLowerCase();
  } else {
    student.nickName = "Null";
  }

  // TODO: middleName includes ","
  if (setMiddleName.includes(",")) {
    const middleNameBeforeComma = setMiddleName.substring(
      setMiddleName.indexOf(",") + 1
    );
    student.middleName =
      middleNameBeforeComma.substring(0, 1).toUpperCase() +
      middleNameBeforeComma.substring(1).toLowerCase();
  }

  // last name
  const lastName = studentFullName.substring(lastComma + 1);
  student.lastName =
    lastName.substring(0, 1).toUpperCase() +
    lastName.substring(1).toLowerCase();

  //house
  const studentHouseTrim = jsonObject.house.trim();
  const studentHouse =
    studentHouseTrim.substring(0, 1).toUpperCase() +
    studentHouseTrim.substring(1).toLowerCase();
  student.house = studentHouse;

  // TODO: MISSING CODE HERE !!!
  allStudents.push(student);

  return student;
}

// click filter Students
function clickGryffindorBtn() {
  const filterGryffindor = allStudents.filter(lookForGryffindor);
  displayList(filterGryffindor);
}
function clickSlytherinBtn() {
  const filterSlytherin = allStudents.filter(lookForSlytherin);
  displayList(filterSlytherin);
}
function clickHufflepuffBtn() {
  const filterHufflepuff = allStudents.filter(lookForHufflepuff);
  displayList(filterHufflepuff);
}
function clickRavenclawBtn() {
  const filterRavenclaw = allStudents.filter(lookForRavenclaw);
  displayList(filterRavenclaw);
}
function clickAllBtn() {
  const filterAll = allStudents.filter(lookForAllStudents);
  displayList(filterAll);
}

// filter
function lookForGryffindor(student) {
  console.log("gryffindor click");
  if (student.house === "Gryffindor") {
    return true;
  } else {
    return false;
  }
}

function lookForSlytherin(student) {
  console.log("slytherin click");
  if (student.house === "Slytherin") {
    return true;
  } else {
    return false;
  }
}

function lookForHufflepuff(student) {
  console.log("hufflepuff click");
  if (student.house === "Hufflepuff") {
    return true;
  } else {
    return false;
  }
}

function lookForRavenclaw(student) {
  console.log("ravenclaw click");
  if (student.house === "Ravenclaw") {
    return true;
  } else {
    return false;
  }
}

function lookForAllStudents(student) {
  console.log("all click");
  return true;
}

function displayList(students) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  students.forEach(displayStudents);
}

function displayStudents(student) {
  // create clone
  const clone = document
    .querySelector("template#student")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=first_name]").textContent =
    student.firstName;
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
