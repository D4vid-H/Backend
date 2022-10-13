import path from "path";

const getRegister = (req, res) => {
  console.log("entre al getRegister");
  res.render(
    path.join(process.cwd(), "./src/views/register.ejs") /* { user } */
  );
};

const failLogin = (req, res) => {
  res.render(
    path.join(process.cwd(), "./src/views/failLogin.ejs") /* { user } */
  );
};

const getLogout = (req, res) => {
  const user = req.session?.user;
  if (user) {
    req.session.destroy((error) => {
      if (!error) {
        res.render(path.join(process.cwd(), "./src/views/logout.ejs"), {
          user,
        });
      } else {
        res.send({ status: "Logout Error", body: error });
      }
    });
  } else {
    return res.redirect("/api/");
  }
};

const getLogin = (req, res) => {
  res.render(path.join(process.cwd(), "./src/views/login.ejs"));
};

const getHome = (req, res) => {
  console.log("probando req.session");
  console.log(req.session.passport.username);
  console.log(req.session.passport.user);
  res.render(path.join(process.cwd(), "./src/views/home.ejs"));
};

const getUser = (req, res) => {
  const username = req.body.username;
  res.json(username);
};

export { getRegister, failLogin, getLogout, getLogin, getHome, getUser };
