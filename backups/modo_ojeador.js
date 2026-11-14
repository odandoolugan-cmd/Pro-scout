// 🧠 MODO OJEADOR - VEREDICTO FINAL
window.ModoOjeador = {
    generarVeredicto: function(jugador, setun, bitnet, finanzas, lesiones) {
        let recomendacion = "MANTENER";
        let color = "#f59e0b";
        let razon = "Perfil estándar. Sin urgencias de fichaje.";
        let inversionSugerida = "Valorar según necesidad del equipo.";

        const setunCompra = setun && setun.includes('COMPRAR');
        const bitnetElite = bitnet && (bitnet.includes('ÉLITE') || bitnet.includes('GALÁCTICO'));
        const finanzasBuenas = finanzas && (finanzas.estado === 'PRECIO JUSTO' || finanzas.estado === 'INFRAVALORADO');
        const lesionBaja = lesiones && (lesiones.nivel === 'BAJO');

        if (setunCompra && bitnetElite && finanzasBuenas && lesionBaja) {
            recomendacion = "FICHAJE PRIORITARIO";
            color = "#10b981";
            razon = "Coincidencia total: Rendimiento de élite (Setun + BitNet), precio justo/oportunidad y bajo riesgo físico.";
            inversionSugerida = "Inversión recomendada. Negociar en los próximos 15 días.";
        } else if (setunCompra && bitnetElite && !lesionBaja) {
            recomendacion = "FICHAJE CON RIESGO";
            color = "#f59e0b";
            razon = "Rendimiento de élite, pero el riesgo de lesión es elevado. Requiere plan físico.";
            inversionSugerida = "Ofrecer contrato condicionado a rendimiento físico.";
        } else if (setunCompra && !bitnetElite) {
            recomendacion = "APUESTA TÁCTICA";
            color = "#3b82f6";
            razon = "Setun lo recomienda, pero BitNet no lo ve como élite. Puede ser un jugador de rotación valioso.";
            inversionSugerida = "Inversión moderada. No pagar sobreprecio.";
        } else if (!setunCompra && finanzas && finanzas.estado === 'SOBREVALORADO') {
            recomendacion = "EVITAR FICHAJE";
            color = "#ef4444";
            razon = "Setun no lo recomienda y está sobrevalorado en el mercado.";
            inversionSugerida = "No invertir. Buscar alternativas más económicas.";
        } else if (lesionBaja && bitnetElite) {
            recomendacion = "SEGUIMIENTO ESTRECHO";
            color = "#8b5cf6";
            razon = "Buen perfil físico y de élite, pero Setun no lo ve como compra clara. Seguir su evolución.";
            inversionSugerida = "Esperar a final de temporada para evaluar.";
        }

        return { recomendacion, color, razon, inversionSugerida };
    }
};
console.log("🧠 ModoOjeador cargado.");
