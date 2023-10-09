import { Editor } from './editor.js';
import { Tooltip } from './tooltip.js';
import { TaskButton } from './task-button.js';

const Sidebar = (() => {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  const editor = document.querySelector('.editor');
  const projectsList = document.querySelector('.projects-list-container');

  const toggleProjectsVisibility = () => {
    const sidebarProjectsButton = document.querySelector(
      '.sidebar-projects-button'
    );
    const arrow = document.querySelector('.sidebar-projects-arrow-icon');

    sidebarProjectsButton.addEventListener('click', () => {
      arrow.classList.toggle('expanded');
      projectsList.classList.toggle('expanded');
    });
  };

  const addSelectedClassToButton = (button) => button.classList.add('selected');

  const removeSelectedButtonClass = () => {
    const sidebarButtons = document.querySelectorAll('.sidebar-button');
    for (const button of sidebarButtons) {
      button.classList.contains('selected') &&
        button.classList.remove('selected');
    }
  };

  const changeTabTitle = (tabName) => (document.title = `${tabName}: Todoist`);

  const addVisibleClass = () => {
    sidebar.classList.add('is-visible');
    Editor.addSidebarVisibleClass();
    Tooltip.changeMenuTooltipTextClose();
  };

  const removeVisibleClass = () => {
    sidebar.classList.remove('is-visible');
    Editor.removeSidebarVisibleClass();
    Tooltip.changeMenuTooltipTextOpen();
  };

  const toggleOverlayVisibility = () =>
    document.querySelector('.sidebar-overlay').classList.toggle('is-visible');

  const toggleSidebarVisibility = () => {
    const menuToggleButtons = document.querySelectorAll('.menu-button');
    for (const button of menuToggleButtons) {
      button.addEventListener('click', () => {
        sidebar.classList.toggle('is-visible');
        editor.classList.toggle('is-sidebar-visible');
        toggleOverlayVisibility();
        if (sidebar.classList.contains('is-visible')) {
          Tooltip.changeMenuTooltipTextClose();
          return;
        }
        Tooltip.changeMenuTooltipTextOpen();
      });
    }
  };

  const controlSidebarVisibility = () => {
    window.innerWidth > 750 && addVisibleClass();

    window.addEventListener('resize', () => {
      const isSidebarVisible = sidebar.classList.contains('is-visible');
      const isOverlayVisible = overlay.classList.contains('is-visible');
      const windowWidth = window.innerWidth;

      if (isOverlayVisible) {
        return;
      }
      if (isSidebarVisible && windowWidth <= 750) {
        removeVisibleClass();
        return;
      }
      if (!isSidebarVisible && windowWidth > 750) {
        addVisibleClass();
      }
    });
  };

  const getSelectedButton = () =>
    document.querySelector('.sidebar-button.selected');

  const selectDefaultTab = () => {
    const inboxButton = document.querySelector('.sidebar-button-inbox');
    const defaultButtonTabName = inboxButton.dataset.tabName;
    Editor.changeContent(inboxButton, defaultButtonTabName);
  };

  const updateTaskButtonIdsOnTabChange = () => {
    const sidebarButtons = document.querySelectorAll('.sidebar-button');
    for (const button of sidebarButtons) {
      button.addEventListener('click', () => {
        TaskButton.updateTaskButtonIds();
        TaskButton.updateTaskButtonDefaultProjectTaskIds();
      });
    }
  };

  toggleSidebarVisibility();
  toggleProjectsVisibility();
  controlSidebarVisibility();
  updateTaskButtonIdsOnTabChange();

  return {
    changeTabTitle,
    addSelectedClassToButton,
    removeSelectedButtonClass,
    getSelectedButton,
    selectDefaultTab,
  };
})();

export { Sidebar };
