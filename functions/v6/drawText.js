module.exports = {
    name: "$drawText",
    type: "djs",
    code: async (d) => {
        const canvaError = require("../../index.js").utils.canvaError;
        const data = d.util.aoiFunc(d);
        const [name = "canvas", text = "Text", x = "1", y = "1"] = data.inside.splits;

        if (d.data.canvases[name]) {
            if (Number(x), Number(y)) {
                const ctx = d.data.canvases[name].ctx;
                ctx.fillText(text, Number(x), Number(y));
            } else {
                return canvaError.newError(d, 'Position arguments.');
            }
        } else {
            return canvaError.newError(d, 'Canvas with this name not found.');
        };

        return {
            code: d.util.setCode(data),
            data: d.data
        };
    }
}