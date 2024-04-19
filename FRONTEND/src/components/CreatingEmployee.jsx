import React, { useState, useRef } from "react";
import axios from "axios";
//eslint-disable-next-line
import { v4 as uuidv4 } from "uuid";

function CreatingEmployee(){
    const employeeEl = useRef(null);
    const nameEl = useRef(null);
    const salaryEl = useRef(null);
    const empTyEl = useRef(null);
    const ageEl = useRef(null);
    const blocknoEl = useRef(null);
    const passEl = useRef(null);
    const dobEl = useRef(null);

    const [name, setName] = useState("");
    const [salary, setSalary] = useState("");
    const [empTy, setEmpTy] = useState("");
    const [age, setAge] = useState("");
    const [blockno, setBlockno] = useState("");
    const [pass, setPass] = useState("");
    const [employeeId, setEmployeeId] = useState(Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000);
    const [dob, setDob] = useState("");

    const [idCounter, setIdCounter] = useState(1);
    const handleEmployeeIdChange = (event) => {
        setEmployeeId(parseInt(event.target.value));
      };
    
      const handleGenerateEmployeeId = () => {
        const newId = employeeId + idCounter;
        setEmployeeId(newId);
        setIdCounter(idCounter + 1);
      };

      function calculateAge() {
        const dateOfBirth = new Date(dob);
        const ageDiffMs = Date.now() - dateOfBirth.getTime();
        const ageDate = new Date(ageDiffMs);
        const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
        setAge(calculatedAge);
      }
    

    const clearform = () => {
        setName("");
        setSalary("");
        setEmpTy("");
        setAge("");
        setBlockno("");
        setPass("");
        setEmployeeId("");
        setDob("");
    };

    const createEmployee = async () => {
        try {
            const res = await axios.post("http://localhost:5000/createemployee", {
                name: name,
                salary: salary,
                empTy: empTy,
                age: age,
                blockno: blockno,
                password: pass,
                employeeId: employeeId,
            });
            if (res.status === 200) {
                employeeEl.current.value = "";
                nameEl.current.value = "";
                salaryEl.current.value = "";
                empTyEl.current.value = "";
                ageEl.current.value = "";
                blocknoEl.current.value = "";
                passEl.current.value = "";
            }
        } catch (error) {
            console.log(error);
        }
    };

    function employeecreatealert() {
        alert("Employee Created Successfully with Employee Id: " + employeeId + " and Occupation: " + empTy);
    }


    const submitHandler = function (e) {
        e.preventDefault();
        createEmployee();
        clearform();
        employeecreatealert();
    };


    return (
        
        <div className="mx-auto w-full max-w-[550px]">
                <form onSubmit={submitHandler} action="" method="POST">
                <div className="mb-5">
                <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    Employee Name
                </label>
                <input
                    type="text"
                    ref={nameEl}
                    name="name"
                    id="name"
                    value={name}
                    placeholder="Employee Name"
                    onChange={() => {
                    setName(nameEl.current.value);
                    }}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                </div>  

                <div className="mb-5">
                <label
                    htmlFor="employee-id"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    Employee Id
                </label>
                <input
                    type="text"
                    name="employee-id"
                    id="employee-id"
                    value={employeeId}
                    placeholder="Employee Id"
                    onChange={handleEmployeeIdChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                <button onClick={handleGenerateEmployeeId} disabled>Auto Generated Employee Id</button>
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
          Age
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



                
                <div className="mb-5">
                <label
                    htmlFor="pass"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    Password
                </label>
                <input
                    type="password"
                    name="pass"
                    ref={passEl}
                    value={pass}
                    onChange={() => {
                    setPass(passEl.current.value);
                    }}
                    id="dob"
                    placeholder="Enter your Password"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                </div>
                
                
                <div className="mb-5">
                <label
                    htmlFor="salary"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    Salary (in Rs.)
                </label>
                <input
                    type="number"
                    ref={salaryEl}
                    name="salary"
                    id="salary"
                    value={salary}
                    placeholder="Salary"
                    onChange={() => {
                    setSalary(salaryEl.current.value);
                    }}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                </div>

                <div className="mb-5">
                <label htmlFor="empTy" className="mb-3 block text-base font-medium text-[#07074D]">
                    Employee Type
                </label>
                <select
                    id="empTy"
                    name="empTy"
                    value={empTy}
                    onChange={(e) => {
                    setEmpTy(e.target.value);
                    }}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                    <option value="">Select an option</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Gardener">Gardener</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Carpenter">Carpenter</option>
                </select>
                </div>



                <div className="mb-5">
                    <label htmlFor="block-no" className="mb-3 block text-base font-medium text-[#07074D]">
                        Block Number
                    </label>
                    <select
                        name="block-no"
                        id="block-no"
                        ref={blocknoEl}
                        value={blockno}
                        onChange={() => {
                        setBlockno(blocknoEl.current.value);
                        }}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                        <option value="">Select Block Number</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>



                <div className="flex w-full">
                <button className="mx-auto hover:shadow-form  py-3 px-8 text-white bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none hover:bg-white hover:text-blue-500 transition-all duration-300 hover:border-blue-500 border-transparent border-2">
                    Submit
                </button>
                </div>
            </form>
        </div>
    );
}

export default CreatingEmployee;
