import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import InfoCard from "./InfoCard";
import PeopleList from "./PeopleList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <main className="px-[5vw] py-[5vh]">
              <section >
                <PeopleList />
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
