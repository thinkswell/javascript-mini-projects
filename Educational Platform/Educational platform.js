class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.enrolledCourses = [];
    this.courseProgress = {};
  }
}

class Course {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}

class LearningPlatform {
  constructor() {
    this.users = {};
    this.courses = [];
  }

  createUser(username, password) {
    const id = Object.keys(this.users).length + 1;
    const user = new User(id, username, password);
    this.users[id] = user;
    return user;
  }

  getUserById(id) {
    return this.users[id];
  }

  createCourse(title, description) {
    const id = this.courses.length + 1;
    const course = new Course(id, title, description);
    this.courses.push(course);
    return course;
  }

  enrollUserInCourse(userId, courseId) {
    const user = this.getUserById(userId);
    if (!user || user.enrolledCourses.includes(courseId)) {
      return false; // User not found or already enrolled
    }
    user.enrolledCourses.push(courseId);
    user.courseProgress[courseId] = 0; // Initialize progress to 0%
    return true;
  }

  updateCourseProgress(userId, courseId, progress) {
    const user = this.getUserById(userId);
    if (!user || !user.enrolledCourses.includes(courseId)) {
      return false; // User not found or not enrolled in the course
    }
    user.courseProgress[courseId] = progress;
    return true;
  }
}

// Example usage
const platform = new LearningPlatform();

const user1 = platform.createUser("user123", "password123");
const user2 = platform.createUser("user456", "password456");

const course1 = platform.createCourse("JavaScript Fundamentals", "Learn the basics of JavaScript.");
const course2 = platform.createCourse("Web Development 101", "Explore web technologies and development.");

platform.enrollUserInCourse(user1.id, course1.id);
platform.enrollUserInCourse(user1.id, course2.id);

platform.updateCourseProgress(user1.id, course1.id, 25);
platform.updateCourseProgress(user1.id, course2.id, 50);

console.log("User:", user1);
console.log("Course:", course1);
