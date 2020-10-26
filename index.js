const icons = {
  correct: `<svg
              class="svg-icon"
              width="24px"
              height="24px"
              id="Layer_1"
              style="enable-background: new 0 0 612 792"
              version="1.1"
              viewBox="0 0 612 792"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g>
                <path
                  fill="#41ad49"
                  class="st1"
                  d="M562,396c0-141.4-114.6-256-256-256S50,254.6,50,396s114.6,256,256,256S562,537.4,562,396L562,396z    M501.7,296.3l-241,241l0,0l-17.2,17.2L110.3,421.3l58.8-58.8l74.5,74.5l199.4-199.4L501.7,296.3L501.7,296.3z"
                />
              </g>
            </svg>`,
  incorrect: `<svg
              class="svg-icon"
              width="24px"
              height="24px"
              id="Layer_1"
              style="enable-background: new 0 0 612 792"
              version="1.1"
              viewBox="0 0 612 792"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g>
                <path
                  fill=" #e44061"
                  class="st0"
                  d="M562,396c0-141.4-114.6-256-256-256S50,254.6,50,396s114.6,256,256,256S562,537.4,562,396L562,396z M356.8,396   L475,514.2L424.2,565L306,446.8L187.8,565L137,514.2L255.2,396L137,277.8l50.8-50.8L306,345.2L424.2,227l50.8,50.8L356.8,396   L356.8,396z"
                />
              </g>
            </svg>`,
};

let correctAnswer = 0;

const problems = document.getElementsByClassName("problem");

for (let i = 0; i < problems.length; i++) {
  const radios = problems[i].getElementsByTagName("input");
  for (let j = 0; j < radios.length; j++) {
    radios[j].addEventListener("change", () => {
      enableButtons();
      const icons = document.getElementsByClassName("icon-result");
      while (icons.length > 0) icons[0].remove();
    });
  }
}

const appendResult = (el, appendedEl) => {
  el.nextElementSibling
    ? el.parentNode.insertBefore(
        appendedEl,
        el.nextElementSibling.nextElementSibling
      )
    : el.parentNode.insertBefore(appendedEl, el.nextElementSibling);
};

const disableButtons = () => {
  document.getElementById("finishBtn").disabled = true;
  document.getElementById("checkBtn").disabled = true;
};

const enableButtons = () => {
  document.getElementById("finishBtn").disabled = false;
  document.getElementById("checkBtn").disabled = false;
};

const constructResultEle = (isCorrect, correctAnswer, isCheckHandler) => {
  const ele = document.createElement("span");
  ele.className = isCorrect ? "icon-result correct" : "icon-result incorrect";
  ele.innerHTML = isCorrect ? `${icons.correct}` : `${icons.incorrect}`;

  !isCheckHandler &&
    ele.className === "icon-result incorrect" &&
    (ele.innerHTML += ` - ${correctAnswer}`);

  return ele;
};

const appendScore = (correct) => {
  document.getElementById(
    "final-result"
  ).innerHTML = `<span>${correct} / ${problems.length}</span>`;
};

const disableRadios = () => {
  for (let i = 0; i < problems.length; i++) {
    const radios = problems[i].getElementsByTagName("input");
    for (let j = 0; j < radios.length; j++) {
      radios[j].disabled = true;
    }
  }
};

const onCheck = () => {
  disableButtons();
  for (let i = 0; i < problems.length; i++) {
    const radios = problems[i].getElementsByTagName("input");
    const { answer } = problems[i].lastElementChild.dataset;

    for (let j = 0; j < radios.length; j++) {
      const label = radios[j].getAttribute("name");
      radios[j].checked &&
        (radios[j].value === answer
          ? (document.querySelectorAll(`[for=${label}]`)[0].style.color =
              "green")
          : (document.querySelectorAll(`[for=${label}]`)[0].style.color =
              "red"));
    }
  }
};

const coloringIncorrect = (label, radio, answer, inputIndex) => {
  const labelEl = document.querySelectorAll(`[for=${label}]`);
  labelEl[inputIndex].style.color = "red";
  radio.value === answer && (radio.nextElementSibling.style.color = "green");
};

const coloringCorrect = (label, inputIndex) => {};

const onFinish = () => {
  disableButtons();
  outer: for (let i = 0; i < problems.length; i++) {
    const radios = problems[i].getElementsByTagName("input");
    const { answer } = problems[i].lastElementChild.dataset;

    for (let j = 0; j < radios.length; j++) {
      if (radios[j].checked && radios[j].value === answer) {
        radios[j].parentNode.parentNode.firstElementChild.style.color = "green";
        correctAnswer++;
        continue outer;
      } else {
        radios[j].parentNode.parentNode.firstElementChild.style.color = "red";
        if (radios[j].value === answer)
          radios[j].nextElementSibling.style.color = "green";
      }
    }
  }

  appendScore(correctAnswer);
  disableRadios();
};

document.getElementById("checkBtn").addEventListener("click", onCheck);
document.getElementById("finishBtn").addEventListener("click", onFinish);
