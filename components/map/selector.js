import { convertCoordinates } from "../../utils/map/utils";

export class Selector {

    constructor(windowSize, center, scale) {
        this.windowSize = windowSize;
        this.center = center;
        this.scale = scale;
        this.lastMove = performance.now();
        this.selected = undefined;
    }

    setCache(cache) {
        this.cache = cache;
    }

    select(px, py) {
        const X = 2 * px * window.devicePixelRatio / this.windowSize.current.width - 1;
        const Y = - (2 * py * window.devicePixelRatio / this.windowSize.current.height - 1);
        this.X = X;
        this.Y = Y;
        this.updateSelect();
    }

    updateSelect() {
        const ratio = this.windowSize.current.width / this.windowSize.current.height;
        this.cursor = convertCoordinates(this.X, this.Y, this.center.current, this.scale.current, ratio);

        const now = performance.now();
        if (now - this.lastMove < 10)
            return;
        this.lastMove = now;
        const output = this.cache.getVerticesStopsAt(this.cursor[0], this.cursor[1]);
        this.selected = output;
    }

}