window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var dots;
var speed;
(function() {
  var canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.area = canvas.width * canvas.height;
  canvas.style.display = 'block';

  var color = 'black';
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.lineWidth = 0.1;
  ctx.strokeStyle = color;

  dots = {
    sum: Math.ceil(Math.sqrt(canvas.area)) * 0.8,
    d_radius: Math.max(canvas.width, canvas.height),
    distance: 10,
    array: []
  };

  function Dot() {
    // Position
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    // Direction
    this.vx = -0.5 + Math.random();
    this.vy = -0.5 + Math.random();

    // Size
    this.radius = Math.random() * 1.5;
  }

  Dot.prototype.create = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  };

  function animate() {
    for (var i = 0, dot = false; i < dots.sum; i++) {

      dot = dots.array[i];

      if (dot.y < 0 || dot.y > canvas.height) {
        dot.vx = dot.vx;
        dot.vy = -dot.vy;
      } else if (dot.x < 0 || dot.x > canvas.width) {
        dot.vx = -dot.vx;
        dot.vy = dot.vy;
      }

      speed = Math.random();
      dot.x += dot.vx * speed;
      dot.y += dot.vy * speed;
    }
  }

  function line() {
    for (var i = 0; i < dots.sum; i++) {
      for (var j = 0; j < dots.sum; j++) {
        i_dot = dots.array[i];
        j_dot = dots.array[j];

        if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > -dots.distance && (i_dot.y - j_dot.y) > -dots.distance) {
          if ((i_dot.x - 30 * canvas.width / 100) < dots.d_radius && (i_dot.y - 30 * canvas.height / 100) < dots.d_radius && (i_dot.x - 30 * canvas.width / 100) > -dots.d_radius && (i_dot.y - 30 * canvas.height / 100) > -dots.d_radius) {
            ctx.beginPath();
            ctx.moveTo(i_dot.x, i_dot.y);
            ctx.lineTo(j_dot.x, j_dot.y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }
  }

  function update() {
    animate();
    line();
  }

  function run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < dots.sum; i++) {
      dots.array.push(new Dot());
      dot = dots.array[i];
      dot.create();
    }

    update();
    requestAnimationFrame(run);
  }

  run();

})();