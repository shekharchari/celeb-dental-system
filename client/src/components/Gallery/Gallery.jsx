import { useEffect, useState } from "react";
import axios from "axios";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://celeb-dental-system.onrender.com/api/gallery"
      );

      setGallery(res.data.images);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <h4 className="text-center text-teal-700 font-bold uppercase">
          Gallery
        </h4>

        <h2 className="text-4xl font-bold text-center mt-3">
          Our Clinic
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-12">
          A glimpse of our clinic, treatments and patient care.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {loading ? (
            // Gallery Skeletons
            [1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="w-full h-72 bg-slate-200 animate-pulse rounded-3xl"
              />
            ))
          ) : (
            gallery.map((item) => (
              <div
                key={item._id}
                className="overflow-hidden rounded-3xl shadow-lg"
              >
                <img
                  src={`https://celeb-dental-system.onrender.com${item.image}`}
                  alt="Gallery"
                  className="w-full h-72 object-cover hover:scale-110 transition duration-500"
                />
              </div>
            ))
          )}

        </div>

      </div>
    </section>
  );
}

export default Gallery;