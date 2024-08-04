import { CustomerOrderedList } from "./CustomerOrderedList";

export interface CustomerOrder {
    userId: number;
    brandId: number;
    orders: CustomerOrderedList[];
}