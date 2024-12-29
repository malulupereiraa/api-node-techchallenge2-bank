const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Register new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'Usuário Já Existe!' });

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuário Cadastrado com Sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao Cadastrar Usuário' });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      total: users.length,
      result: users
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single user by ID
 const getUserByID = async (req, res) => {
   const { id } = req.params;   
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não Encontrado...' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single user by email
 const getUserByEmail = async (req, res) => {
   const { email } = req.params;
   console.log(email)
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não Encontrado...' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não Encontrado...' });
    }
    res.status(200).json({
      message: 'Usuário Atualizado com Sucesso!',
      result: updatedUser
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não Encontrado...' });
    }
    res.status(200).json({ message: 'Usuário Apagado com Sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Dados Inválidos!' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Dados Inválidos!' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
      res.json({
        message: 'Usuário Autenticado com Sucesso!',
        result: {
          token
        }
      });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao Realizar Login!' });
  }
};

// Get Token
const getToken = (token) =>{
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded
    } catch (error) {
        return null
    }
}

module.exports = { registerUser, getUsers, getUserByID, getUserByEmail, updateUser, deleteUser, loginUser, getToken };
