const formatPrice = (value: string): string => {
  const numericValue = value.replace(/\D/g, '');
  return new Intl.NumberFormat('vi-VN').format(Number(numericValue)) + 'VND';
};
