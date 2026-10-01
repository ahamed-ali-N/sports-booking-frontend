import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  Clock3,
  IndianRupee,
} from "lucide-react";

function GroundDetails({ onBack }) {
  const HOURLY_PRICE = 800;

  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [availability, setAvailability] = useState(null);
  const [checking, setChecking] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const timeOptions = [
    { value: "00:00", label: "12:00 AM" },
    { value: "01:00", label: "1:00 AM" },
    { value: "02:00", label: "2:00 AM" },
    { value: "03:00", label: "3:00 AM" },
    { value: "04:00", label: "4:00 AM" },
    { value: "05:00", label: "5:00 AM" },
    { value: "06:00", label: "6:00 AM" },
    { value: "07:00", label: "7:00 AM" },
    { value: "08:00", label: "8:00 AM" },
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "17:00", label: "5:00 PM" },
    { value: "18:00", label: "6:00 PM" },
    { value: "19:00", label: "7:00 PM" },
    { value: "20:00", label: "8:00 PM" },
    { value: "21:00", label: "9:00 PM" },
    { value: "22:00", label: "10:00 PM" },
    { value: "23:00", label: "11:00 PM" },
  ];

  const calculateDuration = () => {
    if (!startTime || !endTime) {
      return 0;
    }

    const start = Number(startTime.split(":")[0]);
    const end = Number(endTime.split(":")[0]);

    if (end <= start) {
      return 0;
    }

    return end - start;
  };

  const duration = calculateDuration();

  const totalPrice = duration * HOURLY_PRICE;

  const checkAvailability = async () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    if (!startTime) {
      alert("Please select a start time.");
      return;
    }

    if (!endTime) {
      alert("Please select an end time.");
      return;
    }

    if (duration <= 0) {
      alert("End time must be after start time.");
      return;
    }

    setChecking(true);
    setAvailability(null);

    try {
      const response = await fetch(
        `http://localhost:8081/grounds/1/availability?date=${selectedDate}&startTime=${startTime}&endTime=${endTime}`
      );

      if (!response.ok) {
        throw new Error("Failed to check availability");
      }

      const result = await response.json();

      console.log("Availability:", result);

      setAvailability(result === true);
    } catch (error) {
      console.error("Availability error:", error);

      alert(
        "Unable to check availability. Make sure backend is running."
      );
    } finally {
      setChecking(false);
    }
  };

  const confirmBooking = async () => {
    if (!customerName.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    if (!startTime || !endTime) {
      alert("Please select start and end time.");
      return;
    }

    if (duration <= 0) {
      alert("End time must be after start time.");
      return;
    }

    if (availability !== true) {
      alert("Please check availability first.");
      return;
    }

    setBookingLoading(true);

    try {
      const bookingData = {
        customerName: customerName.trim(),
        groundId: 1,
        bookingDate: selectedDate,
        startTime: startTime,
        endTime: endTime,
        status: "CONFIRMED",
      };

      console.log("Booking data:", bookingData);

      const response = await fetch(
        "http://localhost:8081/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          "Booking failed:",
          errorText
        );

        throw new Error("Booking failed");
      }

      const result = await response.json();

      console.log(
        "Booking successful:",
        result
      );

      setBookingSuccess(true);
      setAvailability(null);
    } catch (error) {
      console.error(
        "Booking error:",
        error
      );

      alert(
        "Unable to confirm booking. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
    setEndTime("");
    setAvailability(null);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
    setAvailability(null);
  };

  return (
    <div className="ground-details-page">

      {/* BACK BUTTON */}

      <motion.button
        className="back-button"
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
      >
        <ArrowLeft size={18} />
        Back
      </motion.button>

      {/* HERO */}

      <section className="ground-hero">

        <div className="ground-image"></div>

        <div className="ground-overlay"></div>

        <div className="ground-content">

          <p className="section-label">
            SPORTS GROUND
          </p>

          <h1>
            Premium
            <br />
            <span>Football Ground.</span>
          </h1>

          <div className="ground-location">
            <MapPin size={17} />
            Chennai, Tamil Nadu
          </div>

        </div>

      </section>

      {/* INFO + BOOKING */}

      <section className="ground-info-section">

        <div className="ground-info">

          <p className="section-label">
            GROUND DETAILS
          </p>

          <h2>
            PLAY
            <br />
            <span>YOUR GAME.</span>
          </h2>

          <p className="ground-description">
            Premium football ground with quality turf,
            comfortable facilities and flexible booking
            slots for your next game.
          </p>

        </div>

        <motion.div
          className="booking-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          {!bookingSuccess ? (
            <>

              {/* BOOKING HEADER */}

              <div className="booking-card-header">

                <div>
                  <span>BOOKING</span>
                  <h3>Select your slot</h3>
                </div>

                <div className="price">

                  <IndianRupee size={18} />

                  <strong>
                    {HOURLY_PRICE}
                  </strong>

                  <span>
                    / hour
                  </span>

                </div>

              </div>

              {/* CUSTOMER NAME */}

              <div className="booking-field">

                <div className="field-icon">
                  <span>👤</span>
                </div>

                <div className="field-content">

                  <span>CUSTOMER NAME</span>

                  <input
                    type="text"
                    className="name-input"
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(event) =>
                      setCustomerName(
                        event.target.value
                      )
                    }
                  />

                </div>

              </div>

              {/* DATE */}

              <div className="booking-field">

                <div className="field-icon">
                  <CalendarDays size={18} />
                </div>

                <div className="field-content">

                  <span>DATE</span>

                  <input
                    type="date"
                    className="date-input"
                    value={selectedDate}
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(event) => {
                      setSelectedDate(
                        event.target.value
                      );

                      setAvailability(null);
                    }}
                  />

                </div>

              </div>

              {/* TIME */}

              <div className="time-section">

                <div className="time-title">

                  <div className="time-title-left">

                    <Clock3 size={16} />

                    <span>
                      BOOKING TIME
                    </span>

                  </div>

                  {duration > 0 && (
                    <small>
                      {duration}{" "}
                      {duration === 1
                        ? "hour"
                        : "hours"}
                    </small>
                  )}

                </div>

                <div className="dynamic-time-grid">

                  {/* START TIME */}

                  <div className="time-select-box">

                    <span>
                      START TIME
                    </span>

                    <select
                      value={startTime}
                      onChange={
                        handleStartTimeChange
                      }
                    >

                      <option value="">
                        Select start time
                      </option>

                      {timeOptions
                        .slice(0, -1)
                        .map((time) => (
                          <option
                            key={time.value}
                            value={time.value}
                          >
                            {time.label}
                          </option>
                        ))}

                    </select>

                  </div>

                  {/* END TIME */}

                  <div className="time-select-box">

                    <span>
                      END TIME
                    </span>

                    <select
                      value={endTime}
                      onChange={
                        handleEndTimeChange
                      }
                      disabled={!startTime}
                    >

                      <option value="">
                        Select end time
                      </option>

                      {timeOptions
                        .filter(
                          (time) =>
                            !startTime ||
                            time.value > startTime
                        )
                        .map((time) => (
                          <option
                            key={time.value}
                            value={time.value}
                          >
                            {time.label}
                          </option>
                        ))}

                    </select>

                  </div>

                </div>

              </div>

              {/* PRICE BREAKDOWN */}

              {duration > 0 && (

                <motion.div
                  className="dynamic-price-summary"
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >

                  <div className="price-summary-heading">

                    <span>
                      PRICE BREAKDOWN
                    </span>

                    <small>
                      LIVE CALCULATION
                    </small>

                  </div>

                  <div className="price-summary-row">

                    <span>
                      DURATION
                    </span>

                    <strong>
                      {duration}{" "}
                      {duration === 1
                        ? "Hour"
                        : "Hours"}
                    </strong>

                  </div>

                  <div className="price-summary-row">

                    <span>
                      RATE
                    </span>

                    <strong>
                      ₹{HOURLY_PRICE}/hr
                    </strong>

                  </div>

                  <div className="price-summary-total">

                    <div>

                      <span>
                        TOTAL PRICE
                      </span>

                      <small>
                        {duration} × ₹
                        {HOURLY_PRICE}
                      </small>

                    </div>

                    <strong>
                      ₹{totalPrice}
                    </strong>

                  </div>

                </motion.div>

              )}

              {/* AVAILABILITY RESULT */}

              {availability !== null && (

                <motion.div
                  className={`availability-result ${
                    availability
                      ? "available"
                      : "not-available"
                  }`}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >

                  {availability
                    ? "✓ This time is available"
                    : "✕ This time is already booked"}

                </motion.div>

              )}

              {/* BOOKING SUMMARY */}

              {(customerName ||
                selectedDate ||
                startTime ||
                endTime) && (

                <motion.div
                  className="booking-summary"
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                >

                  <span>
                    BOOKING SUMMARY
                  </span>

                  <div className="summary-row">

                    <strong>Name</strong>

                    <p>
                      {customerName ||
                        "Not entered"}
                    </p>

                  </div>

                  <div className="summary-row">

                    <strong>Date</strong>

                    <p>
                      {selectedDate ||
                        "Not selected"}
                    </p>

                  </div>

                  <div className="summary-row">

                    <strong>Time</strong>

                    <p>
                      {startTime && endTime
                        ? `${startTime} - ${endTime}`
                        : "Not selected"}
                    </p>

                  </div>

                  {duration > 0 && (

                    <div className="summary-row">

                      <strong>
                        Duration
                      </strong>

                      <p>
                        {duration}{" "}
                        {duration === 1
                          ? "hour"
                          : "hours"}
                      </p>

                    </div>

                  )}

                  {duration > 0 && (

                    <div className="summary-row">

                      <strong>
                        Total Price
                      </strong>

                      <p>
                        ₹{totalPrice}
                      </p>

                    </div>

                  )}

                </motion.div>

              )}

              {/* CHECK AVAILABILITY */}

              <motion.button
                className="continue-button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={checkAvailability}
                disabled={checking}
              >

                {checking
                  ? "Checking..."
                  : "Check Availability"}

              </motion.button>

              {/* CONFIRM BOOKING */}

              {availability === true &&
                duration > 0 && (

                  <motion.button
                    className="confirm-button"
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    whileHover={{ y: -3 }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    onClick={confirmBooking}
                    disabled={bookingLoading}
                  >

                    {bookingLoading
                      ? "Confirming..."
                      : `Confirm Booking • ₹${totalPrice}`}

                  </motion.button>

                )}

            </>
          ) : (

            /* BOOKING SUCCESS */

            <motion.div
              className="booking-success"
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
            >

              <div className="success-icon">
                ✓
              </div>

              <p className="section-label">
                BOOKING CONFIRMED
              </p>

              <h3>
                You're all set!
              </h3>

              <p>
                Your ground has been successfully
                booked.
              </p>

              <div className="success-details">

                <div>
                  <span>NAME</span>
                  <strong>
                    {customerName}
                  </strong>
                </div>

                <div>
                  <span>DATE</span>
                  <strong>
                    {selectedDate}
                  </strong>
                </div>

                <div>
                  <span>TIME</span>
                  <strong>
                    {startTime} - {endTime}
                  </strong>
                </div>

                <div>
                  <span>DURATION</span>
                  <strong>
                    {duration}{" "}
                    {duration === 1
                      ? "Hour"
                      : "Hours"}
                  </strong>
                </div>

                <div>
                  <span>TOTAL</span>
                  <strong>
                    ₹{totalPrice}
                  </strong>
                </div>

              </div>

            </motion.div>

          )}

        </motion.div>

      </section>

    </div>
  );
}

export default GroundDetails;