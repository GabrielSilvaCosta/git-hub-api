import Search from "../components/Search";
import { useState } from "react";
// vamos importa os tipo que definimos
import { UserProps } from "../types/user";
import User from "../components/User";
import Error from "../components/Error";


const Home = () => {
  // vamos dizer que userProps ou null
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState(false);

  // função carregar o usuario da api gitHub
  const loadUser = async (userName: string) => {
    
    setError(false);
    setUser(null);
    // procurar pelo nome do usuario
    const res = await fetch(`https://api.github.com/users/${userName}`);

    const data = await res.json();
    

    // error se nao encontra usuario api
    if(res.status === 404) {
      setError(true);
      return;
    }

    // vamos desctruturi de objeto tudo que tem no type
    const { avatar_url, login,  location,  followers, following } = data

    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following,
    };

     // usuario agora e o userData
    setUser(userData);

  };

  return (
    <div>
      {/* loadUser do search vai ser igual loadUser no app */}
      {/* se o usuario esta disponivel faz o resgate da api, e exibi o nome do usuario na tela */}
      <Search loadUser={loadUser} />
      {user && <User {...user} />}
      {error && <Error />}
    </div>
  );
};

export default Home;
