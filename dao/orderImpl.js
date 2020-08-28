const { v4: uuid } = require('uuid');
const constants = require('../constant');

class Order {
  constructor(knex) {
    this.knex = knex;
  }

  async createOrder(data) {
    try {
      const { items, userId, deliveryAddress } = data;
      const ret = await this.knex.transaction(async (txn) => {
        const order = {
          userId,
          deliveryAddress,
          id: uuid(),
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
        await txn('OrederItem').insert(orderItems);
        return { ...order, orderItems };
      });
      return ret;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
module.exports = Order;
