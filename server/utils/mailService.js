const nodemailer = require("nodemailer");

// ===============================
// Configure Mail Transporter
// ===============================
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ===============================
// Send OTP Email
// ===============================
const sendOTPEmail = async (email, otp) => {

    await transporter.sendMail({

        from: `"🌾 AgriAssist Team" <${process.env.EMAIL_USER}>`,

        to: email,

        subject: "🌾 AgriAssist - OTP Verification",

        html: `
<div style="max-width:650px;margin:auto;font-family:Arial,sans-serif;border:1px solid #ddd;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.1);">

<!-- Header -->
<div style="background:#2E7D32;padding:25px;text-align:center;color:white;">
<h1 style="margin:0;">🌾 AgriAssist</h1>
<p style="margin-top:8px;">Smart Farming • Smart Future</p>
</div>

<!-- Body -->
<div style="padding:30px;">

<h2 style="color:#2E7D32;">
Hello Farmer 👨‍🌾
</h2>

<p>
Welcome to <b>AgriAssist</b>.
Thank you for registering with us.
</p>

<p>Your verification OTP is:</p>

<div style="background:#E8F5E9;border:2px dashed #2E7D32;border-radius:10px;padding:20px;text-align:center;margin:25px 0;">

<h1 style="letter-spacing:8px;color:#2E7D32;font-size:42px;margin:0;">
${otp}
</h1>

</div>

<p>
⏳ This OTP is valid for <b>5 minutes</b>.
</p>

<hr>

<h3 style="color:#2E7D32;">
🇮🇳 తెలుగు
</h3>

<p>
నమస్తే రైతు గారూ! 🌾
</p>

<p>
AgriAssist లో నమోదు చేసుకోవడానికి మీ OTP:
</p>

<h2 style="text-align:center;color:#2E7D32;">
${otp}
</h2>

<p>
ఈ OTP 5 నిమిషాల వరకు మాత్రమే చెల్లుతుంది.
</p>

<hr>

<h3 style="color:#2E7D32;">
🇮🇳 हिन्दी
</h3>

<p>
नमस्ते किसान जी! 🌱
</p>

<p>
AgriAssist में पंजीकरण के लिए आपका OTP:
</p>

<h2 style="text-align:center;color:#2E7D32;">
${otp}
</h2>

<p>
यह OTP केवल 5 मिनट तक मान्य है।
</p>

<hr>

<div style="background:#FFF8E1;padding:15px;border-left:5px solid orange;border-radius:5px;">

<b>Security Notice</b>

<p>
Never share your OTP with anyone.<br>
AgriAssist will never ask for your OTP.
</p>

</div>

<br>

<p>
If you didn't request this OTP, you can safely ignore this email.
</p>

</div>

<!-- Footer -->
<div style="background:#f5f5f5;padding:20px;text-align:center;color:#555;">

<b>🌾 AgriAssist Team</b>

<p>
Empowering Farmers with Technology
</p>

<p>
Made with ❤️ for Indian Farmers
</p>

<p style="font-size:12px;color:#999;">
© 2026 AgriAssist. All Rights Reserved.
</p>

</div>

</div>
`

    });

};

module.exports = {
    sendOTPEmail,
};