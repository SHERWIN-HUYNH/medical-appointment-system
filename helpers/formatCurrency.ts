function formatCurrencyVND(amount: number) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ';
  }
  
  // Sử dụng hàm
  const amount = 50000;
  const formattedAmount = formatCurrencyVND(amount);
  console.log(formattedAmount); // Kết quả: "50,000 đ"
  