"use client";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function Popup() {
  const [currentTheme, setCurrentTheme] = useState("default");

  useEffect(() => {
    themeChange(false);
    setCurrentTheme(
      document.documentElement.getAttribute("data-theme") || "default"
    );
  }, []);

  const themes = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "Cupcake", value: "cupcake" },
    { label: "Bumblebee", value: "bumblebee" },
    { label: "Emerald", value: "emerald" },
    { label: "Corporate", value: "corporate" },
    { label: "Synthwave", value: "synthwave" },
    { label: "Retro", value: "retro" },
    { label: "Cyberpunk", value: "cyberpunk" },
    { label: "Valentine", value: "valentine" },
    { label: "Halloween", value: "halloween" },
    { label: "Garden", value: "garden" },
    { label: "Forest", value: "forest" },
    { label: "Aqua", value: "aqua" },
    { label: "Lofi", value: "lofi" },
    { label: "Pastel", value: "pastel" },
    { label: "Fantasy", value: "fantasy" },
    { label: "Wireframe", value: "wireframe" },
    { label: "Black", value: "black" },
    { label: "Luxury", value: "luxury" },
    { label: "Dracula", value: "dracula" },
    { label: "CMYK", value: "cmyk" },
    { label: "Autumn", value: "autumn" },
    { label: "Business", value: "business" },
    { label: "Acid", value: "acid" },
    { label: "Lemonade", value: "lemonade" },
    { label: "Night", value: "night" },
    { label: "Coffee", value: "coffee" },
    { label: "Winter", value: "winter" },
    { label: "Dim", value: "dim" },
    { label: "Nord", value: "nord" },
    { label: "Sunset", value: "sunset" },
    { label: "Caramellatte", value: "caramellatte" },
    { label: "Abyss", value: "abyss" },
    { label: "Silk", value: "silk" },
  ];

  return (
    <div className="flex flex-col px-36 py-18 items-center justify-center">
      <div className="card w-[800px] h-[600px] !outline-[0px] bg-base-100 overflow-hidden relative">
        <div className="flex">
          <div className="drawer">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content"></div>
            <div className="drawer-side absolute">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="navbar bg-base-100 shadow-sm justify-between">
          <div className="flex gap-2">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-circle drawer-button swap swap-rotate"
            >
              <input type="checkbox" />
              <Bars3Icon className="swap-off size-6" />
            </label>
            <a className="btn btn-ghost text-xl">Scrollr</a>
          </div>

          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <UserCircleIcon className="w-10 h-10 -ml-0.25 -mt-0.25" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto py-4 px-20 join join-vertical w-full mx-auto">
          {themes.map(({ label, value }, index) => (
            <input
              key={index}
              type="radio"
              name="theme-buttons"
              className="btn theme-controller join-item"
              aria-label={label}
              value={value}
              data-set-theme={value}
              defaultChecked={value === currentTheme}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
