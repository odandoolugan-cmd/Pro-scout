window.NeuralPro = {
    setunAvanzado: function(historialPartidos) {
        if (!historialPartidos || historialPartidos.length === 0) return { estado: 0, tendencia: "Sin datos" };
        let ema = historialPartidos[0];
        const alpha = 0.4;
        for (let i = 1; i < historialPartidos.length; i++) ema = (historialPartidos[i] * alpha) + (ema * (1 - alpha));
        let estado = 0;
        if (ema > 0.3) estado = 1; else if (ema < -0.3) estado = -1;
        let tendencia = "Estable";
        if (historialPartidos[historialPartidos.length - 1] > historialPartidos[0]) tendencia = "En racha ascendente 📈";
        if (historialPartidos[historialPartidos.length - 1] < historialPartidos[0]) tendencia = "En declive 📉";
        return { estado, ema: ema.toFixed(2), tendencia };
    },
    bitnetProfundo: function(jugador) {
        const input = [jugador.overall > 85 ? 1 : (jugador.overall < 70 ? -1 : 0), (jugador.goals + jugador.assists) > 25 ? 1 : ((jugador.goals + jugador.assists) < 10 ? -1 : 0), jugador.pace > 85 ? 1 : (jugador.pace < 65 ? -1 : 0), jugador.defending > 70 ? 1 : (jugador.defending < 40 ? -1 : 0)];
        const capa1 = [input[0] * 0.8, input[1] * 1.5, input[2] * 0.5, input[3] * 0.2];
        const capa2 = capa1.map(val => val > 0.5 ? 1 : (val < -0.5 ? -1 : 0));
        const sumaFinal = capa2.reduce((a, b) => a + b, 0) + (input[0] * 1.2);
        if (sumaFinal >= 2.5) return { clase: "GALÁCTICO", nivel: 5, color: "#8b5cf6" };
        if (sumaFinal >= 1.5) return { clase: "ÉLITE MUNDIAL", nivel: 4, color: "#10b981" };
        if (sumaFinal >= 0.5) return { clase: "TITULAR TOP", nivel: 3, color: "#3b82f6" };
        if (sumaFinal >= -0.5) return { clase: "ROTACIÓN", nivel: 2, color: "#f59e0b" };
        return { clase: "DESCARTE", nivel: 1, color: "#ef4444" };
    },
    feedbackIAPro: function(texto) {
        if (!texto || texto.length < 100) return { score: 0, perfil: "Desconocido", riesgos: [], sinergia: "N/A" };
        const txt = texto.toLowerCase();
        let perfil = "Equilibrado";
        if (txt.includes("liderazgo") || txt.includes("capitán")) perfil = "Líder Nato 🏆";
        if (txt.includes("lesión") || txt.includes("físico") && txt.includes("declive")) perfil = "Jugador Frágil ⚠️";
        if (txt.includes("genio") || txt.includes("creatividad")) perfil = "Genio Creativo 🎨";
        let riesgos = [];
        if (txt.includes("edad") || txt.includes("37")) riesgos.push("Edad avanzada");
        if (txt.includes("lesión")) riesgos.push("Historial de lesiones");
        let sinergia = "Versátil.";
        if (txt.includes("falso 9")) sinergia = "Ideal para sistemas ofensivos (4-3-3).";
        if (txt.includes("contraataque")) sinergia = "Perfecto para contraataque rápido.";
        let score = 50;
        if (texto.length > 500) score += 20;
        if (txt.includes("datos") || txt.includes("%")) score += 10;
        return { score: Math.min(100, score), perfil, riesgos, sinergia };
    }
};
