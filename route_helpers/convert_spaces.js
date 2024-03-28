const convertSpaces = (str) => {
  return str.split(" ").join("%20");
};

module.exports = { convertSpaces };
