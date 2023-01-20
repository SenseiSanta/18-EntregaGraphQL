import { buildSchema } from 'graphql';

const UsuarioSchema = buildSchema(`
input UsuarioInput {
    username: String,
    password: String,
    phone: Float,
    age: Int,
    address: String,
    email: String,
    image: String,
    cartID: String,
    admin: Boolean
}
type Usuario {
    _id: String,
    username: String,
    phone: Float,
    age: Int,
    address: String,
    email: String,
    admin: Boolean
}
type Query {
  getUsuario(_id: String!): Usuario,
  getUsuarios: [Usuario]
}
type Mutation {
  createUsuario(data: UsuarioInput): Usuario,
  updateUsuario(_id: String!, data: UsuarioInput): Usuario,
  deleteUsuario(_id: String!): Usuario
}
`);

export default UsuarioSchema;