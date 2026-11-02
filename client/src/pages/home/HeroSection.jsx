import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stats from "./Stats";
import { useTranslation } from "react-i18next";

function HeroSection() {
  const [keyWord, setKeyWord] = useState("");
  const [location, setLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const locations = [
    "Kabul",
    "Herat",
    "Mazar-e-Sharif",
    "Kandahar",
    "Jalalabad",
  ];

  const filteredLocations = locations.filter((item) =>
    item.toLowerCase().includes(location),
  );

  const handleSetLocation = (item) => {
    setLocation(item);
    setIsOpen(!isOpen);
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setKeyWord(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyWord.trim()) params.set("search", keyWord.trim());
    if (location.trim()) params.set("location", location.trim());
    navigate(`/findjobs?${params.toString()}`);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 py-16 lg:py-24 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
            {/* Content column */}
            <div className="col-span-12 text-center md:col-span-7 md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                {t("homePage.heroTitleS1")} <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400">
                  {t("homePage.heroTitleS2")}
                </span>
              </h1>

              <p className="mt-6 text-base leading-relaxed text-slate-600 max-w-xl mx-auto md:mx-0 lg:text-lg dark:text-slate-300">
                {t("homePage.heroParagraph")}
              </p>

              {/* Search Bar Container */}
              <div className="mt-10 max-w-3xl">
                <div className="flex flex-col md:flex-row items-stretch gap-2 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
                  {/* Job Title Input */}
                  <div className="flex flex-1 items-center gap-3 px-3 py-2 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-700">
                    <Search size={20} className="text-slate-400 shrink-0" />
                    <input
                      type="search"
                      value={keyWord}
                      onChange={handleOnChange}
                      placeholder="Search title or keyword"
                      className="w-full bg-transparent py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                    />
                  </div>

                  {/* Location Input */}
                  <div className="relative flex flex-1 items-center gap-3 px-3 py-2">
                    <MapPin size={20} className="text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => handleSetLocation(e.target.value)}
                      placeholder="Search location..."
                      className="w-full bg-transparent py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                    />

                    {/* Dropdown Suggestions */}
                    {isOpen && filteredLocations.length > 0 && (
                      <ul className="absolute left-0 right-0 top-full z-20 mt-3 max-h-60 overflow-y-auto rounded-xl border border-slate-100 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-800">
                        {filteredLocations.map((item) => (
                          <li
                            key={item}
                            onClick={() => handleSetLocation(item)}
                            className="cursor-pointer rounded-lg px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700/50"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="shrink-0 flex items-center">
                    <button
                      onClick={handleSearch}
                      className="w-full md:w-auto px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                      Find Job
                    </button>
                  </div>
                </div>
              </div>
              {/* Stats bar  */}
              <Stats />
            </div>

            {/* Image column */}
            <div className="relative col-span-12 md:col-span-5 flex justify-center">
              {/* Soft decorative background shape */}
              <div className="absolute -top-4 -bottom-4 left-4 right-4 z-0 bg-gradient-to-tr from-blue-100 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/20 rounded-3xl transform rotate-1"></div>

              <div className="relative w-full max-w-md md:max-w-none z-10">
                <img
                  src="heroImage2.png"
                  alt="Person pointing to the left"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />

                {/* Floating Stat Badge */}
                <div className="absolute bottom-10 left-4 z-10 px-5 py-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md flex items-center gap-3 rounded-2xl shadow-lg border border-white/20 dark:border-slate-700 animate-bounce-slow">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white font-bold">
                    ✓
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                      500+
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                      Happy Customers
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default HeroSection;
