function createUserId() {
  let id = 0;
  function incrementId() {
    id++;
    return id;
  }
  return incrementId;
}

module.exports = {
  createUserId,
};
