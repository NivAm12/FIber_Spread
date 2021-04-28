import { Router } from 'express';
const router = Router();
import { authenticate } from 'passport';
import User, { register } from '../models/user';

//GET USER
router.get("/user", (req, res) => {
    res.send({user: req.user});
});

//LOGIN
router.post('/login', (req, res, next) => {
    authenticate('local', (err, user) => {
      if (err) { return next(err); }
      if (!user) { return res.status(500).send({ message: "Invalid username or password!"}) }
      req.logIn(user, (err) =>{
        if (err) { return next(err); }
        return res.send({user: req.user, message: "Successfully logged in!"})
      });
    })(req, res, next);
  });

//LOGOUT
router.get('/logout', (req,res) => {
    try {
        req.logout();
        res.send({ message: "Successfully logged out!"})
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
})

// REGISTER
router.post('/register', async (req,res) => {
  try {
    const { username, password } = req.body
    const user = new User({ username })
    await register(user, password);
    res.send({user: req.user, message: "Successfully signed up"})
  } catch (err) {
      return res.status(500).send({ message: err.message })
  }
})

export default router;