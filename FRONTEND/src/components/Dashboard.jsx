import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { HamContext } from "../HamContextProvider";

function Dashboard(props) {

  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      src: require('../images/apartment1.jpg'),
      alt: 'Slide 1'
    },
    {
      src: require('../images/apartment.jpg'),
      alt: 'Slide 2'
    },
    {
      src: require('../images/apartment2.jpg'),
      alt: 'Slide 3'
    }
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Change this value to adjust the slide interval

    return () => clearInterval(intervalId);
  }, []);

  const handleSlideClick = (index) => {
    setActiveIndex(index);
  };


  const { hamActive, hamHandler } = useContext(HamContext);
  const [forBox, setForBox] = useState();

  const getBoxInfo = async () => {
    const whom = JSON.parse(window.localStorage.getItem("whom")).userType;
    try {
      const res = await axios.post(`http://localhost:5000/dashboard/${whom}`, {
        userId: JSON.parse(window.localStorage.getItem("whom")).username,
      });
      if (whom === "admin") {
        const forAdminBox = [
          { "Total Owner": 59 },
          { "Total Tenant": 39 },
          { "Total Employee": 20 },
        ];
        forAdminBox[0]["Total Owner"] = res.data.totalowner;
        forAdminBox[2]["Total Employee"] = res.data.totalemployee;
        forAdminBox[1]["Total Tenant"] = res.data.totaltenant;
        setForBox(forAdminBox);
      }
      if (whom === "owner") {
        const forOwnerBox = [
          { "No of Emloyees": 5 },
          // { "Total Tenant": 4 },
          { "Total complaints": 2 },
        ];
        forOwnerBox[0]["No of Emloyees"] = res.data.totalemployee;
        // forOwnerBox[1]["Total Tenant"] = res.data.totaltenant;
        forOwnerBox[1]["Total complaints"] = res.data.totalcomplaint;
        setForBox(forOwnerBox);
      }
      if (whom === "employee") {
        const forEmployeeBox = [
          { "Total complaints": 31 },
          { Salary: "Rs. 20,0000" },
        ];
        forEmployeeBox[0]["Total complaints"] = res.data.totalcomplaint;
        forEmployeeBox[1].Salary = "Rs. " + res.data.salary;
        setForBox(forEmployeeBox);
      }
      if (whom === "tenant") {
        const forTenantBox = [
          { "tenant id": 12132 },
          { "Tenant Name": "Tharun" },
          { "Tenant age": 20 },
          { dob: "12-1-2002" },
          { "Room no": 123456 },
        ];
        forTenantBox[0]["tenant id"] = res.data[0].tenant_id;
        forTenantBox[1]["Tenant Name"] = res.data[0].name;
        forTenantBox[2]["Tenant age"] = res.data[0].age;
        forTenantBox[3].dob = res.data[0].dob;
        forTenantBox[4]["Room no"] = res.data[0].room_no;
        setForBox(forTenantBox);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBoxInfo();
  }, []);

  return (
    <div
      onClick={() => {
        if (hamActive === true) {
          hamHandler();
        }
      }}
      style={{
        filter: hamActive ? "blur(2px)" : "blur(0px)",
      }}
      className="w-screen"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 md:grid-rows-2 gap-5 p-10">
        {forBox &&
          forBox.map((ele, index) => {
            return (
              <div key={index + 1} className=" p-3 border-2 border-red-500">
                <h1 className="font-bold text-xl text-center">
                  {Object.values(forBox[index])}
                </h1>
                <p className="font-bold text-center text-sm capitalize">
                  {Object.keys(forBox[index])}
                </p>
              </div>
            );
          })}
      </div>
      <div className="carousel slide mx-5 mb-1.5" data-carousel="slide" style={{height:'30rem', marginTop:'-1.5rem'}}>
      <div className="carousel-inner" style={{height:'30rem'}}>
        {slides.map((slide, index) => (
          <div className={`carousel-item${index === activeIndex ? ' active' : ''}`} key={index}>
            <img src={slide.src} className="d-block w-100" alt={slide.alt} onClick={() => handleSlideClick(index)} />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    
    </div>
  );
}

export default Dashboard;
