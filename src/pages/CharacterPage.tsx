import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import "../style/CharInfo.scss";
import Character from "../types/character";

const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Character | null>(null);
  const [modalActive, setModalActive] = useState<boolean>(false);

  const openModal = () => {
    setModalActive(!modalActive);
    console.log(modalActive);
  };

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        const data: Character = await response.json();
        setCharacter(data);
        setFormData(data); // Инициализируем значения формы
      } catch (error) {
        console.error("Error fetching character data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      setCharacter(formData);
      setModalActive(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <>
      {" "}
      <div className={modalActive ? `blur` : `charInfo`}>
        <div className="charInfo__container">
          <div className="charInfo__container--img"></div>
          <h1 className="charInfo__container--name">{character.name}</h1>
          <p>Height: {character.height}</p>
          <p>Mass: {character.mass}</p>
          <p>Hair Color: {character.hair_color}</p>
          <p>Skin Color: {character.skin_color}</p>
          <p>Eye Color: {character.eye_color}</p>
          <p>Birth Year: {character.birth_year}</p>
          <p>Gender: {character.gender}</p>
          <button onClick={openModal} className="charInfo__container--btn">
            Edit
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className={modalActive ? `active` : `disactive`}
      >
        <h2>Edit Character Info</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            name="height"
            value={formData?.height}
            onChange={handleChange}
          />
        </label>
        <label>
          Mass:
          <input
            type="number"
            name="mass"
            value={formData?.mass}
            onChange={handleChange}
          />
        </label>
        <label>
          Hair Color:
          <input
            type="text"
            name="hair_color"
            value={formData?.hair_color}
            onChange={handleChange}
          />
        </label>
        <label>
          Skin Color:
          <input
            type="text"
            name="skin_color"
            value={formData?.skin_color}
            onChange={handleChange}
          />
        </label>
        <label>
          Eye Color:
          <input
            type="text"
            name="eye_color"
            value={formData?.eye_color}
            onChange={handleChange}
          />
        </label>
        <label>
          Birth Year:
          <input
            type="text"
            name="birth_year"
            value={formData?.birth_year}
            onChange={handleChange}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={formData?.gender}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="edit">
          Update Character Info
        </button>
      </form>
    </>
  );
};

export default CharacterPage;
