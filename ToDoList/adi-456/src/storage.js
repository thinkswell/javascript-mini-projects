import { Project } from './project.js';

const Storage = (() => {
  const createEmptyProjectLists = () => {
    if (localStorage.getItem('defaultProjects')) {
      return;
    }
    localStorage.setItem('defaultProjects', JSON.stringify([]));
    if (localStorage.getItem('projects')) {
      return;
    }
    localStorage.setItem('projects', JSON.stringify([]));
  };

  const getProjects = () => {
    if (localStorage.getItem('projects') === null) {
      return [];
    }
    return JSON.parse(localStorage.getItem('projects'));
  };

  const getDefaultProjects = () => {
    if (localStorage.getItem('defaultProjects') === null) {
      return [];
    }
    return JSON.parse(localStorage.getItem('defaultProjects'));
  };

  const getNewProjectId = () => Object.keys(getProjects()).length;

  const getNewTaskId = (projectId, isProjectInbox) => {
    const projects = isProjectInbox ? getDefaultProjects() : getProjects();
    const project = projects[projectId];
    const projectTasks = project.tasks;
    return projectTasks.length;
  };

  const getNewDefaultProjectTaskId = (defaultProjectId) => {
    const defaultProjects = getDefaultProjects();

    const defaultProject = defaultProjects[defaultProjectId];
    const defaultProjectTasks = defaultProject.tasks;
    return defaultProjectTasks.length;
  };

  const updateProjectList = (newProjectList) =>
    localStorage.setItem('projects', JSON.stringify(newProjectList));

  const updateDefaultProjectList = (newProjectList) =>
    localStorage.setItem('defaultProjects', JSON.stringify(newProjectList));

  const addEmptyDefaultProjectsLists = () => {
    let defaultProjects = getDefaultProjects();
    if (defaultProjects.length > 0) {
      return;
    }

    const tabNames = ['Inbox'];

    for (let i = 0; i < tabNames.length; i++) {
      const projectId = i;
      const projectName = tabNames[i];
      const tasks = [];
      const project = new Project(projectId, projectName, tasks);

      defaultProjects = [...defaultProjects, project];
    }

    updateDefaultProjectList(defaultProjects);
  };

  const addProject = (newProject) => {
    let projects = getProjects();
    const parsedNewProject = JSON.parse(JSON.stringify(newProject));
    projects = [...projects, parsedNewProject];
    updateProjectList(projects);
  };

  const updateTaskProjectIds = () => {
    const projectList = getProjects();
    for (let i = 0; i < projectList.length; i++) {
      const project = projectList[i];
      const projectId = project.id;
      const projectTasks = project.tasks;
      for (const task of projectTasks) task.projectId = projectId;
    }
    updateProjectList(projectList);
  };

  const removeProject = (id) => {
    let projectList = getProjects();
    projectList.splice(id, 1);
    updateProjectList(projectList);
  };

  const updateProjectIds = () => {
    const projects = getProjects();
    for (let i = 0; i < projects.length; i++) projects[i].id = i;
    updateProjectList(projects);
  };

  const updateTaskIds = (projectId, isProjectDefault) => {
    const projectList = isProjectDefault ? getDefaultProjects() : getProjects();
    const project = projectList[projectId];
    const tasks = project.tasks;
    for (let i = 0; i < tasks.length; i++) tasks[i].id = i;
    isProjectDefault
      ? updateDefaultProjectList(projectList)
      : updateProjectList(projectList);
  };

  const updateDefaultProjectTaskIds = (defaultProjectId) => {
    const defaultProjectList = getDefaultProjects();
    const defaultProject = defaultProjectList[defaultProjectId];
    const tasks = defaultProject.tasks;
    for (let i = 0; i < tasks.length; i++) tasks[i].defaultProjectTaskId = i;
    updateDefaultProjectList(defaultProjectList);
  };

  const addTaskToProject = (task) => {
    // const dueDateValue = task.dueDate;
    // const taskDueDate = dueDateValue === null ? null : dueDateValue;
    //
    // if (dueDateValue !== null && taskDueDate !== null) {
    //   const defaultProjectList = getDefaultProjects();
    //   const taskDefaultProjectId = task.defaultProjectId;
    //   const taskProject = defaultProjectList[taskDefaultProjectId];
    //
    //   taskProject.tasks = [...taskProject.tasks, task];
    //   updateDefaultProjectList(defaultProjectList);
    // }

    const isProjectInbox = task.isProjectInbox;
    const projects = isProjectInbox ? getDefaultProjects() : getProjects();
    const project = projects[task.projectId];

    project.tasks = [...project.tasks, task];

    isProjectInbox
      ? updateDefaultProjectList(projects)
      : updateProjectList(projects);
  };

  const removeTask = (projectId, taskIdToRemove, isProjectDefault) => {
    const projectList = isProjectDefault ? getDefaultProjects() : getProjects();
    const project = projectList[projectId];
    const tasks = project.tasks;

    tasks.splice(taskIdToRemove, 1);

    isProjectDefault
      ? updateDefaultProjectList(projectList)
      : updateProjectList(projectList);

    updateTaskIds(projectId, isProjectDefault);
  };

  const removeTaskFromDefaultProject = (
    defaultProjectId,
    defaultProjectTaskId
  ) => {
    const defaultProjects = getDefaultProjects();
    const defaultProject = defaultProjects[defaultProjectId]; // BUG: always undefined
    const defaultProjectTasks = defaultProject.tasks;
    const isProjectDefault = true;

    defaultProjectTaskId = parseInt(defaultProjectTaskId);
    defaultProjectId = parseInt(defaultProjectId);

    defaultProjectTasks.splice(defaultProjectTaskId, 1);

    updateTaskIds(defaultProjectId, isProjectDefault);

    updateProjectList(defaultProjects);
    updateDefaultProjectList(defaultProjects);
  };

  const getTaskObj = (taskButton) => {
    const isTaskProjectDefault = taskButton.dataset.isProjectInbox === 'true';
    const projectId = taskButton.dataset.projectId;
    const taskId = taskButton.dataset.id;
    const projects = isTaskProjectDefault
      ? getDefaultProjects()
      : getProjects();
    const project = projects[projectId];
    const tasks = project.tasks;
    const task = tasks[taskId];

    return task;
  };

  const editTask = (taskId, oldProjectId, isOldProjectInbox, newTask) => {
    const isProjectInbox = newTask.isProjectInbox;
    const isNewProjectInbox = newTask.isProjectInbox;

    const projects = isProjectInbox ? getDefaultProjects() : getProjects();

    const projectId = newTask.projectId;
    const project = projects[projectId];

    const tasks = project.tasks;

    const isProjectDifferent =
      projectId !== oldProjectId || isProjectInbox !== isOldProjectInbox;

    if (isProjectDifferent) {
      // TODO: add the task to the new project
      // addTaskToProject(newTask);
    } else {
      tasks[taskId] = newTask;
      tasks[taskId].id = taskId;
    }

    isNewProjectInbox
      ? updateDefaultProjectList(projects)
      : updateProjectList(projects);
  };

  createEmptyProjectLists();
  addEmptyDefaultProjectsLists();

  return {
    addProject,
    addTaskToProject,
    editTask,
    getDefaultProjects,
    getNewDefaultProjectTaskId,
    getNewProjectId,
    getNewTaskId,
    getProjects,
    getTaskObj,
    removeProject,
    removeTask,
    removeTaskFromDefaultProject,
    updateProjectIds,
    updateTaskProjectIds,
    updateDefaultProjectTaskIds,
  };
})();

export { Storage };
