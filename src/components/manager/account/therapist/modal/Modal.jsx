import React, { useEffect, useState } from "react";
import ICONS from "../../../../../constants/icons";
import Select from "../../../../common/select/Select";
import InputImage from "../../../services/services/modal/add/inputImage/InputImage";
import ElevatedButton from "../../../../common/button/elevated/ElevatedButton";
import axios from "axios";
import BASE from "../../../../../constants/base";

const Modal = ({
  handleCloseModal,
  itemUpdate,
  setRefreshData,
  setItemUpdate,
}) => {
  const [images, setImages] = useState([]);
  const [refreshImage, setRefreshImage] = useState(false);
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState();
  const [loadding, setLoading] = useState(false);
  const [experience, setExperience] = useState();

  const handleAddImage = (event, index) => {
    const image = event.target.files[0];
    if (index) {
      let imagesUpdate = images;
      imagesUpdate[index] = image;
      setImages(imagesUpdate);
    } else {
      let imagesAdd = images;
      imagesAdd.push(image);
      setImages(imagesAdd);
    }
    event.target.value = null;
    setRefreshImage((prev) => !prev);
  };

  const handleAddTherapist = async () => {
    setLoading(true);
    const data = {
      request: JSON.stringify({
        name: name,
        password: password,
        email: email,
        phone: phone,
        gender: String(gender).toLocaleUpperCase(),
        roles: ["THERAPIST"],
        experience: experience,
      }),
      images: images,
    };
    try {
      const response = await axios.post(`${BASE.BASE_URL}/admin/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!response || response.status !== 201) throw new Error();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshData((prev) => !prev);
      setLoading(false);
    }
  };

  const handleSaveImage = async (data) => {
    const formData = new FormData();
    Array.isArray(data) &&
      data.forEach((item) => {
        formData.append("images", item);
      });
    try {
      const response = await axios.post(
        `${BASE.BASE_URL}/upload-files`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!response || response.status !== 200) throw new Error();
      return response.data.data.successFiles;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleUpdateTherapist = async () => {
    setLoading(true);
    const data = {
      accountId: itemUpdate?.account.id,
      name: name,
      phone: phone,
      experience: experience,
      gender: String(gender).toLocaleUpperCase(),
      imagesID: images,
    };
    console.log(images, "images");
    const image = [];
    const imagesIdAvailable = [];
    images &&
      images.forEach((item) => {
        if (item instanceof File) {
          image.push(item);
        } else {
          imagesIdAvailable.push(item.id);
        }
      });
    if (image.length > 0) {
      const imagesIds = await handleSaveImage(image);
      imagesIds &&
        Array.isArray(imagesIds) &&
        imagesIds.forEach((item) => {
          imagesIdAvailable.push(item.id);
        });
    }
    data.imagesID = imagesIdAvailable;
    try {
      const response = await axios.put(
        `${BASE.BASE_URL}/update-therapist`,
        data
      );
      if (!response || response.status !== 200) throw new Error();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshData((prev) => !prev);
      setLoading(false);
    }
  };

  const handleDeleteImage = (index) => {
    let imageUpdate = images.filter((_, _index) => _index !== index);
    setImages(imageUpdate);
  };

  const handleCloseModalTherapist = () => {
    setItemUpdate();
    handleCloseModal();
  };

  useEffect(() => {
    if (itemUpdate) {
      setName(itemUpdate.account.name);
      setEmail(itemUpdate.account.email);
      setPhone(itemUpdate.account.phone);
      setExperience(itemUpdate.experience);
      setGender(itemUpdate.account.gender);
      setImages(itemUpdate.images);
      setRefreshImage((prev) => !prev);
    }
  }, [itemUpdate]);

  return (
    <div className="w-[30vw] max-h-[94vh] min-h-[70vh] min-w-[500px] bg-white relative rounded-[.375rem] p-5 overflow-y-scroll">
      <img
        onClick={() => handleCloseModalTherapist()}
        src={ICONS.close}
        alt=""
        className="w-[20px] top-2.5 right-2.5 absolute cursor-pointer"
      />
      <h3 className="text-[20px] font-medium text-[rgba(0,0,0,0.5)] ">
        {itemUpdate ? "UPDATE THERAPIST" : "NEW THERAPIST"}
      </h3>
      <div className="mt-10 mb-10">
        <div className="grid max-w-[300px]">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.5)]">
            Name
          </label>
          <input
            type="text"
            placeholder="Therapist name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-12 border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
          />
        </div>
        {!itemUpdate && (
          <div className="grid mt-5  max-w-[350px]">
            <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.5)]">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter therapist email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
            />
          </div>
        )}

        {!itemUpdate && (
          <div className="grid mt-5 max-w-[300px]">
            <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.5)]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter therapist password"
              className="h-12 border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
            />
          </div>
        )}

        <div className="grid mt-5 max-w-[200px]">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.5)]">
            Phone
          </label>
          <input
            type="text"
            placeholder="0000000000"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="h-12 border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
          />
        </div>
        <div className="flex gap-x-10">
          <div className="grid mt-5 max-w-[200px]">
            <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.5)]">
              Experience
            </label>
            <input
              type="text"
              placeholder="Two year"
              value={experience}
              onChange={(event) => setExperience(event.target.value)}
              className="h-12 border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
            />
          </div>
          <div className="grid mt-5 max-w-[200px]">
            <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.5)]">
              Gender
            </label>

            <Select
              text="Select Gender"
              setListSelected={setGender}
              itemReadySelect={gender}
              width="150px"
              list={["Male", "Female"]}
            />
          </div>
        </div>
        <div className="mb-10 max-w-[40vw] mt-5">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.5)]">
            Image
          </label>
          <div className="flex flex-wrap gap-5 mt-3">
            {images &&
              images.map((item, index) => (
                <InputImage
                  key={index}
                  width="100px"
                  height="100px"
                  imageObject={item}
                  index={index}
                  handleChangeImage={handleAddImage}
                  showDeleteImage={true}
                  refreshImage={refreshImage}
                  handleDeleteImage={handleDeleteImage}
                />
              ))}
            <InputImage
              width="100px"
              height="100px"
              handleChangeImage={handleAddImage}
            />
          </div>
        </div>
        <ElevatedButton
          height="50px"
          rounded="0.375rem"
          text={itemUpdate ? "Update" : "Create"}
          isLoading={loadding}
          handleOnclick={
            itemUpdate ? handleUpdateTherapist : handleAddTherapist
          }
        />
      </div>
    </div>
  );
};

export default Modal;
