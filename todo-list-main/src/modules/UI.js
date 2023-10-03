import { format } from 'date-fns'
import Storage from './Storage'
import Project from './Project'
import Task from './Task'

export default class UI {
  // LOADING CONTENT

  static loadHomepage() {
    UI.loadProjects()
    UI.initProjectButtons()
    UI.openProject('Inbox', document.getElementById('button-inbox-projects'))
    document.addEventListener('keydown', UI.handleKeyboardInput)
  }

  static loadProjects() {
    Storage.getTodoList()
      .getProjects()
      .forEach((project) => {
        if (
          project.name !== 'Inbox' &&
          project.name !== 'Today' &&
          project.name !== 'This week'
        ) {
          UI.createProject(project.name)
        }
      })

    UI.initAddProjectButtons()
  }

  static loadTasks(projectName) {
    Storage.getTodoList()
      .getProject(projectName)
      .getTasks()
      .forEach((task) => UI.createTask(task.name, task.dueDate))

    if (projectName !== 'Today' && projectName !== 'This week') {
      UI.initAddTaskButtons()
    }
  }

  static loadProjectContent(projectName) {
    const projectPreview = document.getElementById('project-preview')
    projectPreview.innerHTML = `
        <h1 id="project-name">${projectName}</h1>
        <div class="tasks-list" id="tasks-list"></div>`

    if (projectName !== 'Today' && projectName !== 'This week') {
      projectPreview.innerHTML += `
        <button class="button-add-task" id="button-add-task">
          <i class="fas fa-plus"></i>
          Add Task
        </button>
        <div class="add-task-popup" id="add-task-popup">
          <input
            class="input-add-task-popup"
            id="input-add-task-popup"
            type="text"
          />
          <div class="add-task-popup-buttons">
            <button class="button-add-task-popup" id="button-add-task-popup">
              Add
            </button>
            <button
              class="button-cancel-task-popup"
              id="button-cancel-task-popup"
            >
              Cancel
            </button>
          </div>
        </div>`
    }

    UI.loadTasks(projectName)
  }

  // CREATING CONTENT

  static createProject(name) {
    const userProjects = document.getElementById('projects-list')
    userProjects.innerHTML += ` 
      <button class="button-project" data-project-button>
        <div class="left-project-panel">
          <i class="fas fa-tasks"></i>
          <span>${name}</span>
        </div>
        <div class="right-project-panel">
          <i class="fas fa-times"></i>
        </div>
      </button>`

    UI.initProjectButtons()
  }

  static createTask(name, dueDate) {
    const tasksList = document.getElementById('tasks-list')
    tasksList.innerHTML += `
      <button class="button-task" data-task-button>
        <div class="left-task-panel">
          <i class="far fa-circle"></i>
          <p class="task-content">${name}</p>
          <input type="text" class="input-task-name" data-input-task-name>
        </div>
        <div class="right-task-panel">
          <p class="due-date" id="due-date">${dueDate}</p>
          <input type="date" class="input-due-date" data-input-due-date>
          <i class="fas fa-times"></i>
        </div>
      </button>`

    UI.initTaskButtons()
  }

  static clear() {
    UI.clearProjectPreview()
    UI.clearProjects()
    UI.clearTasks()
  }

  static clearProjectPreview() {
    const projectPreview = document.getElementById('project-preview')
    projectPreview.textContent = ''
  }

  static clearProjects() {
    const projectsList = document.getElementById('projects-list')
    projectsList.textContent = ''
  }

  static clearTasks() {
    const tasksList = document.getElementById('tasks-list')
    tasksList.textContent = ''
  }

  static closeAllPopups() {
    UI.closeAddProjectPopup()
    if (document.getElementById('button-add-task')) {
      UI.closeAddTaskPopup()
    }
    if (
      document.getElementById('tasks-list') &&
      document.getElementById('tasks-list').innerHTML !== ''
    ) {
      UI.closeAllInputs()
    }
  }

