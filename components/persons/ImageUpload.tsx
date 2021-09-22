import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useEffect, useState } from "react";
import { Spin, message, Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Image from "next/image";
const ImageUpload = ({ setImage, imageState, askIfLoading }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    askIfLoading(loading);
  }, [loading]);

  const handleChange = async (e) => {
    setLoading(true);
    let file = e.target.files[0];
    if (file) {
      Resizer.imageFileResizer(
        file,
        720,
        720,
        "JPEG",
        100,
        0,
        (uri) => {
          axios
            .post("/api/image/upload", {
              image: uri,
            })
            .then((res) => {
              //   console.log("IMAGE UPLOAD RES DATA", res);
              setImage(res.data);
              // setShowImage(res.data.url);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              console.log("CLOUDINARY UPLOAD ERR", err);
            });
        },
        "base64"
      );
    }
  };

  const handleRemove = (id) => {
    setLoading(true);
    axios
      .post(
        "/api/image/remove",
        {
          public_id: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLoading(false);
        setImage("");
      })
      .catch((err) => {
        message.error(err);
        setLoading(false);
      });
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
  return (
    <div className="mt-1 ">
      <div className="bg-gray-100 w-full h-40 relative ">
        {loading && <i className="absolute z-40 inset-1/3 ">{antIcon}</i>}
        {imageState && (
          <Image src={imageState?.url} layout="fill" objectFit="cover" />
        )}
      </div>
      <div className="grid grid-cols-2 gap-1 mt-2">
        <button
          type="button"
          onClick={() => handleRemove(imageState.public_id)}
          className="bg-red-400 text-white py-1 rounded-md"
        >
          حذف
        </button>
        <label className="input-wrapper bg-gray-600 text-white text-center py-1 rounded-md">
          اختيار الصورة
          <input
            type="file"
            accept="images/*"
            onChange={handleChange}
            hidden
            id="photo"
            name="photo"
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
