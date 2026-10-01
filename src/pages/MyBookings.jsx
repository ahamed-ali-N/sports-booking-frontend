import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  IndianRupee,
  CheckCircle2,
  XCircle,
  LayoutGrid,
} from "lucide-react";

function MyBookings({ onBack }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL");

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/bookings"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();

      setBookings(data);
    } catch (error) {
      console.error("Bookings error:", error);

      alert(
        "Unable to load bookings. Make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    setCancellingId(bookingId);

    try {
      const response = await fetch(
        `http://localhost:8081/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          "Cancel booking failed:",
          errorText
        );

        throw new Error("Failed to cancel booking");
      }

      const updatedBooking = await response.json();

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.id === bookingId
            ? updatedBooking
            : booking
        )
      );

      alert("Booking cancelled successfully.");
    } catch (error) {
      console.error("Cancel booking error:", error);

      alert(
        "Unable to cancel booking. Please try again."
      );
    } finally {
      setCancellingId(null);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeFilter === "UPCOMING") {
      return booking.status === "CONFIRMED";
    }

    if (activeFilter === "CANCELLED") {
      return booking.status === "CANCELLED";
    }

    return true;
  });

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "CONFIRMED"
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status === "CANCELLED"
  ).length;

  const filterButtons = [
    {
      id: "ALL",
      label: "All",
      icon: LayoutGrid,
      count: bookings.length,
    },
    {
      id: "UPCOMING",
      label: "Upcoming",
      icon: CheckCircle2,
      count: confirmedCount,
    },
    {
      id: "CANCELLED",
      label: "Cancelled",
      icon: XCircle,
      count: cancelledCount,
    },
  ];

  return (
    <div className="my-bookings-page">
      {/* HEADER */}

      <motion.div
        className="my-bookings-header"
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <motion.button
          className="back-button"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          Back
        </motion.button>

        <div className="my-bookings-title">
          <p className="section-label">
            YOUR ACTIVITY
          </p>

          <h1>
            MY <span>BOOKINGS.</span>
          </h1>

          <p>
            View and manage your sports ground bookings.
          </p>
        </div>
      </motion.div>

      {/* FILTERS */}

      <motion.section
        className="booking-filters-section"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
        }}
      >
        <div className="booking-filter-tabs">
          {filterButtons.map((filter) => {
            const Icon = filter.icon;

            return (
              <motion.button
                key={filter.id}
                className={`booking-filter ${
                  activeFilter === filter.id
                    ? "active"
                    : ""
                }`}
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  setActiveFilter(filter.id)
                }
              >
                <Icon size={15} />

                <span>{filter.label}</span>

                <strong>{filter.count}</strong>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* BOOKINGS */}

      <section className="my-bookings-content">
        {loading ? (
          <motion.div
            className="bookings-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="loading-circle"></div>

            <h3>Loading bookings...</h3>

            <p>
              Fetching your latest booking activity.
            </p>
          </motion.div>
        ) : filteredBookings.length === 0 ? (
          <motion.div
            className="bookings-message"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <div className="empty-icon">
              {activeFilter === "CANCELLED"
                ? "✓"
                : "📅"}
            </div>

            <h3>
              {activeFilter === "UPCOMING"
                ? "No upcoming bookings"
                : activeFilter === "CANCELLED"
                ? "No cancelled bookings"
                : "No bookings yet"}
            </h3>

            <p>
              {activeFilter === "UPCOMING"
                ? "Your confirmed bookings will appear here."
                : activeFilter === "CANCELLED"
                ? "Cancelled bookings will appear here."
                : "Your bookings will appear here."}
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="bookings-grid"
            layout
          >
            {filteredBookings.map(
              (booking, index) => (
                <motion.div
                  className="my-booking-card"
                  key={booking.id}
                  layout
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                >
                  {/* CARD TOP */}

                  <div className="booking-card-top">
                    <div>
                      <p>
                        BOOKING #{booking.id}
                      </p>

                      <h3>
                        Premium Football Ground
                      </h3>
                    </div>

                    <span
                      className={`booking-status ${
                        booking.status?.toLowerCase()
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* LOCATION */}

                  <div className="booking-detail">
                    <MapPin size={16} />

                    <div>
                      <span>LOCATION</span>

                      <strong>
                        Chennai, Tamil Nadu
                      </strong>
                    </div>
                  </div>

                  {/* DATE */}

                  <div className="booking-detail">
                    <CalendarDays size={16} />

                    <div>
                      <span>DATE</span>

                      <strong>
                        {booking.bookingDate}
                      </strong>
                    </div>
                  </div>

                  {/* TIME */}

                  <div className="booking-detail">
                    <Clock3 size={16} />

                    <div>
                      <span>TIME</span>

                      <strong>
                        {booking.startTime} -{" "}
                        {booking.endTime}
                      </strong>
                    </div>
                  </div>

                  {/* PRICE */}

                  <div className="booking-price">
                    <span>TOTAL PRICE</span>

                    <strong>
                      <IndianRupee size={15} />
                      {booking.totalPrice}
                    </strong>
                  </div>

                  {/* CANCEL BUTTON */}

                  {booking.status === "CONFIRMED" && (
                    <motion.button
                      className="cancel-booking-button"
                      whileHover={{ y: -2 }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={() =>
                        cancelBooking(booking.id)
                      }
                      disabled={
                        cancellingId ===
                        booking.id
                      }
                    >
                      {cancellingId ===
                      booking.id
                        ? "Cancelling..."
                        : "Cancel Booking"}
                    </motion.button>
                  )}

                  {/* CANCELLED MESSAGE */}

                  {booking.status ===
                    "CANCELLED" && (
                    <div className="cancelled-note">
                      <XCircle size={15} />
                      <span>
                        This booking has been
                        cancelled.
                      </span>
                    </div>
                  )}
                </motion.div>
              )
            )}
          </motion.div>
        )}
      </section>
    </div>
  );
}

export default MyBookings;