const { v4: uuid } = require('uuid');
const constant = require('../../constant');

const genMenu = () => {
  const menus = [];
  for (let i = 1; i <= 10; i += 1) {
    menus.push({
      id: uuid(),
      name: `Dummy-${i}`,
      description: `Lorem Ipsum is simply dummy text of the printing 
      and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer 
      took a galley of type and scrambled`,
      price: 150 + i * 10,
      status: constant.menuStatus.IN_STOCK,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return menus;
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Menu').del()
    .then(() => knex('Menu').insert(genMenu()));
};
