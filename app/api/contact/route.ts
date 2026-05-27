import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, phone, email, message } = await req.json();

  if (!name || !phone || !email) {
    return NextResponse.json({ error: "שדות חובה חסרים" }, { status: 400 });
  }

  console.log("[contact] ENV check:", {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    passSet: !!process.env.SMTP_PASS,
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("[contact] SMTP verified OK");
  } catch (verifyErr) {
    console.error("[contact] SMTP verify failed:", verifyErr);
    return NextResponse.json({ error: "SMTP connection failed" }, { status: 500 });
  }

  try {
    await transporter.sendMail({
      from: `"FLS Website" <noreply@fls.co.il>`,
      to: "Realleafherbs@gmail.com",
      replyTo: email,
      subject: `פנייה חדשה מהאתר – ${name}`,
      text: `שם: ${name}\nטלפון: ${phone}\nאימייל: ${email}\nהודעה: ${message}`,
      html: `
        <div dir="rtl" style="font-family:sans-serif;font-size:16px">
          <h2>פנייה חדשה מהאתר</h2>
          <p><strong>שם:</strong> ${name}</p>
          <p><strong>טלפון:</strong> ${phone}</p>
          <p><strong>אימייל:</strong> ${email}</p>
          <p><strong>הודעה:</strong><br/>${message ?? "—"}</p>
        </div>
      `,
    });
    console.log("[contact] Email sent OK");
  } catch (sendErr) {
    console.error("[contact] sendMail failed:", sendErr);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}