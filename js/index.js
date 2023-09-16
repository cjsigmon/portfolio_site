const btns = document.getElementById("cntr-btns");
const loadBar = document.getElementById("horizon");
const animation = document.getElementById("animation");


window.addEventListener('load', function() {
    if (performance.navigation.type === 2) {
        hideAnimation();
        horizon.style.display = "none";
      // The page was reached using the back button
      // You can add your custom logic here
      console.log('Page reached using the back button.');
      // Perform actions you want when the page is reached using the back button.
    }
  });
  
  

function startTypingAnimation(pageIndex) {
    showAnimation();
    typeCode(pageIndex);
}

function showAnimation() {
    horizon.style.display = "block";
    animation.style.display = "flex";
}

function hideAnimation() {
    horizon.style.display = "block";
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
            // Redirect to the new webpage
            switch(pageIndex) {
                case 1: 
                hideAnimation();
                    window.location.href = "development/index.html";
                    break;
                case 2: 
                hideAnimation();
                    window.location.href = "/media";
                    break;
    
            }
            // window.location.href = "development/index.html";
        }
    }

    type();
}



