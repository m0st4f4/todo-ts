"use strict";
let UlElm = document.querySelector("#todoList");
let listElm = document.querySelectorAll("#todoList>li");
let submitBtn = document.querySelector("#submitBtn");
let titleInput = document.querySelector("#titleInput");
let searchInput = document.querySelector("#searchInput");
class Todo {
    constructor() {
        this.list = [];
        this.id = 0;
    }
    getList() {
        return this.list;
    }
    add(item) {
        this.id++;
        item.id = this.id;
        this.list.push(item);
    }
    delete(itemId) {
        let resultList = this.list.filter((x) => x.id != itemId);
        this.list = resultList;
    }
    changeStatus(itemId) {
        let listItemIndex = this.list.findIndex((x) => x.id == itemId);
        this.list[listItemIndex].status = !this.list[listItemIndex].status;
    }
    search(title) {
        let result = this.list.filter((x) => x.title.includes(title));
        return result;
    }
}
let todo = new Todo();
let list = todo.getList();
searchInput.addEventListener("keyup", function (e) {
    let resultLists = todo.search(searchInput.value);
    generateListElm(resultLists);
});
submitBtn.addEventListener("click", function () {
    let title = titleInput.value;
    titleInput.value = "";
    let newItem = {
        id: 0,
        title: title,
        status: false,
    };
    todo.add(newItem);
    let items = todo.getList();
    generateListElm(items);
});
function generateListElm(items) {
    UlElm.innerHTML = "";
    for (const item of items) {
        let liElm = document.createElement("div");
        liElm.className = "task-item";
        liElm.classList.add(item.status ? "done" : "notDone");
        liElm.id = item.id.toString();
        let checkboxElm = document.createElement("input");
        checkboxElm.type = "checkbox";
        checkboxElm.checked = item.status;
        checkboxElm.addEventListener("change", (e) => changeStatus(e));
        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.innerText = "X";
        deleteBtn.classList.add("float-left");
        deleteBtn.addEventListener("click", (e) => deleteTask(e));
        let taskTitleElm = document.createElement("span");
        taskTitleElm.innerText = item.title;
        liElm.append(checkboxElm, taskTitleElm, deleteBtn);
        UlElm.append(liElm);
    }
}
function changeStatus(e) {
    const itemId = e.currentTarget.parentElement.id;
    todo.changeStatus(Number(itemId));
    let items = todo.getList();
    generateListElm(items);
}
function deleteTask(e) {
    const itemId = e.currentTarget.parentElement.id;
    todo.delete(Number(itemId));
    let items = todo.getList();
    generateListElm(items);
}
