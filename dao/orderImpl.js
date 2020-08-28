const shortUUID = require('short-uuid');
const { v4: uuid } = require('uuid');
const constants = require('../constant');

class Order {
  constructor(knex) {
    this.knex = knex;
  }

  async findOrder(orderId) {
    const order = await this.knex('Order as O')
      .join('OrderItem as OI', 'OI.orderId', '=', 'O.id')
      .join('Menu as M', 'M.id', '=', 'OI.menuId')
      .where('O.id', '=', orderId);
    const { deliveryAddress, createdAt } = order[0];
    let total = 0;
    const items = [];
    order.forEach((o) => {
      const { price, name, quantity } = o;
      total += price;
      items.push({ price, name, quantity });
    });
    return {
      total,
      deliveryAddress,
      createdAt,
      orderId,
      items,
    };
  }

  async createOrder(data) {
    try {
      const { items, userId, deliveryAddress } = data;
      const ret = await this.knex.transaction(async (txn) => {
        const order = {
          userId,
          deliveryAddress,
          id: shortUUID.generate(),
          status: constants.orderStatus.IN_QUEUE,
          createdAt: new Date(),
        };
        await txn('Order').insert(order);
        const orderItems = items.map((item) => ({
          id: uuid(),
          orderId: order.id,
          menuId: item.menuId,
          quantity: item.quantity,
        }));
        await txn('OrderItem').insert(orderItems);
        return { ...order, orderItems };
      });
      return ret;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
module.exports = Order;
