// =======================================
//            V A R I A B L E S
// =======================================
let score = 0;
let score_increment = 1
let score_box_showing = false;

// =======================================
//       E V E N T    H A N D L I N G
// =======================================
document.addEventListener("DOMContentLoaded", function() {
    const score_box = document.getElementById("score_box");

    const skellington = document.getElementById("skellington");
    skellington.addEventListener("click", summon);

    const save_button = document.getElementById("save_game");
    save_button.addEventListener("click", setCookie);
    

    const load_button = document.getElementById("load_game");
    load_button.addEventListener("click", getCookie);

    // Code Smell?
    // summon() cannot be moved down to helper functions
    // as long as rect & midpoint_x aren't const
    const zero_zero = document.getElementById("zero_zero");
    let rect = zero_zero.getBoundingClientRect();
    let midpoint_x = (rect.x + rect.x + rect.width) / 2;

    function summon() {
        score += score_increment;
        updateScoreBox();
        let bone = document.createElement("img");
        bone.setAttribute("src", "Assets/bone.png")
        zero_zero.appendChild(bone)
    };
})

// =======================================
//     H E L P E R    F U N C T I O N S
// =======================================
function updateScoreBox() {
    if (!score_box_showing) {
        score_box.className = "score_box";
        score_box_showing = true;
    }
    //
    if(score > 0) {
        score_box.innerText = `You have summoned ${score} bones`;
    }
}

//TODO: Save & Load bone images in UI
//Save Cookie Data
function setCookie() {
    const d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "score=" + score + ";" + expires + ";path=/";
    document.cookie = "increment=" + score_increment + ";" + expires + ";path=/"
}

//Load Cookie Data
function getCookie() {
    //cookie keys
    let c_score = "score=";
    let c_increment = "increment=";

    //split cookie into array
    let decoded_cookie = decodeURIComponent(document.cookie);
    let cookie_array = decoded_cookie.split(';');

    for(let i = 0; i < cookie_array.length; i++) {
        let cookie = cookie_array[i];
        //remove empty space
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        //set score
        if (cookie.indexOf(c_score) == 0) {
            score = Number.parseInt(cookie.substring(c_score.length, cookie.length));
        }
        //set increment
        if (cookie.indexOf(c_increment) == 0) {
            score_increment = Number.parseInt(cookie.substring(c_increment.length, cookie.length))
        }
    }
    //call to display updated score
    updateScoreBox()
    return "";
}



