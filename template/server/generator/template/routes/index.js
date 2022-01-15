var express = require('express');
var router = express.Router();
const fs = require('fs')
const fse = require('fs-extra');
const { exec } = require('child_process');

module.exports = router;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ping', function (_, res) {
  res.sendStatus(200);
});

router.post('/modify-resources', function (req, res) {

  const newResources = req.body.resources;

  const configPath = '../generator/config/config.json';

  const config = require(configPath);
  const newResourcesMap = {}; 

  newResources.forEach((resource) => {
    const newAttributes = new Set();
    resource.attributes.forEach((attribute) => newAttributes.add(JSON.stringify(attribute)));
    newResourcesMap[resource.name] = newAttributes;
  });

  // Verify if all old resources and attributes are still part of the new resource specification (delete op not supported yet)
  for (let index = 0; index < config.resources.length; index++) {
    const resource = config.resources[index];
    if (resource.name in newResourcesMap) {
      resource.attributes.forEach((attribute) => {
        if (!(newResourcesMap[resource.name].has(JSON.stringify(attribute)))) {
          console.error("Attribute was deleted! Maybe order is wrong!");
          return res.sendStatus(501);
        }
      })
    } else {
      console.error("Resource was deleted!");
      return res.sendStatus(501);
    }
  }

  // Replace old resources
  config.resources = newResources;
  fs.writeFile('generator/config/config.json', JSON.stringify(config), (err) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    exec('cd generator && npm start', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.sendStatus(500);
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);

      // Move the new generated files into the server directory
      try {
        fse.copySync('generator/output/models', 'models');
        fse.copySync('generator/output/routes', 'routes');
        fse.copySync('generator/output/app.js', 'app.js');
      } catch (error) {
        console.error(error);
      }

      res.sendStatus(200);

      process.exit(1);
    });
  });
});

router.post('/modify-pages', function (req, res) {

  const newPages = req.body.pages;

  const configPath = '../generator/config/config.json';

  const config = require(configPath);

  // Replace old pages
  config.website.pages = newPages;
  fs.writeFile('generator/config/config.json', JSON.stringify(config), (err) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    exec('cd generator && npm start', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.sendStatus(500);
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);

      // Move the new generated files into the server directory
      try {
        fse.copySync('generator/output/routes', 'routes');
        fse.copySync('generator/output/app.js', 'app.js');
      } catch (error) {
        console.error(error);
      }

      res.sendStatus(200);

      process.exit(1);
    });
  });
});