const canvaError = require("../../index.js").utils.canvaError;
const { Utils } = require("../../util/utils.js");
const { convertToInt } = Utils;

module.exports = {
    name: "$fillRect",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [name = "canvas", x, y, w, h, radius = 0] = data.inside.splits;
        const step = Math.min(convertToInt(w), convertToInt(h)) * 0.1;

        if (isNaN(convertToInt(x)) || isNaN(convertToInt(y)) || isNaN(convertToInt(w)) || isNaN(convertToInt(h)) || isNaN(convertToInt(radius)))
            return canvaError.newError(d, 'Invalid parameter. All parameters must be numbers.');
        if (!d.data.canvases[name]) return canvaError.newError(d, 'Canvas with this name not found.');
        const canvas = d.data.canvases[name];
        const ctx = canvas.ctx;
        if (convertToInt(radius) === 0) {
            ctx.fillRect(convertToInt(x), convertToInt(y), convertToInt(w), convertToInt(h));
        } else {
            ctx.beginPath();
            ctx.moveTo(convertToInt(x) + convertToInt(radius), convertToInt(y));
            ctx.lineTo(convertToInt(x) + convertToInt(w) - convertToInt(radius), convertToInt(y));
            ctx.quadraticCurveTo(convertToInt(x) + convertToInt(w), convertToInt(y), convertToInt(x) + convertToInt(w), convertToInt(y) + convertToInt(radius));
            ctx.lineTo(convertToInt(x) + convertToInt(w), convertToInt(y) + convertToInt(h) - convertToInt(radius));
            ctx.quadraticCurveTo(convertToInt(x) + convertToInt(w), convertToInt(y) + convertToInt(h), convertToInt(x) + convertToInt(w) - convertToInt(radius), convertToInt(y) + convertToInt(h));
            ctx.lineTo(convertToInt(x) + convertToInt(radius), convertToInt(y) + convertToInt(h));
            ctx.quadraticCurveTo(convertToInt(x), convertToInt(y) + convertToInt(h), convertToInt(x), convertToInt(y) + convertToInt(h) - convertToInt(radius));
            ctx.lineTo(convertToInt(x), convertToInt(y) + convertToInt(radius));
            ctx.quadraticCurveTo(convertToInt(x), convertToInt(y), convertToInt(x) + convertToInt(radius), convertToInt(y));
            ctx.closePath();
            ctx.fill();
        }
        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
};
