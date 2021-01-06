const RecyclablesService = {

  // retrieve all recyclables from DB
  getAllRecs(knex) {
    return knex
      .select('*')
      .from('recyclables');
  },

  // Get the user's info from DB
  insertRec(knex, newRec) {
    return knex
      .insert(newRec)
      .into('recyclables')
      .returning('*')
      .then(rows => {
        return rows[0]
      });
  },

  // Compare passwords
  deleteRec(knex, id) {
    return knex('recyclables')
      .where({ id })
      .delete();
  }
}

module.exports = RecyclablesService;