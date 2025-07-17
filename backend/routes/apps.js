
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const apps = [
  { id: 'whatsapp', name: 'WhatsApp' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'telegram', name: 'Telegram' },
  { id: 'snapchat', name: 'Snapchat' }
];

router.get('/', (req, res) => {
  res.json(apps);
});

router.post('/install', async (req, res) => {
  const { userId, appId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (user.installedApps.includes(appId)) {
    return res.status(400).json({ message: 'App already installed' });
  }

  user.installedApps.push(appId);
  user.balance += 5;
  await user.save();

  const txn = new Transaction({ userId, amount: 5, type: 'install' });
  await txn.save();

  res.json({ message: 'App installed and ₹5 credited', balance: user.balance });
});

module.exports = router;
