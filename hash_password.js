import bcrypt from 'bcryptjs'; // Cambiado de 'require' a 'import'

const password = 'admin'; // La contraseña que quieres hashear
const saltRounds = 12; // El número de "salt rounds" (igual que tus otros hashes)

async function generateHash() {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        console.log('Contraseña "admin" hasheada:');
        console.log(hash);
    } catch (err) {
        console.error('Error al hashear la contraseña:', err);
    }
}

generateHash(); // Llama a la función para ejecutarla