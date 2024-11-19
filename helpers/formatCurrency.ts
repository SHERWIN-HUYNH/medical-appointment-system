
export const formatPrice = (value: string | number): string => {
  if (!value) return '0 VND';
  return Number(value.toString().replace(/\D/g, '')).toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });

// export const formatPrice = (value: string): string => {
//   const numericValue = parseFloat(value.replace(/\D/g, ''));
//   return numericValue.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};
