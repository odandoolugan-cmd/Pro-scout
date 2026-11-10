window.WasmPro = {
    detectarGanga: function(jugador) {
        const edad = jugador.edad || (jugador.name ? (jugador.name.length * 2) : 25);
        if (jugador.overall > 80 && edad < 24) return { esGanga: true, mensaje: "🔥 GANGA: Overall alto y juventud." };
        if (jugador.overall > 85 && edad > 30) return { esGanga: false, mensaje: "⚠️ Jugador veterano. Alto rendimiento pero poco margen de reventa." };
        return { esGanga: false, mensaje: "📊 Perfil estándar. El precio se ajusta al rendimiento." };
    },
    scoutNeuronal: function(jugador) {
        const capa1 = [
            jugador.overall > 85 ? 1 : (jugador.overall < 70 ? -1 : 0),
            jugador.goals > 15 ? 1 : (jugador.goals < 5 ? -1 : 0),
            jugador.assists > 10 ? 1 : (jugador.assists < 3 ? -1 : 0),
            jugador.pace > 85 ? 1 : (jugador.pace < 65 ? -1 : 0),
            jugador.defending > 70 ? 1 : (jugador.defending < 40 ? -1 : 0)
        ];
        const pesos = [1, 2, 2, 1, 1];
        let suma = 0;
        for (let i = 0; i < capa1.length; i++) suma += capa1[i] * pesos[i];
        if (suma >= 4) return { nivel: "ÉLITE MUNDIAL", color: "#10b981", capa1: capa1 };
        if (suma >= 2) return { nivel: "JUGADOR DESTACADO", color: "#f59e0b", capa1: capa1 };
        if (suma >= -1) return { nivel: "ROTACIÓN / PROMESA", color: "#3b82f6", capa1: capa1 };
        return { nivel: "NO RECOMENDADO", color: "#ef4444", capa1: capa1 };
    },
    analizarEstilo: function(jugador) {
        const ataque = (jugador.shooting || 70) + (jugador.pace || 70);
        const creacion = (jugador.passing || 70) * 1.5;
        const defensa = (jugador.defending || 50) * 2;
        if (ataque > creacion && ataque > defensa) return { estilo: "⚽ Finalizador Nato", color: "#ef4444" };
        if (creacion > ataque && creacion > defensa) return { estilo: "🎨 Creador de Juego", color: "#3b82f6" };
        if (defensa > ataque && defensa > creacion) return { estilo: "🛡️ Muro Defensivo", color: "#10b981" };
        return { estilo: "⚖️ Equilibrado / Box-to-Box", color: "#f59e0b" };
    }
};
