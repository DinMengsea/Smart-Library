class LessonChecklist {
  constructor(target, lessons = []) {
    this.target = target;
    this.lessons = lessons;
  }

  render() {
    const container = document.createElement("div");
    container.className = "lesson-container";

    this.lessons.forEach((lesson, index) => {
      const item = document.createElement("div");
      item.className = "lesson";

      item.innerHTML = `
        <input type="checkbox" id="lesson-${index}">
        <label for="lesson-${index}">${lesson}</label>
      `;

      container.appendChild(item);

      if (index < this.lessons.length - 1) {
        container.appendChild(document.createElement("hr"));
      }
    });

    const button = document.createElement("button");
    button.className = "quiz-btn";
    button.textContent = "Take Quiz";

    button.onclick = () => {
      const checkboxes = container.querySelectorAll("input");
      const allChecked = [...checkboxes].every(cb => cb.checked);

      alert(allChecked ? "You can take the quiz!" : "Complete all lessons first!");
    };

    container.appendChild(button);
    this.target.appendChild(container);
  }
}

// 🔥 Use the component
const app = document.getElementById("lessonbox");

const checklist = new LessonChecklist(app, [
  "Lesson 1",
  "Lesson 2",
  "Lesson 3",
  "Lesson 4",
  "Lesson 5"
]);

checklist.render();