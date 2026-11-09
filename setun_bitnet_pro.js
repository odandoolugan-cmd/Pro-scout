// 🧠 SETUN & BITNET PRO - NIVEL AVANZADO
window.NeuralPro = {
    // 1. SETUN AVANZADO CON HISTÉRESIS Y EMA
    setunAvanzado: function(historialPartidos) {
        // Simulamos un historial de los últimos 5 partidos (1 = bueno, 0 = normal, -1 = malo)
        if (!historialPartidos || historialPartidos.length === 0) return { estado: 0, tendencia: "Sin datos" };
        
        // Aplicamos Media Móvil Exponencial (EMA) para dar más peso a los partidos recientes
        let ema = historialPartidos[0];
        const alpha = 0.4; // Factor de suavizado
        for (let i = 1; i < historialPartidos.length; i++) {
            ema = (historialPartidos[i] * alpha) + (ema * (1 - alpha));
        }

        // Aplicamos Histéresis (umbral de +0.3 / -0.3 para cambiar de estado)
        let estado = 0;
        if (ema > 0.3) estado = 1;
        else if (ema < -0.3) estado = -1;

        let tendencia = "Estable";
        if (historialPartidos[historialPartidos.length - 1] > historialPartidos[0]) tendencia = "En racha ascendente 📈";
        if (historialPartidos[historialPartidos.length - 1] < historialPartidos[0]) tendencia = "En declive 📉";

        return { estado, ema: ema.toFixed(2), tendencia };
    },

    // 2. BITNET PROFUNDO (Red Neuronal de 3 Capas)
    bitnetProfundo: function(jugador) {
        // Capa de Entrada (Ternaria: -1, 0, 1)
        const input = [
            jugador.overall > 85 ? 1 : (jugador.overall < 70 ? -1 : 0),     // Nivel Base
            (jugador.goals + jugador.assists) > 25 ? 1 : ((jugador.goals + jugador.assists) < 10 ? -1 : 0), // Ataque
            jugador.pace > 85 ? 1 : (jugador.pace < 65 ? -1 : 0),           // Físico
            jugador.defending > 70 ? 1 : (jugador.defending < 40 ? -1 : 0)  // Defensa
        ];

        // Capa Oculta 1: Pesos de Importancia
        const capa1 = [
            input[0] * 0.8, 
            input[1] * 1.5, 
            input[2] * 0.5, 
            input[3] * 0.2
        ];

        // Capa Oculta 2: Sinapsis Ternaria (Activación)
        const capa2 = capa1.map(val => val > 0.5 ? 1 : (val < -0.5 ? -1 : 0));

        // Capa de Salida: Suma Ponderada
        const sumaFinal = capa2.reduce((a, b) => a + b, 0) + (input[0] * 1.2);

        if (sumaFinal >= 2.5) return { clase: "GALÁCTICO", nivel: 5, color: "#8b5cf6" };
        if (sumaFinal >= 1.5) return { clase: "ÉLITE MUNDIAL", nivel: 4, color: "#10b981" };
        if (sumaFinal >= 0.5) return { clase: "TITULAR TOP", nivel: 3, color: "#3b82f6" };
        if (sumaFinal >= -0.5) return { clase: "ROTACIÓN", nivel: 2, color: "#f59e0b" };
        return { clase: "DESCARTE", nivel: 1, color: "#ef4444" };
    },

    // 3. FEEDBACK IA PRO (Analizador de Texto Profundo)
    feedbackIAPro: function(texto) {
        if (!texto || texto.length < 100) return { score: 0, perfil: "Desconocido", riesgos: [], sinergia: "N/A" };

        // Análisis de sentimiento y palabras clave
        const txt = texto.toLowerCase();
        let perfil = "Equilibrado";
        if (txt.includes("liderazgo") || txt.includes("capitán") || txt.includes("mentalidad")) perfil = "Líder Nato / Mentalidad Ganadora 🏆";
        if (txt.includes("lesión") || txt.includes("físico") && txt.includes("declive")) perfil = "Jugador Frágil / Riesgo Físico ⚠️";
        if (txt.includes("genio") || txt.includes("creatividad") || txt.includes("visión")) perfil = "Genio Creativo / Talento Único 🎨";

        // Detección de riesgos
        let riesgos = [];
        if (txt.includes("edad") && (txt.includes("37") || txt.includes("35") || txt.includes("30"))) riesgos.push("Edad avanzada");
        if (txt.includes("lesión") || txt.includes("recuperación")) riesgos.push("Historial de lesiones");
        if (txt.includes("adaptación") || txt.includes("nuevo sistema")) riesgos.push("Curva de adaptación");
        if (txt.includes("millones") || txt.includes("valor de mercado")) riesgos.push("Alto coste de fichaje");

        // Sinergia Táctica
        let sinergia = "Versátil. Encaja en cualquier sistema.";
        if (txt.includes("falso 9") || txt.includes("mediapunta")) sinergia = "Ideal para sistemas ofensivos con posesión (ej. 4-3-3).";
        if (txt.includes("velocidad") || txt.includes("contraataque")) sinergia = "Perfecto para equipos de contraataque rápido (ej. 4-4-2).";
        if (txt.includes("defensa") || txt.includes("físico")) sinergia = "Recomendado para ligas físicas (Serie A, Premier League).";

        // Score de completitud
        let score = 50;
        if (texto.length > 500) score += 20;
        if (texto.length > 1500) score += 20;
        if (txt.includes("datos") || txt.includes("%")) score += 10;

        return { score: Math.min(100, score), perfil, riesgos, sinergia };
    }
};
console.log("🧠 NeuralPro cargado: Setun EMA, BitNet Profundo y Feedback IA Pro listos.");
