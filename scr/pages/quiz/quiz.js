const courses = [
  {
    subject: "Mathematics",
    course: "Math Advance Grade 11",
    questions: 3
  },
  {
    subject: "Mathematics",
    course: "Math grade 9 corrections",
    questions: 3
  },
  {
    subject: "Mathematics",
    course: "Math grade 6",
    questions: 3
  },
  {
    subject: "Physics",
    course: "Physics grade 11",
    questions: 3
  },
  {
    subject: "History",
    course: "History grade 11",
    questions: 3
  },
  {
    subject: "Geography",
    course: "Geography grade 11",
    questions: 3
  },
  {
    subject: "Khmer Literature",
    course: "Khmer Literature grade 11",
    questions: 3
  },
  {
    subject: "Khmer Literature",
    course: "Khmer Literature grade 4",
    questions: 3
  },
  {
    subject: "Economics",
    course: "Economics grade 11",
    questions: 3
  },
  {
    subject: "Social Studies",
    course: "Social Studies grade 11",
    questions: 3
  }
];

const tableBody = document.getElementById("quiz-table-body");
const totalQuizzes = document.getElementById("total-quizzes");

totalQuizzes.textContent = courses.length;

tableBody.innerHTML = courses.map(item => {
  const quizLink = `quizdetail.html?course=${encodeURIComponent(item.course)}&from=quiz`;

  return `
    <tr>
      <td data-label="Subject">${item.subject}</td>
      <td data-label="Course">${item.course}</td>
      <td data-label="Questions">${item.questions}</td>
      <td data-label="Action">
        <a href="${quizLink}" class="start-quiz-btn">Start Quiz</a>
      </td>
    </tr>
  `;
}).join("");