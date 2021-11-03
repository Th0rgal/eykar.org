import { findCell, drawCell } from "./voronoiBis";

export class MListeners {
    constructor(context, voronoi, drew, canvas, bottomRight, topLeft, setZoomIn, displayed) {
        this.context = context
        this.voronoi = voronoi
        this.drew = drew
        this.canvas = canvas
        this.bottomRight = bottomRight
        this.topLeft = topLeft
        this.setZoomIn = setZoomIn
        this.displayed = displayed
    }

    handleMouseMove(event) {
        const cell = findCell(event.offsetX, event.offsetY, this.voronoi);
        if (this.drew !== cell) {
            drawCell(this.context, cell, '#ff0000', this.voronoi, "#ffffff");
            drawCell(this.context, this.drew, '#1C1709', this.voronoi);
            this.drew = cell
        }
    }
    
    handleMouseOut() {
        drawCell(this.context, this.drew, '#1C1709', this.voronoi);
    }
    
    handleMouseWheel(event) {
        const mapWidth = this.bottomRight.x - this.topLeft.x;
        const mapHeight = this.bottomRight.y - this.topLeft.y;
        const mousePositionX = event.offsetX / this.canvas.clientWidth * mapWidth;
        const mousePositionY = event.offsetY / this.canvas.clientHeight * mapHeight;
        if (event.deltaY < 0) {
          this.setZoomIn({ x: mousePositionX, y: mousePositionY, zoom: 1 });
        }
        else {
          this.setZoomIn({ x: mousePositionX, y: mousePositionY, zoom: -1 });
        }
        event.preventDefault();
    }
}

export class KListeners {
    constructor(
        xStep, yStep, setRepeatStreak, repeatStreak, xPrefix, yPrefix, setXPrefix, setYPrefix,
        bottomRight, setBottomRight, topLeft, setTopLeft
      ) 
    {
        this.xStep = xStep;
        this.yStep = yStep;
        this.setRepeatStreak = setRepeatStreak;
        this.repeatStreak = repeatStreak;
        this.xPrefix = xPrefix;
        this.yPrefix = yPrefix;
        this.setXPrefix = setXPrefix;
        this.setYPrefix = setYPrefix;
        this.bottomRight = bottomRight;
        this.setBottomRight = setBottomRight;
        this.topLeft = topLeft;
        this.setTopLeft = setTopLeft;
    }

    move(xPixels, yPixels) {
      let x = parseInt((this.xPrefix + xPixels) / this.xStep.current);
      let y = parseInt((this.yPrefix + yPixels) / this.yStep.current);
      let newPrefixX = this.xPrefix + xPixels - x * this.xStep.current;
      let newPrefixY = this.yPrefix + yPixels - y * this.yStep.current;
      if (2 * newPrefixX > this.xStep.current) {
        newPrefixX -= this.xStep.current;
        x++;
      }
      this.setXPrefix(newPrefixX);
      if (2 * newPrefixY > this.yStep.current) {
        newPrefixY -= this.yStep.current;
        y++;
      }
      this.setYPrefix(newPrefixY);
      this.setBottomRight({ x: this.bottomRight.x - x, y: this.bottomRight.y - y });
      this.setTopLeft({ x: this.topLeft.x - x, y: this.topLeft.y - y });
    }

    onKeyPressed(event) {
        let i;
        if (!event.repeat) {
          this.setRepeatStreak(0);
          i = (this.xStep.current + this.yStep.current) / 4;
        } else {
          this.setRepeatStreak(this.repeatStreak + 1);
          i = Math.min(this.repeatStreak, (this.xStep.current + this.yStep.current) / 4);
        }
    
        switch (event.key) {
          case "ArrowDown":
            this.move(0, -i);
            break;
    
          case "ArrowUp":
            this.move(0, i);
            break;
    
          case "ArrowLeft":
            this.move(i, 0);
            break;
    
          case "ArrowRight":
            this.move(-i, 0);
            break;
    
          default:
            break;
        }
      }
}

export class CListener {

  constructor(context, voronoi, displayed) {
    this.context = context
    this.voronoi = voronoi
    this.displayed = displayed
  }

  handleMouseClick(event) {
    // renvoie les coordonnees du click
      // renvoie event.offsetX event.offsetY
    // colorie la case en rouge fonce et les contours en rouge
    const cell = findCell(event.offsetX, event.offsetY, this.voronoi);

    // Si displayed contient le numero d'une cellule et que ce numero n'est pas le numero clique alors on de-draw
    if (this.displayed !== cell) {
      if (this.displayed !== -1) {
        drawCell(this.context, this.displayed, '#1C1709', this.voronoi, '#ffffff')
        this.displayed = -1
      } else {     // Si displayed contient pas le numero de la cellule clique (contient -1) alors on dessine la cellule
        this.displayed = cell
        drawCell(this.context, this.displayed, '#8B0000', this.voronoi, '#ff0000')
      }
    }
  }
}