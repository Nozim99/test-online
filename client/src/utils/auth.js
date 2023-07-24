import axios from "axios";
import { url } from "../Data/url";

export const sendRegister = (register) => {
  const formData = new FormData();
  formData.append("image", register.image);
  formData.append("name", register.name);
  formData.append("password", register.password);

  axios.post(url.basic + url.userCreate, formData)
    .then((response) => {
      console.log(response)
    // response.data = {image, name, token}
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.error) {
        console.log(err.response.data.error)
      } else {
        console.log(err)
      }
    })
}

export const checkUserName = (name, setNameLoad) => {
  const encodeName = encodeURIComponent(name.trim());
  setNameLoad(true)
  axios.get(url.basic + url.checkUserName + encodeName)
    .then((result) => {
      console.log(result.data)
      setNameLoad(false)
      return { data: result.data.isEmpty, error: false };
    })
    .catch((err) => {
      console.error(err);
      setNameLoad(false)
      return { error: true }
    })
}