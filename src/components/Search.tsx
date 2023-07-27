import { BsSearch } from "react-icons/bs";
import { useState, KeyboardEvent } from "react";
import classes from "./Search.module.css";

// função que recebe o nome do usuario e retorna promise
// por que tem a promesa da nossa api no arquivo Home
type SearchProps = {
  loadUser: (userName: string) => Promise<void>;
};

const Search = ({ loadUser }: SearchProps) => {
  // saber que o usuario digitou no campo de busca
  const [userName, setUserName] = useState("");

  // função argumento saber se a chave faz alguma coisa
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      loadUser(userName);
    }
  };

  return (
    <div className={classes.search}>
      <h2>Busque por um usuário</h2>
      <p>Conheça seus melhores repositórios</p>
      <div className={classes.search_container}>
        {/* onchange para mostra oque o usuario digitar */}
        <input
          type="text"
          placeholder="Digite o nome do usuário"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => loadUser(userName)}>
          <BsSearch />
        </button>
      </div>
    </div>
  );
};

export default Search;
