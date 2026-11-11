// 💰 SETUN FINANCIERO Y WONDERKID
window.SetunExtra = {
    // 1. Valor de Mercado Estimado
    valorMercado: function(jugador) {
        const overall = jugador.overall || 70;
        const edad = jugador.edad || 25;
        // Fórmula: Base por overall, penalización por edad
        let valor = (overall - 60) * 2.5; 
        if (edad < 23) valor *= 1.5; // Prima por juventud
        if (edad > 30) valor *= 0.6; // Depreciación
        if (edad > 34) valor *= 0.3;
        
        // Lo que "debería" costar vs lo que "cuesta" (simulado)
        const valorEstimado = Math.round(valor); // Millones de €
        const precioSimulado = Math.round(valor * (0.8 + Math.random() * 0.4)); // +/- 20% de variación
        
        if (precioSimulado < valorEstimado * 0.85) {
            return { estado: "INFRAVALORADO", color: "#10b981", diferencia: valorEstimado - precioSimulado, valor: valorEstimado };
        } else if (precioSimulado > valorEstimado * 1.15) {
            return { estado: "SOBREVALORADO", color: "#ef4444", diferencia: precioSimulado - valorEstimado, valor: valorEstimado };
        }
        return { estado: "PRECIO JUSTO", color: "#f59e0b", diferencia: 0, valor: valorEstimado };
    },

    // 2. Wonderkid (Proyección de Jóvenes)
    wonderkid: function(jugador) {
        const edad = jugador.edad || 25;
        const overall = jugador.overall || 70;
        
        if (edad <= 21 && overall >= 75) {
            return { nivel: "🌟 WONDERKID ÉLITE", color: "#8b5cf6", proyeccion: "Techo: 90+ Overall en 5 años" };
        }
        if (edad <= 23 && overall >= 70) {
            return { nivel: "⭐ JOVEN PROMESA", color: "#3b82f6", proyeccion: "Techo: 85+ Overall en 5 años" };
        }
        if (edad > 32 && overall > 80) {
            return { nivel: "👑 VETERANO DE ÉLITE", color: "#f59e0b", proyeccion: "Rendimiento inmediato garantizado" };
        }
        return { nivel: "📊 JUGADOR ESTÁNDAR", color: "#94a3b8", proyeccion: "Proyección lineal" };
    }
};
console.log("💰 Setun Extra cargado: Financiero y Wonderkid listos.");
