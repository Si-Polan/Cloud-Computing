// authController.js
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel'); // Assuming you have a user model

const authController = {
  signup: async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
      // Save the user in the database
      const newUser = await UserModel.create({ fullname, email, password: hashedPassword });
      res.json({ message: 'User signed up successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find the user by email in the database
      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // TODO: Generate and send a token for authentication
      res.json({ message: 'User logged in successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Other authentication functions like resetPassword, verifyAccount, etc.

  editAccount: async (req, res) => {
    try {
      const { userId, newFullName, newPassword } = req.body;
      // Find the user by ID in the database
      const user = await UserModel.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update user details
      if (newFullName) {
        user.fullname = newFullName;
      }

      if (newPassword) {
        // Hash the new password before updating
        user.password = await bcrypt.hash(newPassword, 10);
      }

      // Save the updated user in the database
      await user.save();

      res.json({ message: 'User details updated successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = authController;
