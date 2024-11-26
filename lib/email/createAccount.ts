export function createAccount(
  email: string,
  password: string,
  username: string,
  changePasswordUrl: string,
) {
  return `
     <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f9; margin: 0; padding: 0; }
        .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
        .email-header { text-align: center; color: #4caf50; }
        .email-content { margin-top: 20px; }
        .email-button { display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; }
        .email-button:hover { background-color: #0056b3; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <h1 class="email-header">Chào ${username},</h1>
        <p class="email-content">
          Tài khoản của bạn đã được tạo thành công trên hệ thống. Dưới đây là thông tin tài khoản của bạn:
        </p>
        <ul>
          <li><strong>Tên đăng nhập:</strong> ${username}</li>
          <li><strong>Mật khẩu tạm thời:</strong> ${password}</li>
        </ul>
        <p>
          Vì lý do bảo mật, chúng tôi khuyến nghị bạn <strong>thay đổi mật khẩu ngay lập tức</strong> để bảo vệ tài khoản của mình.
        </p>
        <a href="${changePasswordUrl}" class="email-button">Thay Đổi Mật Khẩu</a>
        <p>
          Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận hỗ trợ.
        </p>
        <p>Trân trọng,<br/>Đội ngũ hỗ trợ</p>
      </div>
    </body>
    </html>
    `
}
