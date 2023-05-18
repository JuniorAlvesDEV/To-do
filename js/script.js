class toDoList {
  constructor() {
    this.taskList = document.querySelector('[data-list="list"]');
    this.input = document.querySelector('[data-input="text"]');
    this.btn = document.querySelector("button");
  }

  //   INSERE A TASK NO HTML

  addTask(event) {
    event.preventDefault();
    this.taskElement = this.createTask();

    this.taskElement ? this.taskList.appendChild(this.taskElement) : "";

    this.input.value = "";
    this.attForEachDelete();
    this.attForEachCheckbox();
    this.setClientInfo();
  }

  addLocalTask(localTask) {
    localTask ? this.taskList.appendChild(localTask) : "";

    this.attForEachDelete();
    this.attForEachCheckbox();
  }

  //   CRIA UMA NOVA TASK

  createTask(check, description) {
    const text = this.input.value || description;

    if (text) {
      this.task = document.createElement("li");
      this.task.classList.add("task");
      this.task.setAttribute("data-task", "task");

      const checkbox = document.createElement("input");
      checkbox.classList.add("checkbox");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("data-task", "check");
      check ? checkbox.setAttribute("checked", "") : "";

      const taskText = document.createElement("p");
      taskText.innerText = text;

      const deleteTask = document.createElement("span");
      deleteTask.classList.add("close");
      deleteTask.setAttribute("data-task", "delete");
      deleteTask.innerText = "X";

      this.task.appendChild(checkbox);
      this.task.appendChild(taskText);
      this.task.appendChild(deleteTask);
    }

    return text ? this.task : "";
  }

  //   DELETA A TASK

  deleteTask(event) {
    const deleteThis = event.target.parentElement;
    deleteThis.remove();
    this.setClientInfo();
  }

  //   ATUALIZA OS BOTÕES DE DELETAR

  attForEachDelete() {
    this.btnDelete = document.querySelectorAll('[data-task="delete"]');

    this.btnDelete.forEach((item) => {
      item.addEventListener("click", this.deleteTask);
    });
  }

  //   MARCA A TASK COMO CONCLUIDA

  taskDone(event) {
    const isDone = event.target.checked;
    const thisIsDone = event.target.parentElement;

    if (isDone) {
      thisIsDone.classList.add("checked");
    } else if (!isDone) {
      thisIsDone.classList.remove("checked");
    }

    this.setClientInfo();
  }

  //   MARCA A TASK COMO CONCLUIDA VINDAS DO LOCAL STORAGE

  dataDone() {
    this.checkbox.forEach((item) => {
      item.checked ? item.parentElement.classList.add("checked") : "";
    });
  }

  //   ATUALIZA OS BOTÕES DE CONCLUSÃO

  attForEachCheckbox() {
    this.checkbox = document.querySelectorAll('[data-task="check"]');

    this.checkbox.forEach((item) => {
      item.addEventListener("click", this.taskDone);
    });
  }

  //////////////////////////////////////////////// LOCAL STORAGE

  //   ARMAZENA OS DADOS

  setClientInfo() {
    this.task = document.querySelectorAll('[data-task="task"]');

    const tasksArray = [...this.task].map((item, index) => {
      return {
        id: index,
        checked: item.children[0].checked,
        text: item.children[1].innerText,
      };
    });
    const tasksString = JSON.stringify(tasksArray);

    if (tasksArray) {
      localStorage.setItem("dados", tasksString);
    }
  }

  //   CRIA OS ELEMENTOS ARMAZENADOS

  getClientInfo() {
    const localData = JSON.parse(localStorage.getItem("dados"));
    if (localData) {
      localData.forEach((item) => {
        const checked = item.checked;
        const text = item.text;
        const localItem = this.createTask(checked, text);
        this.addLocalTask(localItem);
      });
    }
  }

  //   INICIA OS EVENTOS

  startEvents() {
    this.btn.addEventListener("click", this.addTask);
  }

  //   BIND DOS EVENTOS

  bindEvents() {
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.taskDone = this.taskDone.bind(this);
  }

  //   INICIA

  init() {
    this.bindEvents();
    this.startEvents();
    this.attForEachDelete();
    this.attForEachCheckbox();
    this.getClientInfo();
    this.dataDone();
    this.setClientInfo();
  }
}

const initToDO = new toDoList();
initToDO.init();
