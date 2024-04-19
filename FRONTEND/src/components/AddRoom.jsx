import { useState, useRef, useEffect } from 'react';
import axios from "axios";

function AddRoom(){
    const roomNumberEl = useRef(null);
    const typeEl = useRef(null);
    const floorEl = useRef(null);
    const blocknoEl = useRef(null);

    const [roomNumber, setRoomNumber] = useState("");
    const [type, setType] = useState("");
    const [floor, setFloor] = useState("");
    const [blockno, setBlockno] = useState("");
    
    const AddRoom = async () => {
        try {
            const res = await axios.post("http://localhost:5000/createroom", {
                roomNumber:roomNumber,
                type:type,
                floor:floor,
                blockno: blockno,
            });
            if (res.status === 200) {
                roomNumberEl.current.value = "";
                typeEl.current.value = "";
                floorEl.current.value = "";
                blocknoEl.current.value = "";
            }
        } catch (error) {
            console.log(error);
        }
    };

    const clearform = () => {
        setRoomNumber("");
        setType("");
        setFloor("");
        setBlockno("");
    };

    function roomalert() {
        alert("Room Created Successfully with Room Number: " + roomNumber + " for apartment " + blockno);
    }

    
    const submitHandler = function (e) {
        e.preventDefault();
        AddRoom();
        clearform();
        roomalert();
    };
    useEffect(() => {
        if (roomNumber.length === 3) {
          setFloor(roomNumber.charAt(0));
        } else if (roomNumber.length === 4) {
          setFloor(roomNumber.substring(0, 2));
        } else {
          setFloor('');
        }
      }, [roomNumber]);
    




    return (
        
        <div className="mx-auto w-full max-w-[550px]">
                <form onSubmit={submitHandler} action="" method="POST">
                <div className="mb-5">
                    <label
                    htmlFor="roomNumber"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                    Room Number
                    </label>
                    <input
                    type="text"
                    ref={roomNumberEl}
                    name="roomNumber"
                    id="roomNumber"
                    value={roomNumber}
                    placeholder="Room Number"
                    onChange={() => {
                        setRoomNumber(roomNumberEl.current.value);
                        }}
                    maxLength={4}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>


                <div className="mb-5">
                    <label
                        htmlFor="type"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                        Type
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={type}
                        onChange={(event) => {
                        setType(event.target.value);
                        }}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                        <option value="">Select Room Type</option>
                        <option value="1bhk">1 BHK</option>
                        <option value="2bhk">2 BHK</option>
                        <option value="3bhk">3 BHK</option>
                    </select>
                    </div>

                    <div className="mb-5">
                        <label
                        htmlFor="floor"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                        Floor
                        </label>
                        <input
                        type="text"
                        name="floor"
                        ref={floorEl}
                        id="floor"
                        value={floor}
                        placeholder="Floor"
                        onChange={() => {
                            setFloor(floorEl.current.value);
                        }}
                        disabled={true}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                
                    <div className="mb-5">
                    <label
                        htmlFor="block-no"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                        Block Number
                    </label>
                    <select
                        ref={blocknoEl}
                        name="block-no"
                        id="block-no"
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

export default AddRoom;
