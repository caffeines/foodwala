exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(() =>
      // Inserts seed entries
      // eslint-disable-next-line implicit-arrow-linebreak
      knex('table_name').insert([
        { id: 1, colName: 'rowValue1' },
        { id: 2, colName: 'rowValue2' },
        { id: 3, colName: 'rowValue3' },
      ]));
};
