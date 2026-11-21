// 🧬 MODO OJEADOR - VERSIÓN DEFINITIVA (SETINTERVAL CON LÓGICA CORREGIDA)
(function() {
    console.log("🧬 Ojeador Final cargado.");
    
    let panelInyectado = false;
    let intervalId = null;
    
    function inyectarVeredicto() {
        if (panelInyectado) return;
        
        const panelAnterior = document.getElementById('modo-ojeador-panel');
        if (panelAnterior) panelAnterior.remove();
        
        const playerCard = document.querySelector('.player-card-big');
        if (!playerCard || !window.currentPlayer) return;
        
        try {
            const p = window.currentPlayer;
            panelInyectado = true;
            
            console.log(`🧬 Ojeador: Procesando ${p.name} (Overall: ${p.overall}, Goles: ${p.goals}, Asist: ${p.assists}, Edad: ${p.edad})`);
            
            // Calcular Setun original (con lógica correcta)
            let setunDecision = 'MANTENER';
            if (p.overall > 85 && p.goals > 10 && p.assists > 5) setunDecision = 'COMPRAR';
            else if (p.overall < 70 || p.goals < 3) setunDecision = 'VENDER';
            
            // Calcular BitNet
            let bitnetNivel = 'ROTACIÓN';
            if (p.overall > 85 && p.goals > 15) bitnetNivel = 'ÉLITE';
            else if (p.overall > 80 && p.goals > 10) bitnetNivel = 'DESTACADO';
            else if (p.overall > 75) bitnetNivel = 'ROTACIÓN';
            else bitnetNivel = 'DESCARTE';
            
            // Calcular Finanzas
            let finanzasEstado = 'PRECIO JUSTO';
            if (p.overall > 85 && p.edad < 23) finanzasEstado = 'INFRAVALORADO';
            else if (p.overall > 85 && p.edad > 30) finanzasEstado = 'SOBREVALORADO';
            
            // Calcular Lesiones
            let lesionesNivel = 'BAJO';
            if (p.edad > 32) lesionesNivel = 'ALTO';
            else if (p.edad > 28) lesionesNivel = 'MEDIO';
            
            console.log(`🧬 Setun: ${setunDecision} | BitNet: ${bitnetNivel} | Finanzas: ${finanzasEstado} | Lesiones: ${lesionesNivel}`);
            
            // Usar Setun de Consenso
            let consenso = null;
            if (window.SetunConsenso) {
                consenso = window.SetunConsenso.calcular({
                    setun: setunDecision,
                    bitnet: bitnetNivel,
                    finanzas: finanzasEstado,
                    lesiones: lesionesNivel,
                    edad: p.edad || 25
                });
                console.log(`🧬 CONSENSO: ${consenso.consenso} (${consenso.puntos} pts) | ${consenso.detalles.join(' | ')}`);
            }
            
            // Generar veredicto
            let recomendacion, color, razon, inversion;
            
            if (consenso) {
                recomendacion = consenso.consenso;
                color = consenso.color;
                razon = consenso.razon;
                inversion = consenso.puedeFichar ? 'Fichaje recomendado. Negociar según necesidad.' : 'No recomendado. Buscar alternativas.';
            } else {
                // Lógica de respaldo
                if (setunDecision === 'COMPRAR' && bitnetNivel === 'ÉLITE') {
                    recomendacion = 'FICHAJE PRIORITARIO'; color = '#10b981';
                    razon = 'Rendimiento de élite y precio justo.';
                    inversion = 'Inversión recomendada.';
                } else if (setunDecision === 'MANTENER' && bitnetNivel === 'ROTACIÓN') {
                    recomendacion = 'SEGUIMIENTO ESTRECHO'; color = '#8b5cf6';
                    razon = 'Jugador con potencial pero sin urgencia.';
                    inversion = 'Esperar a final de temporada.';
                } else {
                    recomendacion = 'MANTENER'; color = '#f59e0b';
                    razon = 'Perfil estándar.';
                    inversion = 'Valorar según necesidad.';
                }
            }
            
            const panelHTML = `
            <div id="modo-ojeador-panel" style="margin-top:15px; padding:15px; border-radius:10px; background:linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95)); border:2px solid ${color}; font-family:'Inter', sans-serif; box-shadow:0 0 15px ${color}40;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <div style="font-size:0.8rem; color:#94a3b8; text-transform:uppercase; font-weight:bold;">🧬 SETUN DE CONSENSO</div>
                    <div style="font-size:0.6rem; color:${color}; border:1px solid ${color}; padding:2px 8px; border-radius:10px;">${consenso ? (consenso.puntos > 0 ? '+' : '') + consenso.puntos + ' pts' : 'ANÁLISIS'}</div>
                </div>
                <div style="font-size:1.4rem; font-weight:bold; color:${color}; margin-bottom:8px;">${recomendacion}</div>
                <div style="font-size:0.8rem; color:#cbd5e1; margin-bottom:8px; line-height:1.4;">${razon}</div>
                <div style="font-size:0.65rem; color:#64748b; margin-top:8px; border-top:1px solid #334155; padding-top:8px;">
                    ${consenso ? consenso.detalles.join(' | ') : 'Setun: ' + setunDecision + ' | BitNet: ' + bitnetNivel}
                </div>
                <div style="font-size:0.6rem; color:#f59e0b; background:rgba(245,158,11,0.1); padding:6px; border-radius:6px; margin-top:8px; border-left:3px solid #f59e0b;">
                    💡 ${inversion}
                </div>
            </div>`;
            
            playerCard.parentNode.insertBefore(document.createRange().createContextualFragment(panelHTML), playerCard.nextSibling);
            console.log("🧬 Setun de Consenso añadido.");
        } catch(e) {
            console.error('Error Ojeador Final:', e);
            panelInyectado = false;
        }
    }

    // Escuchar clic en el botón de buscar
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'searchBtn') {
            console.log("🔍 Búsqueda iniciada. Reiniciando flag del Ojeador.");
            panelInyectado = false;
            if (intervalId) clearInterval(intervalId);
            
            let intentos = 0;
            intervalId = setInterval(function() {
                intentos++;
                const playerCard = document.querySelector('.player-card-big');
                if (playerCard && window.currentPlayer) {
                    clearInterval(intervalId);
                    console.log("✅ Tarjeta detectada después de " + intentos + " intentos.");
                    setTimeout(inyectarVeredicto, 1000);
                }
                if (intentos > 30) {
                    clearInterval(intervalId);
                    console.warn("⚠️ No se pudo detectar la tarjeta después de 15 segundos.");
                }
            }, 500);
        }
    });
})();
