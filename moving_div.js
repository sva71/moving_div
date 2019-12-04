function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class MovingDiv {

    constructor(className, idName, width = 50, height = 50, bgColor = '#FFFFFF', borderColor = '#000000') {
        this.div = document.createElement('div');
        document.body.append(this.div);
        this.div.classList.add(className);
        this.div.id = idName;
        this.div.innerHTML = 'БЭМС!';
        this.className = className;
        this.width = width;
        this.height = height;
        this.bgColor = bgColor;
        this.borderColor = borderColor;
        this.left = Math.floor(document.documentElement.clientWidth / 2) - Math.floor(this.width / 2);
        this.top = Math.floor(document.documentElement.clientHeight / 2) - Math.floor(this.height / 2);
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

    addClass(className) {
        this.div.classList.add(className);
    }

    removeClass(className) {
        this.div.classList.remove(className);
    }

    setId(id) {
        this.div.id = id;
    }

    draw() {
        this.div.style.left = this.left + 'px';
        this.div.style.top = this.top + 'px';
        this.div.style.width = this.width + 'px';
        this.div.style.height = this.height + 'px';
        this.div.style.color = this.bgColor;
        this.div.style.backgroundColor = this.bgColor;
        this.div.style.fontSize = Math.floor(this.width / 4) + 'px';
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

    jump() {
        this.stop();
        let oldTop = this.div.getTop();
        let height = this.div.getHeight();
        let newTop = (oldTop < height) ? 0 : oldTop - height;
        this.div.addClass('animated');
        this.div.setTop(newTop);
        setTimeout( () => { this.div.setTop(oldTop); }, 500);
        setTimeout(() => {
            this.div.removeClass('animated');
            this.start();
            }, 1000);
    }

    sit() {
        this.stop();
        if (!this.clone) {
            document.addEventListener('keydown', (event) => {
                if (event.code === 'KeyC') {
                    setTimeout(() => {
                        this.cloneDiv();
                    }, 1000);
                }
            });
        }
        console.dir(document);
        let clientWidth = document.documentElement.clientWidth;
        let oldTop = this.div.getTop();
        let oldHeight = this.div.getHeight();
        let oldLeft = this.div.getLeft();
        let oldWidth = this.div.getWidth();
        let newTop = oldTop + Math.floor(oldHeight * .4);
        let newHeight = Math.floor(oldHeight * .4);
        let diffLeft = oldLeft - Math.floor(oldWidth * .125);
        let newLeft = diffLeft > 0 ? diffLeft : 0;
        let newWidth = oldWidth * 1.25;
        if (newLeft + newWidth > clientWidth) {
            newLeft -= newLeft + newWidth - clientWidth;
        }
        this.div.addClass('animated');
        this.div.setTop(newTop);
        this.div.setHeight(newHeight);
        this.div.setLeft(newLeft);
        this.div.setWidth(newWidth);
        setTimeout(() => {
            this.div.setTop(oldTop);
            this.div.setHeight(oldHeight);
            this.div.setLeft(oldLeft);
            this.div.setWidth(oldWidth);
        }, 500);
        setTimeout(() => {
            this.div.removeClass('animated');
            this.start();
            }, 1000);
    }

    cloneDiv() {
        if (!this.clone) {
            let clientWidth = document.documentElement.clientWidth;
            let clientHeight = document.documentElement.clientHeight;
            this.clone = new MovingDiv(this.div.className, 'clone', this.div.getWidth(), this.div.getHeight(),
                this.div.getBgColor(), this.div.getBorderColor());
            this.clone.setLeft(getRandom(0, clientWidth - this.div.getWidth()));
            this.clone.setTop(getRandom(0, clientHeight - this.div.getHeight()));
            this.clone.draw();
            this.div.setBorderColor('red');
        }
    }

    onKeyDown(event) {
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
            case 'Space' : {
                this.jump();
                break;
            }
            case 'ControlLeft' :
            case 'ControlRight' : {
                this.sit();
                break;
            }
        }
    }

    onKeyUp(event) {
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
            case 'KeyC' : {
                if (event.altKey) {
                    this.cloneDiv();
                }
                break;
            }
        }
    }

    onClick(event) {
        if ((this.clone) && (event.toElement.className === this.div.className) && (event.toElement.id === 'clone')) {
            let buf = this.div;
            this.div = this.clone;
            this.clone = buf;
            this.clone.setBorderColor(this.div.getBorderColor());
            this.clone.setId('clone');
            this.div.setId('div');
            this.div.setBorderColor('red');
        }
    }

    handleEvent(event) {
        switch (event.type) {
            case 'keydown' : return this.onKeyDown(event);
            case 'keyup' : return this.onKeyUp(event);
            case 'mousedown' : return this.onClick(event);
        }
    }

    start() {
        document.addEventListener('keydown', this);
        document.addEventListener('keyup', this);
        document.addEventListener('mousedown', this);
        this.interval = setInterval(() => { this.redraw(); }, 10);
    }

    stop() {
        document.removeEventListener('keydown', this);
        document.removeEventListener('keyup', this);
        document.removeEventListener('mousedown', this);
        clearInterval(this.interval);
    }

}

window.onload = function() {
    let div = new MovingDiv('iliketomoveit', 'div',50, 50, 'cyan', 'blue');
    if (div) {
        let controller = new MoveController(div, 2);
        controller.start();
    }
};