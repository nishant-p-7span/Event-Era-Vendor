import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Bookings = () => {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const [tickets, setTickets] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [seats, setSeats] = useState(0);

  useEffect(() => {
    // Function to fetch users
    const fetchUsers = async () => {
      try {
        // Adjust the URL to match your API endpoint
        const response = await axios.get(
          "https://api.theeventera.live/api/bookings/event/" + id
        );
        setUsers(response.data); // Store the users in state
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []); // The empty array ensures this effect runs only once on mount
  useEffect(() => {
    // Function to fetch users
    const fetchUsers = async () => {
      try {
        // Adjust the URL to match your API endpoint
        const response = await axios.get(
          "https://api.theeventera.live/api/bookings/event/" + id
        );
        setTickets(response.data.length); // Store the users in state
        const totalRevenue = response.data.reduce((total, item) => {
          // Calculate revenue for each item
          const revenueForItem =
            item.no_seats * item.total_amount + item.platform_charges;
          // Add revenue for this item to the total revenue
          return total + revenueForItem;
        }, 0);
        setRevenue(totalRevenue);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    try {
      axios
        .get("https://api.theeventera.live/api/events/details/" + id)
        .then((response) => {
          console.log(response.data);
          setSeats(response.data.number_of_seats);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log("Err signing up", err);
    }
  }, [id]);

  const cards = [
    {
      name: "Total Tickets",
      href: "#",
      icon: false,
      amount: tickets,
    },

    {
      name: "Total Revenue",
      href: "#",
      icon: false,
      amount: revenue,
    },
    {
      name: "Remaining Seats",
      href: "#",
      icon: false,
      amount: seats,
    },
    // More items...
  ];

  return (
    <div>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {cards.map((card) => (
         <div
         key={card.name}
         className="overflow-hidden rounded-lg bg-white shadow"
       >
        <div className="bg-red-500 text-white rounded-lg p-4 flex flex-col items-center justify-center">
       <h2 className="text-xl font-semibold">{card.name}</h2>
       <p className="text-4xl font-bold">{card.amount}</p>
     </div>

       </div>
        ))}
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Email
              </th>
              <th scope="col" className="px-6 py-3">
                No. of tickets
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Id
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
              >
                <td className="px-6 py-4">{user.user_email}</td>
                <td className="px-6 py-4">{user.no_seats}</td>
                <td className="px-6 py-4">{user.payment_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
