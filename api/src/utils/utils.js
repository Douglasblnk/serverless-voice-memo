const isObject = (obj) => (
  typeof obj === 'object' && obj === Object(obj) && !Array.isArray(obj)
)

const __validateParams = (event) => {
  if (!isObject(event)) throw new Error('Event is not an object');
}

const __mountPathList = (path) => {
  if (typeof path !== 'string') throw new Error('path is not a string')
  return path.replace(/\[(\d+)]/g, '.$1').split('.')
};

const get = (obj, path, def) => {
  try {
    if (!isObject(obj)) throw new Error('object is not accepted')

    const pathList = __mountPathList(path);

    return (pathList.every(step => (obj = obj[step]) !== undefined)) ? obj : def;
  } catch (err) {
    return (def !== undefined) ? def : undefined;
  }
}

const getBody = (event, defaultValue = null) => {
  try {
    __validateParams(event);
    if (typeof event.body === 'string') return JSON.parse(event.body);

    if (!isObject(event.body)) return defaultValue;

    return event.body;
  } catch (err) {
    return defaultValue;
  }
}

module.exports = {
  get,
  getBody,
  isObject
}