module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl; ///GUEST SESSION NOW DESTROYED IN NEW PASSPORT VERSION, WATCH https://www.youtube.com/watch?v=i0q8YCCffoM, TO FIX.
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};
