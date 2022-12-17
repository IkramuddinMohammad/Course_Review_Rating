(function ($) {
    debugger;
    const $reviewform = document.getElementById('review_form');
    const $commentform = document.getElementById('comment_form');
    const commentValueError = document.getElementById('commentValueError');
    const ratingError = document.getElementById('ratingError');
    const reviewTextError = document.getElementById('reviewTextError');
    if ($reviewform) {
        $reviewform.addEventListener("submit", function rating(event) {
            event.preventDefault();
            var valid = false;

            let rating = document.forms["review_form"]["rating"].value;
            let reviewText = document.forms["review_form"]["reviewText"].value;

            if (reviewText.trim().length == 0) {
                reviewTextError.style.display = "block";
                reviewTextError.innerHTML = "Please enter review"
                $("#reviewTextError").show().fadeOut(12000);
                valid = true;
            }
            if (!/^[0-9]+$/.test(rating)) {
                ratingError.style.display = "block";
                ratingError.innerHTML = "Please enter rating"
                $("#ratingError").show().fadeOut(12000);
                valid = true;
            } else if (credits < 1 || credits > 5) {
                ratingError.style.display = "block";
                ratingError.innerHTML = "Please enter rating between 1 and 5"
                $("#ratingError").show().fadeOut(12000);
                valid = true;
            }
            if (valid) {
                return;
            } else {
                ratingError.style.display = "none";
                reviewTextError.style.display = "none";
            }
        });
    }
    if ($commentform) {
        $commentform.addEventListener("submit", function rating(event) {
            event.preventDefault();
            var valid = false;

            let commentValue = document.forms["comment_form"]["commentValue"].value;

            if (commentValue.trim().length == 0) {
                commentValueError.style.display = "block";
                commentValueError.innerHTML = "Please enter comment"
                $("#commentValueError").show().fadeOut(12000);
                valid = true;
            }

            if (valid) {
                return;
            } else {
                commentValueError.style.display = "none";

            }
        });
    }
})(window.jQuery);