  static closeAllInputs() {
    const taskButtons = document.querySelectorAll('[data-task-button]')

    taskButtons.forEach((button) => {
      UI.closeRenameInput(button)
      UI.closeSetDateInput(button)
    })
  }

  static handleKeyboardInput(e) {
    if (e.key === 'Escape') UI.closeAllPopups()
  }

  // PROJECT ADD EVENT LISTENERS

  static initAddProjectButtons() {
    const addProjectButton = document.getElementById('button-add-project')
    const addProjectPopupButton = document.getElementById(
      'button-add-project-popup'
    )
    const cancelProjectPopupButton = document.getElementById(
      'button-cancel-project-popup'
    )
    const addProjectPopupInput = document.getElementById(
      'input-add-project-popup'
    )

    addProjectButton.addEventListener('click', UI.openAddProjectPopup)
    addProjectPopupButton.addEventListener('click', UI.addProject)
    cancelProjectPopupButton.addEventListener('click', UI.closeAddProjectPopup)
    addProjectPopupInput.addEventListener(
      'keypress',
      UI.handleAddProjectPopupInput
    )
  }

  static openAddProjectPopup() {
    const addProjectPopup = document.getElementById('add-project-popup')
    const addProjectButton = document.getElementById('button-add-project')

    UI.closeAllPopups()
    addProjectPopup.classList.add('active')
    addProjectButton.classList.add('active')
  }

  static closeAddProjectPopup() {
    const addProjectPopup = document.getElementById('add-project-popup')
    const addProjectButton = document.getElementById('button-add-project')
    const addProjectPopupInput = document.getElementById(
      'input-add-project-popup'
    )

    addProjectPopup.classList.remove('active')
    addProjectButton.classList.remove('active')
    addProjectPopupInput.value = ''
  }

  static addProject() {
    const addProjectPopupInput = document.getElementById(
      'input-add-project-popup'
    )
    const projectName = addProjectPopupInput.value

    if (projectName === '') {
      alert("Project name can't be empty")
      return
    }

    if (Storage.getTodoList().contains(projectName)) {
      addProjectPopupInput.value = ''
      alert('Project names must be different')
      return
    }

    Storage.addProject(new Project(projectName))
    UI.createProject(projectName)
    UI.closeAddProjectPopup()
  }

  static handleAddProjectPopupInput(e) {
    if (e.key === 'Enter') UI.addProject()
  }

  // PROJECT EVENT LISTENERS

  static initProjectButtons() {
    const inboxProjectsButton = document.getElementById('button-inbox-projects')
    const todayProjectsButton = document.getElementById('button-today-projects')
    const weekProjectsButton = document.getElementById('button-week-projects')
    const projectButtons = document.querySelectorAll('[data-project-button]')
    const openNavButton = document.getElementById('button-open-nav')

    inboxProjectsButton.addEventListener('click', UI.openInboxTasks)
    todayProjectsButton.addEventListener('click', UI.openTodayTasks)
    weekProjectsButton.addEventListener('click', UI.openWeekTasks)
    projectButtons.forEach((projectButton) =>
      projectButton.addEventListener('click', UI.handleProjectButton)
    )
    openNavButton.addEventListener('click', UI.openNav)
  }

  static openInboxTasks() {
    UI.openProject('Inbox', this)
  }

  static openTodayTasks() {
    Storage.updateTodayProject()
    UI.openProject('Today', this)
  }

  static openWeekTasks() {
    Storage.updateWeekProject()
    UI.openProject('This week', this)
  }

  static handleProjectButton(e) {
    const projectName = this.children[0].children[1].textContent

    if (e.target.classList.contains('fa-times')) {
      UI.deleteProject(projectName, this)
      return
    }

    UI.openProject(projectName, this)
  }

  static openProject(projectName, projectButton) {
    const defaultProjectButtons = document.querySelectorAll(
      '.button-default-project'
    )
    const projectButtons = document.querySelectorAll('.button-project')
    const buttons = [...defaultProjectButtons, ...projectButtons]

    buttons.forEach((button) => button.classList.remove('active'))
    projectButton.classList.add('active')
    UI.closeAddProjectPopup()
    UI.loadProjectContent(projectName)
  }

