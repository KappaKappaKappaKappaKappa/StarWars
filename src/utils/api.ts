async function getPlanet() {
    try {
      const planet = await fetch("https://swapi.dev/api/planets/3/");

      if (!planet.ok) {
        throw new Error(`Ошибка HTTP: ${planet.status}`);
      }

      const data = await planet.json();

      return data;
      
    } catch (error: any) {
      console.error("Ошибка при выполнении запроса:", error.message);
      throw error;
    }
  }

  getPlanet()
    .then((data) => {
      console.log("Полученные данные:", data);
    })
    .catch((error) => {
      console.error("Что-то пошло не так:", error);
    });