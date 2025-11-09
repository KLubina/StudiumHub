/* Polyfills */

Event.prototype.composedPath = function() {
    if (this.path) return this.path;

    let target = this.target;
    this.path = [];
    while (target.parentNode !== null) {
        this.path.push(target);
        target = target.parentNode;
    }
    this.path.push(document, window);
    return this.path;
};
