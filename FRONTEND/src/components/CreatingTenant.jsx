import React, { useState, useRef } from "react";
import axios from "axios";

function CreatingTenant() {
  const tenantEl = useRef(null);
  const nameEl = useRef(null);
  const ageEl = useRef(null);
  const dobEl = useRef(null);
  const roomEl = useRef(null);
  const passEl = useRef(null);

  const adhaarEl = useRef(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [roomno, setRoomno] = useState("");
  const [pass, setPass] = useState("");
  const [tenantno, setTenantno] = useState(Math.floor(Math.random() * (8888 - 1000 + 1)) + 1000);
  const [adhaar, setAdhaar] = useState("");

  const [idCounter, setIdCounter] = useState(1);

  const handleTenantIdChange = (event) => {
    setTenantno(parseInt(event.target.value));
  };
  const handleGenerateTenantId = () => {
    const newId = tenantno + idCounter;
    setTenantno(newId);
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
    const adhaarValue = adhaarEl.current.value.replace(/\D/g, "");
    if (adhaarValue.length <= 12) {
      setAdhaar(adhaarValue);
    }
  }

  const clearform = () => {
    setName("");
    setAge("");
    setAdhaar("");
    setDob("");
    setTenantno("");
    setRoomno("");
    setPass("");
  };

  function tenantalert() {
    alert("Tenant Created Successfully with Tenant ID: " + tenantno + "for Room No: " + roomno);
  }

  const createTenant = async () => {
    try {
      const res = await axios.post("http://localhost:5000/createtenant", {
        name: name,
        age: age,
        roomno: roomno,
        tenantno: tenantno,
        password: pass,
        adhaar: adhaar,
        dob: dob,
      });
      if (res.status === 200) {
        tenantEl.current.value = "";
        nameEl.current.value = "";
        ageEl.current.value = "";
        roomEl.current.value = "";
        passEl.current.value = "";
        adhaarEl.current.value = "";
        dobEl.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = function (e) {
    e.preventDefault();
    createTenant();
    clearform();
    tenantalert();    
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
          <label
            htmlFor="tenant-no" className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Tenant No.
          </label>
          <input
            type="text"
            name="tenant-no"
            id="tenant-no"
            value={tenantno}
            placeholder="Tenant No."
            onChange={handleTenantIdChange}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          <button onClick={handleGenerateTenantId} disabled>Auto Generated Tenant No.</button>
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
            placeholder="Enter your dob"
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
        
        <div className="mb-5">
          <label
            htmlFor="adhaar"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Adhaar (12 digit number only)
          </label>
          <input
            type="type"
            name="adhaar"
            ref={adhaarEl}
            id="adhaar"
            value={adhaar}
            onChange={handleAdhaarChange}
            placeholder="Adhaar"
            maxLength={12}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
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
          <button className=" mx-auto hover:shadow-form  py-3 px-8 text-white bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none hover:bg-white hover:text-blue-500 transition-all duration-300 hover:border-blue-500 border-transparent border-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatingTenant;
