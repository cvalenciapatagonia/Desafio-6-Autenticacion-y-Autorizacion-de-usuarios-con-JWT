const pool = require('../dataBase/conexion')
const bcrypt = require('bcryptjs')

const showUsers = async (email) => {
    const command = 'SELECT * FROM usuarios WHERE email = $1'
    const values = [email]
    const { rows: usuario } = await pool.query(command, values)
    return usuario
}

const verificarCredenciales = async (email, password) => {
    const values = [email]
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const { rows: [usuario], rowCount } = await pool.query(consulta, values)
    if(!rowCount) throw {code: 404, message: 'No existe ese usuario...'}
    
    const { password: passwordEncriptada } = usuario
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
    if (!passwordEsCorrecta || !rowCount)
        throw { code: 401, message: "Email o contraseña incorrecta" }
}

const createUser = async (email, password, rol, lenguage) => {
    const comand = 'INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)'
    const encryptedPassword = bcrypt.hashSync(password)
    const values = [email, encryptedPassword, rol, lenguage]
    await pool.query(comand, values)
}




module.exports = { showUsers, createUser, verificarCredenciales }