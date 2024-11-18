export const formatPrice = (value: string | number): string => {
  if (!value) return '0 VND';
  return Number(value.toString().replace(/\D/g, '')).toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
};
