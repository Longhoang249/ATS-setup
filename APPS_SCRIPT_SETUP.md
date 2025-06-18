# Google Apps Script Setup Instructions

## Current Status
The email system has been successfully converted from SendGrid to Google Apps Script. However, the Apps Script needs to be properly configured to accept requests from your website.

## Apps Script Configuration Required

### 1. Access Your Apps Script
Go to: https://script.google.com/d/AKfycbwAaruov2-tvYdR2ExfyNkA-fmKkHut2JnOwiLzmwGTf32Jhc2rc9aCAgR7dCVgDKru/edit

### 2. Apps Script Code (ĐÃ SỬA LỖI)
Thay thế toàn bộ code trong Apps Script của bạn bằng code này:

```javascript
function doPost(e) {
  try {
    // Parse the JSON data
    const data = JSON.parse(e.postData.contents);
    console.log('Received data:', data);
    
    // Handle different email types
    if (data.type === 'contact') {
      return handleContactForm(data);
    } else if (data.type === 'demo') {
      return handleDemoRequest(data);
    } else if (data.type === 'autoReply') {
      return handleAutoReply(data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({result: 'Unknown email type'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error('Error:', error);
    return ContentService.createTextOutput(JSON.stringify({result: 'error', message: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleContactForm(emailData) {
  try {
    const subject = emailData.subject;
    const formData = emailData.data;
    
    const htmlBody = `
      <h2>Thông tin khách hàng mới</h2>
      <p><strong>Ngày:</strong> ${formData.date}</p>
      <p><strong>Thời gian:</strong> ${formData.time}</p>
      <p><strong>Họ tên:</strong> ${formData.name}</p>
      <p><strong>Số điện thoại:</strong> ${formData.phone}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      ${formData.address ? `<p><strong>Địa chỉ:</strong> ${formData.address}</p>` : ''}
      ${formData.businessType ? `<p><strong>Tình trạng:</strong> ${formData.businessType}</p>` : ''}
      ${formData.message ? `<p><strong>Lời nhắn:</strong> ${formData.message}</p>` : ''}
      <p><strong>Nguồn:</strong> ${formData.source}</p>
      <p>Vui lòng liên hệ lại với khách hàng trong thời gian sớm nhất.</p>
    `;
    
    // Send email - SỬA LỖI: Sử dụng địa chỉ email THỰC TẾ
    GmailApp.sendEmail(
      'autoshop.trasua@gmail.com',  // ĐỊA CHỈ EMAIL THỰC TẾ
      subject,
      '',
      {
        htmlBody: htmlBody
      }
    );
    
    return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error('Contact form error:', error);
    return ContentService.createTextOutput(JSON.stringify({result: 'error', message: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleDemoRequest(emailData) {
  try {
    const subject = emailData.subject;
    const formData = emailData.data;
    
    const htmlBody = `
      <h2>Yêu cầu tài khoản demo mới</h2>
      <p><strong>Ngày:</strong> ${formData.date}</p>
      <p><strong>Thời gian:</strong> ${formData.time}</p>
      <p><strong>Họ tên:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Công ty:</strong> ${formData.company}</p>
      <p>Vui lòng tạo tài khoản demo và gửi thông tin đăng nhập cho khách hàng này.</p>
    `;
    
    // Send email - SỬA LỖI: Sử dụng địa chỉ email THỰC TẾ
    GmailApp.sendEmail(
      'autoshop.trasua@gmail.com',  // ĐỊA CHỈ EMAIL THỰC TẾ
      subject,
      '',
      {
        htmlBody: htmlBody
      }
    );
    
    return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error('Demo request error:', error);
    return ContentService.createTextOutput(JSON.stringify({result: 'error', message: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleAutoReply(emailData) {
  try {
    const subject = emailData.subject;
    const htmlBody = emailData.data.message;
    const customerEmail = emailData.to;
    
    // Kiểm tra email khách hàng có hợp lệ không
    if (!customerEmail || customerEmail === 'Không cung cấp' || !customerEmail.includes('@')) {
      console.log('Skipping auto-reply: Invalid customer email');
      return ContentService.createTextOutput(JSON.stringify({result: 'success', note: 'Auto-reply skipped - invalid email'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Send auto-reply email
    GmailApp.sendEmail(
      customerEmail,
      subject,
      '',
      {
        htmlBody: htmlBody
      }
    );
    
    return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error('Auto-reply error:', error);
    return ContentService.createTextOutput(JSON.stringify({result: 'error', message: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### QUAN TRỌNG: 
1. Thay thế 'autoshop.trasua@gmail.com' bằng địa chỉ email THỰC TẾ của bạn
2. Code đã được sửa để bỏ qua auto-reply khi khách hàng không cung cấp email hợp lệ

### 3. Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Description: "Email handler for Autoshop Setup website"
4. Execute as: "Me"
5. Who has access: "Anyone" (THIS IS CRITICAL)
6. Click "Deploy"

### 4. Authorize Permissions
When you deploy, Google will ask for permissions to:
- Send emails on your behalf
- Access your Gmail account

Click "Authorize" and go through the permission flow.

### 5. Test the Deployment
The current website will automatically start working once the Apps Script is properly deployed with "Anyone" access.

## Data Format Being Sent
The website sends data in this format:

### Contact Form:
```json
{
  "type": "contact",
  "to": "autoshop.trasua@gmail.com",
  "subject": "Thông tin liên hệ mới từ website",
  "data": {
    "date": "14/6/2025",
    "time": "10:30:15",
    "name": "Customer Name",
    "phone": "0123456789",
    "email": "customer@email.com",
    "address": "Customer Address",
    "businessType": "Đã có mặt bằng",
    "message": "Customer message",
    "source": "website"
  }
}
```

### Demo Request:
```json
{
  "type": "demo",
  "to": "autoshop.trasua@gmail.com",
  "subject": "Yêu cầu tài khoản demo mới từ website",
  "data": {
    "date": "14/6/2025",
    "time": "10:30:15",
    "name": "Customer Name",
    "email": "customer@email.com",
    "company": "Company Name"
  }
}
```

### Auto Reply:
```json
{
  "type": "autoReply",
  "to": "customer@email.com",
  "subject": "Cảm ơn quý khách đã liên hệ với AutoShop",
  "data": {
    "name": "Customer Name",
    "message": "HTML formatted thank you message"
  }
}
```