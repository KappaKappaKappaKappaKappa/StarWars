import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import InfoCard from "./InfoCard";
import PeopleList from "./PeopleList";
import { useSelector } from "react-redux";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [startViewCard, setStartViewCard] = useState(1);

  const peoples = useSelector((state) => state.people.peoples);

  const maxPages = Math.ceil(peoples.length / 3);

  const step = 3;

  const viewNextPage = () => {
    if (currentPage === maxPages) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
      setStartViewCard(startViewCard + step);
    }
  };

  const viewPreviousPage = () => {
    if (currentPage === 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
      setStartViewCard(startViewCard - step);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <main className="px-[5vw] py-[5vh]">
              <section className="flex flex-col items-center">
                <PeopleList startViewCard={startViewCard} step={step} />
                <div className="flex gap-[10px] p-[10px] mt-[20px]">
                  <button
                    className={`rounded-[20px] p-[10px] bg-neutral-400 ${
                      currentPage === 1 ? "opacity-10 hover:cursor-default" : ""
                    }`}
                    onClick={viewPreviousPage}
                  >
                    Прошлая страница
                  </button>
                  <span className="rounded-[20px] bg-neutral-400 p-[10px]">
                    {currentPage}
                  </span>
                  <button
                    className={`rounded-[20px] bg-neutral-400 p-[10px] ${
                      currentPage === maxPages
                        ? "opacity-10 hover:cursor-default"
                        : ""
                    }`}
                    onClick={viewNextPage}
                  >
                    Следущая страница
                  </button>
                </div>
              </section>
            </main>
          }
        />
        <Route path="/people-info/:id" element={<InfoCard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
