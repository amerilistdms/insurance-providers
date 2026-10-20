import { ImageResponse } from "next/og";
import { company } from "@/content/site";

export const alt = `${company.name} — Prospect data for insurance marketers`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#12344d",
          color: "#ffffff",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 0.4 }}>{company.name}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 500, lineHeight: 1.08, maxWidth: 920 }}>
            Prospect data for insurance marketers
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 26, color: "#d5e3e4", maxWidth: 820 }}>
            Email, direct mail, and phone lists for Medicare, final expense, and life and health campaigns.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
