import React, { useState } from "react";
import ElevatedButton from "../../../../common/button/elevated/ElevatedButton";
import Select from "../../../../common/select/Select";
import ICONS from "../../../../../constants/icons";
import axios from "axios";
import BASE from "../../../../../constants/base";

const Modal = ({ handleCloseModal }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState();
  const [loading, setLoading] = useState(false);

  const handleAddStaff = async () => {
    setLoading(true);
    const data = {
      request: JSON.stringify({
        name: name,
        password: password,
        email: email,
        phone: phone,
        gender: String(gender).toLocaleUpperCase(),
        roles: ["STAFF"],
        experience: "",
      }),
      images: "",
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
      setLoading(false);
    }
  };

  return (
    <div
      className="w-[30vw] max-h-[94vh] min-h-[70vh] min-w-[500px] bg-white relative rounded-[.375rem] p-5 overflow-y-scroll"
      //   style={{ animation: active ? "fade-in 0.3s" : "fade-out 0.3s" }}
    >
      <img
        onClick={() => handleCloseModal()}
        src={ICONS.close}
        alt=""
        className="w-[20px] top-2.5 right-2.5 absolute cursor-pointer"
      />
      <h3 className="text-[20px] font-medium text-[rgba(0,0,0,0.5)] ">
        NEW STAFF
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
        <div className="grid mt-5 max-w-[300px]">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.5)]">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter therapist password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
          />
        </div>
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
        <div className="grid mt-5 mb-10 max-w-[200px]">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.5)]">
            Gender
          </label>
          <Select
            text="Select Gender"
            setListSelected={setGender}
            width="150px"
            list={["Male", "Female"]}
          />
        </div>
        <ElevatedButton
          isLoading={loading}
          height="50px"
          rounded="0.375rem"
          text="Create"
          handleOnclick={handleAddStaff}
        />
      </div>
    </div>
  );
};

export default Modal;
