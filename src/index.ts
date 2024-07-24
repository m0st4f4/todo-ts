type Task = { id: number; title: string; status: boolean };
let UlElm = document.querySelector("#todoList") as HTMLElement;
let listElm = document.querySelectorAll("#todoList>li");
let submitBtn = document.querySelector("#submitBtn") as HTMLButtonElement;
let titleInput = document.querySelector("#titleInput") as HTMLInputElement;
let searchInput = document.querySelector("#searchInput") as HTMLInputElement;

class Todo {
  public list: Task[];
  private id: number;
  constructor() {
    this.list = [];
    this.id = 0;
  }

  public getList(): Task[] {
    return this.list;
  }

  public add(item: Task) {
    this.id++;
    item.id = this.id;
    this.list.push(item);
  }

  public delete(itemId: number) {
    let resultList = this.list.filter((x) => x.id != itemId);
    this.list = resultList;
  }

  public changeStatus(itemId: Number) {
    let listItemIndex = this.list.findIndex((x) => x.id == itemId);
    this.list[listItemIndex].status = !this.list[listItemIndex].status;
  }

  public search(title: string) {
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

  let newItem: Task = {
    id: 0,
    title: title,
    status: false,
  };
  todo.add(newItem);

  let items = todo.getList();
  generateListElm(items);
});

function generateListElm(items: Task[]) {
  UlElm.innerHTML = "";
  for (const item of items) {
    let liElm = document.createElement("div");
    liElm.className = "task-item";
    liElm.classList.add(item.status ? "done" : "notDone");
    liElm.id = item.id.toString();

    let checkboxElm = document.createElement("input");
    checkboxElm.type = "checkbox";
    checkboxElm.checked = item.status;
    checkboxElm.addEventListener("change", (e: Event) => changeStatus(e));

    let deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.innerText = "X";
    deleteBtn.classList.add("float-left");
    deleteBtn.addEventListener("click", (e: Event) => deleteTask(e));

    let taskTitleElm = document.createElement("span");
    taskTitleElm.innerText = item.title;

    liElm.append(checkboxElm, taskTitleElm, deleteBtn);
    UlElm.append(liElm);
  }
}

function changeStatus(e: any) {
  const itemId = e.currentTarget.parentElement.id;
  todo.changeStatus(Number(itemId));
  let items = todo.getList();
  generateListElm(items);
}
function deleteTask(e: any) {
  const itemId = e.currentTarget.parentElement.id;
  todo.delete(Number(itemId));
  let items = todo.getList();
  generateListElm(items);
}
