// 🌍 ADAPTABILIDAD DE LIGA
window.AdaptabilidadLiga = {
    analizar: function(jugador) {
        const ligas = {
            'Serie A (Italia)': { necesita: ['defending', 'physical'], estilo: 'Táctica y física' },
            'Premier League (Inglaterra)': { necesita: ['pace', 'physical'], estilo: 'Rápida e intensa' },
            'LaLiga (España)': { necesita: ['passing', 'shooting'], estilo: 'Técnica y posesión' },
            'Bundesliga (Alemania)': { necesita: ['pace', 'shooting'], estilo: 'Transiciones rápidas' },
            'Ligue 1 (Francia)': { necesita: ['pace', 'physical'], estilo: 'Física y atlética' }
        };

        let mejorLiga = null;
        let mejorPuntuacion = 0;

        for (let liga in ligas) {
            const req = ligas[liga].necesita;
            let puntuacion = 0;
            req.forEach(attr => {
                puntuacion += (jugador[attr] || 70);
            });
            puntuacion = puntuacion / req.length;
            
            if (puntuacion > mejorPuntuacion) {
                mejorPuntuacion = puntuacion;
                mejorLiga = liga;
            }
        }

        // Si el jugador es muy técnico pero lento, la Premier no es su liga
        if (jugador.pace < 65 && mejorLiga === 'Premier League (Inglaterra)') {
            mejorLiga = 'LaLiga (España)';
            mejorPuntuacion = (jugador.passing + jugador.shooting) / 2;
        }

        return { 
            ligaIdeal: mejorLiga, 
            puntuacion: Math.round(mejorPuntuacion),
            estilo: ligas[mejorLiga]?.estilo || 'Versátil'
        };
    }
};
console.log("🌍 AdaptabilidadLiga cargado.");
