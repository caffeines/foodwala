const knex = require('../lib/knexhelper').getKnexInstance();
const errorCodes = require('../constant/errorCode');
const orderImpl = require('../dao/orderImpl');

const order = {
  /**
   * @api {post} /order/ Create new order
   * @apiName Create order
   * @apiGroup order
   * @apiParam {String} deliveryAddress  Delivery address.
   * @apiParam {Array} items             Array of menu items.
   * @apiParamExample {json} Request
   * {
   *    "deliveryAddress": "Bashundhara R/A, Dhaka",
   *    "items": [
   *      {
   *        "menuId": "d4c14dec-abe9-4a9a-8517-2efb7f17afcb",
   *        "quantity": 2
   *      }
   *    ]
   *  }
   * @apiSuccessExample {json} Response-Success
   * {
   *    "title": "Order created successfully",
   *    "status": "200",
   *    "data": {
   *      "userId": "9c9a0c29-b575-4bd2-98ac-6f5704501554",
   *      "deliveryAddress": "Bashundhara R/A, Dhaka",
   *      "id": "584026b2-9471-487a-8332-58f47426c7e0",
   *      "status": "inQueue",
   *      "createdAt": "2020-08-28T17:08:20.604Z",
   *      "orderItems": [{
   *        "id": "ccef3b2a-bd64-48fd-9f4a-ac9b57818e64",
   *        "orderId": "584026b2-9471-487a-8332-58f47426c7e0",
   *        "menuId": "d4c14dec-abe9-4a9a-8517-2efb7f17afcb",
   *        "quantity": 2
   *      }]
   *    }
   * }
   * @apiSuccessExample {json} Unauthorized
   * {
   *    "title": "Not logged in",
   *    "status": "401",
   *    "code": 401003
   * }
   * @apiSuccessExample {json} Bad request
   * {
   *    "title": "Invalid request data",
   *     "status": "400",
   *     "errors": [
   *      {
   *       "value": "[]",
   *       "msg": "Must be an array of minimum 1 menu item",
   *       "param": "items",
   *       "location": "body"
   *      }
   *    ],
   *    "code": 400005
   * }
   *
   */
  createOrder: async (req, res) => {
    try {
      const orderRepo = new orderImpl(knex);
      const ordr = await orderRepo.createOrder({ ...req.body, userId: req.user.id });
      res.ok({
        title: 'Order created successfully',
        data: ordr,
      });
    } catch (err) {
      console.log(err);
      res.serverError({
        title: 'Something went wrong',
        code: errorCodes.SERVER_ERROR,
      });
    }
  },
};
module.exports = order;
