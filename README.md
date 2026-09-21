# ANCESTRIA

### *Stories. Peoples. Memories.*

Juego educativo web de exploración 2.5D/3D sobre historias, tecnologías, memorias y saberes de pueblos originarios de las Américas.

> El español es el idioma principal y predeterminado. La interfaz también puede utilizarse en portugués e inglés desde Configuración y accesibilidad.

## Exploración y Atlas: funciones diferentes

- **Exploración** es el modo jugable. Los recorridos se liberan de uno en uno, comenzando siempre por Mexica. Completar las memorias de un recorrido abre el siguiente.
- **Atlas de las Américas** es una biblioteca de consulta libre. Mantiene visibles las 13 fichas sociolingüísticas en tarjetas compactas y abre cada pueblo en una ficha de lectura propia. No repite botones de juego, barras de progreso ni bloqueos.
- Un recorrido ya abierto o completado puede volver a jugarse en cualquier momento.
- Cada descubrimiento, conversación o capítulo otorga fragmentos solamente la primera vez. Si un recorrido quedó incompleto, las memorias pendientes todavía pueden completarse y puntuar una vez.
- El orden de liberación es una decisión curatorial de navegación y no expresa jerarquía, evolución ni homogeneidad cultural entre los pueblos.

Orden actual: Mexica → Incas/Tawantinsuyu → pueblos quechuas → pueblos aymaras → pueblos zapotecos → Rarámuri → Bribri → Wayuu → Warao → Yanomami → pueblos guaraníes → Tupinambá → Xukuru do Ororubá.

## Experiencias disponibles

### Mexica — primera opción

- Prototipo 3D de un paisaje inspirado en Mexico-Tenochtitlan, con lago, canales, calzadas, chinampas, viviendas y recinto ceremonial.
- Puntos interactivos sobre el manejo del agua, las chinampas y la organización lacustre.
- Tres habitantes educativos dentro del escenario — chinampa, intercambio de Tlatelolco y memoria/lengua nahua — con diálogos, preguntas aleatorias, respuestas explicativas y fuentes. Son síntesis educativas identificadas, no personas históricas inventadas.
- Recorrido educativo en cinco capítulos sobre territorio, prácticas chinamperas y el uso contextualizado de los nombres Mexica, tenochca y “azteca”.
- “Mexica” se utiliza como nombre principal; “azteca” se explica como el término internacionalmente más difundido sin borrar el nombre propio.

### Pueblos andinos / Tawantinsuyu

- Prototipo 3D del valle andino con Qhapaq Ñan, andenes, canales, qullqas, puente de fibra vegetal, personajes, diálogos y minijuegos.
- Recorrido educativo en cinco capítulos sobre caminos y territorios, agricultura de altura y khipus.
- El Tawantinsuyu no se presenta como sinónimo de todos los pueblos andinos: se distinguen comunidades, territorios, épocas y continuidades contemporáneas.

Los pueblos mayas y futuros recorridos se incorporarán como experiencias independientes, con fuentes, voces y contextos propios.

## Catálogo sociolingüístico del Atlas

El Atlas del juego incluye fichas trilingües iniciales de 13 pueblos o formaciones históricas: Mexica, pueblos quechuas, pueblos zapotecos, Incas/Tawantinsuyu, Yanomami, pueblos guaraníes, Warao, Wayuu, Tupinambá, Xukuru do Ororubá, Bribri, Rarámuri y pueblos aymaras.

Las fichas diferencian pueblos contemporáneos de formaciones políticas históricas. No convierten automáticamente cada entrada en un recorrido jugable ni sustituyen una investigación comunitaria específica.

Todos los perfiles cuentan ahora con un prototipo 3D exploratorio accesible desde la selección de recorridos y desde la pestaña de pueblos del Atlas. Mexica y Tawantinsuyu conservan sus escenarios narrativos detallados; los otros once recorridos usan un espacio interpretativo del Atlas con personaje educativo y núcleos interactivos sobre territorio, lenguas y memoria viva. Estos espacios no se presentan como reconstrucciones de comunidades o arquitecturas específicas y deberán profundizarse con investigación y colaboración indígena propia antes de incorporar representaciones culturales adicionales.

Los trece perfiles también incluyen un recorrido educativo de cinco capítulos. En los once recorridos incorporados más recientemente, los capítulos abordan nombre e identidad, territorio, lenguas, continuidad histórica o contemporánea y responsabilidad en el uso de fuentes. Las alternativas se presentan en orden variable, el progreso queda guardado localmente y todo el flujo está disponible en español, portugués e inglés.

La interfaz móvil utiliza un HUD compacto, misión expandible, controles junto al borde inferior y modales con altura dinámica, desplazamiento interno y respeto por las áreas seguras del dispositivo.

