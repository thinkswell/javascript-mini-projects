export default class Task {
  constructor(name, dueDate = 'No date') {
    this.name = name
    this.dueDate = dueDate
  }

  setName(name) {
    this.name = name
  }

  getName() {
    return this.name
  }

  setDate(dueDate) {
    this.dueDate = dueDate
  }

  getDate() {
    return this.dueDate
  }

  getDateFormatted() {
    const day = this.dueDate.split('/')[0]
    const month = this.dueDate.split('/')[1]
    const year = this.dueDate.split('/')[2]
    return `${month}/${day}/${year}`
  }
}
