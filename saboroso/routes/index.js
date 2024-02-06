var conn = require('./../inc/db')
var express = require('express');
var menus = require('./../inc/menus')
var reservations = require('./../inc/reservations')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results =>{

    res.render('index', {
      title: 'Restaurante Saboroso!',
      menus: results,
      isHome: true
    });
  });

  

});

router.get('/contacts', function(req, res, next){

  reservations.render(req, res);

});
router.get('/menus', function(req, res, next){

  menus.getMenus().then(results =>{

    res.render('menus', {
    title: 'menu - Restaurante Saboroso',
    background: 'images/img_bg_1.jpg',
    h1: 'Saboreie nosso Menu!',
    menus:results

    })
  })

  
  
});
router.get('/reservations', function(req, res, next){

  res.render('reservations', {
    title: 'reservas - Restaurante Saboroso',
    background: 'images/img_bg_2.jpg',
    h1: 'Reserve uma messa'
  })
  
});

router.post('/reservations', function(req, res, next){

  if (!req.body.name) {
    reservations.render(req, res, "digite o nome")
  } else if (!req.body.email){
    reservations.render(req, res, "digite o email")
  } else if (!req.body.people){
    reservations.render(req, res, "selecione o número de pessoas")
  } else if (!req.body.date){
    reservations.render(req, res, "selecione a data")
  } else if (!req.body.time){
    reservations.render(req, res, "selecione a hora")
  } else {

    reservations.save(req.body).then(results => {

      req.body = {};
      reservations.render(req, res, null,  "reserva realizada com sucesso!")

    }).catch(err=>{

      reservations.render(req, res, err)

    })
  }

  
  
});
router.get('/services', function(req, res, next){

  res.render('services', {
    title: 'serviços - Restaurante Saboroso',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir'
  })
  
})

module.exports = router;
