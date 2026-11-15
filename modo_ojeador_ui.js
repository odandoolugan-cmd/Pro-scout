// 🧠 MODO OJEADOR - VERSIÓN DEFINITIVA (INTERCEPTA buscarJugador)
(function() {
    console.log("🧠 ModoOjeador UI cargado.");
    
    // Esperar a que buscarJugador esté disponible
    const checkInterval = setInterval(function() {
        if (typeof window.buscarJugador === 'function') {
            clearInterval(checkInterval);
            
            // Guardar la función original
            const originalBuscarJugador = window.buscarJugador;
            
            // Sobrescribir buscarJugador
            window.buscarJugador = async function() {
                // Llamar a la función original
                await originalBuscarJugador.apply(this, arguments);
                
                // Esperar a que se rendericen los paneles
                setTimeout(function() {
                    const panelAnterior = document.getElementById('modo-ojeador-panel');
                    if (panelAnterior) panelAnterior.remove();
                    
                    const playerCard = document.querySelector('.player-card-big');
                    if (!playerCard || !window.currentPlayer) return;
                    
                    try {
                        const p = window.currentPlayer;
                        
                        // 1. Calcular Setun directamente
                        const setunDecision = (p.overall > 85 && p.goals > 10 && p.assists > 5) ? 'COMPRAR (1)' : 
                                              (p.overall < 70 || p.goals < 3) ? 'VENDER (-1)' : 'MANTENER (0)';
                        
                        // 2. Calcular BitNet directamente
                        let bitnetNivel = 'ROTACIÓN';
                        if (p.overall > 85 && p.goals > 15) bitnetNivel = 'ÉLITE MUNDIAL';
                        else if (p.overall > 80 && p.goals > 10) bitnetNivel = 'JUGADOR DESTACADO';
                        else if (p.overall > 75) bitnetNivel = 'ROTACIÓN / PROMESA';
                        else bitnetNivel = 'DESCARTE';
                        
                        // 3. Calcular Finanzas
                        let finanzasEstado = 'PRECIO JUSTO';
                        if (p.overall > 85 && p.edad < 23) finanzasEstado = 'INFRAVALORADO';
                        else if (p.overall > 85 && p.edad > 30) finanzasEstado = 'SOBREVALORADO';
                        
                        // 4. Calcular Lesiones
                        let lesionesNivel = 'BAJO';
                        if (p.edad > 32) lesionesNivel = 'ALTO';
                        else if (p.edad > 28) lesionesNivel = 'MEDIO';
                        
                        // 5. Generar veredicto
                        let recomendacion, color, razon, inversion;
                        
                        if (setunDecision.includes('COMPRAR') && bitnetNivel.includes('ÉLITE') && lesionesNivel === 'BAJO') {
                            recomendacion = 'FICHAJE PRIORITARIO'; color = '#10b981';
                            razon = 'Rendimiento de élite, bajo riesgo físico y precio justo.';
                            inversion = 'Inversión recomendada. Negociar en los próximos 15 días.';
                        } else if (setunDecision.includes('COMPRAR') && !bitnetNivel.includes('ÉLITE')) {
                            recomendacion = 'APUESTA TÁCTICA'; color = '#3b82f6';
                            razon = 'Setun lo recomienda, pero BitNet no lo ve como élite. Puede ser un jugador de rotación valioso.';
                            inversion = 'Inversión moderada. No pagar sobreprecio.';
                        } else if (setunDecision.includes('MANTENER') && (bitnetNivel.includes('ROTACIÓN') || bitnetNivel.includes('DESTACADO'))) {
                            recomendacion = 'SEGUIMIENTO ESTRECHO'; color = '#8b5cf6';
                            razon = 'Jugador con potencial pero sin urgencia de fichaje. Seguir su evolución.';
                            inversion = 'Esperar a final de temporada para evaluar.';
                        } else if (setunDecision.includes('VENDER') || bitnetNivel.includes('DESCARTE')) {
                            recomendacion = 'EVITAR FICHAJE'; color = '#ef4444';
                            razon = 'Rendimiento insuficiente o riesgo elevado.';
                            inversion = 'No invertir. Buscar alternativas.';
                        } else {
                            recomendacion = 'MANTENER'; color = '#f59e0b';
                            razon = 'Perfil estándar. Sin urgencias.';
                            inversion = 'Valorar según necesidad del equipo.';
                        }
                        
                        console.log(`🧠 Veredicto: ${recomendacion} | Setun: ${setunDecision} | BitNet: ${bitnetNivel} | Finanzas: ${finanzasEstado} | Lesiones: ${lesionesNivel}`);
                        
                        const panelHTML = `
                        <div id="modo-ojeador-panel" style="margin-top:15px; padding:15px; border-radius:10px; background:linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95)); border:2px solid ${color}; font-family:'Inter', sans-serif; box-shadow:0 0 15px ${color}40;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                <div style="font-size:0.8rem; color:#94a3b8; text-transform:uppercase; font-weight:bold;">🧠 VEREDICTO DEL OJEADOR</div>
                                <div style="font-size:0.6rem; color:${color}; border:1px solid ${color}; padding:2px 8px; border-radius:10px;">ANÁLISIS FINAL</div>
                            </div>
                            <div style="font-size:1.4rem; font-weight:bold; color:${color}; margin-bottom:8px;">${recomendacion}</div>
                            <div style="font-size:0.8rem; color:#cbd5e1; margin-bottom:8px; line-height:1.4;">${razon}</div>
                            <div style="font-size:0.75rem; color:#f59e0b; background:rgba(245,158,11,0.1); padding:6px; border-radius:6px; border-left:3px solid #f59e0b;">💡 ${inversion}</div>
                            <div style="font-size:0.6rem; color:#64748b; margin-top:8px; border-top:1px solid #334155; padding-top:8px;">
                                Datos: Setun: ${setunDecision} | BitNet: ${bitnetNivel} | Finanzas: ${finanzasEstado} | Lesiones: ${lesionesNivel}
                            </div>
                        </div>`;
                        
                        playerCard.parentNode.insertBefore(document.createRange().createContextualFragment(panelHTML), playerCard.nextSibling);
                        console.log("🧠 Veredicto del Ojeador añadido.");
                    } catch(e) { console.error('Error ModoOjeador UI:', e); }
                }, 2500);
            };
            console.log("🧠 buscarJugador interceptado.");
        }
    }, 500);
})();
