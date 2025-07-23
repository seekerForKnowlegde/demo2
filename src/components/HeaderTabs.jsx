import { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const tabs = [
  "FINANCIAL PLANNING",
  "PORTFOLIO GENERATOR",
  "PORTFOLIO ANALYTICS",
  "LINE SIZE OPTIMIZATION",
];

const tabsRoures = ["/", "/generator", "/analysis", "/linesize"];

export default function HeaderTabs() {
  const [active, setActive] = useState(1); // default to "PORTFOLIO GENERATOR"
  const naviagte = useNavigate();
  return (
    <nav className="flex justify-center gap-6 border-b pb-3 text-sm font-medium text-gray-600">
      {tabs.map((t, i) => (
        <button
          key={t}
          onClick={() => {
            setActive(i);
            naviagte(tabsRoures[i]);
          }}
          className={classNames(
            "tracking-wide transition-colors",
            i === active
              ? "text-black border-b-2 border-black"
              : "hover:text-black"
          )}
        >
          {t}
        </button>
      ))}
    </nav>
  );
}
