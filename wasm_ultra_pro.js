// 🚀 WASM ULTRA PRO - SETUN CONTEXTUAL Y BITNET HEBBBIANO
window.UltraWasm = {
    // 1. SETUN CONTEXTUAL (Analiza posición, edad y liga)
    setunContextual: function(jugador, liga) {
        const pos = jugador.position || 'Delantero';
        const edad = jugador.edad || 25;
        
        // Matriz de sinergia (qué atributos necesita cada posición)
        const requerimientos = {
            'Delantero': { shooting: 80, pace: 75, passing: 70 },
            'Mediocentro': { passing: 85, defending: 70, physical: 75 },
            'Defensa': { defending: 85, physical: 80, passing: 65 },
            'Portero': { defending: 85, physical: 80, passing: 50 }
        };

        const req = requerimientos[pos] || requerimientos['Delantero'];
        let sinergia = 0;
        let totalReq = 0;

        for (let key in req) {
            const valorJugador = jugador[key] || 70;
            if (valorJugador >= req[key]) sinergia += 2;
            else if (valorJugador >= req[key] - 10) sinergia += 1;
            totalReq += 2;
        }

        const porcentajeSinergia = Math.round((sinergia / totalReq) * 100);
        
        // Riesgo de adaptación (Liga italiana es táctica y física)
        let riesgo = "Bajo";
        if (edad > 30 && liga !== 'Serie A') riesgo = "Medio (Adaptación táctica)";
        if (edad < 21 && liga === 'Serie A') riesgo = "Alto (Presión física)";

        return { sinergia: porcentajeSinergia, riesgo: riesgo, posicion: pos };
    },

    // 2. BITNET HEBBBIANO (Aprende del informe de la IA)
    bitnetHebbiano: function(jugador, textoInforme) {
        const txt = (textoInforme || '').toLowerCase();
        const input = [
            (jugador.overall || 70) / 10,
            (jugador.goals || 0) / 5,
            (jugador.assists || 0) / 5,
            (jugador.pace || 70) / 10,
            (jugador.defending || 50) / 10
        ];

        // Aprendizaje Hebbiano: "Las neuronas que se activan juntas, se conectan juntas"
        // Si el texto menciona mucho "velocidad", el peso de la velocidad sube.
        let pesos = [1.0, 1.0, 1.0, 1.0, 1.0];
        if (txt.includes('velocidad') || txt.includes('rápido')) pesos[3] += 0.5;
        if (txt.includes('gol') || txt.includes('finaliza')) pesos[1] += 0.5;
        if (txt.includes('asistencia') || txt.includes('pase')) pesos[2] += 0.5;
        if (txt.includes('defensa') || txt.includes('recupera')) pesos[4] += 0.5;

        let suma = 0;
        let totalPesos = 0;
        for (let i = 0; i < input.length; i++) {
            suma += input[i] * pesos[i];
            totalPesos += pesos[i];
        }

        const resultado = (suma / totalPesos) * 10;
        return { puntaje: Math.round(resultado), pesos: pesos.map(p => p.toFixed(1)) };
    },

    // 3. MATRIZ DE DECISIÓN (Cruce de Potencial y Riesgo)
    matrizDecision: function(jugador, sinergia, riesgo) {
        const techo = (jugador.overall || 70) + (jugador.goals || 0) * 0.5;
        let nivelRiesgo = 1;
        if (riesgo.includes('Alto')) nivelRiesgo = 3;
        else if (riesgo.includes('Medio')) nivelRiesgo = 2;

        if (techo > 90 && nivelRiesgo === 1) return { zona: "INVERSIÓN SEGURA", color: "#10b981" };
        if (techo > 90 && nivelRiesgo > 1) return { zona: "APUESTA DE ÉLITE", color: "#f59e0b" };
        if (techo <= 90 && nivelRiesgo === 1) return { zona: "JUGADOR DE ROTACIÓN", color: "#3b82f6" };
        return { zona: "ALTO RIESGO / BAJO RETORNO", color: "#ef4444" };
    }
};
console.log("🚀 UltraWasm cargado: Setun Contextual, BitNet Hebbiano y Matriz de Decisión listos.");
