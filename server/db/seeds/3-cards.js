exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cards')
    .then(function () {
      // Inserts seed entries
      return knex('cards').insert([
        {
          id: 1,
          category_id: 1,
          name: 'save one hundred dollars every week',
          description: 'make sure to keep it in savings account',
          period: 604800000,
          location: 'everywhere',
          completed: false,
          total_count: 0,
          comp_count: 0,
        },
        // {
        //   id: 2,
        //   category_id: 2,
        //   name: 'drink water',
        //   description: 'drink 2L of water every day',
        //   period: 86400000,
        //   location: 'everywhere',
        //   completed: false,
        //   total_count: 0,
        //   comp_count: 0,
        // },
        // {
        //   id: 3,
        //   category_id: 2,
        //   name: 'eat meals',
        //   description: 'eat at least two meals every day',
        //   period: 86400000,
        //   location: 'everywhere',
        //   completed: false,
        //   total_count: 0,
        //   comp_count: 0,
        // },
      ])
    })
}
