import { useState } from "react";
import axios from "axios";

const ImageUpload = ({ onUpload }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Image Uploaded Successfully");

      if (onUpload) {
        onUpload(res.data.image);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button
        onClick={uploadImage}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
};

export default ImageUpload;