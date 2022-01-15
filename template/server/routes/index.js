var express = require('express');
var router = express.Router();

module.exports = router;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/modifyResources', function (req, res) {

  const newResources = req.body.resources;

  // comparar com config atual

  const configPath = '../../generator/config/config.json';

  const config = require(configPath);
  const newResourcesMap = {}; // resource_name -> set of attributes

  newResources.forEach((resource) => {
    const newAttributes = new Set();
    resource.attributes.forEach((attribute) => newAttributes.add(attribute));
    newResourcesMap[resource.name] = newAttributes;
  });

  // Verify if all old resources and attributes are still part of the new resource specification (delete op not supported yet)
  config.resources.forEach((resource) => {
    if (resource.name in newResourcesMap) {
      resource.attributes.forEach((attribute) => {
        if (!(attribute in newResources[resource.name])) {
          return res.sendStatus(501);
        }
      })
    } else {
      return res.sendStatus(501);
    }
  });

  // Replace old resources
  config.resources = newResources;
  fs.writeFile(configPath, JSON.stringify(config), (err) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  });

  // Chamar generator para Generate route/model files  

  // append -> mv 
  fs.appendFile(`./routes/index.js`, route, function (err) {
    if (err) {
      res.send(console.error(err))
      return;
    }
  });
  res.send("Changed");
});