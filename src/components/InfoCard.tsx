import React, { useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { PeopleState } from "../store/types.people.slice";

const InfoCard = () => {
  const { id } = useParams();

  const idNumber = Number(id);

  const dispatch = useAppDispatch();

  const peoples = useAppSelector(
    (state: { people: PeopleState }) => state.people.peoples
  );
  const status = useAppSelector((state) => state.people.status);

  const starships = useAppSelector((state) => state.people.starships);

  const films = useAppSelector((state) => state.people.films);

  const homeworld = useAppSelector((state) => state.people.homeworld);

  const vehicles = useAppSelector((state) => state.people.vehicles);

  const classesForListItem =
    "bg-neutral-400 rounded-[10px] p-[20px] text-[30px] w-[800px] text-center flex flex-col";

  useEffect(() => {
    if (!peoples[idNumber]) {
      return;
    }

    if (peoples[idNumber].starships.length > 0) {
      dispatch(getStarships(peoples[idNumber].starships));
    } else {
      dispatch(clearStateStarships({}));
    }

    if (peoples[idNumber].films.length > 0) {
      dispatch(getFilms(peoples[idNumber].films));
    } else {
      dispatch(clearStateFilms({}));
    }

    if (peoples[idNumber].vehicles.length > 0) {
      dispatch(getVehicles(peoples[idNumber].vehicles));
    } else {
      dispatch(clearVehiclesState({}));
    }

    dispatch(getHomeworld(peoples[idNumber].homeworld));
  }, [idNumber, peoples, dispatch]);

  const backToPreviousPage = () => {
    window.history.back();
  };

  if (!peoples[idNumber]) {
    return (
      <div className="mx-[5vw] my-[5vh] bg-neutral-400 rounded-[10px] text-center text-[30px]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main>
      <section className="px-[130px] py-[20px] relative">
        <button
          className="fixed top-[50px] left-[90px] bg-neutral-400 px-[50px] py-[20px] rounded-[10px]"
          onClick={backToPreviousPage}
        >
          Назад
        </button>
        <div className="flex flex-col items-center gap-[15px]">
          <div className={classesForListItem}>
            <h1>Имя:</h1>
            <p>{peoples[idNumber].name}</p>
          </div>

          <div className={classesForListItem}>
            <p>Родной мир</p>
            {status === "Loading" && <span>Loading...</span>}
            {status === "Resolve" && <p>{homeworld}</p>}
          </div>

          <div className={classesForListItem}>
            <p>Рост:</p>
            <p>{peoples[idNumber].height}</p>
          </div>

          <div className={classesForListItem}>
            <p>Масса:</p>
            <p>{peoples[idNumber].mass}</p>
          </div>

          <div className={classesForListItem}>
            <p>Цвет волос:</p>
            <p>{peoples[idNumber].hair_color}</p>
          </div>

          <div className={classesForListItem}>
            <p>Цвет скина:</p>
            <p>{peoples[idNumber].skin_color}</p>
          </div>

          <div className={classesForListItem}>
            <p>Гендер:</p>
            <p>{peoples[idNumber].gender}</p>
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
};

export default InfoCard;
