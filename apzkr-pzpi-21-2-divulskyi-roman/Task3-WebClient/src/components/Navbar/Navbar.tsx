import React, { ReactNode, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CHARTS_ROUTE, FARM_PLOTS_ROUTE, IRRIGATION_DEVICE_ROUTE, MAIN_ROUTE, SENSOR_ROUTE, SHEDULE_ROUTE, WATER_RESOURCE_ROUTE, WEATHER_CONDITIONS_ROUTE } from "../../consts";

interface IProps {
  children: ReactNode;
}

interface ILink {
  link: string;
  text: string;
  roles?: string[];
}

const applicationLinks: ILink[] = [
  { link: MAIN_ROUTE, text: "Home" },
  { link: FARM_PLOTS_ROUTE, text: "Farm plots" },
  { link: IRRIGATION_DEVICE_ROUTE, text: "Irrigation devices" },
  { link: SHEDULE_ROUTE, text: "Shedules" },
  { link: SENSOR_ROUTE, text: "Sensors" },
  { link: WATER_RESOURCE_ROUTE, text: "Water resources" },
  { link: WEATHER_CONDITIONS_ROUTE, text: "Weather conditions" },
  { link: CHARTS_ROUTE, text: "Charts" },
];

export const Navbar = ({ children }: IProps) => {

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
          <div className="container">
            <NavLink to={MAIN_ROUTE} className="navbar-brand">
              Farm
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target=".navbar-collapse"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
              <ul className="navbar-nav flex-grow-1">
                {applicationLinks.map(({ link, text }) => (
                  <li className="nav-item" key={link}>
                    <NavLink to={link} className="nav-link text-dark">
                      {text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="container">
        <main role="main" className="pb-3">
          {children}
        </main>
      </div>
    </div>
  );
};
