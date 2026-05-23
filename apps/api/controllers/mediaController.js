import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import s3Client from "../config/s3.js";

export const generateUploadUrl = async (req, res) => {
  try {
    const { folder, fileType } = req.body;

    // 1. Basic validation
    if (!folder || !fileType) {
      return res
        .status(400)
        .json({ message: "Folder and fileType are required" });
    }

    // 2. Sirf in folders me upload allow karenge
    const allowedFolders = ["profiles", "posts", "reels"];
    if (!allowedFolders.includes(folder)) {
      return res.status(400).json({ message: "Invalid folder destination" });
    }

    // 3. Unique file name generate karna taaki purani file overwrite na ho
    const rawBytes = crypto.randomBytes(16);
    const imageName = rawBytes.toString("hex");
    const extension = fileType.split("/")[1];
    const key = `${folder}/${imageName}.${extension}`; // S3 me path: profiles/1234abcd.jpeg

    // 4. S3 command prepare karna - sirf basic fields
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    });

    // 5. URL generate karna jo strictly 5 minutes (300 seconds) ke liye valid hoga
    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 300,
    });

    // 6. Frontend ko response bhej do
    res.status(200).json({
      message: "Upload URL generated",
      uploadUrl, // Ye wo temporary pass hai
      key, // Ye hume DB me save karne ke kaam aayega
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    res
      .status(500)
      .json({ message: "Internal server error while generating URL" });
  }
};
