// =======================================
//            V A R I A B L E S
// =======================================
let score = 0;
let score_increment = 1
let score_box_showing = false;
let bone_counter = 0;
const bone_gravity = 10;
const bone_rotation = 45;
let bone_list = null;
let lastTime = 0;
const interval = 250;

// =======================================
//       E V E N T    H A N D L I N G
// =======================================
document.addEventListener("DOMContentLoaded", function() {
    const score_box = document.getElementById("score_box");

    const zero_zero_text = document.getElementById("zero_zero_text");
    let rect = zero_zero_text.getBoundingClientRect();

    const skellington = document.getElementById("skellington");
    skellington.addEventListener("click", function(){
        summon(rect)
    }
    );

    const save_button = document.getElementById("save_game");
    save_button.addEventListener("click", setCookie);
    

    const load_button = document.getElementById("load_game");
    load_button.addEventListener("click", getCookie);

    //Kick off the game loop
    requestAnimationFrame(gameLoop);
})

// =======================================
//     H E L P E R    F U N C T I O N S
// =======================================
function updateScoreBox() {
    if (!score_box_showing) {
        score_box.className = "score_box";
        score_box_showing = true;
    }

    if(score > 0) {
        score_box.innerText = `You have summoned ${score} bones`;
    }
}

function summon(rect) {
    let x = Math.floor(Math.random() * (rect.right - rect.left)) + rect.left;
    let y = rect.bottom;
    let bone = document.createElement("img");
    let rotation = Math.floor(Math.random() * bone_rotation)

    score += score_increment;
    bone.id = `bone_${bone_counter}`;
    bone.className = 'bone';
    bone.src = "Assets/bone.png";
    bone.rotation = rotation;
    bone.style.left = `${x}px`;
    bone.style.top = `${y}px`;
    bone.style.rotate = '0deg';
    bone.style.position = "absolute";

    zero_zero.appendChild(bone);
    bone_counter+=1;;
};

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
    updateScoreBox();
    return "";
}

function gameLoop(timestamp){
    //Timestamp gets automatically created and handled by requestAnimationFrame
    //Then, we check if it's been at least interval
    //If so, run our updates - otherwise move on
    if (timestamp - lastTime >= interval){
        lastTime = timestamp;
        updateScoreBox();
        updateBones();
        bone_list = Array.from(document.getElementsByClassName('bone'));
    }

    requestAnimationFrame(gameLoop);
};

function updateBones(){
    if (bone_list){
        bone_list.forEach(bone => {
            bone.style.top = `${parseInt(bone.style.top)+bone_gravity}px`;
            bone.style.rotate = `${parseFloat(getComputedStyle(bone).rotate)+bone.rotation}deg`;
        if(parseInt(bone.style.top) > window.innerHeight){
            bone.remove();
        };
     })
    }
}