// 🚀 WASM POTENCIADORES EXTRA (Match Engine, xG y Feedback IA)
window.ExtraWASM = {
    // 1. Motor de Comparación (Similitud de Coseno)
    compararJugadores: function(j1, j2) {
        const v1 = [j1.overall, j1.goals, j1.assists, j1.pace, j1.shooting, j1.passing];
        const v2 = [j2.overall, j2.goals, j2.assists, j2.pace, j2.shooting, j2.passing];
        
        let dot = 0, mag1 = 0, mag2 = 0;
        for (let i = 0; i < v1.length; i++) {
            dot += v1[i] * v2[i];
            mag1 += v1[i] * v1[i];
            mag2 += v2[i] * v2[i];
        }
        const similitud = dot / (Math.sqrt(mag1) * Math.sqrt(mag2) || 1);
        return {
            porcentaje: Math.round(similitud * 100),
            veredicto: similitud > 0.9 ? "Clones estadísticos" : similitud > 0.7 ? "Muy similares" : "Estilos diferentes"
        };
    },

    // 2. Motor xG (Goles Esperados vs Reales)
    calcularEficiencia: function(goles, tirosTotales) {
        if (tirosTotales === 0) return { eficiencia: 0, estado: "Sin datos" };
        // Asumimos un xG promedio de 0.1 por tiro
        const xG = tirosTotales * 0.1;
        const eficiencia = Math.round((goles / xG) * 100);
        
        let estado = "Normal";
        if (eficiencia > 120) estado = "Clínico (Sobre-rendimiento)";
        else if (eficiencia < 80) estado = "Desperdicia ocasiones";
        
        return { eficiencia, estado, xG: xG.toFixed(1) };
    },

    // 3. Feedback IA (Calificador de Textos)
    evaluarInforme: function(texto) {
        let score = 50;
        if (texto.includes("Ficha técnica:")) score += 10;
        if (texto.includes("Fortalezas:")) score += 10;
        if (texto.includes("Conclusión:")) score += 10;
        if (texto.match(/\d+/g)) score += 10; // Si tiene números reales
        if (texto.length > 1000) score += 10; // Si es un texto largo y detallado
        
        return {
            score: Math.min(100, score),
            feedback: score > 85 ? "Excelente estructura y datos." : score > 70 ? "Buen informe, pero puede mejorar." : "Faltan datos o estructura."
        };
    }
};
console.log("🚀 ExtraWASM cargado: Match Engine, xG y Feedback IA listos.");
