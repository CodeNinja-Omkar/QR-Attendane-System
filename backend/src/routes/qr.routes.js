// src/routes/qr.routes.js
// Placeholder for QR-related endpoints

import { Router } from "express";
import { generateQR } from "../services/qrGenerator.js";

const router = Router();


router.post("/generate", async (req, res, next) => {
  try {
    // For now, accept dummy input or req.body
    const { studentId, sessionId } = req.body;

    if (!studentId || !sessionId) {
      return res
        .status(400)
        .json({ error: "studentId and sessionId required" });
    }

    const qr = await generateQR({ studentId, sessionId });

    res.json({
      message: "QR generated successfully",
      qrId: qr.qrId,
      payload: qr.payload,
      file: qr.qrPath,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
