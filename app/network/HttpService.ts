import axios from "axios";
import { User } from "../data/User";
import { Brand } from "../data/Brand";
import { storeApplicationInfo } from "../../constants/StoreInfo";
import { Products } from "../data/Products";
import { PurchaseHistory } from "../data/PurchaseHistory";
import { SellerOrder } from "../data/SellerOrder";

// const baseUrl = 'https://home-maker-server-ce4c28abfefd.herokuapp.com'
const baseUrl =  'http://10.16.52.86:8080'

export const validateOTP = async (mobileNumber: string, otp:string): Promise<boolean> => {
    try {  
        const url = `${baseUrl}/api/user/validate/otp`;
         const data = {
            "otp": otp,
            "mobileNumber": mobileNumber
        }        
        const response = await axios.post(url, data);
        if (response.status === 200) {
            console.debug("Validate OTP >> : ",response.data )
            return response.data
        } else {
            throw new Error("Failed to fetch users");
        }

    } catch(error) {
        console.error("Response Error validateOTP >>", error);
    }
}

export const isExistingUser = async (mobileNumber: string): Promise<boolean> => {
    try {  
         const url = `${baseUrl}/api/user/mobile/${mobileNumber}`;
         const { data, status } = await axios.get<User>(url);
        if (status === 200) {
            if(data != null) {
                console.debug("Response Body isExistingUser>>", data);
                storeApplicationInfo("userName",data.userName);
                storeApplicationInfo("mobileNumber", data.mobileNumber);
                storeApplicationInfo("address",data.address);
                storeApplicationInfo("email",data.email);
                storeApplicationInfo("avatarUrl",data.avatarUrl);
                storeApplicationInfo("userId",data.id.toString());
                storeApplicationInfo("upiId",data.upiId);
            }
            return true;
        } else {
             return false;
        }
    } catch(error) {
        console.debug("Response Error isExistingUser >>", error);
         return false;
    }

}
export const getUserType = async (mobileNumber: string): Promise<string> => {
    try {  
         const url = `${baseUrl}/api/user/mobile/usertype/${mobileNumber}`;
         const { data, status } = await axios.get<string>(url);
         console.log("getUserType>>>", data)
        if (status === 200) {
            if(data != null) {
               return data
            }
        } 
    } catch(error) {
        console.debug("Response Error isExistingUser >>", error);
        return "buyer"
    }

}

export const createUser = async (requestPayload: any): Promise<string> => {
    try {  
        const url = `${baseUrl}/api/user/create`;
        const { data, status } = await axios.post<User>(url, requestPayload);
        if (status === 200) {
            if(data != null) {
                console.debug("Response Body isExistingUser>>", data);
                storeApplicationInfo("userName",data.userName);
                storeApplicationInfo("mobileNumber", data.mobileNumber);
                storeApplicationInfo("address",data.address);
                storeApplicationInfo("email",data.email);
                storeApplicationInfo("avatarUrl",data.avatarUrl);
                storeApplicationInfo("upiId",data.upiId);
                storeApplicationInfo("userId",data.id.toString());
                return data.id.toString();
            } else {
                 console.debug("Response Error Failed to create User ");
                 return "";
            }
           
        } else {
            console.error("Failed to create User");
        }

    } catch(error) {
        console.debug("Response Failed to create User >>", error);
    }
}

export const createBrand = async (userId: string, requestPayload: any): Promise<boolean> => {
    try {  
        console.log("Creating Brand for User Info",requestPayload)
        const url = `${baseUrl}/api/seller/update/${userId}`;
         console.log("Creating Brand for User Url",url)
        const { data, status } = await axios.post<Brand>(url, requestPayload);
        if (status === 200) {
            if(data != null) {
                console.debug("Response Body Brand Insert Or Update>>", data);
                storeApplicationInfo("brandId",data.id.toString());
                storeApplicationInfo("brandName",data.brandName);
                storeApplicationInfo("brandSubType", data.brandSubType);
                storeApplicationInfo("brandDescription",data.brandDescription);
                storeApplicationInfo("brandDescriptionAdditional",data.brandDescriptionAdditional);
                storeApplicationInfo("brandLocation",data.brandLocation);
                storeApplicationInfo("brandTimingOpen",data.brandTimingOpen);
                storeApplicationInfo("brandTimingClose",data.brandTimingClose);
                storeApplicationInfo("brandImageUrl",data.brandImageUrl);
                return true;
            } else {
                 console.debug("Response Error Failed to createBrand  ");
            }
           
        }

    } catch(error) {
        console.debug("Response Error createUser >>", error);
    }
}

