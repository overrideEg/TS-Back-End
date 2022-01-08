export class AndroidPurchaseResponse  {

    kind: string;
    purchaseTimeMillis: string;
    purchaseState: 0|1|2;
    consumptionState: 0|1;
    developerPayload: string;
    orderId: string;
    purchaseType: number;
    acknowledgementState: number;
    purchaseToken: string;
    productId: string;
    quantity: number;
    obfuscatedExternalAccountId: string;
    obfuscatedExternalProfileId: string;
    regionCode: string;
}