## Idiomas e internacionalización

- **Español**: idioma inicial y referencia editorial.
- **Português** y **English**: seleccionables en la configuración.
- La elección se conserva en el almacenamiento local del navegador.
- Los mensajes reutilizables están centralizados en `src/i18n/index.ts`.
- La traducción incluye menú, configuración, selección de pueblos, HUD, mapa y diario.

## Principios editoriales

ANCESTRIA no presenta a los pueblos originarios como una cultura homogénea. Cada experiencia debe identificar pueblo, territorio, periodo y contexto; priorizar fuentes y voces indígenas; diferenciar voces originarias, evidencia arqueológica e interpretaciones académicas; contextualizar documentos coloniales; reconocer continuidades contemporáneas y señalar debates o límites de la evidencia.

Las voces indígenas actuales no se proyectan sobre el siglo XV a menos que la propia fuente establezca esa relación.

## Fuentes visibles en los recorridos

### Recorrido Mexica

- [UNAM — *Crónica Mexicáyotl*](https://historicas.unam.mx/publicaciones/catalogo/ficha?id=008c)
- [INALI — autores y hablantes nahuas contemporáneos](https://www.inali.gob.mx/detalle/2020-10-12-17-19-51)
- [INAH — sistema chinampero](https://www.inah.gob.mx/boletines/el-sistema-chinampero-de-la-cuenca-de-mexico-en-la-nueva-edicion-de-arqueologia-mexicana)
- [Museo del Templo Mayor — agricultura](https://www.templomayor.inah.gob.mx/salas-del-museo/sala-7-agricultura)
- [UNESCO — Xochimilco](https://whc.unesco.org/en/list/412)
- [UNICEF / FUNPROEIB Andes — Atlas sociolingüístico de pueblos indígenas en América Latina, tomo 1](https://acervo.socioambiental.org/sites/default/files/documents/a2l00009.pdf)

### Recorrido andino

- [Ministerio de Cultura del Perú — Qhapaq Ñan](https://qhapaqnan.cultura.pe/)
- [Base de Datos Oficial de Pueblos Indígenas u Originarios del Perú](https://bdpi.cultura.gob.pe/)
- [UNESCO — renovación comunitaria del puente Q’eswachaka](https://ich.unesco.org/es/RL/conocimientos-tecnicas-y-rituales-vinculados-a-la-renovacion-anual-del-puente-qeswachaka-00594)

## Controles

| Acción | Escritorio | Dispositivo táctil |
| --- | --- | --- |
| Moverse | `WASD` o flechas | Cruceta virtual |
| Interactuar | `E` o `Enter` | **ACCIÓN** |
| Saltar | `Espacio` | **SALTAR** |
| Abrir diario | `J` o HUD | **Diario** |
| Abrir mapa | `M` o HUD | **Mapa** |

Los escenarios incluyen límites del área jugable, colisión con edificios y estructuras principales, zonas de proximidad y puntos de interacción.

## Accesibilidad

- Reducción de movimiento y alto contraste.
- Tres escalas de texto.
- Diálogos y contenidos escritos.
- Controles táctiles.
- Preferencias y progreso guardados solamente en el navegador.

## Arquitectura

```text
src/
├── data/       Contenido cultural, regiones, misiones, diálogos y fuentes
├── engine/     Renderizado 3D, personaje, colisiones, salto y audio
├── i18n/       Catálogos de español, portugués e inglés
├── state/      Estado y persistencia local
├── styles/     Interfaz responsiva y accesible
└── ui/         Menú, HUD, mapa, diario, recorridos y minijuegos
```

Los nuevos pueblos deben incorporarse como módulos propios. No se deben reutilizar relatos de otro pueblo como si fueran equivalentes.

## Ejecución local

Requiere Node.js 18 o posterior.

```bash
git clone https://github.com/SouBeatrizKaroline/ANCESTRIAgame.git
cd ANCESTRIAgame
npm install
npm run dev
```

Compilación: `npm run build`.

## Estado actual

- [x] Español predeterminado y selector Español / Português / English.
- [x] Prototipos 3D Mexica y andino.
- [x] Recorridos educativos Mexica y andino.
- [x] Mapa y diario responsivos.
- [x] Interacciones Mexica, colisiones principales y salto.
- [x] Progresión secuencial de 13 recorridos, repetición sin duplicar recompensas y continuidad de recorridos iniciados.
- [ ] Revisión comunitaria directa con organizaciones y especialistas indígenas antes de considerar definitivo cualquier recorrido.
- [ ] Recorridos independientes para pueblos mayas, amazónicos y otros pueblos originarios.

## Licencia

Proyecto distribuido bajo la licencia [MIT](LICENSE) con finalidad educativa.
