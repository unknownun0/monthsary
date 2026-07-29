'use client';

import { useState, useEffect } from 'react';

const ADMIN_PASSWORD = "admin123";

interface DatePlan {
  id: number;
  date: string | null;
  dateType: { title: string; emoji: string; description: string } | null;
  submittedAt: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [plans, setPlans] = useState<DatePlan[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loggedIn) {
      fetch("/api/date-plans")
        .then(res => res.json())
        .then(data => setPlans(data.plans))
        .catch(() => setError("Failed to load data"));
    }
  }, [loggedIn]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: "#F9F5EF", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <div style={{ maxWidth: 400, width: "100%", background: "#FFFDF9", borderRadius: 8, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>&#x1F512;</div>
          <h1 style={{ fontFamily: "var(--font-dancing)", color: "#D96C8A", fontSize: "1.75rem", marginBottom: 4 }}>Admin Login</h1>
          <p style={{ fontFamily: "var(--font-caveat)", color: "#8B6914", fontSize: "1rem", marginBottom: 20 }}>Enter password to view date plans</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Password"
            style={{ width: "100%", padding: "10px 14px", border: "2px solid #E8D5A3", borderRadius: 8, fontSize: 16, outline: "none", boxSizing: "border-box", marginBottom: 12, fontFamily: "var(--font-caveat)" }}
          />
          <button onClick={handleLogin}
            style={{ width: "100%", padding: "10px", background: "linear-gradient(135deg, #D96C8A, #B54B6A)", color: "#FFF", border: "none", borderRadius: 8, fontSize: 16, cursor: "pointer", fontFamily: "var(--font-caveat)" }}
          >Login</button>
          {error && <p style={{ color: "#D96C8A", marginTop: 12, fontFamily: "var(--font-caveat)", fontSize: "0.9rem" }}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F9F5EF", padding: "1rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h1 style={{ fontFamily: "var(--font-dancing)", color: "#D96C8A", fontSize: "2rem" }}>Date Plans Admin</h1>
          <button onClick={() => setLoggedIn(false)}
            style={{ padding: "8px 20px", background: "transparent", border: "2px solid #D6B36A", borderRadius: 8, color: "#5C4033", cursor: "pointer", fontFamily: "var(--font-caveat)", fontSize: "1rem" }}
          >Logout</button>
        </div>

        {plans.length === 0 ? (
          <div style={{ background: "#FFFDF9", borderRadius: 8, padding: "2rem", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>&#x1F4AD;</div>
            <p style={{ fontFamily: "var(--font-caveat)", color: "#8B6914", fontSize: "1.2rem" }}>No date plans submitted yet.</p>
            <p style={{ fontFamily: "var(--font-caveat)", color: "#5C4033", fontSize: "1rem" }}>Waiting for her to choose... &#x2764;&#xFE0F;</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {plans.map((plan) => (
              <div key={plan.id} style={{ background: "#FFFDF9", borderRadius: 8, padding: "1.25rem", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", border: "1px solid #E8D5A3" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: "var(--font-caveat)", color: "#D96C8A", fontSize: "0.85rem", fontWeight: 600 }}>Plan #{plan.id}</span>
                  <span style={{ fontFamily: "var(--font-caveat)", color: "#8B6914", fontSize: "0.85rem" }}>{plan.submittedAt}</span>
                </div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {plan.date && (
                    <div style={{ flex: 1, minWidth: 200, padding: "10px", background: "rgba(248,200,220,0.15)", borderRadius: 6, border: "1px dashed #D96C8A" }}>
                      <p style={{ fontFamily: "var(--font-caveat)", color: "#8B6914", fontSize: "0.8rem", marginBottom: 2 }}>Selected Date</p>
                      <p style={{ fontFamily: "var(--font-caveat)", color: "#5C4033", fontSize: "1.1rem" }}>&#x1F4C5; {plan.date}</p>
                    </div>
                  )}
                  {plan.dateType && (
                    <div style={{ flex: 1, minWidth: 200, padding: "10px", background: "rgba(248,200,220,0.15)", borderRadius: 6, border: "1px dashed #D96C8A" }}>
                      <p style={{ fontFamily: "var(--font-caveat)", color: "#8B6914", fontSize: "0.8rem", marginBottom: 2 }}>Date Type</p>
                      <p style={{ fontFamily: "var(--font-caveat)", color: "#5C4033", fontSize: "1.1rem" }}>{plan.dateType.emoji} {plan.dateType.title}</p>
                      <p style={{ fontFamily: "var(--font-caveat)", color: "#8B6914", fontSize: "0.9rem" }}>{plan.dateType.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
