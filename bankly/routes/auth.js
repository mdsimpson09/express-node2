/** Auth-related routes. */

const User = require('../models/user');
const express = require('express');
const router = express.Router();
const createTokenForUser = require('../helpers/createToken');


/** Register user; return token.
 *
 *  Accepts {username, first_name, last_name, email, phone, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 */

router.post('/register', async function(req, res, next) {
  try {
    const { username, password, first_name, last_name, email, phone } = req.body;

    // Check if username is already taken
    const existingUser = await User.get(username);
      if (existingUser) {
        throw new ExpressError(`There already exists a user with username '${username}'`, 400);
        }

  // If not taken, register the user
    let user = await User.register({username, password, first_name, last_name, email, phone});
    const token = createTokenForUser(username, user.admin);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
}); // end

/** Log in user; return token.
 *
 *  Accepts {username, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */

// router.post('/login', async function(req, res, next) {
//   try {
//     const { username, password } = req.body;
//     let user = User.authenticate(username, password);

//   // Perform a bcrypt comparison even if the user doesn't exist
//     await bcrypt.compare("dummy", user.password);

//     const token = createTokenForUser(username, user.admin);
//     return res.json({ token });
//   } catch (err) {
//     return next(err);
//   }
// }); // end

router.post('/login', async function(req, res, next) {
  try {
    const { username, password } = req.body;

    // Retrieve user data by username
    const user = await User.authenticate(username, password);

    // Use bcrypt's constant-time comparison for password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      // Password is valid, generate and return a token
      const token = createTokenForUser(username, user.admin);
      return res.json({ token });
    } else {
      // Password is invalid, return a 401 Unauthorized response
      throw new ExpressError('Cannot authenticate', 401);
    }
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
