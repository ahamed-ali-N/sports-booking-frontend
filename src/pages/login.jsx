import { useState } from "react";
import { ArrowUpRight, ShieldCheck, Trophy, Sparkles } from "lucide-react";

function Login({ onLogin, onBack }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Enter your name");
      return;
    }

    if (phone.length !== 10) {
      alert("Enter a valid 10 digit mobile number");
      return;
    }

    onLogin();
  };

  return (
    <div className="login-page">

      {/* CINEMATIC BACKGROUND */}

      <div className="login-noise"></div>

      <div className="login-orb login-orb-one"></div>
      <div className="login-orb login-orb-two"></div>
      <div className="login-orb login-orb-three"></div>

      <div className="login-light-beam"></div>

      {/* HUGE BACKGROUND TYPOGRAPHY */}

      <div className="login-bg-word">
        SPORT
      </div>

      {/* TOP BRAND */}

      <div className="login-brand">
        <span>SPORTS</span>
        <strong>BOOK</strong>
      </div>


      {/* MAIN LAYOUT */}

      <div className="login-layout">

        {/* LEFT SIDE */}

        <div className="login-showcase">

          <div className="login-status">
            <span className="login-status-dot"></span>
            PREMIUM SPORTS BOOKING
          </div>

          <h1>
            FIND
            <span>YOUR</span>
            GAME.
          </h1>

          <p>
            Your ground.
            <br />
            Your time.
            <br />
            <strong>Your moment.</strong>
          </p>


          {/* FLOATING SPORTS DETAILS */}

          <div className="login-floating login-floating-one">

            <Trophy size={18} />

            <div>
              <span>BOOKING</span>
              <strong>LIVE NOW</strong>
            </div>

          </div>


          <div className="login-floating login-floating-two">

            <Sparkles size={17} />

            <span>
              PREMIUM
              <br />
              EXPERIENCE
            </span>

          </div>

        </div>


        {/* LOGIN PANEL */}

        <div className="login-card">

          <button
            className="login-back"
            onClick={onBack}
          >
            ← Back
          </button>


          <div className="login-card-header">

            <div className="login-mini-icon">
              <ArrowUpRight size={18} />
            </div>

            <div>

              <span>
                WELCOME TO
              </span>

              <strong>
                SPORTSBOOK
              </strong>

            </div>

          </div>


          <h2>
            LET'S
            <br />
            PLAY.
          </h2>


          <p className="login-description">
            Create your profile and start booking
            premium sports grounds in seconds.
          </p>


          <form onSubmit={handleLogin}>

            {/* NAME */}

            <div className="login-field">

              <label>
                YOUR NAME
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your name"
              />

            </div>


            {/* PHONE */}

            <div className="login-field">

              <label>
                MOBILE NUMBER
              </label>

              <div className="phone-input">

                <span>
                  +91
                </span>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  maxLength={10}
                  placeholder="Enter mobile number"
                />

              </div>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
            >

              <span>
                ENTER SPORTSBOOK
              </span>

              <ArrowUpRight size={20} />

            </button>

          </form>


          {/* TRUST */}

          <div className="login-trust">

            <ShieldCheck size={16} />

            <span>
              Secure &amp; simple booking experience
            </span>

          </div>

        </div>

      </div>


      {/* BOTTOM */}

      <div className="login-footer">

        <span>
          FOOTBALL
        </span>

        <i></i>

        <span>
          CRICKET
        </span>

        <i></i>

        <span>
          CHENNAI
        </span>

      </div>

    </div>
  );
}

export default Login;