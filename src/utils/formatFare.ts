import { FareBreakdown } from '../types/ride';

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  const symbol = currency === 'USD' ? '$' : currency + ' ';
  return symbol + amount.toFixed(2);
};

export const formatFareBreakdown = (fare: FareBreakdown) => ({
  baseFare: formatCurrency(fare.baseFare, fare.currency),
  distanceRate: formatCurrency(fare.distanceRate, fare.currency),
  platformFee: formatCurrency(fare.platformFee, fare.currency),
  discount: fare.discount ? formatCurrency(fare.discount, fare.currency) : null,
  totalFare: formatCurrency(fare.totalFare, fare.currency),
});
