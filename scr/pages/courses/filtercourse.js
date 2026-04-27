export function FilterComponent(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="dropdown">
      <div class="dropdown-header">
        <span class="dropdown-title">Category</span>
        <span class="dropdown-icon">&#9662;</span>
      </div>

      <div class="dropdown-list">
        <div class="dropdown-item" data-value="mathematics">Mathematics</div>
        <div class="dropdown-item" data-value="physics">Physics</div>
        <div class="dropdown-item" data-value="chemistry">Chemistry</div>
        <div class="dropdown-item" data-value="biology">Biology</div>
        <div class="dropdown-item" data-value="history">History</div>
        <div class="dropdown-item" data-value="geography">Geography</div>
        <div class="dropdown-item" data-value="khmer">Khmer Literature</div>
        <div class="dropdown-item" data-value="economic">Economic</div>
        <div class="dropdown-item" data-value="social">Social Studies</div>
      </div>
    </div>
  `;

  const header = container.querySelector(".dropdown-header");
  const list = container.querySelector(".dropdown-list");
  const items = container.querySelectorAll(".dropdown-item");
  const title = container.querySelector(".dropdown-title");

  header.addEventListener("click", () => {
    list.classList.toggle("show");
    header.classList.toggle("active");
  });

  items.forEach(item => {
    item.addEventListener("click", () => {
      items.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      title.textContent = item.textContent;
      list.classList.remove("show");
      header.classList.remove("active");

      if (window.renderBooks) {
        window.renderBooks(item.dataset.value);
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      list.classList.remove("show");
      header.classList.remove("active");
    }
  });
}

FilterComponent("filter-placeholder");