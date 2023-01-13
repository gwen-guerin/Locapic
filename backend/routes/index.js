var express = require('express');
var router = express.Router();

require('../models/connection');
const Place = require('../models/places');


router.post('/places', (req, res) => {
    const { nickname, name, latitude, longitude } = req.body
    // console.log(nickname, name, latitude, longitude);
    const newPlace = new Place({ nickname, name, latitude, longitude })
    
    newPlace.save().then(() => {
        res.json({ result: true });
      });
});

router.get('/places/:nickname', (req, res) => {
    User.findOne({ nickname: req.params.nickname}).then(data => {
        if (data) {
            res.json({ result: true, places: [{ nickname, name, latitude, longitude : req.params}]})
        } else {
            res.json({ result: false, error: 'User not found'})
        }
    })
})

router.delete('/places', (req, res) => {
    const { nickname, name } = req.body;
   
    Place.deleteOne({ nickname, name }).then((deletedDoc) => {
      if (deletedDoc.deletedCount > 0) {
        res.json({ result: true });
      } else {
        res.json({ result: false, error: 'Place not found' });
      }
    });
   });

module.exports = router;