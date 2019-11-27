class MovingDiv {

    constructor(id, width = 50, height = 50, bgColor = '#FFFFFF', borderColor = '#000000') {
        this.div = document.querySelector(id);
        if (this.div) {
            this.width = width;
            this.height = height;
            this.bgColor = bgColor;
            this.borderColor = borderColor;
            this.left = Math.floor(document.documentElement.clientWidth / 2) - Math.floor(this.width / 2);
            this.top = Math.floor(document.documentElement.clientHeight / 2) - Math.floor(this.height / 2);
        }
    }

    getLeft() {
        return this.left;
    }

    getRight() {
        return this.left + this.width;
    }

    getTop() {
        return this.top;
    }

    getBottom() {
        return this.top + this.height;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getBgColor() {
        return this.bgColor;
    }

    getBorderColor() {
        return this.borderColor;
    }

    setLeft(left) {
        this.left = left;
        this.div.style.left = left + 'px';
    }

    setRight(right) {
        this.left = right - this.width;
        this.div.style.left = this.left + 'px';
    }

    setTop(top) {
        this.top = top;
        this.div.style.top = top + 'px';
    }

    setBottom(bottom) {
        this.top = bottom - this.height;
        this.div.style.top = this.top + 'px';
    }

    setWidth(width) {
        this.width = width;
        this.div.style.width = width + 'px';
    }

    setHeight(height) {
        this.height = height;
        this.div.style.height = height + 'px';
    }

    setBgColor(bgColor) {
        this.bgColor = bgColor;
        this.div.style.backgroundColor = bgColor;
    }

    setBorderColor(borderColor) {
        this.borderColor = borderColor;
        this.div.style.border = '1px solid ' + borderColor;
    }

    setColor(color) {
        this.div.style.color = color;
    }

    draw() {
        this.div.style.left = this.left + 'px';
        this.div.style.top = this.top + 'px';
        this.div.style.width = this.width + 'px';
        this.div.style.height = this.height + 'px';
        this.div.style.color = this.bgColor;
        this.div.style.backgroundColor = this.bgColor;
        this.div.style.fontSize = Math.floor(this.width / 4) + 'px';
        console.log(this.div.style.fontSize);
        this.div.style.border = '1px solid ' + this.borderColor;
    }

}

class MoveController {

    constructor(div, step) {
        this.div = div;
        this.step = step;
        this.offsetX = this.offsetY = 0;
        div.draw();
    }

    redraw() {
        let clientWidth = document.documentElement.clientWidth;
        let clientHeight = document.documentElement.clientHeight;
        if (this.offsetX || this.offsetY) {
            let newX = this.div.getLeft() + this.offsetX * this.step;
            let newY = this.div.getTop() + this.offsetY * this.step;
            if ((newX < 0) || (newY < 0) ||
                (newX + this.div.getWidth() > clientWidth) ||
                (newY + this.div.getHeight() > clientHeight)) {
                newX = this.div.getLeft() - this.offsetX * this.step * 2;
                newY = this.div.getTop() - this.offsetY * this.step * 2;
                this.div.setColor('red');
                setTimeout(() => { this.div.setColor(this.div.getBgColor())}, 2000);
            }
            this.div.setLeft(newX);
            this.div.setTop(newY);
        }
    }

    start() {

        document.addEventListener('keydown', (event) => {
           switch(event.code) {
               case 'ArrowUp' : {
                   (this.offsetY > -1) && this.offsetY--;
                   break;
               }
               case 'ArrowDown' : {
                   (this.offsetY < 1) && this.offsetY++;
                   break;
               }
               case 'ArrowLeft' : {
                   (this.offsetX > -1) && this.offsetX--;
                   break;
               }
               case 'ArrowRight' : {
                   (this.offsetX < 1) && this.offsetX++;
                   break;
               }
           }
        });

        document.addEventListener('keyup', (event) => {
            switch(event.code) {
                case 'ArrowUp' : {
                    this.offsetY++;
                    break;
                }
                case 'ArrowDown' : {
                    this.offsetY--;
                    break;
                }
                case 'ArrowLeft' : {
                    this.offsetX++;
                    break;
                }
                case 'ArrowRight' : {
                    this.offsetX--;
                    break;
                }
            }
        });

        setInterval(() => { this.redraw(); }, 10);

    }

}

window.onload = function() {
  let div = new MovingDiv('#iliketomoveit', 50, 50, 'cyan', 'blue');
  if (div) {
      let controller = new MoveController(div, 2);
      controller.start();
  }
};