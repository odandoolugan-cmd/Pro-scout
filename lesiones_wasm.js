// 🩺 MOTOR DE PREDICCIÓN DE LESIONES
window.LesionesWasm = {
    predecir: function(jugador, textoInforme) {
        const edad = jugador.edad || (jugador.name ? jugador.name.length * 2 : 25);
        const posicion = jugador.position || 'Delantero';
        let riesgo = 0;
        
        // Factor edad
        if (edad > 32) riesgo += 30;
        else if (edad > 28) riesgo += 15;
        
        // Factor posición (extremos y delanteros se lesionan más)
        if (posicion.includes('Extremo') || posicion.includes('Delantero')) riesgo += 20;
        if (posicion.includes('Portero')) riesgo -= 10;
        
        // Factor informe (si menciona lesiones)
        const txt = (textoInforme || '').toLowerCase();
        if (txt.includes('lesión') || txt.includes('lesiones')) riesgo += 25;
        if (txt.includes('físico') && txt.includes('declive')) riesgo += 15;
        
        // Factor velocidad (jugadores rápidos se lesionan más)
        if (jugador.pace > 85) riesgo += 10;
        
        riesgo = Math.min(95, Math.max(5, riesgo));
        
        let nivel, color, recomendacion;
        if (riesgo > 60) { nivel = "ALTO"; color = "#ef4444"; recomendacion = "Requiere plan de carga personalizado y rotaciones."; }
        else if (riesgo > 35) { nivel = "MEDIO"; color = "#f59e0b"; recomendacion = "Monitorear minutos y hacer trabajo preventivo."; }
        else { nivel = "BAJO"; color = "#10b981"; recomendacion = "Perfil físico robusto. Sin riesgos aparentes."; }
        
        return { nivel, color, riesgo, recomendacion };
    }
};
console.log("🩺 LesionesWasm cargado.");
