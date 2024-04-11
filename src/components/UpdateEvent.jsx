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
    // artist_img: null,
    // banner_img: null,
    // poster_img: null,
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://api.theeventera.live/api/events/details/${id}`
        );
        setEventData(
          data
          // artist_img: null,
          // banner_img: null,
          // poster_img: null,
        ); // Reset file inputs
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

    const formData = new FormData();
    Object.entries(eventData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.put(
        `https://api.theeventera.live/api/events/update/${id}`,
        formData,
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
        <div className="w-full">
          <label
            htmlFor="number_of_seats"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Number of Seats
          </label>
          <input
            type="number"
            name="number_of_seats"
            id="number_of_seats"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Enter number of seats"
            value={eventData.number_of_seats}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="₹2999"
            value={eventData.price}
            onChange={handleChange}
            required
          />
        </div>
        {/* Event Date */}
        <div>
          <label
            htmlFor="event_date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Event Date
          </label>
          <input
            type="date"
            id="event_date"
            name="event_date"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            value={eventData.event_date}
            onChange={handleChange}
            required
          />
        </div>
        {/* Event Time */}
        <div>
          <label
            htmlFor="event_time"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Event Time
          </label>
          <input
            type="time"
            id="event_time"
            name="event_time"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            value={eventData.event_time}
            onChange={handleChange}
            required
          />
        </div>
        {/* Artist Name */}
        <div>
          <label
            htmlFor="artist_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Artist Name
          </label>
          <input
            type="text"
            id="artist_name"
            name="artist_name"
            placeholder="Artist Name"
            value={eventData.artist_name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        {/* Artist Description */}
        <div>
          <label
            htmlFor="artist_description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Artist Description
          </label>
          <textarea
            id="artist_description"
            name="artist_description"
            rows="4"
            placeholder="About the Artist"
            value={eventData.artist_description}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          ></textarea>
        </div>
        {/* <div className="sm:col-span-2">
          <label
            htmlFor="artist_img"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Artist Image
          </label>
          <div className="flex w-full p-1 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus-within:ring-primary-600 focus-within:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus-within:ring-primary-500 dark:focus-within:border-primary-500">
            <input
              type="file"
              name="artist_img"
              id="artist_image"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className="w-full p-1 bg-transparent border-none focus:ring-0"
              required
            />
          </div>
        </div> */}
        {/* <div className="sm:col-span-2">
          <label
            htmlFor="banner_image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Banner Image
          </label>
          <div className="flex w-full p-1 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus-within:ring-primary-600 focus-within:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus-within:ring-primary-500 dark:focus-within:border-primary-500">
            <input
              type="file"
              name="banner_img"
              id="banner_image"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className="w-full p-1 bg-transparent border-none focus:ring-0"
              required
            />
          </div>
        </div> */}
        {/* <div className="sm:col-span-2">
          <label
            htmlFor="poster_image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Poster Image
          </label>
          <div className="flex w-full p-1 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus-within:ring-primary-600 focus-within:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus-within:ring-primary-500 dark:focus-within:border-primary-500">
            <input
              type="file"
              name="poster_img"
              id="poster_image"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className="w-full p-1 bg-transparent border-none focus:ring-0"
              required
            />
          </div>
        </div> */}

        {/* Google Map URL */}
        <div>
          <label
            htmlFor="google_map_url"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Google Map URL
          </label>
          <textarea
            type="text"
            id="google_map_url"
            name="google_map_url"
            placeholder="Google Map URL"
            value={eventData.google_map_url}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={eventData.city}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <select
          id="category"
          name="category" // Ensure the 'name' attribute matches the key in your eventData state.
          value={eventData.category} // Set the select's value to match the eventData state.
          onChange={handleChange} // Use the same handleChange function to update state.
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >
          <option value="">Select category</option>{" "}
          <option value="music">Music</option>{" "}
          <option value="dance">Dance</option>
          <option value="tech">Tech</option>
          <option value="theater">Theater</option>
          <option value="festival">Festival</option>
          <option value="sports">Sports</option>{" "}
          <option value="parties">Parties</option>
        </select>

        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={8}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Your description here"
            value={eventData.description}
            onChange={handleChange}
            required
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
