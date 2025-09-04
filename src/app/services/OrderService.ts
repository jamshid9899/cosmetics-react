import axios from "axios";
import { serverApi } from "../../lib/config";

class OrderService {
  private readonly path;

  constructor() {
    this.path = serverApi;
  }
}

export default OrderService;
