import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tickets, setTickets] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [events, setEvents] = useState(0);

  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await axios.get(
          `https://api.theeventera.live/api/events/vendor/${email}`
        );

        const bookingsResponse = await axios.get(
          "https://api.theeventera.live/api/bookings/allbooking"
        );

        const filteredBookings = bookingsResponse.data.filter(
          (booking) => booking.user_email === email
        );

        const totalTicketsSold = filteredBookings.reduce(
          (total, booking) => total + booking.no_seats,
          0
        );

        setTickets(totalTicketsSold);

        const totalRevenue = filteredBookings.reduce(
          (total, booking) =>
            total +
            booking.total_amount +
            booking.platform_charges * booking.no_seats,
          0
        );

        setRevenue(totalRevenue);
        setEvents(eventsResponse.data.length);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [email]);

  const cards = [
    {
      name: "Total Events",
      amount: events,
    },
    {
      name: "Total Tickets",
      amount: tickets,
    },
    {
      name: "Total Revenue",
      amount: `₹${revenue}`,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg bg-white shadow"
        >
          <div className="bg-red-500 text-white rounded-lg p-4 flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold">{card.name}</h2>
            <p className="text-4xl font-bold">{card.amount}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
