import { useEffect, useState } from "react";
import axios from "axios";
import ImageUpload from "../../components/ImageUpload";

const Gallery = () => {
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState([]);

  const fetchGallery = async () => {
    try {
      const res = await axios.get("http://https://celeb-dental-system.onrender.com/api/gallery");
      setGallery(res.data.images);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const addImage = async () => {
    if (!image) {
      return alert("Please upload an image");
    }

    try {
      const res = await axios.post(
        "http://https://celeb-dental-system.onrender.com/api/gallery",
        {
          image: image,
        }
      );

      alert(res.data.message);

      setImage("");

      fetchGallery();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.message);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await axios.delete(
        `http://https://celeb-dental-system.onrender.com/api/gallery/${id}`
      );

      fetchGallery();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">
        📷 Gallery Management
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <ImageUpload onUpload={(path) => setImage(path)} />

        {image && (
          <img
            src={`http://https://celeb-dental-system.onrender.com${image}`}
            alt="Preview"
            className="mt-6 w-40 h-40 rounded-xl object-cover border"
          />
        )}

        <button
          onClick={addImage}
          className="mt-6 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Upload To Gallery
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-lg p-4"
          >
            <img
              src={`http://https://celeb-dental-system.onrender.com${item.image}`}
              alt="Gallery"
              className="w-full h-48 object-cover rounded-lg"
            />

            <button
              onClick={() => deleteImage(item._id)}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;