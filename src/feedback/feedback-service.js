const FeedbackService = {

  // retrieve all feedback from DB
  getAllFeedback(knex) {
    return knex
      .select('*')
      .from('feedback');
  },

  // add new feedback to DB
  insertFeedback(knex, newFeedback) {
    return knex
      .insert(newFeedback)
      .into('feedback')
      .returning('*')
      .then(rows => {
        return rows[0]
      });
  },

  // Get feedback info from DB
  getFeedbackById(knex, id) {
    return knex
      .from('feedback')
      .where('id', id)
      .first()
  },

  // delete feedback by ID
  deleteFeedback(knex, id) {
    return knex('feedback')
      .where({ id })
      .delete();
  }
};

module.exports = FeedbackService;