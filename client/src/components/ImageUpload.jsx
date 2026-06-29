import { useState, useRef } from "react";
import axios from "axios";

const ImageUpload = ({ onUpload }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

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
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-350 w-full">
      {/* Hidden default file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => setImage(e.target.files[0])}
        className="hidden"
      />

      {/* Styled custom choose file button */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 py-2.5 px-5 rounded-xl font-semibold text-sm transition duration-200 cursor-pointer whitespace-nowrap"
        >
          Choose Photo
        </button>
        
        {/* Selected file name display */}
        <span className="text-sm text-gray-500 truncate max-w-[150px] sm:max-w-[200px]">
          {image ? image.name : "No file chosen"}
        </span>
      </div>

      {/* Upload button */}
      <button
        type="button"
        onClick={uploadImage}
        disabled={loading}
        className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white py-2.5 px-6 rounded-xl font-bold text-sm shadow-md shadow-teal-600/10 transition duration-200 disabled:bg-teal-400 cursor-pointer whitespace-nowrap sm:ml-auto"
      >
        {loading ? "Uploading..." : "Upload Photo"}
      </button>
    </div>
  );
};

export default ImageUpload;