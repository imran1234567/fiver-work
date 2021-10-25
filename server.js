const express = require("express");
const dotEnv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const basicAuth = require("basic-auth");
const fs = require("fs");

var app = express();
var main = require("./router/index");
dotEnv.config({ path: "./config/config.env" });
global.appRoot = path.resolve(__dirname);

// Http authentication
let auth = function (req, res, next) {
  let user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set("WWW-Authenticate", "Basic realm=Authorization Required");
    res.sendStatus(401);
    return;
  }
  if (
    user.name === process.env.HTTPAuthUser &&
    user.pass === process.env.HTTPAuthPassword
  ) {
    next();
  } else {
    res.set("WWW-Authenticate", "Basic realm=Authorization Required");
    res.sendStatus(401);
    return;
  }
};

if (process.env.ENVIRONMENT === "dev") {
  app.use(morgan("dev"));
  let options = {
    customCss: ".swagger-ui .models { display: none }",
  };
  let mainSwaggerData = JSON.parse(fs.readFileSync("swagger.json"));
  mainSwaggerData.host = process.env.HOST;
  mainSwaggerData.basePath = process.env.BaseApiUrl;

  const modules = "./app/modules";
  fs.readdirSync(modules).forEach((file) => {
    if (fs.existsSync(modules + "/" + file + "/swagger.json")) {
      const stats = fs.statSync(modules + "/" + file + "/swagger.json");
      const fileSizeInBytes = stats.size;
      if (fileSizeInBytes) {
        let swaggerData = fs.readFileSync(
          modules + "/" + file + "/swagger.json"
        );
        swaggerData = swaggerData
          ? JSON.parse(swaggerData)
          : { paths: {}, definitions: {} };
        mainSwaggerData.paths = {
          ...swaggerData.paths,
          ...mainSwaggerData.paths,
        };
        mainSwaggerData.definitions = {
          ...swaggerData.definitions,
          ...mainSwaggerData.definitions,
        };
      }
    }
  });
  app.get("/api/docs", auth, (req, res, next) => {
    next();
  });
  let swaggerDocument = mainSwaggerData;
  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
  );
}

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", main);
app.use(express.json());

app.listen(process.env.PORT || 5000, () =>
  console.log(
    `${process.env.ENVIRONMENT} server is running at ${process.env.PORT}`
  )
);
