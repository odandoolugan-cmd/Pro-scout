// 💰 SETUN FINANCIERO Y WONDERKID
window.SetunExtra = {
    valorMercado: function(jugador) {
        const overall = jugador.overall || 70;
        const edad = jugador.edad || 25;
        let valor = (overall - 60) * 2.5;
        if (edad < 23) valor *= 1.5;
        if (edad > 30) valor *= 0.6;
        if (edad > 34) valor *= 0.3;
        const valorEstimado = Math.round(valor);
        const precioSimulado = Math.round(valor * (0.8 + Math.random() * 0.4));
        if (precioSimulado < valorEstimado * 0.85) {
            return { estado: "INFRAVALORADO", color: "#10b981", diferencia: valorEstimado - precioSimulado, valor: valorEstimado };
        } else if (precioSimulado > valorEstimado * 1.15) {
            return { estado: "SOBREVALORADO", color: "#ef4444", diferencia: precioSimulado - valorEstimado, valor: valorEstimado };
        }
        return { estado: "PRECIO JUSTO", color: "#f59e0b", diferencia: 0, valor: valorEstimado };
    },
    wonderkid: function(jugador) {
        let edad = jugador.edad;
        if (!edad) {
            const longitudNombre = (jugador.name || '').length;
            if (longitudNombre < 12) edad = 20;
            else if (longitudNombre < 15) edad = 25;
            else edad = 30;
        }
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
console.log("💰 SetunExtra cargado.");
