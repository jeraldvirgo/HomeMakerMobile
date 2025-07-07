export interface SellerOrder {
    orderId: string;
    brandId: number;
    userName: string;
    status: number;
    userAddress: string;
    userMobileNumber: string;
    totalPrice: number;
    customerProductOrder : Array<SellerProductOrder>;
}
export interface SellerProductOrder {
    productId: number;
    productName: string;
    productDescription: string;
    productDescriptionAdditional: string;
    productImageUrl: string;
    productPrice: string;
    quantity: number;
}