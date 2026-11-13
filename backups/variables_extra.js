// 📊 VARIABLES EXTRA DE SCOUTING
window.VariablesExtra = {
    // 1. Índice de Participación en Goles (IPG)
    ipg: function(jugador) {
        const contribucion = (jugador.goals || 0) + (jugador.assists || 0);
        // Simulamos que el equipo mete 50 goles
        const golesEquipo = 50;
        const ipg = Math.min(100, Math.round((contribucion / golesEquipo) * 100));
        
        let nivel = "Bajo";
        let color = "#ef4444";
        if (ipg > 40) { nivel = "Vital para el Equipo"; color = "#10b981"; }
        else if (ipg > 20) { nivel = "Importante"; color = "#f59e0b"; }
        
        return { ipg, nivel, color };
    },

    // 2. Consistencia (Basada en Goles vs Asistencias)
    consistencia: function(jugador) {
        const goles = jugador.goals || 0;
        const asistencias = jugador.assists || 0;
        const diferencia = Math.abs(goles - asistencias);
        
        if (diferencia <= 3) return { nivel: "Muy Consistente", color: "#10b981", detalle: "Aporta en goles y asistencias por igual." };
        if (diferencia <= 8) return { nivel: "Intermitente", color: "#f59e0b", detalle: "Depende de una sola faceta del juego." };
        return { nivel: "Unidimensional", color: "#ef4444", detalle: "O es solo goleador, o es solo asistente." };
    },

    // 3. Eficiencia de Tiro
    eficienciaTiro: function(jugador) {
        const goles = jugador.goals || 0;
        const tiro = jugador.shooting || 70;
        // Simulamos que cada 10 puntos de tiro = 1 remate por partido
        const rematesPorPartido = tiro / 10;
        const eficiencia = rematesPorPartido > 0 ? (goles / rematesPorPartido).toFixed(2) : 0;
        
        let nivel = "Normal";
        let color = "#f59e0b";
        if (eficiencia > 2) { nivel = "Clínico"; color = "#10b981"; }
        else if (eficiencia < 1) { nivel = "Desperdicia Ocasiones"; color = "#ef4444"; }
        
        return { eficiencia, nivel, color };
    },

    // 4. Techo de Carrera
    techoCarrera: function(jugador) {
        const overall = jugador.overall || 70;
        const edad = jugador.edad || (jugador.name ? jugador.name.length * 2 : 25);
        
        let techo = overall;
        if (edad < 24) techo += 10;
        else if (edad < 28) techo += 5;
        else if (edad > 32) techo = overall; // Ya no sube
        
        techo = Math.min(99, techo);
        
        let nivel = "En su Prime";
        let color = "#f59e0b";
        if (techo > 90) { nivel = "Techo de Élite"; color = "#8b5cf6"; }
        else if (techo > 80) { nivel = "Techo Alto"; color = "#10b981"; }
        
        return { techo, nivel, color };
    },

    // 5. Duelos Ganados (Aéreos y Terrestres)
    duelos: function(jugador) {
        const fisico = jugador.physical || 70;
        const defensa = jugador.defending || 50;
        const puntuacion = (fisico + defensa) / 2;
        
        let nivel = "Débil en Contacto";
        let color = "#ef4444";
        if (puntuacion > 75) { nivel = "Dominante en Duelos"; color = "#10b981"; }
        else if (puntuacion > 60) { nivel = "Aceptable"; color = "#f59e0b"; }
        
        return { puntuacion: Math.round(puntuacion), nivel, color };
    }
};
console.log("📊 VariablesExtra cargado.");
