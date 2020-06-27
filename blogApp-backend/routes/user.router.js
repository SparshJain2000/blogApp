const router = require('express').Router(),
	passport = require('passport'),
	User = require('../models/user.model');

//===========================================================================
//get all users
router.route('/').get((req, res) => {
	User.find()
		.then((users) => {
			res.json({
				users : users.map((user) => {
					return { username: user };
				})
			});
		})
		.catch((err) => res.status(400).json({ err: err }));
});
//===========================================================================
//Sign up route
router.post('/', (req, res) => {
	const user = new User({
		username : req.body.username,
		email    : req.body.email
	});
	User.register(user, req.body.password)
		.then((user) => {
			passport.authenticate('local')(req, res, () => {
				res.json({ user: user });
			});
		})
		.catch((err) => res.status(400).json({ err: err }));
});
//===========================================================================
//Login route
// router.post("/login", passport.authenticate("local"), (req, res) => {
//     res.json({ user: req.user, message: `${req.user.username} Logged in` });
// });

router.post('/login', function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		console.log(info);
		if (err) {
			return res.status(400).json({ err: err });
		}
		if (!user) {
			return res.status(400).json({ err: info });
		}
		req.logIn(user, function (err) {
			if (err) {
				return res.status(400).json({ err: err });
			}
			return res.json({ user: req.user, message: `${req.user.username} Logged in` });
		});
	})(req, res, next);
});
//===========================================================================
//Logout route
router.get('/logout', (req, res) => {
	req.logout();
	res.json({ message: 'Logged Out' });
});
router.get('/current', (req, res) => {
	res.json({ user: req.user });
});
module.exports = router;

/*
    "username":"sparshjain",
    "password":"sparsh@123"

    "title": "Second Blog",
    "image": "",
    "body": "this is second blog"

*/
