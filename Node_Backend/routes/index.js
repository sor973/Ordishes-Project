const express = require('express');
const router = express.Router();
const apiRouter = require("./api");
/* Edit Here of you want the script to render from React Build.
You need to run `npm run build` on react frontend. */
const EnableRenderFromBuild = false;

router.use('/api',apiRouter);

// Host React with ExpressJS
if(EnableRenderFromBuild){
    const path = require("path");
    router.use(express.static(path.join(__dirname, "..", "..", "React_Frontend", "build")));
    router.use((req, res,) => {
        res.sendFile(path.join(__dirname, "..", "..", "React_Frontend", "build", "index.html"));
    });
}

module.exports = router;
