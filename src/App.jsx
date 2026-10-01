import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Bell,
  UserRound,
  Search,
  ArrowUpRight,
  MapPin,
} from "lucide-react";

import GroundDetails from "./pages/GroundDetails";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/login";

function App() {
  const [showGroundDetails, setShowGroundDetails] = useState(false);
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const [grounds, setGrounds] = useState([]);
  const [groundsLoading, setGroundsLoading] = useState(true);

  // Selected sport
  const [selectedSport, setSelectedSport] = useState(null);

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/grounds"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch grounds");
        }

        const data = await response.json();

        console.log("Grounds from backend:", data);
        console.log("Ground count:", data.length);

        setGrounds(data);
      } catch (error) {
        console.error("Ground fetch error:", error);
      } finally {
        setGroundsLoading(false);
      }
    };

    fetchGrounds();
  }, []);

  const goHome = () => {
    setShowGroundDetails(false);
    setShowMyBookings(false);
    setShowLogin(false);
  };

  const openGroundDetails = () => {
    setShowMyBookings(false);
    setShowLogin(false);
    setShowGroundDetails(true);
  };

  const openMyBookings = () => {
    setShowGroundDetails(false);
    setShowLogin(false);
    setShowMyBookings(true);
  };

  const openLogin = () => {
    setShowGroundDetails(false);
    setShowMyBookings(false);
    setShowLogin(true);
  };

  const sports = [
    {
      name: "Football",
      icon: "⚽",
      description:
        "Premium football grounds ready for your next game.",
      location: "Chennai",
      slots: "Available grounds",
    },
    {
      name: "Cricket",
      icon: "🏏",
      description:
        "Find quality cricket grounds and book your slot.",
      location: "Chennai",
      slots: "Available grounds",
    },
  ];

  // Filter backend grounds based on selected sport
  const filteredGrounds = selectedSport
    ? grounds.filter(
        (ground) =>
          ground.sport?.toLowerCase() ===
          selectedSport.toLowerCase()
      )
    : [];

  if (showLogin) {
    return (
      <Login
        onLogin={() => setShowLogin(false)}
        onBack={goHome}
      />
    );
  }

  if (showMyBookings) {
    return <MyBookings onBack={goHome} />;
  }

  if (showGroundDetails) {
    return <GroundDetails onBack={goHome} />;
  }

  return (
    <div className="home">

      {/* =========================
          NAVBAR
      ========================= */}
      <nav className="navbar">

        <div
          className="logo"
          onClick={goHome}
          style={{ cursor: "pointer" }}
        >
          <span>SPORTS</span>
          <strong>BOOK</strong>
        </div>

        <div className="nav-links">

          <button onClick={goHome}>
            Home
          </button>

          <button
            onClick={() => {
              setSelectedSport(null);

              setTimeout(() => {
                document
                  .getElementById("grounds-section")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }, 100);
            }}
          >
            Explore
          </button>

          <button onClick={openMyBookings}>
            My Bookings
          </button>

        </div>

        <div className="nav-actions">

          <button className="icon-button">
            <Bell size={20} />
          </button>

          <button
            className="icon-button"
            onClick={openLogin}
          >
            <UserRound size={20} />
          </button>

        </div>

      </nav>


      {/* =========================
          HERO
      ========================= */}
      <section className="hero-section">

        <div className="hero-content">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-text"
          >

            <p className="hero-small-text">
              PREMIUM SPORTS BOOKING
            </p>

            <h1>
              FIND YOUR GAME.
              <br />
              <span>BOOK YOUR MOMENT.</span>
            </h1>

            <p className="hero-description">
              Premium sports venues.
              Seamless booking.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="hero-button"
              onClick={() => {
                document
                  .getElementById("grounds-section")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              Explore Grounds
              <ArrowUpRight size={20} />
            </motion.button>

          </motion.div>


          {/* FLOATING CARD 1 */}
          <motion.div
            className="floating-card floating-card-one"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >

            <div className="floating-card-number">
              {grounds.length}
            </div>

            <div className="floating-card-label">
              GROUNDS
            </div>

          </motion.div>


          {/* FLOATING CARD 2 */}
          <motion.div
            className="floating-card floating-card-two"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >

            <div className="live-dot"></div>

            <span>
              LIVE BOOKING
            </span>

            <strong>
              ONLINE
            </strong>

          </motion.div>


          {/* HERO GLOW */}
          <div className="hero-glow hero-glow-one"></div>
          <div className="hero-glow hero-glow-two"></div>

        </div>

      </section>


      {/* =========================
          SEARCH
      ========================= */}
      <section className="search-section">

        <div className="search-box">

          <Search size={22} />

          <input
            type="text"
            placeholder="Search grounds, locations or sports..."
          />

          <button>
            Search
          </button>

        </div>

      </section>


      {/* =========================
          SPORTS + GROUNDS
      ========================= */}
      <section
        id="grounds-section"
        className="grounds-section"
      >

        <div className="section-heading">

          <div>

            <p className="section-eyebrow">
              CHOOSE YOUR SPORT
            </p>

            <h2>
              AVAILABLE GROUNDS.
            </h2>

          </div>

          <span className="ground-count">
            {groundsLoading
              ? "Loading..."
              : `${grounds.length} grounds`}
          </span>

        </div>


        {/* =========================
            FOOTBALL + CRICKET
        ========================= */}
        <div className="sports-grid">

          {sports.map((sport) => {

            const sportGroundCount =
              grounds.filter(
                (ground) =>
                  ground.sport?.toLowerCase() ===
                  sport.name.toLowerCase()
              ).length;

            const isSelected =
              selectedSport === sport.name;

            return (
              <motion.div
                key={sport.name}
                className={`sport-card ${
                  isSelected ? "sport-card-active" : ""
                }`}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() => {
                  setSelectedSport(sport.name);

                  setTimeout(() => {
                    document
                      .getElementById(
                        "selected-ground-list"
                      )
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }, 100);
                }}
              >

                <div className="sport-card-top">

                  <div className="sport-icon">
                    {sport.icon}
                  </div>

                  <ArrowUpRight size={22} />

                </div>

                <h3>
                  {sport.name}
                </h3>

                <p>
                  {sport.description}
                </p>

                <div className="sport-card-info">

                  <span>
                    <MapPin size={16} />
                    {sport.location}
                  </span>

                  <span>
                    {sportGroundCount} grounds
                  </span>

                </div>

                <div className="sport-card-action">
                  {isSelected
                    ? "SELECTED"
                    : "VIEW GROUNDS"}
                </div>

              </motion.div>
            );
          })}

        </div>


        {/* =========================
            SELECTED SPORT GROUNDS
        ========================= */}
        <div
          id="selected-ground-list"
          className="available-grounds-wrapper"
        >

          {!selectedSport && (
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="ground-select-message"
            >

              <div className="ground-select-icon">
                ⚽
              </div>

              <h3>
                Select Football or Cricket
              </h3>

              <p>
                Choose a sport above to view
                available grounds.
              </p>

            </motion.div>
          )}


          {selectedSport && (
            <>

              <div className="section-heading">

                <div>

                  <p className="section-eyebrow">
                    {selectedSport.toUpperCase()}
                  </p>

                  <h2>
                    {selectedSport.toUpperCase()} GROUNDS.
                  </h2>

                </div>

                <button
                  className="change-sport-button"
                  onClick={() =>
                    setSelectedSport(null)
                  }
                >
                  Change Sport
                </button>

              </div>


              {groundsLoading && (
                <div className="ground-loading">
                  Loading grounds...
                </div>
              )}


              {!groundsLoading &&
                filteredGrounds.length === 0 && (
                  <div className="ground-empty">

                    <h3>
                      No {selectedSport} grounds found
                    </h3>

                    <p>
                      Currently there are no grounds
                      available for this sport.
                    </p>

                  </div>
                )}


              {!groundsLoading &&
                filteredGrounds.length > 0 && (

                  <div className="grounds-grid">

                    {filteredGrounds.map(
                      (ground, index) => (

                        <motion.div
                          key={ground.id}
                          className="ground-card"
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: index * 0.08,
                          }}
                          whileHover={{
                            y: -8,
                          }}
                          onClick={openGroundDetails}
                        >

                          <div className="ground-card-top">

                            <span className="ground-sport">
                              {ground.sport}
                            </span>

                            <ArrowUpRight
                              size={20}
                            />

                          </div>

                          <h3>
                            {ground.name}
                          </h3>

                          <p className="ground-location">
                            <MapPin size={16} />
                            {ground.location}
                          </p>

                          <div className="ground-card-bottom">

                            <div>

                              <span>
                                Starting from
                              </span>

                              <strong>
                                ₹{ground.price || 800}/hr
                              </strong>

                            </div>

                            <button>
                              Book Now
                            </button>

                          </div>

                        </motion.div>

                      )
                    )}

                  </div>

                )}

            </>
          )}

        </div>

      </section>


      {/* =========================
          WHY CHOOSE US
      ========================= */}
      <section className="why-section">

        <div className="section-heading">

          <div>

            <p className="section-eyebrow">
              WHY SPORTSBOOK
            </p>

            <h2>
              BUILT FOR THE GAME.
            </h2>

          </div>

        </div>


        <div className="why-grid">

          <div className="why-card">

            <span>
              01
            </span>

            <h3>
              Easy Booking
            </h3>

            <p>
              Find your ground and book your
              preferred slot without unnecessary
              steps.
            </p>

          </div>


          <div className="why-card">

            <span>
              02
            </span>

            <h3>
              Real Availability
            </h3>

            <p>
              Check ground availability before
              confirming your booking.
            </p>

          </div>


          <div className="why-card">

            <span>
              03
            </span>

            <h3>
              Simple Pricing
            </h3>

            <p>
              See the booking price clearly before
              you confirm your slot.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          STATS
      ========================= */}
      <section className="stats-section">

        <div className="stat-card">

          <strong>
            {grounds.length}+
          </strong>

          <span>
            GROUNDS
          </span>

        </div>


        <div className="stat-card">

          <strong>
            2
          </strong>

          <span>
            SPORTS
          </span>

        </div>


        <div className="stat-card">

          <strong>
            24/7
          </strong>

          <span>
            BOOKING
          </span>

        </div>

      </section>


      {/* =========================
          MY BOOKINGS CTA
      ========================= */}
      <section className="my-bookings-section">

        <div className="my-bookings-card">

          <div>

            <p className="section-eyebrow">
              YOUR BOOKINGS
            </p>

            <h2>
              READY FOR YOUR
              <br />
              NEXT GAME?
            </h2>

          </div>


          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={openMyBookings}
          >
            My Bookings
            <ArrowUpRight size={20} />
          </motion.button>

        </div>

      </section>


      {/* =========================
          CONTACT US
      ========================= */}
      <section className="contact-section">

        <div className="contact-card">

          <div>

            <p className="section-eyebrow">
              CONTACT US
            </p>

            <h2>
              NEED HELP?
            </h2>

            <p>
              For booking support and enquiries,
              contact us directly.
            </p>

          </div>

          <a
            href="tel:9176062032"
            className="contact-phone"
          >
            +91 9176062032
          </a>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}
      <footer className="footer">

        <div className="footer-logo">
          SPORTSBOOK
        </div>

        <p>
          Premium sports venues.
          Seamless booking.
        </p>

        <span>
          ©️ 2026 SportsBook. All rights reserved.
        </span>

      </footer>

    </div>
  );
}

export default App;