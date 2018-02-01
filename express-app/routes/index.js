const express = require('express'),
      router = express.Router();

//GET home page.
router.get('/', function(req, res) {
  res.render('index', {title: 'Express'});
});

router.get('/student', function(req, res) {
  res.send('hello');
  console.log('helo again router');
});

module.exports = router;
