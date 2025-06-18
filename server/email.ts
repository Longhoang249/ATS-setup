// Google Apps Script endpoint configuration
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_kjK25PXJ-jGwqhFy_PBCf4CFHGEbTp5QDD7FmhidM5GtT6dZPH3QZk4-zQiSTVSW/exec';

console.log("Google Apps Script email service initialized successfully");

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  company?: string;
  package?: string;
  message?: string;
  source?: string;
  address?: string;
  businessType?: string;
}

interface DemoRequestData {
  name: string;
  email: string;
  company: string;
}

// Helper function to send data to Google Apps Script
async function sendToAppsScript(data: any): Promise<boolean> {
  try {
    console.log('Sending to Apps Script:', JSON.stringify(data, null, 2));
    
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      redirect: 'follow'
    });

    console.log('Apps Script response status:', response.status);
    console.log('Apps Script response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Apps Script error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const result = await response.text();
    console.log('Apps Script success response:', result);
    return true;
  } catch (error) {
    console.error('Apps Script error:', error);
    console.error('Please check that your Google Apps Script is:');
    console.error('1. Deployed as a web app');
    console.error('2. Set to "Anyone" can access');
    console.error('3. Has the correct permissions');
    return false;
  }
}

export async function sendContactNotification(data: ContactFormData): Promise<boolean> {
  try {
    console.log('DEBUG: Received contact form data:', JSON.stringify(data, null, 2));
    
    // Prepare data for Apps Script
    const emailData = {
      type: 'contact',
      to: 'autoshop.trasua@gmail.com',
      subject: 'Thông tin liên hệ mới từ website',
      data: {
        date: new Date().toLocaleDateString('vi-VN'),
        time: new Date().toLocaleTimeString('vi-VN'),
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address || '',
        businessType: data.businessType ? (
          data.businessType === 'has-location' ? 'Đã có mặt bằng' :
          data.businessType === 'no-location' ? 'Chưa có mặt bằng' :
          data.businessType === 'existing' ? 'Đang kinh doanh' :
          data.businessType
        ) : '',
        message: data.message || '',
        source: data.source || 'website'
      }
    };

    const success = await sendToAppsScript(emailData);
    if (success) {
      console.log('Contact notification sent to Apps Script successfully');
    }
    return success;
  } catch (error) {
    console.error('Error sending contact notification:', error);
    return false;
  }
}

export async function sendDemoRequestNotification(data: DemoRequestData): Promise<boolean> {
  try {
    console.log('Demo account request received:', {
      name: data.name,
      email: data.email,
      company: data.company
    });
    
    // Prepare data for Apps Script
    const emailData = {
      type: 'demo',
      to: 'autoshop.trasua@gmail.com',
      subject: 'Yêu cầu tài khoản demo mới từ website',
      data: {
        date: new Date().toLocaleDateString('vi-VN'),
        time: new Date().toLocaleTimeString('vi-VN'),
        name: data.name,
        email: data.email,
        company: data.company
      }
    };

    const success = await sendToAppsScript(emailData);
    if (success) {
      console.log('Demo request notification sent to Apps Script successfully');
    }
    return success;
  } catch (error) {
    console.error('Error sending demo request notification:', error);
    return false;
  }
}

export async function sendAutoReply(to: string, name: string): Promise<boolean> {
  try {
    console.log('Sending auto-reply email to:', {
      to: to,
      name: name
    });
    
    // Prepare data for Apps Script
    const emailData = {
      type: 'autoReply',
      to: to,
      subject: 'Cảm ơn quý khách đã liên hệ với AutoShop',
      data: {
        name: name,
        message: `
          <h2>Xin chào ${name},</h2>
          <p>Cảm ơn quý khách đã liên hệ với AutoShop!</p>
          <p>Chúng tôi đã nhận được thông tin yêu cầu tư vấn của quý khách. Đội ngũ CSKH của AutoShop sẽ liên hệ lại với quý khách trong thời gian sớm nhất (trong vòng 24 giờ).</p>
          <p>Trân trọng,</p>
          <p><strong>AutoShop</strong></p>
          <p>Hotline: 0936.333.860</p>
          <p>Website: <a href="https://autoshop.com.vn">autoshop.com.vn</a></p>
        `
      }
    };

    const success = await sendToAppsScript(emailData);
    if (success) {
      console.log('Auto-reply email sent to Apps Script successfully');
    }
    return success;
  } catch (error) {
    console.error('Error sending auto-reply email:', error);
    return false;
  }
}