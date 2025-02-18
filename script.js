document.addEventListener("DOMContentLoaded", () => {
    let data;
    fetch("data.json")
      .then(response => response.json())
      .then(json => {
        data = json;
        updateCards("daily");
        document.querySelector(".menu div").classList.add("active");
      })
      .catch(error => console.error("Ошибка загрузки данных:", error));
  
    const periodLabels = {
      daily: "Yesterday",
      weekly: "Last Week",
      monthly: "Last Month"
    };
  
    const menuItems = document.querySelectorAll(".menu div");
    menuItems.forEach(item => {
      item.addEventListener("click", () => {
        menuItems.forEach(el => el.classList.remove("active"));
        item.classList.add("active");
        const period = item.textContent.trim().toLowerCase();
        updateCards(period);
      });
    });
  
    function updateCards(period) {
      const cards = document.querySelectorAll(".card");
      cards.forEach((card, index) => {
        const activity = data[index];
        const currentTime = activity.timeframes[period].current;
        const previousTime = activity.timeframes[period].previous;
        const pElements = card.querySelectorAll("p");
        pElements[0].textContent = `${currentTime}hrs`;
        pElements[1].textContent = `${periodLabels[period]} - ${previousTime}hrs`;
      });
    }
  });
  