  static deleteProject(projectName, button) {
    if (button.classList.contains('active')) UI.clearProjectPreview()
    Storage.deleteProject(projectName)
    UI.clearProjects()
    UI.loadProjects()
  }

  static openNav() {
    const nav = document.getElementById('nav')

    UI.closeAllPopups()
    nav.classList.toggle('active')
  }

  // ADD TASK EVENT LISTENERS

  static initAddTaskButtons() {
    const addTaskButton = document.getElementById('button-add-task')
    const addTaskPopupButton = document.getElementById('button-add-task-popup')
    const cancelTaskPopupButton = document.getElementById(
      'button-cancel-task-popup'
    )
    const addTaskPopupInput = document.getElementById('input-add-task-popup')

    addTaskButton.addEventListener('click', UI.openAddTaskPopup)
    addTaskPopupButton.addEventListener('click', UI.addTask)
    cancelTaskPopupButton.addEventListener('click', UI.closeAddTaskPopup)
    addTaskPopupInput.addEventListener('keypress', UI.handleAddTaskPopupInput)
  }

  static openAddTaskPopup() {
    const addTaskPopup = document.getElementById('add-task-popup')
    const addTaskButton = document.getElementById('button-add-task')

    UI.closeAllPopups()
    addTaskPopup.classList.add('active')
    addTaskButton.classList.add('active')
  }

  static closeAddTaskPopup() {
    const addTaskPopup = document.getElementById('add-task-popup')
    const addTaskButton = document.getElementById('button-add-task')
    const addTaskInput = document.getElementById('input-add-task-popup')

    addTaskPopup.classList.remove('active')
    addTaskButton.classList.remove('active')
    addTaskInput.value = ''
  }

  static addTask() {
    const projectName = document.getElementById('project-name').textContent
    const addTaskPopupInput = document.getElementById('input-add-task-popup')
    const taskName = addTaskPopupInput.value

    if (taskName === '') {
      alert("Task name can't be empty")
      return
    }
    if (Storage.getTodoList().getProject(projectName).contains(taskName)) {
      alert('Task names must be different')
      addTaskPopupInput.value = ''
      return
    }

    Storage.addTask(projectName, new Task(taskName))
    UI.createTask(taskName, 'No date')
    UI.closeAddTaskPopup()
  }

  static handleAddTaskPopupInput(e) {
    if (e.key === 'Enter') UI.addTask()
  }

  // TASK EVENT LISTENERS

  static initTaskButtons() {
    const taskButtons = document.querySelectorAll('[data-task-button]')
    const taskNameInputs = document.querySelectorAll('[data-input-task-name')
    const dueDateInputs = document.querySelectorAll('[data-input-due-date')

    taskButtons.forEach((taskButton) =>
      taskButton.addEventListener('click', UI.handleTaskButton)
    )
    taskNameInputs.forEach((taskNameInput) =>
      taskNameInput.addEventListener('keypress', UI.renameTask)
    )
    dueDateInputs.forEach((dueDateInput) =>
      dueDateInput.addEventListener('change', UI.setTaskDate)
    )
  }

  static handleTaskButton(e) {
    if (e.target.classList.contains('fa-circle')) {
      UI.setTaskCompleted(this)
      return
    }
    if (e.target.classList.contains('fa-times')) {
      UI.deleteTask(this)
      return
    }
    if (e.target.classList.contains('task-content')) {
      UI.openRenameInput(this)
      return
    }
    if (e.target.classList.contains('due-date')) {
      UI.openSetDateInput(this)
    }
  }

  static setTaskCompleted(taskButton) {
    const projectName = document.getElementById('project-name').textContent
    const taskName = taskButton.children[0].children[1].textContent

    if (projectName === 'Today' || projectName === 'This week') {
      const parentProjectName = taskName.split('(')[1].split(')')[0]
      Storage.deleteTask(parentProjectName, taskName.split(' ')[0])
      if (projectName === 'Today') {
        Storage.updateTodayProject()
      } else {
        Storage.updateWeekProject()
      }
    } else {
      Storage.deleteTask(projectName, taskName)
    }
    UI.clearTasks()
    UI.loadTasks(projectName)
  }

