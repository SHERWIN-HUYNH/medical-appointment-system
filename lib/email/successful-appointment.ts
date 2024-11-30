export function createAppointmentEmailContent(
  customerName: string,
  service: string,
  doctorName: string,
  appointmentDate: string,
  appointmentTime: string,
  phone: string,
  supportEmail: string,
  receiptUrl?: string,
) {
  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f9f9f9;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header h1 {
          color: #007bff;
          font-size: 24px;
        }
        .content {
          margin-bottom: 20px;
        }
        .footer {
          font-size: 14px;
          color: #666;
          text-align: center;
          margin-top: 20px;
        }
        .highlight {
          font-weight: bold;
          color: #007bff;
        }
        .btn {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
        }
        .btn:hover {
          background: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Xác nhận đặt lịch hẹn thành công</h1>
        </div>
        <div class="content">
          <p>Kính gửi <span class="highlight">${customerName}</span>,</p>
          <p>Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!</p>
          <p>Chúng tôi xin thông báo rằng lịch hẹn của quý khách đã được đặt thành công với thông tin chi tiết như sau:</p>
          <ul>
            <li><strong>Họ và tên:</strong> ${customerName}</li>
            <li><strong>Dịch vụ:</strong> ${service}</li>
            <li><strong>Bác sĩ phụ trách:</strong> ${doctorName}</li>
            <li><strong>Ngày hẹn:</strong> ${appointmentDate}</li>
            <li><strong>Giờ hẹn:</strong> ${appointmentTime}</li>
            <li><strong>Bạn có thể xem Hóa đơn tại:</strong> <a href="${receiptUrl}">here</a></li>
            <li><p><strong>Địa chỉ:</strong> Bệnh viện Đại học Y Dược TP.HCM</p>
                  <p className="text-[#858585] text-xs">
                    Cơ sở 201 Nguyễn Chí Thanh, Phường 12, Quận 5, TP. Hồ Chí Minh
                  </p></li>
          </ul>
          <p><strong>Lưu ý:</strong></p>
          <ul>
            <li>Quý khách vui lòng có mặt trước giờ hẹn 15 phút để hoàn tất các thủ tục cần thiết.</li>
            <li>Nếu quý khách cần thay đổi hoặc hủy lịch hẹn, vui lòng liên hệ với chúng tôi qua số điện thoại <span class="highlight">${phone}</span> hoặc email <span class="highlight">${supportEmail}</span>.</li>
          </ul>
          <p>Một lần nữa, cảm ơn quý khách đã tin tưởng và lựa chọn chúng tôi. Chúng tôi rất mong được phục vụ quý khách!</p>
        </div>
        <div class="footer">
          <p>Trân trọng,</p>
          <p><strong>[Tên Phòng Khám/Dịch Vụ]</strong></p>
          <p>Hotline: ${phone}</p>
          <p>Email: ${supportEmail}</p>
        </div>
      </div>
    </body>
    </html>
    `
}
