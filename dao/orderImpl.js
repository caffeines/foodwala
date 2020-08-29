const shortUUID = require('short-uuid');
const { v4: uuid } = require('uuid');
const constants = require('../constant');

class Order {
  constructor(knex) {
    this.knex = knex;
  }

  async findOrder(orderId) {
    const ret = await this.knex.transaction(async (txn) => {
      const [order] = await txn('Order').select('*').where({ id: orderId });
      const items = await txn('OrderItem as OI')
        .join('Menu as M', 'M.id', '=', 'OI.menuId')
        .where('OI.orderId', '=', orderId);

      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { ...order, total, items };
    });
    return ret;
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

        const orderdItems = await txn('OrderItem as OI')
          .join('Menu as M', 'M.id', '=', 'OI.menuId')
          .where('OI.orderId', '=', order.id);

        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return { ...order, total, items: orderdItems };
      });
      return ret;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
module.exports = Order;
