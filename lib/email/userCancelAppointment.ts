export function userCancelAppointment(
    name:string,
    doctorName:string,
    appointmentDate:string,
    appointmentTime:string,
    service:string,
    faculty:string,
) {
    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thông Báo Hủy Lịch Hẹn</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
        }
        .header {
            text-align: center;
            color: #333333;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .content {
            color: #555555;
            line-height: 1.6;
        }
        .content strong {
            color: #333333;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #aaaaaa;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            Thông Báo Hủy Lịch Hẹn
        </div>
        <div class="content">
            <p>Xin chào <strong>${name}</strong>,</p>
            <p>Chúng tôi thông báo rằng lịch hẹn của bạn với bác sĩ <strong>{{doctorName}}</strong> vào ngày <strong>{{date}}</strong>, giờ <strong>{{timeSlot}}</strong> đã bị hủy.</p>
            <p>Dưới đây là các thông tin chi tiết về lịch hẹn đã bị hủy:</p>
            <ul>
                <li><strong>Bác sĩ:</strong> ${doctorName}</li>
                <li><strong>Ngày:</strong> ${appointmentDate}</li>
                <li><strong>Giờ hẹn:</strong>  ${appointmentTime}</li>
                <li><strong>Dịch vụ:</strong>  ${service}</li>
                <li><strong>Chuyên khoa:</strong>  ${faculty}</li>
            </ul>
            <p><strong>Lý do hủy:</strong> ${faculty}</p>
            <p>Chúng tôi sẽ tiếp tục hỗ trợ bạn trong các trường hợp cần thiết.</p>
            <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
            <p><strong>Đội ngũ Y tế</strong></p>
        </div>
        <div class="footer">
            Email này được gửi đến bạn vì bạn có tài khoản trên hệ thống của chúng tôi. Nếu bạn cho rằng email này được gửi nhầm, vui lòng liên hệ với chúng tôi ngay lập tức.
        </div>
    </div>
</body>
</html>
`
}