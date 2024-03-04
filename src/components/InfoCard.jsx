import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStarships } from "../store/people.slice";
import { clearStateStarships } from "../store/people.slice";

export default function InfoCard() {
  const peoples = useSelector((state) => state.people.peoples);
  const { id } = useParams();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.people.status);

  const classesForListItem =
    "bg-neutral-400 rounded-[10px] p-[20px] text-[30px] w-[800px] text-center";

  useEffect(() => {
    if (peoples[id].starships.length > 0) {
      dispatch(getStarships(peoples[id].starships));
    } else {
      dispatch(clearStateStarships());
    }
  }, [id, peoples, dispatch]);

  const starShips = useSelector((state) => state.people.starships);

  return (
    <main>
      <section className="px-[130px] py-[20px]">
        <article className="flex flex-col items-center gap-[15px]">
          <h1 className={classesForListItem}>{`Имя: ${peoples[id].name}`}</h1>
          <p className={classesForListItem}>{`Рост: ${peoples[id].height}`}</p>
          <p className={classesForListItem}>{`Масса: ${peoples[id].mass}`}</p>
          <p
            className={classesForListItem}
          >{`Цвет волос: ${peoples[id].hair_color}`}</p>
          <p
            className={classesForListItem}
          >{`Цвет скина: ${peoples[id].skin_color}`}</p>
          <p
            className={classesForListItem}
          >{`Гендер: ${peoples[id].gender}`}</p>

          <ul className={`flex flex-col flex-wrap ${classesForListItem}`}>
            <p>Звездные корабли:</p>
            {status === "Loading" && <span>Loading...</span>}
            {status === "Resolve" &&
              (starShips.length > 0 ? (
                starShips.map((item, index) => (
                  <li key={index}>{`${index + 1}: ${item.name}`}</li>
                ))
              ) : (
                <li>Отсутствуют</li>
              ))}
          </ul>

          <ul>
            <p>Фильмы:</p>
          </ul>
        </article>
      </section>
    </main>
  );
}
