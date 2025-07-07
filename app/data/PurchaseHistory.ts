export interface PurchaseHistory {
    orderId: number;
    brandId: number;
    brandName: string;
    status: string;
    brandImageUrl: string;
    totalPrice: number;
    customerProductOrder : Array<CustomerProductOrder>;
}
export interface CustomerProductOrder {
    productId: number;
    productName: string;
    productDescription: string;
    productDescriptionAdditional: string;
    productImageUrl: string;
    productPrice: string;
    quantity: number;
}
export interface PastOrder {
    id: number;
    productName: string;
    productPrice: string;
    quantity: string;
    total: string
}