class LessonChecklist {
  constructor(target, lessons = []) {
    this.target = target;
    this.lessons = lessons;
  }

  render() {
    this.target.innerHTML = ""; // Clear container before render
    const container = document.createElement("div");
    container.className = "lesson-container";

    this.lessons.forEach((lesson, index) => {
      const item = document.createElement("div");
      item.className = "lesson";

      // Logic: Only the first lesson (index 0) is enabled by default
      const isDisabled = index === 0 ? "" : "disabled";

      item.innerHTML = `
        <input type="checkbox" id="lesson-${index}" ${isDisabled}>
        <label for="lesson-${index}">${lesson}</label>
      `;

      // Add Event Listener for unlocking logic
      const checkbox = item.querySelector('input');
      checkbox.addEventListener('change', () => this.handleLessonComplete(index));

      container.appendChild(item);

      if (index < this.lessons.length - 1) {
        const hr = document.createElement("hr");
        hr.id = `hr-${index}`; // ID for potential styling/hiding
        container.appendChild(hr);
      }
    });

    // Final Quiz Button (only active after EVERYTHING is done)
    const button = document.createElement("button");
    button.className = "quiz-btn";
    button.id = "final-quiz-btn";
    button.textContent = "Take Final Exam";
    button.disabled = true; 

    container.appendChild(button);
    this.target.appendChild(container);
  }

  handleLessonComplete(index) {
    const currentCheckbox = document.getElementById(`lesson-${index}`);
    
    if (currentCheckbox.checked) {
      // 1. Simulate the "After lesson quiz"
      const passed = confirm(`You finished ${this.lessons[index]}! Ready for the mini-quiz?`);
      
      if (passed) {
        // 2. Unlock the NEXT lesson
        const nextIndex = index + 1;
        const nextCheckbox = document.getElementById(`lesson-${nextIndex}`);
        
        if (nextCheckbox) {
          nextCheckbox.disabled = false;
        } else {
          // 3. If no more lessons, unlock the final big button
          document.getElementById("final-quiz-btn").disabled = false;
          alert("All lessons complete! You can now take the Final Exam.");
        }
      } else {
        // If they cancel the quiz, uncheck the box
        currentCheckbox.checked = false;
      }
    }
  }
}

const app = document.getElementById("lessonbox");
const checklist = new LessonChecklist(app, ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4", "Lesson 5"]);
checklist.render();