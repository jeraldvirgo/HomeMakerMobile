export interface SellerOrder {
    orderId: number;
    brandId: number;
    userName: string;
    status: string;
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