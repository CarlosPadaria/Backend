const { EntitySchema, RelationId, } = require("typeorm");

module.exports = new EntitySchema({
  name: "Receita",
  tableName: "RECEITA",
  columns: {
    ID_RECEITA: {
      primary: true,
      type: "int",
      generated: true,
    },
    TITULO: {
      type: "varchar",
      nullable: false,
    },
    IMAGEM: {
      type: "varchar",
      nullable: true,
    },
    PORCAO: {
      type: "varchar",
      nullable: true,
    },
    ID_USUARIO:{
        type: "int",
    }
  },

  // do relations with  usuario table
  relations: {
    usuario: {
      type: "many-to-one",
      target: "Usuario",
      joinColumn: {
        name: "ID_USUARIO",
      },
      inverseside: "receita",
    },
  },
});
