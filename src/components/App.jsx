import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import InfoCard from "./InfoCard";
import { getAllPeoples } from "../store/people.slice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPeoples());
  }, [dispatch]);

  const peoples = useSelector((state) => state.people.peoples);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <main className="px-[5vw] py-[5vh]">
              <section className="">
                <div className="flex gap-[15px] flex-col items-center">
                  {peoples &&
                    peoples.map((hero, index) => {
                      return (
                        <Link
                          key={index}
                          to={`/people-info/${index}`}
                          className="w-[80%] hover:opacity-80"
                        >
                          <article className="bg-neutral-400 flex flex-col items-center px-[15px] py-[15px] rounded-[30px]">
                            <h1 className="text-[30px]">{`${hero.name}`}</h1>
                            <p>{`Рост: ${hero.height}`}</p>
                            <p>{`Вес: ${hero.mass}`}</p>
                            <p>{`Цвет волос: ${hero.hair_color}`}</p>
                            <p>{`Цвет кожи: ${hero.skin_color}`}</p>
                          </article>
                        </Link>
                      );
                    })}
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
