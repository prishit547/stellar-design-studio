export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { name, phone, email, message } = req.body;

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email address is required" });
    }
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ error: "Message is required" });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn("RESEND_API_KEY is not configured on Vercel. Simulating successful send.");
      console.log("Mock contact form submission data:", { name, phone, email, message });
      return res.status(200).json({ success: true, mocked: true });
    }

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #FBF9F4;
      color: #0A1D37;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      background-color: #FBF9F4;
      padding: 40px 20px;
    }
    .container {
      max-width: 580px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #D9E5DC;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(10, 29, 55, 0.04);
    }
    .header {
      background-color: #0A1D37;
      color: #FBF9F4;
      padding: 35px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .header p {
      margin: 8px 0 0;
      font-size: 13px;
      opacity: 0.75;
      letter-spacing: 0.05em;
    }
    .content {
      padding: 40px 35px;
    }
    .field-group {
      margin-bottom: 24px;
    }
    .label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #1e293b;
      opacity: 0.6;
      margin-bottom: 6px;
      display: block;
    }
    .value {
      font-size: 16px;
      color: #0A1D37;
      line-height: 1.5;
    }
    .message-box {
      background-color: #FBF9F4;
      border-left: 3px solid #D9E5DC;
      padding: 20px;
      font-size: 15px;
      color: #0A1D37;
      border-radius: 0 8px 8px 0;
      white-space: pre-wrap;
      line-height: 1.6;
    }
    .footer {
      background-color: #FBF9F4;
      border-top: 1px solid #D9E5DC;
      padding: 24px 30px;
      text-align: center;
      font-size: 12px;
      color: #1e293b;
      opacity: 0.6;
      line-height: 1.5;
    }
    .btn-container {
      text-align: center;
      margin-top: 35px;
    }
    .btn {
      display: inline-block;
      background-color: #0A1D37;
      color: #FBF9F4 !important;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.05em;
      transition: background-color 0.2s ease;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>Socal Family Eye Care</h1>
        <p>New Message from Contact Form</p>
      </div>
      <div class="content">
        <div class="field-group">
          <span class="label">Patient Name</span>
          <div class="value"><strong>${name}</strong></div>
        </div>
        
        <div class="field-group">
          <span class="label">Email Address</span>
          <div class="value"><a href="mailto:${email}" style="color: #0A1D37; text-decoration: underline;">${email}</a></div>
        </div>

        <div class="field-group">
          <span class="label">Phone Number</span>
          <div class="value">${phone || "Not provided"}</div>
        </div>
        
        <div class="field-group" style="margin-top: 30px;">
          <span class="label">Message / Inquiry</span>
          <div class="message-box">${message}</div>
        </div>
        
        <div class="btn-container">
          <a href="mailto:${email}?subject=Re: Socal Family Eye Care Contact Submission" class="btn">Reply to Patient</a>
        </div>
      </div>
      <div class="footer">
        This inquiry was submitted via the contact form on socalfamilyeyecare.com.<br>
        Received on ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} Pacific Time
      </div>
    </div>
  </div>
</body>
</html>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Socal Family Eye Care <noreply@socalfamilyeyecare.com>",
        to: "frontdesk@socalfamilyeyecare.com",
        reply_to: email,
        subject: `New Inquiry from ${name}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend API failed:", errorText);
      return res.status(502).json({ error: "Failed to deliver email via Resend" });
    }

    const result = await response.json();
    return res.status(200).json({ success: true, messageId: result.id });
  } catch (error) {
    console.error("Error in send-email API handler:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
