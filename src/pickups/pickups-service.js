const PickupsService = {

  // retrieve all pickups from DB
  getAllPickups(knex) {
    return knex
      .select('*')
      .from('pickups');
  },

  // add new pickup to DB
  insertPickup(knex, newPickup) {
    return knex
      .insert(newPickup)
      .into('pickups')
      .returning('*')
      .then(rows => {
        return rows[0]
      });
  },

  // Get pickup info from DB
  getPickupById(knex, id) {
    return knex
      .from('pickups')
      .where('id', id)
      .first()
  },

    // Get pickup info from DB by userID
    getPickupByUserId(knex, userid) {
      return knex
        .from('pickups')
        .where('client', userid)
    },

  // delete pickup by ID
  deletePickup(knex, id) {
    return knex('pickups')
      .where({ id })
      .delete();
  }
};

module.exports = PickupsService;