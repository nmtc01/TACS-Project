const express = require('express');
const router = express.Router();

// #IMPORT_MODEL -> TODO
const { User } = require('../models/user');

// #ROUTES -> TODO
/* GET users list. */
router.get('/', async function(_, res) {
  res.send(await User.find({}));
});

/* GET user by id */
router.get('/:id', async function(req, res) {
  try {
    res.send(await User.findOne({ 'id': req.params.id }));
  }
  catch(err) {
    console.log(err);
  }
});

/* POST create user */
router.post('', function (req, res) {
  const user_data = {
    id: req.body.id,
    name: req.body.name,
    address: req.body.address
  };

  User.create(user_data, function (err, user) {
    if (err) {
      console.log(err);
      return res.send({ message: '500 - Server Error', errors: [] });
    }

    return res.send({ id: user.id, name: user.name, address: user.address });
  });
})

/* DELETE user by id */
router.delete('/:id', async function(req, res) {
  try {
    const n = await User.deleteOne({ 'id': req.params.id });
    return res.send(`Deleted successful: ${n}`);
  }
  catch(err) {
    console.log(err);
  }
})

module.exports = router;