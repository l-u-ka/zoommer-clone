import { useEffect, useState } from "react";

export default function Products() {
  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("language")) {
      setLanguage(localStorage.getItem("language") as string);
    }
  }, []);

  return (
    <div>
      {language}

      <button
        onClick={() => {
          localStorage.setItem("language", "ქართუი");
          setLanguage("ქართული");
        }}
      >
        ქართული
      </button>
      <button
        onClick={() => {
          localStorage.setItem("language", "ინგლისური");
          setLanguage("ინგლისური");
        }}
      >
        ინგლისური
      </button>
    </div>
  );
}