  static deleteTask(taskButton) {
    const projectName = document.getElementById('project-name').textContent
    const taskName = taskButton.children[0].children[1].textContent

    if (projectName === 'Today' || projectName === 'This week') {
      const mainProjectName = taskName.split('(')[1].split(')')[0]
      Storage.deleteTask(mainProjectName, taskName)
    }
    Storage.deleteTask(projectName, taskName)
    UI.clearTasks()
    UI.loadTasks(projectName)
  }

  static openRenameInput(taskButton) {
    const taskNamePara = taskButton.children[0].children[1]
    let taskName = taskNamePara.textContent
    const taskNameInput = taskButton.children[0].children[2]
    const projectName = taskButton.parentNode.parentNode.children[0].textContent

    if (projectName === 'Today' || projectName === 'This week') {
      ;[taskName] = taskName.split(' (')
    }

    UI.closeAllPopups()
    taskNamePara.classList.add('active')
    taskNameInput.classList.add('active')
    taskNameInput.value = taskName
  }

  static closeRenameInput(taskButton) {
    const taskName = taskButton.children[0].children[1]
    const taskNameInput = taskButton.children[0].children[2]

    taskName.classList.remove('active')
    taskNameInput.classList.remove('active')
    taskNameInput.value = ''
  }

  static renameTask(e) {
    if (e.key !== 'Enter') return

    const projectName = document.getElementById('project-name').textContent
    const taskName = this.previousElementSibling.textContent
    const newTaskName = this.value

    if (newTaskName === '') {
      alert("Task name can't be empty")
      return
    }

    if (Storage.getTodoList().getProject(projectName).contains(newTaskName)) {
      this.value = ''
      alert('Task names must be different')
      return
    }

    if (projectName === 'Today' || projectName === 'This week') {
      const mainProjectName = taskName.split('(')[1].split(')')[0]
      const mainTaskName = taskName.split(' ')[0]
      Storage.renameTask(
        projectName,
        taskName,
        `${newTaskName} (${mainProjectName})`
      )
      Storage.renameTask(mainProjectName, mainTaskName, newTaskName)
    } else {
      Storage.renameTask(projectName, taskName, newTaskName)
    }
    UI.clearTasks()
    UI.loadTasks(projectName)
    UI.closeRenameInput(this.parentNode.parentNode)
  }

  static openSetDateInput(taskButton) {
    const dueDate = taskButton.children[1].children[0]
    const dueDateInput = taskButton.children[1].children[1]

    UI.closeAllPopups()
    dueDate.classList.add('active')
    dueDateInput.classList.add('active')
  }

  static closeSetDateInput(taskButton) {
    const dueDate = taskButton.children[1].children[0]
    const dueDateInput = taskButton.children[1].children[1]

    dueDate.classList.remove('active')
    dueDateInput.classList.remove('active')
  }

  static setTaskDate() {
    const taskButton = this.parentNode.parentNode
    const projectName = document.getElementById('project-name').textContent
    const taskName = taskButton.children[0].children[1].textContent
    const newDueDate = format(new Date(this.value), 'dd/MM/yyyy')

    if (projectName === 'Today' || projectName === 'This week') {
      const mainProjectName = taskName.split('(')[1].split(')')[0]
      const mainTaskName = taskName.split(' (')[0]
      Storage.setTaskDate(projectName, taskName, newDueDate)
      Storage.setTaskDate(mainProjectName, mainTaskName, newDueDate)
      if (projectName === 'Today') {
        Storage.updateTodayProject()
      } else {
        Storage.updateWeekProject()
      }
    } else {
      Storage.setTaskDate(projectName, taskName, newDueDate)
    }
    UI.clearTasks()
    UI.loadTasks(projectName)
    UI.closeSetDateInput(taskButton)
  }
}
