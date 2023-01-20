import { UsersDAOMongoDB } from "../../models/daos/Usuarios.DAO.js";

/* =============== Encriptacion =============== */
import bcrypt from 'bcrypt'
import {getUserByUsername, saveInfoUser} from '../services/initial.service.js';

async function hashPassGenerator (password) {
    const hashPassword = await bcrypt.hash(password, 10)
    return hashPassword
}

const dao = new UsersDAOMongoDB();

export async function getUsuarios() {
    let data = await dao.getAll()
    return data
}

export async function getUsuario({_id}) {
    let data = await dao.getById(_id)
    return data
}

export async function updateUsuario({_id, data}) {
    // Quito 'null'
    const obj = JSON.parse(JSON.stringify(data));

    // Encripto contrasena
    if (obj.password) {
        obj.password = await hashPassGenerator(obj.password)  
    }

    // Proceso principal de actualizacion
    let response = await dao.updateById(_id, obj)
    let info = response.state.data
    if (response.state.update == true) {
        return info
    } else {
        return new Error (info)
    }
}

export async function createUsuario({data}) {
    // Quito 'null'
    const obj = JSON.parse(JSON.stringify(data));

    // Encripto contrasena
    obj.password = await hashPassGenerator(obj.password)

    // Verifico que no exista el usuario
    let user = await getUserByUsername(obj.username)

    // Guardo en BD
    if (user == undefined) {
        let response = await dao.save(obj)
        let info = response.doc
        return info
    } else {
        return new Error ('No se ha guardado el usuario porque actualmente ya existe uno con ese username')
    }
}

export async function deleteUsuario({_id}) {
    let response = await dao.deleteById(_id)
    let info = response.state.data
    if (response.state.delete == true) {
        return info
    } else {
        return new Error (info)
    }
}