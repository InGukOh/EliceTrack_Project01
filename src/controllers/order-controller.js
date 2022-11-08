import { AppError, commonErrors } from '../middlewares';
import { OrderService } from '../services';

class OrderController {
  static async createOrder(req, res, next) {
    const userId = req.currentUserId;
    const { orderItems, totalPrice, address, request } = req.body;

    const newOrder = await OrderService.createOrder({
      userId,
      orderItems,
      totalPrice,
      address,
      request,
    });

    return res.status(201).json(newOrder);
  }

  static async getOrders(req, res, next) {
    const orders = await OrderService.getOrders();
    return res.status(200).json(orders);
  }

  static async getOrderById(req, res, next) {
    const { orderId } = req.body;
    const order = await OrderService.getOrderById(orderId);
    res.status(200).json(order);
  }

  static async getMyOrders(req, res, next) {
    const userId = req.currentUserId;
    const orders = await OrderService.getMyOrder(userId);
    return res.status(200).json(orders);
  }

  static async getOrder(req, res, next) {
    const { orderId } = req.params;
    const { currentUserId, currentUserRole } = req;
    const order = await OrderService.getOrder(orderId);
    if (currentUserId !== order.userId && currentUserRole === 'basic-user') {
      throw new AppError(
        commonErrors.authorizationError,
        403,
        '해당 주문은 고객님의 주문이 아니에요!',
      );
    }
    return res.status(200).json(order);
  }

  static async updateOrder(req, res, next) {
    const { orderId } = req.params;
    const { orderItems, totalPrice, address, request } = req.body;
    const updateInfo = {
      ...(orderItems && { orderItems }),
      ...(address && { address }),
      ...(totalPrice && { totalPrice }),
      ...(request && { request }),
    };
    const result = await OrderService.updateOrder(orderId, updateInfo);
    return res.sendStatus(200);
  }

  static async updateOrderStatus(req, res, next) {
    const insertData = req.body.checkedArr;

    console.log(insertData);
    console.log(insertData[0]);
    console.log(Object.keys(insertData[0]));
    console.log(Object.values(insertData[0]));
    console.log(Object.values(insertData[0]).join() === 'basic-user');

    const result = await userManagement.updateUserRole(insertData);

    res.status(result.status).json(true);
  }

  // 이건 소프트 딜리트임
  static async deleteMyOrder(req, res, next) {
    const { orderId } = req.params;
    const result = await OrderService.deleteMyOrder(orderId);

    res.status(200).json(result);
  }
  // 이건 진짜 딜리트임
  static async deleteOrder(req, res, next) {
    const { orderId } = req.params;
    const result = await OrderService.deleteOrder(orderId);

    res.status(200).json(result);
  }
}

export { OrderController };
