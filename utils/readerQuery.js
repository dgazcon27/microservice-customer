var log = require("log4js").getLogger("readerquery");
const PropertiesReader = require("properties-reader");

function getProperties(fileProperties, queryProperty) {
  let properties = PropertiesReader(fileProperties)
  let result = ``;
    try {
      result = properties.get(queryProperty);
    } catch (error) {
      log.error(error);
    }
    return result;
}

function getDbConf() {
  properties = PropertiesReader('./public/database.properties');
  let result = ``;

  try {
    let host = properties.get("db.host");
    let user = properties.get("db.user");
    let password = properties.get("db.password");
    result = { host, user, password,}

  } catch (error) {
    log.error(error);
  }
  return result;
}

module.exports = {
    getDbConf,
    getProperties
}