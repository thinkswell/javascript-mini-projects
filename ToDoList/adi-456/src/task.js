function Task(
  id,
  name,
  description,
  dueDate,
  formattedDueDate,
  projectId,
  priority,
  isProjectInbox,
  defaultProjectId,
  defaultProjectTaskId
) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.dueDate = dueDate;
  this.formattedDueDate = formattedDueDate;
  this.projectId = projectId;
  this.priority = priority;
  this.isProjectInbox = isProjectInbox;
  this.defaultProjectId = defaultProjectId;
  this.defaultProjectTaskId = defaultProjectTaskId;
}

export { Task };
