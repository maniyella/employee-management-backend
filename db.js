let db;

module.exports = {
  setDb: (database) => {
    db = database;
  },
  getDb: () => db
};