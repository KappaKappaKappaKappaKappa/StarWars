import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function PeopleList({ startViewCard, step }) {
  const peoples = useSelector((state) => state.people.peoples);

  const viewCards = peoples.slice(startViewCard - 1, startViewCard - 1 + step);

  if (peoples.length === 0 ) {
    return (
      <div className="w-full bg-neutral-400 rounded-[10px] text-center text-[30px]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex gap-[15px] flex-col items-center w-full">
      {viewCards &&
        viewCards.map((hero, index) => {
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
  );
}
