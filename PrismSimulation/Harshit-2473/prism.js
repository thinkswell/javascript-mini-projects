      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      ctx.font = "Arial 12 bold";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      var drawRaysCheckbox = document.getElementById("drawRaysCheckbox");
      var drawSolutionsCheckbox = document.getElementById(
        "drawSolutionsCheckbox"
      );
      var drawPerpendicularsCheckbox = document.getElementById(
        "drawPerpendicularsCheckbox"
      );

      var i, A, mu;
      i = document.getElementById("i").value;
      A = document.getElementById("A").value;
      mu = document.getElementById("mu").value;
      var r1, r2, e;

      r1 = (Math.asin(Math.sin((i * Math.PI) / 180) / mu) * 180) / Math.PI;
      r2 = A - r1;
      e = (Math.asin(Math.sin((r2 * Math.PI) / 180) * mu) * 180) / Math.PI;

      //COORDINATES
      var x1 = 0;
      var y1 = -canvas.height / 2;

      var x2 = (canvas.height / 2) * Math.tan(((A / 2) * Math.PI) / 180);
      var y2 = 0;

      var x3 = (-canvas.height / 2) * Math.tan(((A / 2) * Math.PI) / 180);
      var y3 = 0;

      var z = canvas.height / (2 * Math.cos(((A / 2) * Math.PI) / 180));

      //LENGTH OF REFRACTED RAY
      var len =
        ((z / 2) * Math.sin((A * Math.PI) / 180)) /
        Math.sin(((180 - A - 90 + r1) * Math.PI) / 180);

      //update()
      function update() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        i = document.getElementById("i").value;
        A = document.getElementById("A").value;
        mu = document.getElementById("mu").value;

        drawRaysCheckbox = document.getElementById("drawRaysCheckbox");
      drawSolutionsCheckbox = document.getElementById(
        "drawSolutionsCheckbox"
      );
      drawPerpendicularsCheckbox = document.getElementById(
        "drawPerpendicularsCheckbox"
      );

        x1 = 0;
        y1 = -canvas.height / 2;

        x2 = (canvas.height / 2) * Math.tan(((A / 2) * Math.PI) / 180);
        y2 = 0;

        x3 = (-canvas.height / 2) * Math.tan(((A / 2) * Math.PI) / 180);
        y3 = 0;

        z = canvas.height / (2 * Math.cos(((A / 2) * Math.PI) / 180));

        r1 = (Math.asin(Math.sin((i * Math.PI) / 180) / mu) * 180) / Math.PI;
        r2 = A - r1;
        e = (Math.asin(Math.sin((r2 * Math.PI) / 180) * mu) * 180) / Math.PI;

        len =
          ((z / 2) * Math.sin((A * Math.PI) / 180)) /
          Math.sin(((180 - A - 90 + r1) * Math.PI) / 180);

        draw();
      }

      function draw() {
        ctx.resetTransform();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width/2,canvas.height/2);
        scale=0.5;
        ctx.scale(scale,scale);
        drawAxis();
        drawPrism();
        if (drawRaysCheckbox.checked === true) 
        {
          drawRays();
        if (drawSolutionsCheckbox.checked === true)
        drawSolutions();
        }
        else{
          answer.innerHTML="Draw Rays to get solutions"
        }
      }
      answer=document.getElementById("answer");
      function drawSolutions() {
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.font = "Arial 88 bold";
        
       
        if (isNaN(e)) { answer.innerHTML="i = " +
            i +
            " Degrees ," +
            " A = " +
            A +
            " Degrees ," +
            " mu = " +
            mu
          +".<br/>"+
          "TOTAL INTERNAL REFLECTION";
        } else { answer.innerHTML="i = " +
            i +
            " Degrees ," +
            " A = " +
            A +
            " Degrees ," +
            " mu = " +
            mu
          +".<br/>"+
         
            "Using Snell's Law --> " + "e = " + e.toFixed(1) + " Degrees "
          ;
        }
      }

      function drawRays() {
        // ctx.resetTransform()
        len =
          ((z / 2) * Math.sin((A * Math.PI) / 180)) /
          Math.sin(((180 - A - 90 + r1) * Math.PI) / 180);

        drawIncidentRay();
        drawRefractedRay();
        if (!isNaN(e)) drawEmergentRay();
        else drawTIR();
      }

      function drawIncidentRay() {
        ctx.translate(x3, y3);
        ctx.rotate((-(90 - A / 2) * Math.PI) / 180);
        ctx.translate(z / 2, 0);
        ctx.rotate((-i * Math.PI) / 180);

        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0, -200);
        ctx.lineTo(10, -220);
        ctx.moveTo(0, -200);
        ctx.lineTo(-10, -220);
        ctx.stroke();
        ctx.moveTo(0, 0);
        ctx.strokeStyle = "orange";
        ctx.beginPath();
        ctx.moveTo(0, -400);
        ctx.lineTo(0, 0);
        ctx.stroke();

        ctx.rotate((i * Math.PI) / 180);
        ctx.translate(-z / 2, 0);
        ctx.rotate(((90 - A / 2) * Math.PI) / 180);
        ctx.translate(-x3, 0);
        // ctx.strokeOval(0, 0, 100, 100)
      }

      function drawRefractedRay() {
        ctx.translate(x3, y3);
        ctx.rotate((-(90 - A / 2) * Math.PI) / 180);
        ctx.translate(z / 2, 0);
        ctx.rotate((-r1 * Math.PI) / 180);

        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0, len / 2);
        ctx.lineTo(-10, len / 2 - 20);
        ctx.moveTo(0, len / 2);
        ctx.lineTo(10, len / 2 - 20);
        ctx.stroke();
        ctx.strokeStyle = "black";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, len);
        ctx.stroke();

        ctx.rotate((r1 * Math.PI) / 180);
        ctx.translate(-z / 2, 0);
        ctx.rotate(((90 - A / 2) * Math.PI) / 180);
        ctx.translate(-x3, 0);
      }

      function drawEmergentRay() {
        ctx.translate(x3, y3);
        ctx.rotate((-(90 - A / 2) * Math.PI) / 180);
        ctx.translate(z / 2, 0);
        ctx.rotate((-r1 * Math.PI) / 180);
        ctx.translate(0, len);
        ctx.rotate((-r2 * Math.PI) / 180);
        ctx.rotate((e * Math.PI) / 180);

        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0, 200);
        ctx.lineTo(-10, 180);
        ctx.moveTo(0, 200);
        ctx.lineTo(10, 180);
        ctx.stroke();
        ctx.strokeStyle = "orange";
        ctx.beginPath();
        ctx.moveTo(0, 400);
        ctx.lineTo(0, 0);
        ctx.stroke();

        ctx.rotate((-e * Math.PI) / 180);
        ctx.rotate((r2 * Math.PI) / 180);
        ctx.translate(0, -len);
        ctx.rotate((r1 * Math.PI) / 180);
        ctx.translate(-z / 2, 0);
        ctx.rotate(((90 - A / 2) * Math.PI) / 180);
        ctx.translate(-x3, 0);
      }

      function drawTIR() {
        ctx.translate(x3, y3);
        ctx.rotate((-(90 - A / 2) * Math.PI) / 180);
        ctx.translate(z / 2, 0);
        ctx.rotate((-r1 * Math.PI) / 180);
        ctx.translate(0, len);
        ctx.rotate((-r2 * Math.PI) / 180);
        ctx.rotate(((90 - r2) * Math.PI) / 180);

        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(-100, 0);
        ctx.lineTo(-80, 10);
        ctx.moveTo(-100, 0);
        ctx.lineTo(-80, -10);
        ctx.stroke();
        ctx.strokeStyle = "black";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-200, 0);
        ctx.stroke();

        ctx.rotate((-(90 - r2) * Math.PI) / 180);
        ctx.rotate((r2 * Math.PI) / 180);
        ctx.translate(0, -len);
        ctx.rotate((r1 * Math.PI) / 180);
        ctx.translate(-z / 2, 0);
        ctx.rotate(((90 - A / 2) * Math.PI) / 180);
        ctx.translate(-x3, 0);
      }

      function drawAxis() {
        ctx.strokeStyle = "red";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.beginPath();
        ctx.moveTo(-canvas.width, 0);
        ctx.lineTo(canvas.width, 0);
        ctx.stroke();
      }

      function drawPrism() {
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.stroke();

        fillLens();
        if (drawPerpendicularsCheckbox.checked === true) {
          drawPerpendicular1();
          drawPerpendicular2();
        }
      }

      function fillLens() {
        // if(mu<2.2)
        var hex = Math.floor((1.9 - mu / 25) * 256).toString(16);
        c = ("0" + String(hex)).substr(-2);
        var x = 33 * Number(mu);
        ctx.fillStyle = "#" + c + "FFFF";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.fill();
      }

      function drawPerpendicular1() {
        ctx.translate(x3, y3);
        ctx.rotate((-(90 - A / 2) * Math.PI) / 180);
        ctx.translate(z / 2, 0);

        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(0, -200);
        ctx.lineTo(0, 150);
        ctx.setLineDash([5]);
        ctx.stroke();

        ctx.translate(-z / 2, 0);
        ctx.rotate(((90 - A / 2) * Math.PI) / 180);
        ctx.translate(-x3, 0);
        ctx.setLineDash([0]);
      }

      function drawPerpendicular2() {
        ctx.translate(x3, y3);
        ctx.rotate((-(90 - A / 2) * Math.PI) / 180);
        ctx.translate(z / 2, 0);
        ctx.rotate((-r1 * Math.PI) / 180);
        ctx.translate(0, len);
        ctx.rotate((-r2 * Math.PI) / 180);

        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(0, -150);
        ctx.lineTo(0, 200);
        ctx.setLineDash([5]);
        ctx.stroke();

        // ctx.strokeOval(0, 0, 100, 100)
        // ctx.beginPath()
        // ctx.moveTo(0, 0)
        // ctx.lineTo(200, 0)
        // ctx.stroke()

        ctx.rotate((r2 * Math.PI) / 180);
        ctx.translate(0, -len);
        ctx.rotate((r1 * Math.PI) / 180);
        ctx.translate(-z / 2, 0);
        ctx.rotate(((90 - A / 2) * Math.PI) / 180);
        ctx.translate(-x3, 0);
        ctx.setLineDash([0]);
      }

      /**
       * Runs when the widget recieves mouse event (events are similar to java.awt events).
       * @param x {Number} : x coordinate of mouse in widget space (top left as origin)
       * @param y {Number} : y coordinate of mouse in widget space (top left as origin)
       * @param worldPt {Vector2} :point coresponding to mouse location in world space
       * @param clickCount {Number} : Number of clicks
       * @param id {Number}: EventType: 500(clicked),501(pressed),502(released),503(moved),504(entered),505(exited)
       * @param button {Number} : Button involved in event {1=Left, 2=Middle and 3=Right mouse button* @return if true is returned event is consumed and not further handled by simphy world*/
      // function world_onMouseEvent(x, y, worldPt, clickCount, id, button) {
      //   if (id == 503) draw();
      // }

      /**
       * Runs when the widget recieves mouse scroll event* @param x{Number} : x coordinate of mouse in widget space (top left as origin)
       * @param y{Number} : y coordinate of mouse in widget space (top left as origin)
       * @param worldPt{Vector2} :point coresponding to mouse location in world space
       * @param scroll{Number} : the number of 'clicks' the mouse wheel was rotated, as an integer.
       * @return if true is returned event is consumed and not further handled by simphy world*/
      // function world_onMouseWheel(x, y, worldPt, scroll) {
      //   draw();
      // }

      update();
document.getElementById("A").addEventListener('mousemove', function() {
  update();      
})
document.getElementById("i").addEventListener('mousemove', function() {
  update();      
})
document.getElementById("mu").addEventListener('mousemove', function() {
  console.log(document.getElementById("mu").value)
  update();      
})

function world_onStart() {
  draw();
}
document.getElementById("drawRaysCheckbox").addEventListener('click',function() {
  update()
});
document.getElementById("drawSolutionsCheckbox").addEventListener('click',function() {
  update()
});
document.getElementById("drawPerpendicularsCheckbox").addEventListener('click',function() {
  update()
});