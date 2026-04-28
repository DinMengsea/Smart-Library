const params = new URLSearchParams(window.location.search);
const courseName = params.get("course") || "Math Advance Grade 11";

const courseTitle = document.getElementById("course-title");
const certificateCourseName = document.getElementById("certificate-course-name");
const videoFrame = document.getElementById("video-frame");
const lessonList = document.getElementById("lesson-list");
const quizBtn = document.getElementById("quiz-btn");
const certificateBtn = document.getElementById("certificate-btn");
const certificateText = document.getElementById("certificate-text");
const modal = document.getElementById("certificate-modal");

courseTitle.textContent = courseName;
certificateCourseName.textContent = courseName;

const courseLessons = {
  "Math Advance Grade 11": [
    { id: "math11_lesson1", title: "Lesson 1", video: "https://www.youtube.com/embed/cpDRY3vRKk4" },
    { id: "math11_lesson2", title: "Lesson 2", video: "https://www.youtube.com/embed/ysz5S6PUM-U" },
    { id: "math11_lesson3", title: "Lesson 3", video: "https://www.youtube.com/embed/M7lc1UVf-VE" }
  ],

  "Math grade 9 corrections": [
    { id: "math9_lesson1", title: "Lesson 1", video: "https://www.youtube.com/embed/cpDRY3vRKk4" },
    { id: "math9_lesson2", title: "Lesson 2", video: "https://www.youtube.com/embed/ysz5S6PUM-U" }
  ],

  "Math grade 6": [
    { id: "math6_lesson1", title: "Lesson 1", video: "https://www.youtube.com/embed/cpDRY3vRKk4" },
    { id: "math6_lesson2", title: "Lesson 2", video: "https://www.youtube.com/embed/ysz5S6PUM-U" }
  ],

  "Physics grade 11": [
    { id: "physics11_lesson1", title: "Lesson 1", video: "https://www.youtube.com/embed/M7lc1UVf-VE" },
    { id: "physics11_lesson2", title: "Lesson 2", video: "https://www.youtube.com/embed/ScMzIvxBSi4" }
  ],

  "History grade 11": [
    { id: "history11_lesson1", title: "Lesson 1", video: "https://www.youtube.com/embed/cpDRY3vRKk4" },
    { id: "history11_lesson2", title: "Lesson 2", video: "https://www.youtube.com/embed/ysz5S6PUM-U" }
  ],

  "Geography grade 11": [
    { id: "geography11_lesson1", title: "Lesson 1", video: "https://www.youtube.com/embed/M7lc1UVf-VE" },
    { id: "geography11_lesson2", title: "Lesson 2", video: "https://www.youtube.com/embed/ScMzIvxBSi4" }
  ],

  "Khmer Literature grade 11": [
    { id: "khmer11_lesson1", title: "Lesson 1", video: "https://www.youtube.com/embed/cpDRY3vRKk4" },
    { id: "khmer11_lesson2", title: "Lesson 2", video: "https://www.youtube.com/embed/ysz5S6PUM-U" }
  ],

  "Khmer Literature grade 4": [
    { id: "khmer4_lesson1", title: "Lesson 1", video: "https://www.youtube.com/embed/cpDRY3vRKk4" },
    { id: "khmer4_lesson2", title: "Lesson 2", video: "https://www.youtube.com/embed/ysz5S6PUM-U" }
  ],

  "Economics grade 11": [
    { id: "economic11_lesson1", title: "Lesson 1", video: "https://www.youtube.com/embed/M7lc1UVf-VE" },
    { id: "economic11_lesson2", title: "Lesson 2", video: "https://www.youtube.com/embed/ScMzIvxBSi4" }
  ],

  "Social Studies grade 11": [
    { id: "social11_lesson1", title: "Lesson 1", video: "https://www.youtube.com/embed/cpDRY3vRKk4" },
    { id: "social11_lesson2", title: "Lesson 2", video: "https://www.youtube.com/embed/ysz5S6PUM-U" }
  ]
};

const lessons = courseLessons[courseName] || courseLessons["Math Advance Grade 11"];
let currentLessonIndex = 0;
let watchTimer = null;

function getLessonKey(lessonId) {
  return `done_${lessonId}`;
}

function isLessonDone(lessonId) {
  return localStorage.getItem(getLessonKey(lessonId)) === "true";
}

function markLessonDone() {
  const lesson = lessons[currentLessonIndex];
  localStorage.setItem(getLessonKey(lesson.id), "true");
  renderLessons();
}

function loadLesson(index) {
  currentLessonIndex = index;
  const lesson = lessons[currentLessonIndex];

  videoFrame.src = lesson.video;
  quizBtn.disabled = false;

  clearTimeout(watchTimer);

  watchTimer = setTimeout(() => {
    markLessonDone();
  }, 10000);

  renderLessons();
}

function renderLessons() {
  lessonList.innerHTML = "";

  lessons.forEach((lesson, index) => {
    const done = isLessonDone(lesson.id);

    const row = document.createElement("div");
    row.className = `lesson-row ${index === currentLessonIndex ? "active" : ""}`;

    row.innerHTML = `
      <input type="checkbox" ${done ? "checked" : ""} disabled>
      <span class="lesson-title">${lesson.title}</span>
    `;

    row.addEventListener("click", () => {
      loadLesson(index);
    });

    lessonList.appendChild(row);
  });

  checkCertificateUnlock();
}

quizBtn.addEventListener("click", () => {
  const lesson = lessons[currentLessonIndex];

  window.location.href =
    `../quiz/quizdetail.html?lesson=${encodeURIComponent(lesson.id)}&course=${encodeURIComponent(courseName)}`;
});

function checkCertificateUnlock() {
  const allComplete = lessons.every((lesson) => isLessonDone(lesson.id));

  if (allComplete) {
    certificateBtn.disabled = false;
    certificateText.textContent = "Course completed. Get your certificate";
  } else {
    certificateBtn.disabled = true;
    certificateText.textContent = "Complete this course to get your certificate 🔒";
  }
}

certificateBtn.addEventListener("click", () => {
  const name = prompt("Enter your name for certificate:");
  document.getElementById("student-name").textContent = name || "Student";
  modal.classList.remove("hidden");
});

document.getElementById("close-certificate").addEventListener("click", () => {
  modal.classList.add("hidden");
});

loadLesson(0);