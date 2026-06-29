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
        "https://celeb-dental-system.onrender.com/api/upload",
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
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-300">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="block w-full text-sm text-slate-500
          file:mr-4 file:py-2.5 file:px-5
          file:rounded-xl file:border-0
          file:text-sm file:font-semibold
          file:bg-teal-50 file:text-teal-700
          hover:file:bg-teal-100/80 transition duration-200 cursor-pointer"
      />

      <button
        type="button"
        onClick={uploadImage}
        disabled={loading}
        className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white py-2.5 px-6 rounded-xl font-bold text-sm shadow-md shadow-teal-600/10 transition duration-200 disabled:bg-teal-400 cursor-pointer whitespace-nowrap"
      >
        {loading ? "Uploading..." : "Upload Photo"}
      </button>
    </div>
  );
};

export default ImageUpload;