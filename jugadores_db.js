// 🗄️ BASE DE DATOS LOCAL DE JUGADORES (RESPALDO SI LA API FALLA)
window.JugadoresDB = {
    'messi': { nombre: 'Lionel Messi', overall: 87, goles: 17, asistencias: 15, edad: 37, posicion: 'Delantero', equipo: 'Inter Miami', nacionalidad: 'Argentina', pace: 82, shooting: 82, passing: 82, defending: 52, physical: 77 },
    'cristiano': { nombre: 'Cristiano Ronaldo', overall: 87, goles: 22, asistencias: 8, edad: 39, posicion: 'Delantero', equipo: 'Al-Nassr', nacionalidad: 'Portugal', pace: 87, shooting: 87, passing: 87, defending: 57, physical: 82 },
    'ronaldo': { nombre: 'Cristiano Ronaldo', overall: 87, goles: 22, asistencias: 8, edad: 39, posicion: 'Delantero', equipo: 'Al-Nassr', nacionalidad: 'Portugal', pace: 87, shooting: 87, passing: 87, defending: 57, physical: 82 },
    'yamal': { nombre: 'Lamine Yamal', overall: 82, goles: 5, asistencias: 3, edad: 17, posicion: 'Delantero', equipo: 'Barcelona', nacionalidad: 'España', pace: 77, shooting: 77, passing: 77, defending: 47, physical: 72 },
    'haaland': { nombre: 'Erling Haaland', overall: 91, goles: 30, asistencias: 5, edad: 24, posicion: 'Delantero', equipo: 'Manchester City', nacionalidad: 'Noruega', pace: 89, shooting: 93, passing: 66, defending: 45, physical: 88 },
    'mbappe': { nombre: 'Kylian Mbappé', overall: 91, goles: 28, asistencias: 7, edad: 26, posicion: 'Delantero', equipo: 'Real Madrid', nacionalidad: 'Francia', pace: 97, shooting: 89, passing: 80, defending: 36, physical: 78 },
    'vinicius': { nombre: 'Vinícius Jr.', overall: 89, goles: 20, asistencias: 10, edad: 24, posicion: 'Delantero', equipo: 'Real Madrid', nacionalidad: 'Brasil', pace: 95, shooting: 84, passing: 78, defending: 30, physical: 68 },
    'bellingham': { nombre: 'Jude Bellingham', overall: 89, goles: 19, asistencias: 7, edad: 21, posicion: 'Mediocentro', equipo: 'Real Madrid', nacionalidad: 'Inglaterra', pace: 80, shooting: 84, passing: 82, defending: 78, physical: 85 },
    'debruyne': { nombre: 'Kevin De Bruyne', overall: 89, goles: 8, asistencias: 18, edad: 33, posicion: 'Mediocentro', equipo: 'Manchester City', nacionalidad: 'Bélgica', pace: 72, shooting: 85, passing: 94, defending: 65, physical: 76 },
    'lewan': { nombre: 'Robert Lewandowski', overall: 89, goles: 26, asistencias: 9, edad: 36, posicion: 'Delantero', equipo: 'Barcelona', nacionalidad: 'Polonia', pace: 78, shooting: 91, passing: 79, defending: 44, physical: 82 },
    'modric': { nombre: 'Luka Modrić', overall: 86, goles: 3, asistencias: 8, edad: 39, posicion: 'Mediocentro', equipo: 'Real Madrid', nacionalidad: 'Croacia', pace: 70, shooting: 76, passing: 89, defending: 72, physical: 65 },
    'kane': { nombre: 'Harry Kane', overall: 89, goles: 32, asistencias: 8, edad: 31, posicion: 'Delantero', equipo: 'Bayern Múnich', nacionalidad: 'Inglaterra', pace: 68, shooting: 93, passing: 84, defending: 47, physical: 83 },
    'salah': { nombre: 'Mohamed Salah', overall: 88, goles: 24, asistencias: 13, edad: 32, posicion: 'Delantero', equipo: 'Liverpool', nacionalidad: 'Egipto', pace: 89, shooting: 87, passing: 82, defending: 45, physical: 75 }
};

// Función para buscar en la base de datos local
window.buscarJugadorLocal = function(nombre) {
    const busqueda = nombre.toLowerCase().trim();
    for (let clave in window.JugadoresDB) {
        if (clave.includes(busqueda) || busqueda.includes(clave)) {
            return { ...window.JugadoresDB[clave], fuente: 'CDN Local (Respaldo)' };
        }
    }
    return null;
};

console.log("🗄️ JugadoresDB cargado (respaldo local).");
