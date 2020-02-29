// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// router.get('/Oauth', function (req, res) {
//     res.json({message: "Some Oauth"})
// })
// Import contact controller
var contactController = require('./contactController');
var OauthController = require('./OauthController');
var AuthenticationController = require('./Controllers/AuthenticateController');
var ImageUploadController = require('./Controllers/ImageUploadController');
var ExcelGenerateController = require('./Controllers/ExcelGenerateController');
var WeatherController = require('./Controllers/WeatherController');
// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new)
    //.get(contactController.Oauth);

// router.route('/Oauth/:some_id')
// .get(OauthController.Oauth)

router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);


router.route('/Email')
.post(contactController.Email)

router.route('/OAuth/Redirect')
.get(OauthController.Oauth)


router.route('/register')
.post(AuthenticationController.register)

router.route('/login123')
.post(AuthenticationController.login)

router.route('/forgot')
.post(AuthenticationController.forgot)

router.route('/verify')
.post(AuthenticationController.verify)

router.route('/reset')
.post(AuthenticationController.reset)

router.route('/upload-image')
.post(ImageUploadController.myimages)

router.route('/excel-download')
.post(ExcelGenerateController.excel)

// Export API routes
module.exports = router;