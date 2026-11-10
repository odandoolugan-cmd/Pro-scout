window.ExtraWASM = {
    compararJugadores: function(j1, j2) {
        const v1 = [j1.overall, j1.goals, j1.assists, j1.pace, j1.shooting, j1.passing];
        const v2 = [j2.overall, j2.goals, j2.assists, j2.pace, j2.shooting, j2.passing];
        let dot = 0, mag1 = 0, mag2 = 0;
        for (let i = 0; i < v1.length; i++) { dot += v1[i] * v2[i]; mag1 += v1[i] * v1[i]; mag2 += v2[i] * v2[i]; }
        const similitud = dot / (Math.sqrt(mag1) * Math.sqrt(mag2) || 1);
        return { porcentaje: Math.round(similitud * 100), veredicto: similitud > 0.9 ? "Clones estadísticos" : similitud > 0.7 ? "Muy similares" : "Estilos diferentes" };
    },
    calcularEficiencia: function(goles, tirosTotales) {
        if (tirosTotales === 0) return { eficiencia: 0, estado: "Sin datos" };
        const xG = tirosTotales * 0.1;
        const eficiencia = Math.round((goles / xG) * 100);
        let estado = "Normal";
        if (eficiencia > 120) estado = "Clínico"; else if (eficiencia < 80) estado = "Desperdicia ocasiones";
        return { eficiencia, estado, xG: xG.toFixed(1) };
    },
    evaluarInforme: function(texto) {
        let score = 50;
        if (texto.includes("Ficha técnica:")) score += 10;
        if (texto.includes("Fortalezas:")) score += 10;
        if (texto.includes("Conclusión:")) score += 10;
        if (texto.match(/\d+/g)) score += 10;
        if (texto.length > 1000) score += 10;
        return { score: Math.min(100, score), feedback: score > 85 ? "Excelente" : score > 70 ? "Bueno" : "Mejorable" };
    }
};
