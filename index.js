const express = require("express");
const { getRepository, Repository } = require("typeorm");
/*
    Caso dar erro, rodar no terminal:
        yarn add reflect-metadata
    e colocar no topo do código:
        require("reflect-metadata")

*/
const database = require("./src/database");
const Usuario = require("./src/entity/Usuario");
database();

let app = express();

app.use(express.json());

app.get("/", (req, res) => {
  //req.body
  if (true) {
    return res.status(200).json({ mensagem: "Hello, World" });
  } else {
    return res.status(404).json({ status: "Falha" });
  }
});
app.get("/usuarios", async (req, res) => {
  //req.body
  let userRepository = getRepository("Usuario");

  const usuario = await userRepository.find();
  return res.status(200).json(usuario);
});

/*app.put("/usuarios/:ID_USUARIO", async (req, res) =>{
    const{QUANTIDADE, NOME} = req.body
    
    let productRepository = getRepository("Produto")


        alterarDADOS = await productRepository.update(
            req.params, {NOME: `${req.body.NOME}`, QUANTIDADE: `${req.body.QUANTIDADE}`}
        )
       
        return res.status(200).json(req.body)
    
})*/

app.post("/login", async (req, res) => {
  const { EMAIL, SENHA } = req.body;

  let userRepository = getRepository("Usuario");

  const usuario = await userRepository.findOne({
    where: [{ EMAIL: req.body.EMAIL, SENHA: req.body.SENHA }],
  });

  // console.log(usuario.EMAIL);
  if (usuario != null) {
    console.log("usuario", usuario);
    return res.status(200).json(usuario);
  } else {
    console.log("falhou do backend");
    return res.status(404).json({ status: "Falha" });
  }
});

app.delete("/usuarios/:ID_USUARIO", async (req, res) => {
  let userRepository = getRepository("Usuario");

  req.body = await userRepository.findOne({
    where: [{ ID_USUARIO: req.params.ID_USUARIO }],
  });

  if (req.body === null) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  } else {
    let DeletarUsuario = await userRepository.delete({
      ID_USUARIO: `${req.params.ID_USUARIO}`,
    });
    return res.status(200).json(req.body);
  }
});

app.post("/usuarios", async (req, res) => {
  const { NOME, EMAIL, SENHA, TIPO_USUARIO } = req.body;
  //console.log(req.body)

  //return res.json({EMAIL, SENHA, NOME});
  let userRepository = getRepository("Usuario");
  const usuario = await userRepository.findOne({
    where: [{ EMAIL: req.body.EMAIL }],
  });
  if (usuario == null) {
    const contaNova = await userRepository.insert(req.body);
    return res.status(200).json(req.body);
  } else {
    return res.status(400).json({ message: "Usuário já existe" });
  }
});

app.get("/usuarios/:ID_USUARIO", async (req, res) => {
  console.log(req.params);

  console.log(req.body);
  let userRepository = getRepository("Usuario");

  const usuario = await userRepository.findOne({
    where: [{ ID_USUARIO: req.params.ID_USUARIO }],
  });

  if (usuario === null) {
    return res.status(400).json({ message: "Usuário não encontrado!" });
  } else {
    return res.status(200).json(usuario);
  }
});

app.get("/receitas", async (req, res) => {
  let receitaRepository = getRepository("Receita");
  const receita = await receitaRepository.find();
  return res.status(200).json(receita);
})

app.post("/receitas", async (req, res) => {
  let receitaRepository = getRepository("Receita");

  const receita = await receitaRepository.insert(req.body);

  console.log(req.body);
  return res.status(200).json(req.body);
})

app.post("/passos", async (req, res) => {
  let passoRepository = getRepository("Passos");

  const passo = await passoRepository.insert(req.body);

  //console.log(req.body);
  return res.status(200).json(req.body);
})


app.post("/ingredientes", async (req, res) => {
  let ingredienteRepository = getRepository("Ingrediente");

  const ingrediente = await ingredienteRepository.insert(req.body);

  //console.log(req.body);
  return res.status(200).json(req.body);
})

app.get("/passos", async (req, res) => {
  let passosRepository = getRepository("Passos");

  const passo = await passosRepository.find();

  return res.status(200).json(passo);
})


app.get("/passos/:ID_PASSOS", async (req, res) => {
  let passosRepository = getRepository("Passos");
  
  const passo = await passosRepository.findOne({
    where: [{ ID_PASSOS: req.params.ID_PASSOS }],
  });

  if (passo === null) {
    return res.status(400).json({ message: "Ingrediente não encontrado!" });
  }
  else{
    return res.status(200).json(passo);
  }
  
})


app.get("/ingredientes/:ID_INGREDIENTE", async (req, res) => {
  let ingredienteRepository = getRepository("Ingrediente");
  const ingrediente = await ingredienteRepository.findOne({
    where: [{ ID_INGREDIENTE: req.params.ID_INGREDIENTE }],
  });

  if (ingrediente === null) {
    return res.status(400).json({ message: "Ingrediente não encontrado!" });
  }
  else{
    return res.status(200).json(ingrediente);
  }
  
})

app.get("/ingredientes", async (req, res) => {
  let ingredienteRepository = getRepository("Ingrediente");
  const ingrediente = await ingredienteRepository.find();
  return res.status(200).json(ingrediente);
})

app.get("/receitas/:ID_RECEITA", async (req, res) => {
  let receitaRepository = getRepository("Receita");
  const receita = await receitaRepository.findOne({
    where: [{ ID_RECEITA: req.params.ID_RECEITA }],
  });

  if (receita === null) {
    return res.status(400).json({ message: "Receita não encontrada!" });
  }
  else{
    return res.status(200).json(receita);
  }
  
})


app.patch("/nome/:ID_USUARIO", async (req, res) => {
  const { NOME } = req.body;

  let userRepository = getRepository("Usuario");

  const usuario = await userRepository.findOne({
    where: [{ ID_USUARIO: req.params.ID_USUARIO }],
  });
  //return res.status(200).json(req.body)
  if (usuario === null) {
    return res.status(400).json({ message: "Usuário não encontrado!" });
  } else {
    const alterarNome = await userRepository.update(req.params.ID_USUARIO, {
      NOME: `${req.body.NOME}`,
    });
    return res.status(200).json(req.body);
  }
});

app.patch("/senha/:ID_USUARIO", async (req, res) => {
  const { SENHA } = req.body;

  let userRepository = getRepository("Usuario");

  const usuario = await userRepository.findOne({
    where: [{ ID_USUARIO: req.params.ID_USUARIO }],
  });
  //return res.status(200).json(req.body)
  if (usuario === null) {
    return res.status(400).json({ message: "Usuário não encontrado!" });
  } else {
    const alterarNome = await userRepository.update(req.params.ID_USUARIO, {
      SENHA: `${req.body.SENHA}`,
    });
    return res.status(200).json(req.body);
  }
});

app.listen(3333, () => {
  console.log("mensagem fofa >-<");
});
