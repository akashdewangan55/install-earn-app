
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ balance: user.balance });
});

router.post('/withdraw', async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (user.balance < 50) {
    return res.status(400).json({ message: 'Minimum ₹50 required to withdraw' });
  }

  user.balance -= 50;
  await user.save();

  const txn = new Transaction({ userId, amount: -50, type: 'withdraw' });
  await txn.save();

  res.json({ message: '₹50 withdrawn successfully', balance: user.balance });
});

module.exports = router;
