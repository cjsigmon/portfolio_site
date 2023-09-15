const btns = document.getElementById("cntr-btns");


function startTypingAnimation(pageIndex) {
    showAnimation();
    typeCode(pageIndex);
}

function showAnimation() {
    const animation = document.getElementById("animation");
    animation.style.display = "flex";
}

function hideAnimation() {
    const animation = document.getElementById("animation");
    animation.style.display = "none";
}

  


// Add these code snippets to your existing script.js

// Function to simulate typing out code
function typeCode(pageIndex) {
    const codeElement = document.getElementById("code");
    const codeText = "Loading new page...\n\nRedirecting to newpage.html...";
    let index = 0;

    function type() {
        codeElement.innerText = codeText.slice(0, index);
        index++;
        const cursorSpan = document.createElement("span");
        cursorSpan.className = "cursor-char";
        cursorSpan.innerText = "|"; // You can customize the cursor character here
        codeElement.appendChild(cursorSpan);

        if (index <= codeText.length) {
            setTimeout(type, 50); // Adjust the typing speed as desired
        } else {
            hideAnimation();
            // Redirect to the new webpage
            switch(pageIndex) {
                case 1: 
                    window.location.href = "development/index.html";
                    break;
                case 2: 
                    window.location.href = "/media";
                    break;
    
            }
            // window.location.href = "development/index.html";
        }
    }

    type();
}



