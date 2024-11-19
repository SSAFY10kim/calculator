const $steps = document.getElementById('steps');
const $display = document.getElementById('display');
const $area_btn = document.getElementById('area-btn');

const data = {
  prev: "",
  curr: "",
  operator: undefined,
  pressedResult: false,
}

$area_btn.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName !== "BUTTON") {
    return;
  }

  if (target.id == "reset") {
    reset_data();
    return;
  }

  if (target.classList.contains("num")) {
    on_num(data.operator, target);
  }

  if (target.classList.contains("op")) {
    on_ops(target);
  }

  if (target.id === "btn_result") {
    show_result();
  }

  target.blur();
})


function on_num(bool, target) {
  const val = target.dataset.val;
  const prevOrcurr = bool ? "curr" : "prev";
  if (val === "-1") {
    data[prevOrcurr] = Number(data[prevOrcurr]) * -1;
  }
  else {
    data[prevOrcurr] += val
  }
  $display.textContent = data[prevOrcurr];
}

function on_ops(target) {
  $steps.classList.remove("off");
  const val_op = target.dataset.val;
  data.operator = val_op;

  if (data.prev === undefined) {
    return;
  }

  if (!data.pressedResult && data.curr) {
    show_result();
  }

  show_middleStep();
  data.curr = "";
  data.pressedResult = false;
}

function show_result() {
  if (data.prev === undefined || data.curr === undefined || !data.operator) {
    return;
  }
  data.pressedResult = true;

  show_finalStep();
  data.prev = calculSwitch();
  $display.textContent = data.prev;
}

function calculSwitch() {
  const { prev, curr, operator } = data
  switch (operator) {
    case "+":
      return Number(prev) + Number(curr);
    case "-":
      return Number(prev) - Number(curr);
    case "*":
      return Number(prev) * Number(curr);
    case "/":
      return Number(prev) / Number(curr);
  }
}

function operator_to_string() {
  const { operator } = data;
  switch (operator) {
    case "+":
      return "＋";
    case "-":
      return "－";
    case "*":
      return "×";
    case "/":
      return "÷";
  }
}

function show_middleStep() {
  const calcul_str = `${data.prev} ${operator_to_string()}`;
  $steps.textContent = calcul_str;
}

function show_finalStep() {
  const calcul_str = `${data.prev} ${operator_to_string()} ${data.curr}`;
  $steps.textContent = `${calcul_str} =`;
}

function reset_data() {
  data.prev = '';
  data.curr = '';
  $steps.textContent = '&nbsp';
  $steps.classList.add('off');
  $display.textContent = '0';
  data.operator = undefined;
  data.pressedResult = true;
}