export const updateUser = async (data: any): Promise<string> => {
    try {  
        const url = `${baseUrl}/api/user/update/${data.id}`;
        const response = await axios.put(url, data);
        if (response.status === 200) {
            if(data != null) {
                console.debug("Response Body isExistingUser>>", data);
                storeApplicationInfo("brandId",data.id);
                storeApplicationInfo("userName",data.userName);
                storeApplicationInfo("mobileNumber", data.mobileNumber);
                storeApplicationInfo("address",data.address);
                storeApplicationInfo("email",data.email);
                storeApplicationInfo("avatarUrl",data.avatarUrl);
                storeApplicationInfo("userId",data.id.toString());
            }
            return data.id.toString()
        } else {
            console.debug("Failed to  update User >> : ",data );
            return "";
        }

    } catch(error) {
        console.debug("Response Error updateUser >>", error);
    }
}

export const getAllSellers = async (): Promise<Brand[]> => {
    try {  
        const url = `${baseUrl}/api/seller/`;
         const { data, status } = await axios.get<Brand[]>(url);
        if (status === 200) {
            if(data != null) {
                console.debug("Response Body getAllSellers>>", data);
                  return data
            }
        } 
    } catch(error) {
        console.debug("Response Error isExistingUser >>", error);
         throw new Error("getAllSellers Error", error)
    }
}

export const getAllProducts = async (sellerId: number): Promise<Products[]> => {
    try {  
        const url = `${baseUrl}/api/seller/product/${sellerId}`;
         const { data, status } = await axios.get<Products[]>(url);
        if (status === 200) {
            if(data != null) {
                console.debug("Response Body getAllProducts>>", data);
                  return data
            }
        } 
    } catch(error) {
        console.debug("Response Error getAllProducts >>", error);
         throw new Error("getAllProducts Error", error)
    }
}

export const placeOrder = async (requestPayload: any): Promise<string> => {
    try {  
        const url = `${baseUrl}/api/order/create`;
        console.debug("Request Data for Order>>",requestPayload)
        const { data, status } = await axios.post<string>(url, requestPayload);
        if (status === 200) {
            if(data != null) {
                console.debug("Response Body placeOrder>>", data);
                return data;
            } else {
                 console.debug("Response Error Failed to placeOrder ");
            }
           
        }

    } catch(error) {
        console.debug("Response Error placeOrder >>", error);
    }
}

export const getAllPurchaseHistory = async (userId: number): Promise<PurchaseHistory[]> => {
    try {  
        const url = `${baseUrl}/api/order/user/history/${userId}`;
         const { data, status } = await axios.get<PurchaseHistory[]>(url);
        if (status === 200) {
            if(data != null) {
                console.debug("Response Body PurchaseHistory>>", JSON.stringify(data));
                  return data
            }
        } 
    } catch(error) {
        console.debug("Response Error PurchaseHistory >>", error);
         throw new Error("PurchaseHistory Error", error)
    }

}

export const getSellerOrderList = async (brandId: number): Promise<SellerOrder[]> => {
    try {  
        const url = `${baseUrl}/api/order/seller/orders/${brandId}`;
         const { data, status } = await axios.get<SellerOrder[]>(url);
        if (status === 200) {
            if(data != null) {
                console.debug("Response Body getSellerOrderList>>", JSON.stringify(data));
                  return data
            }
        } 
    } catch(error) {
        console.debug("Response Error getSellerOrderList >>", error);
         throw new Error("getSellerOrderList Error", error)
    }

}

export const createProduct = async (product: Products): Promise<boolean> => {
    try {  
        const url = `${baseUrl}/api/seller/product/create`;
        const response = await axios.post(url, product);
        if (response.status === 200) {
            console.debug("Create Product  >> : ",response.data )
            return response.data
        } else {
            throw new Error("Failed to Create Product");
        }

    } catch(error) {
        console.error("Response Error Create Product >>", error);
    }
}