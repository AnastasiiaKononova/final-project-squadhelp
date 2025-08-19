const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '../..', 'config/mongoConfig.json');
const config = require(configPath)[ env ];

mongoose.connect(
  `mongodb://${ config.host }:${ config.port }/${ config.database }`,
  { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

  });

mongoose.set('debug', env === 'development');

const models = {};
const basename = path.basename(__filename);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    models[model.modelName] = model;
  });

module.exports = models;
