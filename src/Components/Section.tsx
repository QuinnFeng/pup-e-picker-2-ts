import { ReactNode } from "react";
import { useDogs } from "./DogsProvider";
import { ActiveTab } from "../types";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { favoriteCounts, unfavoriteCounts, activeTab, setActiveTab } =
    useDogs();
  const buttonToggleHandler = (aT: ActiveTab) => {
    const value = aT === activeTab ? "all-dogs" : aT;
    setActiveTab(value);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab == "favorite" ? "active" : ""}`}
            onClick={() => {
              buttonToggleHandler("favorite");
            }}
          >
            favorited ( {favoriteCounts} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${activeTab == "unfavorite" ? "active" : ""}`}
            onClick={() => buttonToggleHandler("unfavorite")}
          >
            unfavorited ( {unfavoriteCounts} )
          </div>
          <div
            className={`selector ${
              activeTab == "create-dog-form" ? "active" : ""
            }`}
            onClick={() => {
              buttonToggleHandler("create-dog-form");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
