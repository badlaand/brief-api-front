// import { list_products } from '../data';
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

export interface Plante {
  id: string;
  name: string;
  unitprice_ati: number;
  quantity: number;
  category: string;
  rating: number;
  url_picture: string;
}

/**
 * Ici les constantes ou variables dont la modification de valeur ne provoquera pas directement de re-render
 */

let checkedCateg: string[] = [];

const Home = () => {
  // const [listHero, setListHero] = useState<any[]>([
  //   { name: 'Coco' },
  //   { name: 'Zozo' },
  //   { name: 'Toto' },
  // ]);
  const [listPlantes, setListPlants] = useState<Plante[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/plant")
      .then((response: AxiosResponse<{ data: Plante[] }>) => {
        console.log("Reponse GET plant: ", response.data.data);
        const myPlant: Plante[] = response.data.data;
        setListPlants([...myPlant]);
      });
  }, []);
  const [listPlantDisplayed, setListPlantDisplayed] = useState<Plante[]>([
    ...listPlantes,
  ]);

  const handleCheckCategories = (mesCategoriesChecked: string[]) => {
    console.log("categories checked", mesCategoriesChecked);
    /**
     * Filtrer nos données ici
     */
    let resultFilteredPlants;
    checkedCateg = [...mesCategoriesChecked];

    if (checkedCateg.length > 0) {
      resultFilteredPlants = listPlantes.filter((x) =>
        checkedCateg.includes(x.category)
      );
    } else {
      resultFilteredPlants = [...listPlantes];
    }

    setListPlantDisplayed(resultFilteredPlants); // mettre à jour l'affichage de notre composant en fonction de la valeur de result
  };

  return (
    <div className="d-flex align-items-stretch">
      <SideBar
        listElementPlant={listPlantes}
        onChangeCategoriesCheck={handleCheckCategories}
      />
      <div className="container-fluid custom-main">
        {listPlantDisplayed.map((plante, i) => (
          <li key={i}>
            {plante.name} - {plante.category} - 💵 {plante.unitprice_ati}€ - ⭐
            {plante.rating}
          </li>
        ))}{" "}
      </div>
    </div>
  );
};
export default Home;
