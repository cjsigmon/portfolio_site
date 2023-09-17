const myShape = document.getElementById("my-shape");
const myShapeBottom = document.getElementById("my-shape-bottom");
const svgHeight = myShape.getBoundingClientRect().height;
const middleX = myShape.getBoundingClientRect().width/2;
const svgWidth = myShape.getBoundingClientRect().width;
let counter = 0;
let rotationCount = 0.25;
let faces = [];

// tA.addEventListener("click", function() {
//     alert("Button clicked!");
//   });


class Triangle {
    constructor(leftX, leftY, topX, topY, rightX, rightY, fillColor, id, order) {
      this.leftX = leftX;
      this.leftY = leftY;
      this.topX = topX;
      this.topY = topY;
      this.rightX = rightX;
      this.rightY = rightY;
      this.fillColor = fillColor;
      this.id = id;
      this.order = order;
    }

    rotate() {
        if (rotationCount === 8) {
            rotationCount = 0;
        }
        console.log(counter);
        if (counter === 0) {
            if (this.order === 1) {
                this.leftX = middleX;
                this.leftY = svgHeight;
            } else if (this.order === 2) {
                this.leftX = 0;
                this.leftY = svgHeight - 50;
                this.rightY = svgHeight;
                this.rightX = middleX;
            }
        }

        if (counter <= 10) {
            if (this.order === 1) {
                this.leftX -= (svgWidth / 20);
                this.leftY -= 5;
            } else if (this.order === 2) {
                this.rightX -= (svgWidth / 20);
                this.rightY -= 5;
            }
        }

        
        if (counter === 10) {
            rotationCount += 0.25;
            
            if (this.order===1) {
                this.order++;
            } else {
                this.order--;
            }
        }

        if(counter === 10) {
            if (this.order === 1) {
                this.rightX = svgWidth;
                this.rightY = svgHeight - 50;
                this.leftX = svgWidth;
                this.leftY = svgHeight - 50;
            } 
            if (this.order === 2) {
                this.leftX = 0;
                this.leftY = svgHeight - 50;
            } 
        }

        if (counter > 10 && counter < 20) {
            if (this.order === 1) {
                this.leftX -= (svgWidth / 20);
                this.leftY += 5;
            } else if (this.order === 2) {
                this.rightX -= (svgWidth / 20);
                this.rightY += 5;
            }
        }
        if (counter === 20) {
            if (this.order === 1) {
                this.order++;
            } else {
                this.order--;
            }
            rotationCount += 0.25;
            counter = 0;
        }
        this.redraw();
    }

      // Function to create a polygon string for the triangle's points
  getPolygonString() {
    return `${this.leftX},${this.leftY} ${this.topX},${this.topY} ${this.rightX},${this.rightY}`;
  }

  // Function to draw the triangle in an SVG element
  drawInSVG(svgElement) {
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.id = this.id;
    polygon.addEventListener("click", function() {
        if (rotationCount < 1 || rotationCount >= 5) {
            // alert("Triangle B clicked!");

        } else {
            // alert("Triangle C clicked!");

        }
      });
    polygon.setAttribute("points", this.getPolygonString());
    polygon.setAttribute("fill", this.fillColor); // Set the fill color here
    svgElement.appendChild(polygon);
  }

  redraw() {
    let polygon = document.getElementById(this.id);
    polygon.setAttribute("points", this.getPolygonString());
    polygon.setAttribute("fill", this.fillColor); // Set the fill color here
  }
}


function rotateXTimes(x) {
    for (i = 0; i < x; i++) {
        rotate();
    }
}

function rotateForever() {
    var intervalID = setInterval(rotate, 100);

}


function rotate() {
    counter++;
    faces.forEach(triangle => {
        triangle.rotate();
    });
}




  
  // Example usage:
  const triangleC = new Triangle(0, svgHeight - 50, middleX, 0, svgWidth, svgHeight -50, "transparent", "triangleC", 3);
  const triangleA = new Triangle(0, svgHeight - 50, middleX, 0, middleX, svgHeight, "white", "triangleA", 2);
  const triangleB = new Triangle(middleX, svgHeight, middleX, 0, svgWidth, svgHeight -50, "green", "triangleB", 1);

  const triangleF = new Triangle(0, svgHeight - 50, middleX, 0, svgWidth, svgHeight -50, "transparent", "triangleF", 3);
  const triangleD = new Triangle(0, svgHeight - 50, middleX, 0, middleX, svgHeight, "darkgreen", "triangleD", 2);
  const triangleE = new Triangle(middleX, svgHeight, middleX, 0, svgWidth, svgHeight -50, "green", "triangleE", 1);

  faces.push(triangleC);
  faces.push(triangleA);
  faces.push(triangleB);
  faces.push(triangleF);
  faces.push(triangleD);
  faces.push(triangleE);
  triangleC.drawInSVG(myShape);
  triangleA.drawInSVG(myShape);
  triangleB.drawInSVG(myShape);
  triangleF.drawInSVG(myShapeBottom);
  triangleD.drawInSVG(myShapeBottom);
  triangleE.drawInSVG(myShapeBottom);



  

