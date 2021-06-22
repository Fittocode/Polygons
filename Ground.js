class Ground {
    constructor(x1_, y1_, x2_, y2_) {
        this.x1 = x1_;
        this.y1 = y1_;
        this.x2 = x2_;
        this.y2 = y2_;
        this.x = (this.x1 + this.x2) / 2;
        this.y = (this.y1 + this.y2) / 2;
        this.len = dist(this.x1, this.y1, this.x2, this.y2);
        this.rot = atan2((this.y2 - this.y1), (this.x2 - this.x1));
    }
}