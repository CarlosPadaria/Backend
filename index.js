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
  const { EMAIL } = req.body;
  let userRepository = getRepository("Usuario");

  const usuario = await userRepository.findOne({
    where: { EMAIL: EMAIL },
  });

  return res.status(200).json(usuario);
});

app.delete("/usuarios/:ID_USUARIO", async (req, res) => {
  let userRepository = getRepository("Usuario");

  req.body = await userRepository.findOne({
    where: [{ IDPRODUTO: req.params.ID_USUARIO }],
  });
  let DeletarUsuario = await productRepository.delete({
    ID_USUARIO: `${req.params.ID_USUARIO}`,
  });

  if (req.body === null) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  } else {
    return res.status(200).json(req.body);
  }
});

app.post("/usuarios", async (req, res) => {
  const { NOME, EMAIL, SENHA } = req.body;
  //console.log(req.body)

  //return res.json({EMAIL, SENHA, NOME});
  let userRepository = getRepository("Usuario");

  const usuario = await userRepository.insert(req.body);

  return res.status(200).json(req.body);
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

/*app.patch("/users/:IDPRODUTO", async (req, res) =>{
    console.log(req.params);
    
    let userRepository = getRepository("User")

    let produto = await userRepository.findOne({
        where: [
            {IDPRODUTO: req.params.IDUSUARIO}
        ]
    })

    if (produto === null)
    {
        return res.status(400).json({message:"Usuário não encontrado!"})
    }
    else
    {
        alterarSenha = await userRepository.update(
            req.params.IDUSUARIO, {SENHA: `${req.body.SENHA}`}
        )
        usuario.SENHA = req.body.SENHA
        return res.status(200).json({usuario})
    }
})*/

app.listen(3333, () => {
  console.log("mensagem fofa >-<");
});
