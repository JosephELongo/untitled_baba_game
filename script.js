document.addEventListener("DOMContentLoaded", function() {
    let score = 0;
    let score_increment = 1
    const score_box = document.getElementById("score_box");
    let score_box_showing = false;

    const skellington = document.getElementById("skellington");
    skellington.addEventListener("click", summon);

    const zeroZero = document.getElementById("zeroZero");
    let rect = zeroZero.getBoundingClientRect();
    let midpoint_x = (rect.x + rect.x + rect.width) / 2;

    function summon() {
        score += score_increment;
        updateScoreBox();
        let bone = document.createElement("img");
        bone.setAttribute("src", "Assets/bone.png")
        zeroZero.appendChild(bone)
    };

    function updateScoreBox() {
        if (!score_box_showing) {
            score_box.className = "scoreBox";
            score_box_showing = true;
        }
        score_box.innerText = `You have summoned ${score} bones`;
    }

}
)




