const { EntitySchema, RelationId } = require("typeorm")

module.exports = new EntitySchema({
    name: "Usuario",
    tableName: "USUARIO",
    columns: {
        ID_USUARIO: {
            primary: true,
            type: "int",
            generated: true
        },
        NOME: {
            type: "varchar",
            nullable: false,
        },
        EMAIL: {
            type: "varchar",
            nullable: false
        },
        SENHA: {
            type: "varchar",
            nullable: false
        },
        TIPO_USUARIO: {
            type: "varchar",
            nullable: false
        }
    }
})
