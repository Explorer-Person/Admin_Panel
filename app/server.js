const bp = require("body-parser");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const express = require("express");
const orderRoutes = require("../routes/orderRoutes");
const handleErrors = require("../errors/handleErrors");
const sendError = require("../errors/sendError");
const cors_mw = require("../middlewares/app/cors_mw");
const csrf_mw = require("../middlewares/app/csrf_mw");
const auth = require("../auth/authRoute/authRoutes");
const session_mw = require("../middlewares/app/sessions_mw");
const userRoutes = require("../routes/userRoutes");
const isAuthUser = require("../middlewares/auth/isAuthUser_mw");
const auth_mw = require("../middlewares/auth/auth_mw");
const path = require("path");
const isAuthSuperUser = require("../middlewares/auth/isAuthSuperUser_mw");

const app = express();

app.use(cors_mw);

app.use(session_mw);

app.use(helmet());

app.use(express.json());
app.use(cookieParser(process.env.SESS_SECRET));
app.use(bp.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/dist")));


  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist/index.html"));
  });
}

app.use("/admin", auth);

app.use(csrf_mw);
app.use(auth_mw);

app.use("/admin", isAuthUser, orderRoutes);
app.use("/admin/management", isAuthSuperUser, userRoutes);


app.use("*", (req, res, next) =>
  sendError("Page Not Found", "fail", 404, next)
);

app.use(handleErrors);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server Connection Provided by PORT: ${PORT}`);
});

