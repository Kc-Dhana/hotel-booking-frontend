const bookings = [
    {
      bookingId: 1,
      roomId: 101,
      email: "john.doe@example.com",
      status: "Pending",
      reason: "Vacation",
      start: "2024-10-01",
      end: "2024-10-05",
      notes: "Prefer a room with a sea view.",
      timestamp: "2024-09-25T10:30:00Z",
    },
    {
      bookingId: 2,
      roomId: 102,
      email: "jane.smith@example.com",
      status: "Confirmed",
      reason: "Conference",
      start: "2024-10-10",
      end: "2024-10-12",
      notes: "Require a projector in the room.",
      timestamp: "2024-09-26T11:15:00Z",
    },
    {
      bookingId: 3,
      roomId: 103,
      email: "robert.brown@example.com",
      status: "Cancelled",
      reason: "Personal",
      start: "2024-11-01",
      end: "2024-11-03",
      notes: "Cancel due to unexpected travel.",
      timestamp: "2024-09-27T14:45:00Z",
    },
    {
      bookingId: 4,
      roomId: 104,
      email: "alice.johnson@example.com",
      status: "Pending",
      reason: "Business",
      start: "2024-12-05",
      end: "2024-12-10",
      notes: "Early check-in requested.",
      timestamp: "2024-09-28T09:00:00Z",
    },
    {
      bookingId: 5,
      roomId: 105,
      email: "michael.davis@example.com",
      status: "Confirmed",
      reason: "Family Gathering",
      start: "2024-12-15",
      end: "2024-12-20",
      notes: "Need adjoining rooms for family.",
      timestamp: "2024-09-29T12:30:00Z",
    },
  ];
export default function AdminBooking() {
    return (
        <div className="w-full">
            <table className="table-auto border-collapse w-full text-left">
                <thead>
                    <tr className="bg-blue-400 text-white">
                        <th className="px-4 py-2">Booking ID</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Start Date</th>
                        <th className="px-4 py-2">End Date</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map(   /* Array eke map dapuwama array eke item ekin eka func eka run wenwa*/
                        (booking)=>{       
                            return(       /* returen eke athule mona hari dammeoth func eke runwena ganatama anuwa eka print wenwa*/
                                <tr key={booking.bookingId}>     {/* aye aye render wena componet tiyewa nam parent tag ekata uniq key daganna*/}
                                    <td>
                                        {booking.bookingId}
                                    </td>
                                    <td>
                                        {booking.email}
                                    </td>
                                    <td>
                                        {booking.start}
                                    </td>
                                    <td>
                                        {booking.end}
                                    </td>
                                    <td>
                                        {booking.status}
                                    </td>
                                    <td>
                                        {booking.reason}
                                    </td>
                                </tr>
                        )
                        }
                     )
                    }
                </tbody>
            </table>
        </div>
    );
}
