// src/services/qrGenerator.js
// Service for generating unique QR codes for students & sessions

import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve current directory (for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Folder to store QR images
const qrDir = path.join(__dirname, "../storage/qrcodes");

// Ensure folder exists
if (!fs.existsSync(qrDir)) {
  fs.mkdirSync(qrDir, { recursive: true });
}

/**
 * Generate a unique QR code for a student in a session
 * @param {Object} data - { studentId, sessionId }
 * @returns {Object} { qrId, qrPath, payload }
 */
export async function generateQR(data) {
  const qrId = uuidv4(); // unique ID for this QR

  // Payload that will be encoded into the QR
  const payload = {
    qrId,
    studentId: data.studentId,
    sessionId: data.sessionId,
    issuedAt: new Date().toISOString(),
  };

  // File path to store the QR image
  const qrPath = path.join(qrDir, `${qrId}.png`);

  // Generate QR code as PNG
  await QRCode.toFile(qrPath, JSON.stringify(payload), {
    errorCorrectionLevel: "H",
    width: 300,
  });

  return { qrId, qrPath, payload };
}
