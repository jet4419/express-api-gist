module.exports = {
	userLogin: async (req, res, next) => {
		try {
			const { email, password } = req.body;

			console.log('email:', email);
			console.log('password:', password);

			next({ email, password });
		} catch (error) {
			next(error);
		}
	},
};
