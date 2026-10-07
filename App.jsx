import "./App.css";
import { useEffect, useState } from "react";
import { apiRequest } from "./api";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking backend...");
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    apiRequest("/health")
      .then(() => setBackendStatus("Backend connected ✓"))
      .catch(() => setBackendStatus("Backend connection failed"));
  }, []);

if (showLogin) {
  return (
    <Login
      onLogin={(user) => {
        setCurrentUser(user);
        setShowLogin(false);
      }}
    />
  );
}

if (currentUser) {
  return (
    <Dashboard
      user={currentUser}
      onLogout={() => {
        setCurrentUser(null);
      }}
    />
  );
}
  return (
    <div className="site">
      <div style={{ padding: "10px", textAlign: "center" }}>
        {backendStatus}
      </div>
      <div style={{ padding: "10px", textAlign: "center" }}>

      </div>
      <nav className="navbar">
        <div className="brand">
          <span className="brand-mark">P</span>
          <span>PricePilot</span>
        </div>

        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#intelligence">Intelligence</a>
          <a href="#platform">Platform</a>
        </div>

        <button  className="nav-login"  onClick={() => setShowLogin(true)}>  Sign in</button>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-glow glow-one"></div>
          <div className="hero-glow glow-two"></div>

          <div className="hero-content">
            <div className="eyebrow">
              <span className="live-dot"></span>
              Pricing intelligence for modern business
            </div>

            <h1>
              Make every
              <span> price count.</span>
            </h1>

            <p className="hero-text">
              PricePilot brings demand, competitor prices, and revenue
              together to help you make clearer pricing decisions.
            </p>

            <div className="hero-actions">
              <button className="primary-btn">
                Explore PricePilot
                <span>↗</span>
              </button>

              <button className="secondary-btn">
                See how it works
                <span>↓</span>
              </button>
            </div>

            <div className="hero-note">
              <span>●</span>
              Built for pricing, revenue & demand teams
            </div>
          </div>

          <div className="hero-visual">
            <div className="dashboard-window">
              <div className="window-top">
                <div className="window-brand">
                  <span className="mini-mark">P</span>
                  Price Intelligence
                </div>

                <div className="window-status">
                  <span></span> Live
                </div>
              </div>

              <div className="dashboard-heading">
                <div>
                  <p>Revenue overview</p>
                  <h3>₹7.38M</h3>
                </div>

                <div className="growth">
                  <strong>+8.4%</strong>
                  <small>vs last period</small>
                </div>
              </div>

              <div className="chart-area">
                <div className="chart-labels">
                  <span>₹8M</span>
                  <span>₹6M</span>
                  <span>₹4M</span>
                  <span>₹2M</span>
                </div>

                <svg
                  className="revenue-chart"
                  viewBox="0 0 600 190"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="areaFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#6ee7c7"
                        stopOpacity="0.28"
                      />
                      <stop
                        offset="100%"
                        stopColor="#6ee7c7"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    className="area"
                    d="M0 150 C45 140, 65 145, 100 118 S155 125, 190 100 S240 112, 275 78 S330 94, 365 65 S420 78, 455 48 S515 65, 550 35 S580 42, 600 20 L600 190 L0 190 Z"
                  />

                  <path
                    className="line"
                    d="M0 150 C45 140, 65 145, 100 118 S155 125, 190 100 S240 112, 275 78 S330 94, 365 65 S420 78, 455 48 S515 65, 550 35 S580 42, 600 20"
                  />

                  <circle cx="455" cy="48" r="5" />
                  <circle cx="550" cy="35" r="5" />
                </svg>
              </div>

              <div className="insight-row">
                <div className="insight-card">
                  <span className="insight-icon">↗</span>
                  <div>
                    <small>Demand signal</small>
                    <strong>Strong</strong>
                  </div>
                </div>

                <div className="insight-card">
                  <span className="insight-icon purple">≈</span>
                  <div>
                    <small>Market position</small>
                    <strong>Competitive</strong>
                  </div>
                </div>

                <div className="insight-card">
                  <span className="insight-icon orange">₹</span>
                  <div>
                    <small>Price opportunity</small>
                    <strong>+4.2%</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-card floating-top">
              <span className="floating-symbol">◆</span>
              <div>
                <small>Pricing signal</small>
                <strong>Electronics · Central</strong>
              </div>
              <span className="signal-up">↑</span>
            </div>

            <div className="floating-card floating-bottom">
              <div className="avatar-stack">
                <span>R</span>
                <span>M</span>
                <span>A</span>
              </div>
              <div>
                <small>Decision ready</small>
                <strong>12 opportunities</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <span>ONE PLATFORM</span>
          <i></i>
          <span>DEMAND</span>
          <i></i>
          <span>COMPETITION</span>
          <i></i>
          <span>REVENUE</span>
          <i></i>
          <span>PRICING</span>
        </section>

        <section className="intro-section" id="how">
          <div className="section-tag">THE IDEA</div>

          <h2>
            Stop looking at numbers.
            <br />
            <em>Start understanding them.</em>
          </h2>

          <p>
            PricePilot connects the signals that normally live in different
            reports and turns them into one simple pricing picture.
          </p>
        </section>

        <section className="intelligence-section" id="intelligence">
          <div className="section-header">
            <div>
              <div className="section-tag">THREE SIGNALS</div>
              <h2>Everything your price needs to know.</h2>
            </div>

            <p>
              A clearer view of what is happening before you change a price.
            </p>
          </div>

          <div className="signal-grid">
            <article className="signal-card demand-card">
              <div className="card-number">01</div>
              <div className="signal-visual demand-visual">
                <div className="pulse-ring"></div>
                <div className="pulse-core">D</div>
              </div>
              <h3>Demand</h3>
              <p>
                See where demand is rising, falling, or showing unusual
                patterns.
              </p>
              <span className="card-link">Explore demand →</span>
            </article>

            <article className="signal-card market-card">
              <div className="card-number">02</div>
              <div className="signal-visual market-visual">
                <div className="market-line line-a"></div>
                <div className="market-line line-b"></div>
                <div className="market-point"></div>
              </div>
              <h3>Competition</h3>
              <p>
                Understand where your prices sit compared with the market.
              </p>
              <span className="card-link">Compare markets →</span>
            </article>

            <article className="signal-card revenue-card">
              <div className="card-number">03</div>
              <div className="signal-visual revenue-visual">
                <span>₹</span>
                <div className="coin coin-one"></div>
                <div className="coin coin-two"></div>
                <div className="coin coin-three"></div>
              </div>
              <h3>Revenue</h3>
              <p>
                Connect pricing decisions to the revenue they can influence.
              </p>
              <span className="card-link">View revenue →</span>
            </article>
          </div>
        </section>

        <section className="decision-section" id="platform">
          <div className="decision-copy">
            <div className="section-tag">FROM DATA TO DECISION</div>

            <h2>
              The answer isn't
              <span> another chart.</span>
            </h2>

            <p>
              PricePilot gives context around the numbers so teams can
              understand what a pricing signal means before acting on it.
            </p>

            <div className="decision-list">
              <div>
                <span>01</span>
                <p>Find a pricing signal</p>
              </div>

              <div>
                <span>02</span>
                <p>Understand the reason</p>
              </div>

              <div>
                <span>03</span>
                <p>Review the recommendation</p>
              </div>
            </div>
          </div>

          <div className="decision-panel">
            <div className="panel-top">
              <span>PRICING SIGNAL</span>
              <span className="panel-live">● ANALYZED</span>
            </div>

            <h3>Electronics · East</h3>

            <div className="price-comparison">
              <div>
                <small>Your price</small>
                <strong>₹36.40</strong>
              </div>

              <div className="comparison-arrow">→</div>

              <div>
                <small>Market price</small>
                <strong>₹39.55</strong>
              </div>
            </div>

            <div className="recommendation">
              <span>✦</span>
              <div>
                <small>PricePilot interpretation</small>
                <p>
                  Your current price is below the observed competitor range.
                  Review demand before considering an increase.
                </p>
              </div>
            </div>

            <button className="panel-button">View full analysis →</button>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-orbit orbit-one"></div>
          <div className="cta-orbit orbit-two"></div>

          <div className="section-tag">PRICEPILOT AI</div>

          <h2>
            Better pricing
            <br />
            starts with <em>better context.</em>
          </h2>

          <p>
            Bring demand, competition, forecasting and revenue intelligence
            into one place.
          </p>

          <button className="primary-btn cta-button">
            Enter PricePilot
            <span>↗</span>
          </button>
        </section>
      </main>

      <footer>
        <div className="brand">
          <span className="brand-mark">P</span>
          <span>PricePilot</span>
        </div>

        <p>AI-powered pricing & revenue intelligence</p>

        <span>© 2026 PricePilot AI</span>
      </footer>
    </div>
  );
}

export default App;