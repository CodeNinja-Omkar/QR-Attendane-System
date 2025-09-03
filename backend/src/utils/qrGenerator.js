// utils/qrGenerator.js
import QRCode from "qrcode";
import crypto from "crypto";

/**
 * Sign payload with secret key to prevent tampering
 */
function signPayload(payload) {
  const secret = process.env.QR_SECRET || "defaultsecret";
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

/**
 * Generate QR Code with signed data
 */
export async function generateSignedQR(session_id, student_id) {
  const payload = JSON.stringify({ session_id, student_id });
  const signature = signPayload(payload);

  const qrData = JSON.stringify({ session_id, student_id, signature });

  // Generate QR code (base64 string)
  return await QRCode.toDataURL(qrData);
}

/**
 * Verify scanned QR data
 */
export function verifyQR(qrData) {
  try {
    const { session_id, student_id, signature } = JSON.parse(qrData);
    if (!session_id || !student_id || !signature) return null;

    const payload = JSON.stringify({ session_id, student_id });
    const expectedSig = signPayload(payload);

    if (signature !== expectedSig) return null;

    return { session_id, student_id };
  } catch {
    return null;
  }
}
