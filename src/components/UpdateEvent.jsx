import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    event_name: "",
    number_of_seats: "",
    price: "",
    event_date: "",
    event_time: "",
    artist_name: "",
    artist_description: "",
    // Initialize your state for files
    artist_img: null,
    banner_img: null,
    poster_img: null,
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://api.theeventera.live/api/events/details/${id}`
        );
        setEventData({
          ...data,
          artist_img: null,
          banner_img: null,
          poster_img: null,
        }); // Reset file inputs
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEventDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEventData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = new eventData();
    Object.keys(eventData).forEach((key) => {
      if (eventData[key] !== null) eventData.append(key, eventData[key]);
    });

    try {
      await axios.put(
        `https://api.theeventera.live/api/events/update/${id}`,
        eventData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      navigate("/events"); // Or wherever you wish to redirect
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Update Event
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label
            htmlFor="event_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Event Name
          </label>
          <input
            type="text"
            name="event_name" // Change this line
            id="event_name" // It's a good practice to also change the id to match the name
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type Event name"
            value={eventData.event_name}
            onChange={handleChange}
            required=""
          />
        </div>
      </div>
      <div className="pt-5">
        <button
          type="submit"
          class="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Update event{" "}
        </button>
      </div>
    </form>
  );
};

export default UpdateEvent;
