import { useEffect, useState } from "react";
import bgDesktopDark from "../assets/images/bg-desktop-dark.jpg";
import bgDesktopLight from "../assets/images/bg-desktop-light.jpg";
import bgMobileDark from "../assets/images/bg-mobile-dark.jpg";
import bgMobileLight from "../assets/images/bg-mobile-light.jpg";
import "../styles/App.css";
import { Header } from "./Header";
import { Input } from "./Input";

export const App = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      document.body.className = storedTheme;
    } else {
      document.body.className = "light";
    }
  });

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  return (
    <>
      {isDark ? (
        <picture>
          <source media="(max-width:1024px)" srcSet={bgMobileDark} />
          <img
            className="absolute left-0 top-0 -z-20 w-full"
            src={bgDesktopDark}
            alt=""
          />
        </picture>
      ) : (
        <picture>
          <source media="(max-width:1024px)" srcSet={bgMobileLight} />
          <img
            className="absolute left-0 top-0 -z-20 w-full"
            src={bgDesktopLight}
            alt=""
          />
        </picture>
      )}
      <div className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 lg:w-3/6 2xl:w-1/3">
        <Header toggleTheme={toggleTheme} isDark={isDark} />
        <Input />
      </div>
    </>
  );
};
