import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getStarships,
  getFilms,
  getHomeworld,
  getVehicles,
} from "../store/people.slice";
import {
  clearStateStarships,
  clearStateFilms,
  clearVehiclesState,
} from "../store/people.slice";

export default function InfoCard() {
  const peoples = useSelector((state) => state.people.peoples);
  const { id } = useParams();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.people.status);

  const classesForListItem =
    "bg-neutral-400 rounded-[10px] p-[20px] text-[30px] w-[800px] text-center flex flex-col";

  const starships = useSelector((state) => state.people.starships);
  const films = useSelector((state) => state.people.films);
  const homeworld = useSelector((state) => state.people.homeworld);
  const vehicles = useSelector((state) => state.people.vehicles);

  useEffect(() => {
    if (!peoples[id]) {
      return;
    }

    if (peoples[id].starships.length > 0) {
      dispatch(getStarships(peoples[id].starships));
    } else {
      dispatch(clearStateStarships());
    }

    if (peoples[id].films.length > 0) {
      dispatch(getFilms(peoples[id].films));
    } else {
      dispatch(clearStateFilms());
    }

    if (peoples[id].vehicles.length > 0) {
      dispatch(getVehicles(peoples[id].vehicles));
    } else {
      dispatch(clearVehiclesState());
    }

    dispatch(getHomeworld(peoples[id].homeworld));
  }, [id, peoples, dispatch]);

  if (!peoples[id]) {
    return (
      <div className="mx-[5vw] my-[5vh] bg-neutral-400 rounded-[10px] text-center text-[30px]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main>
      <section className="px-[130px] py-[20px]">
        <div className="flex flex-col items-center gap-[15px]">
          <div className={classesForListItem}>
            <h1>Имя:</h1>
            <p>{peoples[id].name}</p>
          </div>

          <div className={classesForListItem}>
            <p>Родной мир</p>
            {status === "Loading" && <span>Loading...</span>}
            {status === "Resolve" && <p>{homeworld}</p>}
          </div>

          <div className={classesForListItem}>
            <p>Рост:</p>
            <p>{peoples[id].height}</p>
          </div>

          <div className={classesForListItem}>
            <p>Масса:</p>
            <p>{peoples[id].mass}</p>
          </div>

          <div className={classesForListItem}>
            <p>Цвет волос:</p>
            <p>{peoples[id].hair_color}</p>
          </div>

          <div className={classesForListItem}>
            <p>Цвет скина:</p>
            <p>{peoples[id].skin_color}</p>
          </div>

          <div className={classesForListItem}>
            <p>Гендер:</p>
            <p>{peoples[id].gender}</p>
          </div>

          <ul className={`flex-wrap ${classesForListItem}`}>
            <p>Звездные корабли:</p>
            {status === "Loading" && <span>Loading...</span>}
            {status === "Resolve" &&
              (starships.length > 0 ? (
                starships.map((item, index) => (
                  <li key={index}>{`${index + 1}: ${item.name}`}</li>
                ))
              ) : (
                <li>Отсутствуют</li>
              ))}
          </ul>

          <ul className={`flex-wrap ${classesForListItem}`}>
            <p>Фильмы:</p>
            {status === "Loading" && <span>Loading...</span>}
            {status === "Resolve" &&
              (films.length > 0 ? (
                films.map((item, index) => (
                  <li key={index}>{`${index + 1}: ${item.title}`}</li>
                ))
              ) : (
                <li>Отсутствуют</li>
              ))}
          </ul>

          <ul className={`flex-wrap ${classesForListItem}`}>
            <p>Транспорт:</p>
            {status === "Loading" && <span>Loading...</span>}
            {status === "Resolve" &&
              (vehicles.length > 0 ? (
                vehicles.map((item, index) => (
                  <li key={index}>{`${index + 1}: ${item.name}`}</li>
                ))
              ) : (
                <li>Отсутствуют</li>
              ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
