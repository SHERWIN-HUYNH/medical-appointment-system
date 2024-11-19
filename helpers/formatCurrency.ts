export const formatPrice = (value: string): string => {
  const numericValue = parseFloat(value.replace(/\D/g, ''));
  return numericValue.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};
