import { Editor } from './editor.js';
import { Icons } from './icons.js';
import { Sidebar } from './sidebar.js';
import { Storage } from './storage.js';
import { TaskModal } from './task-modal.js';

const ProjectButton = (() => {
  const inboxSidebarButton = document.querySelector('.sidebar-button-inbox');

  const getNewProjectButton = (projectIcon, projectName) => {
    const newProjectButton = document.createElement('button');
    const newProjectNameSpan = document.createElement('span');
    const deleteButton = Icons.getDeleteIcon();
    deleteButton.classList.add('delete-project-icon');

    newProjectButton.classList.add(
      'project-button',
      'sidebar-button',
      'tab-link'
    );
    newProjectNameSpan.classList.add('project-name');

    newProjectButton.dataset.tabName = projectName;
    newProjectNameSpan.textContent = projectName;

    newProjectButton.append(projectIcon, newProjectNameSpan, deleteButton);

    return newProjectButton;
  };

  const getProjectButtonListItem = (projectButton) => {
    const listItem = document.createElement('li');
    listItem.appendChild(projectButton);
    return listItem;
  };

  const updateProjectButtonIds = () => {
    const projectButtons = document.querySelectorAll('.project-button');
    for (let i = 0; i < projectButtons.length; i++)
      projectButtons[i].dataset.projectId = i;
  };

  const removeProjectButton = (projectButton) =>
    projectButton.parentNode.remove();

  const addButtonEventListener = (projectButton) => {
    const tabName = projectButton.dataset.tabName;
    const deleteButton = projectButton.childNodes[2];

    projectButton.addEventListener(
      'click',
      (e) =>
        e.target === projectButton && Editor.changeContent(e.target, tabName)
    );

    deleteButton.addEventListener('click', () => {
      Sidebar.selectDefaultTab();

      const projectButtonId = projectButton.dataset.projectId;

      removeProjectButton(projectButton);
      TaskModal.removeProjectSelectorOption(projectButtonId);
      Storage.removeProject(projectButtonId);

      updateProjectButtonIds();
      TaskModal.updateProjectSelectorIds();
      Storage.updateProjectIds();
      Storage.updateTaskProjectIds();
    });
  };

  const addProjectButtonToSidebarList = (projectButton) => {
    const projects = document.querySelector('#projects-list');
    const listItem = getProjectButtonListItem(projectButton);
    projects.appendChild(listItem);
  };

  const getTotalProjectButtonsAmount = () =>
    document.querySelectorAll('.project-button').length;

  const addProjectButtonId = (projectButton) => {
    const projectButtonsAmount = getTotalProjectButtonsAmount();
    const projectId = projectButtonsAmount - 1;
    projectButton.dataset.projectId = projectId;
  };

  const addProjectButton = (projectName) => {
    const icon = Icons.getProjectIcon();
    const newButton = getNewProjectButton(icon, projectName);
    addProjectButtonToSidebarList(newButton);
    addProjectButtonId(newButton);
    addButtonEventListener(newButton);
  };

  const addExistingProjectButtons = () => {
    const projects = Storage.getProjects();
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const projectName = project.name;
      addProjectButton(projectName);
    }
  };

  addExistingProjectButtons();
  Editor.changeContent(inboxSidebarButton, inboxSidebarButton.dataset.tabName);

  return { addProjectButton };
})();

export { ProjectButton };
