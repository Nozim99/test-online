import {BiImageAdd} from "react-icons/bi";
import {useState} from "react";

const AddImage = ({setImage}) => {
  const [imageUrl, setImageUrl] = useState("")

  const imageHandler = (e) => {
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }

  return (
    <div className="flex justify-center mb-6">
      <label
        style={imageUrl ? {backgroundImage: `url(${imageUrl})`} : {}}
        htmlFor="image"
        className="flex justify-center items-center w-24 h-24 rounded-full cursor-pointer border border-neutral-400 dark:border-blue-500 bg-center bg-no-repeat bg-cover"
      >
        {imageUrl ? "" : <BiImageAdd className="text-5xl text-[#797CAB]"/>}
      </label>
      <input onChange={imageHandler} id="image" type="file" accept="image/*" className="hidden"/>
    </div>
  );
};

export default AddImage;