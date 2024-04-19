import React, { useState, useRef } from "react";
import axios from "axios";
//eslint-disable-next-line
import { v4 as uuidv4 } from "uuid";

function CreatingUser() {
  const nameEl = useRef(null);
  const ageEl = useRef(null);
  const adhaarEl = useRef(null);
  const dobEl = useRef(null);
  const aggreeEl = useRef(null);
  const ownerEl = useRef(null);
  const roomEl = useRef(null);
  const passEl = useRef(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [adhaar, setAdhaar] = useState("");
  const [dob, setDob] = useState("");
  const [ownerId, setOwnerId] = useState(Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000);
  const [roomno, setRoomno] = useState("");
  const [pass, setPass] = useState("");
  const [aggrementStatus, setAggrementStatus] = useState("");

  const [idCounter, setIdCounter] = useState(1);

  const handleOwnerIdChange = (event) => {
    setOwnerId(parseInt(event.target.value));
  };

  const handleGenerateOwnerId = () => {
    const newId = ownerId + idCounter;
    setOwnerId(newId);
    setIdCounter(idCounter + 1);
  };

  function calculateAge() {
    const dateOfBirth = new Date(dob);
    const ageDiffMs = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(ageDiffMs);
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    setAge(calculatedAge);
  }

  function handleAdhaarChange() {
    const adhaarValue = adhaarEl.current.value.replace(/\D/g, '');
    if (adhaarValue.length <= 12) {
      setAdhaar(adhaarValue);
    }
  }

  const clearform = () => {
    setName("");
    setAge("");
    setAdhaar("");
    setDob("");
    setOwnerId("");
    setRoomno("");
    setPass("");
    setAggrementStatus("");
  };



  const post = async () => {
    try {
      const res = await axios.post("http://localhost:5000/createowner", {
        name: name,
        age: age,
        ownerId: ownerId,
        adhaar: adhaar,
        roomno: roomno,
        password: pass,
        aggrementStatus: aggrementStatus,
        dob: dob,
      });
      if (res.status === 200) {
        nameEl.current.value = "";
        ageEl.current.value = "";
        adhaarEl.current.value = "";
        dobEl.current.value = "";
        ownerEl.current.value = "";
        aggreeEl.current.value = "";
        passEl.current.value = "";
        roomEl.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  function ownerAlert() {
    alert("Owner Created Successfully with Owner Id: " + ownerId + " for apartment " + roomno);
  }

  const submitHandler = function (e) {
    e.preventDefault();
    post();
    clearform();
    ownerAlert();
  };



  return (
    <div className="mx-auto w-full max-w-[550px]">
      <form onSubmit={submitHandler} action="" method="POST">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Full Name
          </label>
          <input
            type="text"
            ref={nameEl}
            name="name"
            id="name"
            value={name}
            placeholder="Full Name"
            onChange={() => {
              setName(nameEl.current.value);
            }}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

    <div className="mb-5">
      <label htmlFor="owner-id" className="mb-3 block text-base font-medium text-[#07074D]">
        Owner Id
      </label>
      <input
        type="text"
        name="owner-id"
        id="owner-id"
        value={ownerId}
        placeholder="Owner Id"
        onChange={handleOwnerIdChange}
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
      <button onClick={handleGenerateOwnerId} disabled>Auto Generated Owner Id</button>
    </div>



        <div className="mb-5">
          <label
            htmlFor="room-no"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Room no
          </label>
          <input
            type="text"
            ref={roomEl}
            name="room-no"
            id="room-no"
            value={roomno}
            placeholder="Room no"
            onChange={() => {
              setRoomno(roomEl.current.value);
            }}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div>
      <div className="mb-5">
        <label
          htmlFor="owner-id"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Agreement Status
        </label>
        <div className="flex flex-row">
          <label className="mr-4">
            <input
              type="radio"
              name="aggrementStatus"
              value="Yes"
              checked={aggrementStatus === 'Yes'}
              onChange={() => {
                setAggrementStatus('Yes');
              }}
              className="mr-2"
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="aggrementStatus"
              value="No"
              checked={aggrementStatus === 'No'}
              onChange={() => {
                setAggrementStatus('No');
              }}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>
    </div>
    <div>
      <div className="mb-5">
        <label
          htmlFor="dob"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          DOB
        </label>
        <input
          type="date"
          name="dob"
          ref={dobEl}
          value={dob}
          onChange={() => {
            setDob(dobEl.current.value);
            calculateAge();
          }}
          id="dob"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="age"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Age (Auto Derived)
        </label>
        <input
          type="text"
          name="age"
          id="age"
          value={age}
          readOnly
          placeholder="Age"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
    </div>
    <div>
      <div className="mb-5">
        <label
          htmlFor="Adhaar"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Aadhaar (12 digit number only)
        </label>
        <input
          type="text"
          ref={adhaarEl}
          value={adhaar}
          onChange={handleAdhaarChange}
          name="Adhaar"
          id="Adhaar"
          placeholder="Enter your Aadhaar"
          maxLength={12}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
    </div>

        <div className="mb-5">
          <label
            htmlFor="pass"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Password (8 characters minimum)
          </label>
          <input
            type="password"
            name="pass"
            ref={passEl}
            value={pass}
            onChange={() => {
              setPass(passEl.current.value);
            }}
            id="pass"
            placeholder="Enter your Password"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>



        <div className="flex w-full">
          <button className="mx-auto hover:shadow-form  py-3 px-8 text-white bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none hover:bg-white hover:text-blue-500 transition-all duration-300 hover:border-blue-500 border-transparent border-2" id="submitbtn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatingUser;
