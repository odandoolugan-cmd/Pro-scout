// 🧬 MODO OJEADOR - VERSIÓN FINAL (CON MUTATIONOBSERVER)
(function() {
    console.log("🧬 Ojeador Final cargado.");
    
    function inyectarVeredicto() {
        const panelAnterior = document.getElementById('modo-ojeador-panel');
        if (panelAnterior) panelAnterior.remove();
        
        const playerCard = document.querySelector('.player-card-big');
        if (!playerCard || !window.currentPlayer) {
            console.warn("⚠️ Ojeador: No hay jugador o tarjeta aún.");
            return;
        }
        
        try {
            const p = window.currentPlayer;
            console.log(`🧬 Ojeador: Procesando ${p.name} (Overall: ${p.overall}, Goles: ${p.goals})`);
            
            // Calcular Setun original
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
        } catch(e) { console.error('Error Ojeador Final:', e); }
    }

    // Observer que detecta cuando aparece la tarjeta del jugador
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                // Verificar si se añadió un .player-card-big
                const playerCard = document.querySelector('.player-card-big');
                if (playerCard && window.currentPlayer) {
                    console.log("🧬 Ojeador: Tarjeta de jugador detectada. Inyectando veredicto...");
                    // Esperar un poco para que otros paneles se rendericen
                    setTimeout(inyectarVeredicto, 1000);
                }
            }
        });
    });

    // Observar el contenedor principal
    const container = document.getElementById('playerInfoContainer');
    if (container) {
        observer.observe(container, { childList: true, subtree: true });
        console.log("🧬 Ojeador: Observando playerInfoContainer.");
    } else {
        // Si no existe al cargar, esperar a que se cree
        const interval = setInterval(function() {
            const c = document.getElementById('playerInfoContainer');
            if (c) {
                clearInterval(interval);
                observer.observe(c, { childList: true, subtree: true });
                console.log("🧬 Ojeador: Observer iniciado en playerInfoContainer (tardío).");
            }
        }, 500);
    }
})();
