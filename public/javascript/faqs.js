var bar = document.getElementsByClassName("faq-button");
var inc;

for (inc = 0; inc < bar.length; inc++) {
  bar[inc].addEventListener("click", function () {
    this.classList.toggle("active");
    var answers = this.nextElementSibling;
    if (answers.style.display === "block") {
      answers.style.display = "none";
    } else {
      answers.style.display = "block";
    }
  });
}
