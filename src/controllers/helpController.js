// helpController.js

const helpModel = require('../models/helpModel');

// Fungsi untuk mendapatkan kategori bantuan
exports.getHelpCategories = async (req, res) => {
  try {
    const helpCategories = await helpModel.getHelpCategories();
    res.status(200).json({
      code: "200",
      status: "OK",
      message: "List of help categories retrieved successfully",
      data: helpCategories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: "500",
      status: "Internal Server Error",
      error: "Failed to retrieve help categories",
    });
  }
};

// Fungsi untuk mengirim pesan bantuan
exports.sendHelpMessage = async (req, res) => {
  try {
    const { userId, categoryId, message } = req.body;
    const newMessage = await helpModel.saveHelpMessage(userId, categoryId, message);
    res.status(201).json({
      code: "201",
      status: "Created",
      message: "Help message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      code: "400",
      status: "Bad Request",
      error: "Invalid request body",
    });
  }
};