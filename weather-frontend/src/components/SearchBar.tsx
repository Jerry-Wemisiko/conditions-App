import { FormEvent } from "react";

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  onSearch: () => void;
  isMobile: boolean;
}

export default function SearchBar({ city, setCity, onSearch, isMobile }: SearchBarProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    if (!trimmedCity) return;
    console.log('Search submitted for city:', trimmedCity);
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: "relative",
        width: "100%",
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.15)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)")}
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city..."
        style={{
          width: "100%",
          padding: isMobile ? "10px 40px 10px 16px" : "12px 48px 12px 20px",
          borderRadius: "12px",
          border: "none",
          background: "transparent",
          fontSize: isMobile ? "14px" : "16px",
          color: "#1a202c",
          outline: "none",
          fontWeight: "500",
          transition: "box-shadow 0.3s ease",
        }}
        onFocus={(e) => {
          e.target.style.boxShadow = "inset 0 0 0 2px #3b82f6";
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = "none";
        }}
      />
      <button
        type="submit"
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width={isMobile ? "20" : "24"}
          height={isMobile ? "20" : "24"}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6b7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </form>
  );
}