let ctx = document.getElementById("chart");
let totalValue = document.querySelector(".total");
let pendingValue = document.querySelector(".pending");
let reviewedValue = document.querySelector(".reviewed");
let completedValue = document.querySelector(".completed");
let chart;

export function createChart(worksArr) {
  let total = worksArr.length;
  let pending = worksArr.filter((task) => task.status === "in-prog").length;
  let reviewed = worksArr.filter((task) => task.status === "reviewed").length;
  let completed = worksArr.filter((task) => task.status === "completed").length;

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          label: "Number of works",
          data: [pending, reviewed, completed],
          backgroundColor: ["#635bff", "#f59e0b", "#22c55e"],
        },
      ],
    },
  });
  totalValue.textContent = `Total: ${total}`;
  pendingValue.textContent = `In Progress: ${pending}`;
  reviewedValue.textContent = `Reviewed: ${reviewed}`;
  completedValue.textContent = `Completed: ${completed}`;
}

export function updateChart(worksArr) {
  const total = worksArr.length;
  const pending = worksArr.filter((task) => task.status === "in-prog").length;
  const reviewed = worksArr.filter((task) => task.status === "reviewed").length;
  const completed = worksArr.filter(
    (task) => task.status === "completed",
  ).length;

  chart.data.datasets[0].data = [pending, reviewed, completed];

  chart.update();

  totalValue.textContent = `Total: ${total}`;
  pendingValue.textContent = `In Progress: ${pending}`;
  reviewedValue.textContent = `Reviewed: ${reviewed}`;
  completedValue.textContent = `Completed: ${completed}`;
}
