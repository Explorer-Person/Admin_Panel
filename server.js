const bp = require("body-parser");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const express = require("express");
const orderRoutes = require("./routes/orderRoutes");
const handleErrors = require("./errors/handleErrors");
const sendError = require("./errors/sendError");
const cors_mw = require("./middlewares/app/cors_mw");
const auth = require("./auth/authRoute/authRoutes");
const session_mw = require("./middlewares/app/sessions_mw");
const userRoutes = require("./routes/userRoutes");
const isAuthUser = require("./middlewares/auth/isAuthUser_mw");
const auth_mw = require("./middlewares/auth/auth_mw");
const path = require("path");
const isAuthSuperUser = require("./middlewares/auth/isAuthSuperUser_mw");
const generateCsrf_mw = require("./middlewares/app/generate_csrf_mw");
const verifyCsrf_mw = require("./middlewares/app/verify_csrf_mw");

const app = express();

app.use(cors_mw);

app.use(session_mw);

app.use(helmet());

app.use(express.json());
app.use(cookieParser(process.env.SESS_SECRET));
app.use(bp.urlencoded({ extended: true }));

app.use(auth_mw);
app.use(generateCsrf_mw);

app.use("/admin", verifyCsrf_mw, auth);
app.use("/admin", verifyCsrf_mw, isAuthUser, orderRoutes);
app.use("/admin/management", verifyCsrf_mw, isAuthSuperUser, userRoutes);

if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "production") {
  app.disable("etag");
  app.use((req, res, next) => {
    if (req.url.endsWith(".js")) {
      res.type("application/javascript");
      res.sendFile(path.join(__dirname, "client/dist/assets", req.path));
    }
    next();
  });
  app.use(express.static(path.join(__dirname, "client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist/index.html"));
  });
}

app.use("*", (req, res, next) =>
  sendError("Page Not Found", "fail", 404, next)
);

app.use(handleErrors);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server Connection Provided by PORT: ${PORT}`);
});
