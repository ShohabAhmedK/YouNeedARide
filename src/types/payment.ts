export type PaymentMethodType = 'credit_card' | 'debit_card' | 'cash';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  brand?: string;
  last4?: string;
  isDefault: boolean;
  expiryMonth?: number;
  expiryYear?: number;
}

export interface Receipt {
  rideId: string;
  fare: number;
  platformFee: number;
  discount: number;
  totalCharged: number;
  paymentMethodId: string;
  paidAt: string;
}
