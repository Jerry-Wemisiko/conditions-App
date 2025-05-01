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
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city..."
        style={{
          width: "100%",
          padding: isMobile ? "8px 12px" : "10px 16px",
          borderRadius: "20px",
          border: "1px solid #d1d5db",
          backgroundColor: "#f9fafb",
          fontSize: isMobile ? "12px" : "14px",
          color: "#1f2937",
          outline: "none",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#3b82f6";
          e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.2)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#d1d5db";
          e.target.style.boxShadow = "none";
        }}
      />
    </form>
  );
}