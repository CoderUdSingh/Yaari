import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import axios from "axios";

const UploadTest = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [optimizedImageUrl, setOptimizedImageUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (!file) return alert("Pehle ek file select karo bhai!");
    setUploading(true);

    try {
      // 1. Backend se Presigned URL maango (Yahan axiosInstance chalega)
      console.log("Ticket counter se URL le rahe hain...");
      const { data } = await axiosInstance.post("/media/generate-upload-url", {
        folder: "profiles",
        fileType: file.type,
      });

      const { uploadUrl, key } = data;

      // 2. Direct S3 Upload
      console.log("Direct S3 me upload shuru...");
      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("S3 Upload Error:", response.status, errorText);
        throw new Error(`S3 Upload failed: ${response.status}`);
      }

      console.log("✅ File S3 me upload ho gayi!");
      console.log("DB me save karne ke liye ye Key use hogi:", key);
      const dbResponse = await axiosInstance.put("/auth/profile-picture", {
        s3Key: key,
      });

      const cloudName = "dlbpqlhzt";
      const finalUrl = `https://res.cloudinary.com/${cloudName}/image/upload/w_400,h_400,c_fill,q_auto,f_auto/yaari-s3/${dbResponse.data.user.profilePic}`;

      setOptimizedImageUrl(finalUrl);

      alert(" Upload and DB save Successful! ");
    } catch (error) {
      console.error("Upload fail ho gaya:", error);
      alert("Upload me error aayi, console check karo.");
    } finally {
      setUploading(false);
    }
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 block"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {uploading ? "Image is uploading" : "Upload File"}
      </button>
      {optimizedImageUrl && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">
            Cloudinary Optimized Preview:
          </h3>
          <img
            src={optimizedImageUrl}
            alt="Optimized Profile"
            className="w-48 h-48 rounded-full object-cover border-4 border-green-500 shadow-lg"
          />
          <p className="text-sm text-gray-500 mt-2">
            Ye photo direct S3 se nahi, Cloudinary CDN se aa rahi hai!
          </p>
        </div>
      )}
    </>
  );
};

export default UploadTest;
