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

const answers = [
  "suarez",
  "lionel",
  "ronaldo",
  "lukaku",
  "david",
  "salah",
  "klopp",
];

const options = `<option value="...">...</option>
            <option value="suarez">suarez</option>
            <option value="lionel">lionel</option>
            <option value="ronaldo">ronaldo</option>
            <option value="david">david</option>
            <option value="salah">salah</option>
            <option value="klopp">klopp</option>
            <option value="lukaku">lukaku</option>`;

let correctAnswer = 0;

const selects = document.getElementsByClassName("dropdown");

for (let i = 0; i < selects.length; i++) {
  selects[i].innerHTML = options;
  selects[i].addEventListener("change", () => {
    document.getElementById("checkBtn").disabled = false;
    document.getElementById("finishBtn").disabled = false;
    const icons = document.getElementsByClassName("icon-result");
    while (icons.length > 0) icons[0].remove();
  });
}

const onCheck = () => {
  document.getElementById("finishBtn").disabled = true;
  document.getElementById("checkBtn").disabled = true;

  for (let i = 0; i < selects.length; i++) {
    if (selects[i].value === answers[i]) {
      const result = document.createElement("span");
      result.className = "icon-result";
      result.innerHTML = icons.correct;

      selects[i].nextElementSibling
        ? selects[i].parentNode.insertBefore(
            result,
            selects[i].nextElementSibling.nextElementSibling
          )
        : selects[i].parentNode.insertBefore(
            result,
            selects[i].nextElementSibling
          );
    } else {
      const result = document.createElement("span");
      result.className = "icon-result";
      result.innerHTML = icons.incorrect;

      selects[i].nextElementSibling
        ? selects[i].parentNode.insertBefore(
            result,
            selects[i].nextElementSibling.nextElementSibling
          )
        : selects[i].parentNode.insertBefore(
            result,
            selects[i].nextElementSibling
          );
    }
  }
};

const onFinish = () => {
  document.getElementById("finishBtn").disabled = true;
  document.getElementById("checkBtn").disabled = true;

  for (let i = 0; i < selects.length; i++) {
    if (selects[i].value === answers[i]) {
      correctAnswer++;
      const result = document.createElement("span");
      result.className = "icon-result";
      result.innerHTML = icons.correct;

      selects[i].nextElementSibling
        ? selects[i].parentNode.insertBefore(
            result,
            selects[i].nextElementSibling.nextElementSibling
          )
        : selects[i].parentNode.insertBefore(
            result,
            selects[i].nextElementSibling
          );
    } else {
      const result = document.createElement("span");
      result.className = "icon-result";
      result.innerHTML = `${icons.incorrect} - ${answers[i]}`;

      selects[i].nextElementSibling
        ? selects[i].parentNode.insertBefore(
            result,
            selects[i].nextElementSibling.nextElementSibling
          )
        : selects[i].parentNode.insertBefore(
            result,
            selects[i].nextElementSibling
          );
    }
  }

  document.getElementById(
    "final-result"
  ).innerHTML = `<span>${correctAnswer} / ${answers.length}</span>`;
};

document.getElementById("checkBtn").addEventListener("click", onCheck);
document.getElementById("finishBtn").addEventListener("click", onFinish);
