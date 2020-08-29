const knex = require('../lib/knexhelper').getKnexInstance();
const errorCodes = require('../constant/errorCode');
const OrderImpl = require('../dao/orderImpl');
const taskEmitter = require('../queue/taskEmitter');
const render = require('../template/renderOrder');

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
   *      "id": "vX2cqvsue9m1AzuKaswE1q",
   *      "status": "inQueue",
   *      "createdAt": "2020-08-28T17:08:20.604Z",
   *      "orderItems": [{
   *        "id": "ccef3b2a-bd64-48fd-9f4a-ac9b57818e64",
   *        "orderId": "vX2cqvsue9m1AzuKaswE1q",
   *        "menuId": "d4c14dec-abe9-4a9a-8517-2efb7f17afcb",
   *        "quantity": 2,
   *        "name": "Dummy-1",
   *        "status": "inStock",
   *        "description": "Lorem Ipsum is simply...a galley of type and scrambled",
   *        "price": 160,
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
      const orderRepo = new OrderImpl(knex);
      let ordr = await orderRepo.createOrder({ ...req.body, userId: req.user.id });
      ordr = await orderRepo.findOrder(ordr.id);
      Object.freeze(ordr);
      const body = render(ordr);
      const email = {
        body,
        subject: 'Order Confirmation',
        to: req.user.username,
      };
      taskEmitter(email);
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
  /**
   * @api {get} /order/:orderId Order details by id
   * @apiName Order details by id
   * @apiGroup order
   * @apiParam {String} orderId  Valid order id.
   * @apiSuccessExample {json} Response-Success
   * {
   *    "status": "200",
   *    "data": {
   *      "userId": "9c9a0c29-b575-4bd2-98ac-6f5704501554",
   *      "deliveryAddress": "Bashundhara R/A, Dhaka",
   *      "id": "vX2cqvsue9m1AzuKaswE1q",
   *      "status": "inQueue",
   *      "createdAt": "2020-08-28T17:08:20.604Z",
   *      "orderItems": [{
   *        "id": "ccef3b2a-bd64-48fd-9f4a-ac9b57818e64",
   *        "orderId": "vX2cqvsue9m1AzuKaswE1q",
   *        "menuId": "d4c14dec-abe9-4a9a-8517-2efb7f17afcb",
   *        "quantity": 2,
   *        "name": "Dummy-1",
   *        "status": "inStock",
   *        "description": "Lorem Ipsum is simply...a galley of type and scrambled",
   *        "price": 160,
   *      }]
   *    }
   * }
   * @apiSuccessExample {json} Unauthorized
   * {
   *    "title": "Not logged in",
   *    "status": "401",
   *    "code": 401003
   * }
   *
   */
  getOrderById: async (req, res) => {
    try {
      const { orderId } = req.params;
      const orderRepo = new OrderImpl(knex);
      const ordr = await orderRepo.findOrder(orderId);
      res.ok({ data: ordr });
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
