const canvaError = require("../../index.js").utils.canvaError;
const parser = require("../../index.js").utils.parser;
const { loadImage, GlobalFonts, createCanvas } = require("@napi-rs/canvas");
const getData = require("../../index.js").getData;
const fs = require("fs");
const nodepath = require("path");

function convertToInt(str) {
    const number = parseFloat(str);
    if (isNaN(number)) {
        return 0;
    }
    return number;
};

function onEmpty(somestr, ifempty) {
    if (somestr.length === 0) {
        return ifempty;
    } else {
        return this.toString();
    }
}

let loadedFonts = parser.loadedFonts;

String.prototype.onEmpty = function (ifempty) {
    if (this.trim().length === 0) {
        return ifempty;
    } else {
        return this.toString();
    }
};

String.prototype.unescape = function () {
    if (this.trim().length === 0) return "";

    var result = this
        .replace(/&COLON&/g, ":")
        .replace(/&BR&/g, "{")
        .replace(/&BL&/g, "}");

    return result;
};

String.prototype.escape = function () {
    if (this.trim().length === 0) return "";

    var result = this
        .replace(/:/g, "&COLON&")
        .replace(/{/g, "&BR&")
        .replace(/}/g, "&BL&");

    return result;
};

module.exports = {
    name: "$canvasBuilder",
    type: "djs",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        const cats = data.inside.splits || [];

        if (cats.length === 0) return;

        for (var cat of cats) {
	let fishes = require("../../index.js").utils.parser.CanvasBuilderParserFishes;

            let parsed = await parser.catParser(cat);

            if (!parsed) return;
            let settings = parsed.find(fish => fish.name === "settings")
            if (!settings) return canvaError.newError(d, `No settings option.`);
            if (!d.data.canvases) d.data.canvases = {};

            let [cname = "canvas", w = "512", h = "512"] = settings.params;

            if (!cname || typeof cname !== 'string' || cname.trim().length === 0) cname = "canvas";
            if (!w || typeof w !== 'string' || w.trim().length === 0) w = "512";
            if (!h || typeof h !== 'string' || h.trim().length === 0) h = "512";

            /*
            cname = onEmpty(cname, "canvas");
            w = onEmpty(w, "512");
            h = onEmpty(h, "512");
            */
            if (!parseFloat(w) || !parseFloat(h)) return canvaError.newError(d, `Invalid size parameter`);

            let canvas = await createCanvas(parseFloat(w), parseFloat(h))
            let canv = {
                canvas: canvas,
                ctx: canvas.getContext("2d")
            };
            
            if (d.data.canvases[cname]) canv = d.data.canvases[cname];
            d.data.canvases[cname] = canv;

            for (var fish of parsed) {
                if (fish && fish.name && typeof fish.name === "string")
                if (fishes[fish.name.toLowerCase()])

                await fishes[fish.name.toLowerCase()]({
                    canv: (d.data.canvases[cname]),
                    d,
                    data,
                    fish: fish,
                    cat,
                    cats,
                    settings,
                    dir: __dirname
                });
            };
        };

        return {
            code: d.util.setCode(data)
        };
    }
}