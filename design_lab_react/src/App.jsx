import { useState } from 'react';
import asadosImg from '../../img negocios/asados.jfif';
import burgerImg from '../../img negocios/burger kibg.jfif';
import embrolloImg from '../../img negocios/embrollo.jfif';
import ensaladasImg from '../../img negocios/ensaladas.jfif';
import './App.css';

const CLAVE_COMENTARIOS = 'navishop-comentarios-por-negocio';

function App() {
  // Controla si estamos en la vista principal o en la pantalla de Preguntas Frecuentes
  const [vistaEquipo, setVistaEquipo] = useState(false);

  // Controla qué pregunta está desplegada en la pantalla de Preguntas Frecuentes (0 = primera abierta)
  const [preguntaAbierta, setPreguntaAbierta] = useState(0);

  // Estado para la lista interactiva de la portada
  const [opcionActiva, setOpcionActiva] = useState(0);

  // Estado para el menú lateral
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Estado para el modal de registro / inicio de sesión
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoRegistro, setModoRegistro] = useState(true);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeGoogle, setMensajeGoogle] = useState('');
  const [chatOpinionAbierto, setChatOpinionAbierto] = useState(false);
  const [negocioComentariosId, setNegocioComentariosId] = useState(1);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [estadoComentarios, setEstadoComentarios] = useState(() => {
    try {
      const guardados = window.localStorage.getItem(CLAVE_COMENTARIOS);
      const comentariosPorNegocio = guardados ? JSON.parse(guardados) : {};
      const datosValidos =
        comentariosPorNegocio &&
        typeof comentariosPorNegocio === 'object' &&
        !Array.isArray(comentariosPorNegocio) &&
        Object.values(comentariosPorNegocio).every(
          (comentarios) =>
            Array.isArray(comentarios) &&
            comentarios.every(
              (comentario) =>
                comentario &&
                typeof comentario.texto === 'string' &&
                typeof comentario.fecha === 'string',
            ),
        );

      if (!datosValidos) {
        throw new Error('El formato guardado de comentarios no es válido.');
      }

      return { porNegocio: comentariosPorNegocio, error: '' };
    } catch (error) {
      console.error('No se pudieron cargar los comentarios guardados.', error);
      return {
        porNegocio: {},
        error: 'No se pudieron cargar los comentarios anteriores.',
      };
    }
  });

  const opcionesHero = [
    {
      titulo: 'Navishop ofrece innovación',
      descripcion:
        'En Navishop fomentamos a los emprendedores a ser innovadores con sus negocios.',
    },
    {
      titulo: 'Productos centralizados',
      descripcion:
        'Escoge tus productos, ahora más cerca de ti con Navishop.',
    },
    {
      titulo: 'Lo que no sabías',
      descripcion:
        'Probablemente no conocías todos los negocios a tu alrededor, pero no te preocupes: lo solucionamos aquí. Busca el producto que necesitas y te aparecerá en pantalla.',
    },
    {
      titulo: 'Consolida tu marca',
      descripcion:
        'Si buscas vender productos y quieres llegar más rápido a tus ventas, inscríbete como emprendedor y crea tu marca en Navishop.',
    },
    {
      titulo: 'Socio de Navishop',
      descripcion:
        'Navishop es aliado de tu negocio. No cobramos comisiones; la suscripción a la plataforma es totalmente gratuita.',
    },
  ];

  const negocios = [
    { id: 1, nombre: 'Asados', imagen: asadosImg },
    { id: 2, nombre: 'Burger King', imagen: burgerImg },
    { id: 3, nombre: 'Embrollo', imagen: embrolloImg },
    { id: 4, nombre: 'Ensaladas', imagen: ensaladasImg },
    { id: 5, nombre: 'Alquileres', estatico: true },
    { id: 6, nombre: 'Almuerzos', estatico: true },
    { id: 7, nombre: 'Almuerzos saludables', estatico: true },
  ];

  const comentariosDelNegocio =
    estadoComentarios.porNegocio[negocioComentariosId] || [];

  const listaPreguntas = [
    {
      pregunta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
      respuesta:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      pregunta: 'Sed do eiusmod tempor incididunt ut labore et dolore?',
      respuesta:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    },
    {
      pregunta: 'Duis aute irure dolor in reprehenderit in voluptate velit?',
      respuesta:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
    },
    {
      pregunta: 'Excepteur sint occaecat cupidatat non proident sunt in culpa?',
      respuesta:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    },
    {
      pregunta: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem?',
      respuesta:
        'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.',
    },
    {
      pregunta: 'At vero eos et accusamus et iusto odio dignissimos ducimus?',
      respuesta:
        'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime.',
    },
  ];

  const abrirModalRegistro = () => {
    setModoRegistro(true);
    setMensajeGoogle('');
    setModalAbierto(true);
  };

  const abrirModalLogin = () => {
    setModoRegistro(false);
    setMensajeGoogle('');
    setModalAbierto(true);
  };

  const irAPantallaEquipo = () => {
    setVistaEquipo(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const volverAlInicio = () => {
    setVistaEquipo(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const manejarFormulario = (e) => {
    e.preventDefault();
    alert(
      modoRegistro
        ? `¡Listo! Cuenta creada en NAVISHOP para: ${usuario}`
        : `¡Listo! Sesión iniciada en NAVISHOP como: ${usuario}`,
    );
    setModalAbierto(false);
    setPassword('');
  };

  const manejarEnvioComentario = (e) => {
    e.preventDefault();
    const texto = nuevoComentario.trim();

    if (!texto) {
      return;
    }

    const comentariosActualizados = {
      ...estadoComentarios.porNegocio,
      [negocioComentariosId]: [
        ...comentariosDelNegocio,
        { texto, fecha: new Date().toISOString() },
      ],
    };

    try {
      window.localStorage.setItem(
        CLAVE_COMENTARIOS,
        JSON.stringify(comentariosActualizados),
      );
      setEstadoComentarios({ porNegocio: comentariosActualizados, error: '' });
      setNuevoComentario('');
    } catch (error) {
      console.error('No se pudo guardar el comentario.', error);
      setEstadoComentarios((estadoActual) => ({
        ...estadoActual,
        error: 'No se pudo guardar el comentario. Inténtalo de nuevo.',
      }));
    }
  };

  const modal = modalAbierto && (
    <div className="overlay-bg">
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="close-modal"
          type="button"
          onClick={() => setModalAbierto(false)}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 id="modal-title">
          {modoRegistro ? 'Crear cuenta' : 'Iniciar sesión'}
        </h2>
        <p className="modal-sub">
          {modoRegistro
            ? 'Regístrate para descubrir más.'
            : 'Ingresa tus datos para continuar.'}
        </p>
        <form onSubmit={manejarFormulario}>
          <div className="form-group">
            <label htmlFor="usuario">Correo electrónico</label>
            <input
              id="usuario"
              type="email"
              autoComplete="email"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              autoComplete={modoRegistro ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn-submit" type="submit">
            {modoRegistro ? 'Registrarse' : 'Iniciar sesión'}
          </button>
        </form>
        <p className="divider">O continúa con</p>
        <button
          className="btn-google"
          type="button"
          onClick={() =>
            setMensajeGoogle(
              'El acceso con Google aún no está configurado. Se requiere conectar la autenticación de la plataforma.',
            )
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11c-.5 2.5-2 4.7-4.3 6.1l6.9 5.3c4-3.7 6-9 6-15.1Z"
            />
            <path
              fill="#34A853"
              d="M24 44c5.5 0 10.1-1.8 13.6-4.8l-6.9-5.3c-1.9 1.3-4.1 2-6.7 2-5.1 0-9.5-3.4-11.1-8l-7.1 5.5C9.3 39.7 16.1 44 24 44Z"
            />
            <path
              fill="#FBBC05"
              d="M12.9 27.9a12 12 0 0 1 0-7.8l-7.1-5.5a20 20 0 0 0 0 18.8l7.1-5.5Z"
            />
            <path
              fill="#EA4335"
              d="M24 12.1c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 5.9 29.5 4 24 4 16.1 4 9.3 8.3 5.8 14.6l7.1 5.5c1.6-4.6 6-8 11.1-8Z"
            />
          </svg>
          <span>Continuar con Google</span>
        </button>
        {mensajeGoogle && (
          <p className="auth-notice" role="status">
            {mensajeGoogle}
          </p>
        )}
        <button
          className="btn-mode-toggle"
          type="button"
          onClick={() => {
            setModoRegistro((modoActual) => !modoActual);
            setMensajeGoogle('');
          }}
        >
          {modoRegistro
            ? '¿Ya tienes cuenta? Inicia sesión'
            : '¿No tienes cuenta? Regístrate'}
        </button>
      </section>
    </div>
  );

  /* =====================================================================
     PANTALLA SECUNDARIA: PREGUNTAS FRECUENTES (AL PULSAR "HABLA CON EL EQUIPO")
     ===================================================================== */
  if (vistaEquipo) {
    return (
      <div className="faq-page">
        <div className="faq-page-inner">
          <button className="btn-back-home" onClick={volverAlInicio}>
            ← Volver a NAVISHOP
          </button>

          <p className="faq-eyebrow">PREGUNTAS FRECUENTES</p>
          <h1 className="faq-main-title">Preguntas frecuentes</h1>
          <p className="faq-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
            <span onClick={abrirModalRegistro}>Habla con el equipo</span>
          </p>

          <div className="faq-list">
            {listaPreguntas.map((item, index) => {
              const estaAbierta = preguntaAbierta === index;
              return (
                <div
                  key={index}
                  className="faq-row"
                  onClick={() => setPreguntaAbierta(estaAbierta ? -1 : index)}
                >
                  <div className="faq-row-header">
                    <span className="faq-row-question">{item.pregunta}</span>
                    <span className="faq-row-icon">
                      {estaAbierta ? '×' : '+'}
                    </span>
                  </div>

                  {estaAbierta && (
                    <p className="faq-row-answer">{item.respuesta}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {modal}
      </div>
    );
  }

  /* =====================================================================
     PANTALLA PRINCIPAL DE NAVISHOP
     ===================================================================== */
  return (
    <div>
      {/* PARTE 1: HERO CON DEGRADADO LILA A AZUL PASTEL */}
      <section id="inicio" className="hero-section">
        <header className="navbar">
          <div className="nav-left">
            <button className="menu-btn" onClick={() => setMenuAbierto(true)}>
              ≡
            </button>
            <span className="brand-title">NAVISHOP</span>
          </div>

          <div className="nav-right">
            <div className="search-box">
              <input type="text" placeholder="Nombre del negocio" />
              <button className="search-button" type="button">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Buscar
              </button>
            </div>

            <button className="btn-login" onClick={abrirModalLogin}>
              Iniciar sesión
            </button>

            <button className="btn-register" onClick={abrirModalRegistro}>
              Registrarse
            </button>
          </div>
        </header>

        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">Negocios con productos a tu alcance</h1>
            <p className="hero-subtitle">
              Conecta con productos, negocios y nuevas oportunidades cerca de ti.
            </p>
          </div>

          <div className="hero-right">
            {opcionesHero.map((item, idx) => (
              <button
                key={idx}
                className={`feature-item ${opcionActiva === idx ? 'active' : ''}`}
                type="button"
                onMouseEnter={() => setOpcionActiva(idx)}
                onFocus={() => setOpcionActiva(idx)}
                onClick={() => setOpcionActiva(idx)}
              >
                <span className="play-triangle" aria-hidden="true" />
                <span className="feature-copy">
                  <span className="feature-title">{item.titulo}</span>
                  {opcionActiva === idx && (
                    <span className="feature-description">
                      {item.descripcion}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PARTE 2: FONDO BLANCO CON 7 CUADROS DE NEGOCIOS */}
      <section id="negocios" className="businesses-section">
        <div className="businesses-header">
          <h2>Prueba hacer tu primera visita virtual</h2>
          <p>
            Navishop te permite acceder a las localizaciones de los negocios,
            calificarlos, contactar a sus responsables y hacer tus pedidos,
            ¡todo de manera digital! ¡Qué asombroso!
          </p>
        </div>

        <div
          className="business-carousel"
          aria-label="Carrusel de negocios"
        >
          <div className="seven-cards-track">
            {[false, true].map((esDuplicado) => (
              <div
                className="business-group"
                aria-hidden={esDuplicado || undefined}
                key={esDuplicado ? 'duplicados' : 'originales'}
              >
                {negocios.map((negocio) => (
                  <button
                    key={negocio.id}
                    className={`business-card${negocio.estatico ? ' business-card-static' : ''}`}
                    type="button"
                    onClick={negocio.estatico ? undefined : abrirModalRegistro}
                    disabled={negocio.estatico}
                    title={`Ver ${negocio.nombre}`}
                    aria-label={
                      negocio.estatico
                        ? negocio.nombre
                        : `Registrarse para ver ${negocio.nombre}`
                    }
                    tabIndex={esDuplicado ? -1 : 0}
                  >
                    <span className="business-photo-space">
                      {negocio.imagen ? (
                        <img src={negocio.imagen} alt={negocio.nombre} />
                      ) : (
                        <span className="business-placeholder">
                          {negocio.nombre}
                        </span>
                      )}
                    </span>
                    <span className="business-label">{negocio.nombre}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-info-section">
        <div className="dark-info-container">
          <h2 className="dark-main-title">
            Planes de equipo diseñados para el trabajo creativo a escala
          </h2>
          <div className="dark-columns">
            <div className="dark-col">
              <h3>Quiénes somos</h3>
              <p>
                Somos un equipo de cuatro desarrolladores. Buscamos centralizar
                los mercados cercanos al TECBA para facilitar el acceso de los
                locatarios.
              </p>
              <button
                className="btn-dark-white-disabled"
                type="button"
                disabled
              >
                Más información
              </button>
            </div>
            <div className="dark-col">
              <h3>¿Necesitas ayuda?</h3>
              <p>
                Da un clic y mira las preguntas frecuentes.
              </p>
              <button
                className="btn-dark-outline"
                type="button"
                onClick={irAPantallaEquipo}
              >
                Habla con el equipo
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="review-banner" aria-label="Opiniones">
        <div className="review-message">
          <div className="review-stars" aria-label="Cinco estrellas">
            {[1, 2, 3, 4, 5].map((estrella) => (
              <span key={estrella} aria-hidden="true">
                ★
              </span>
            ))}
          </div>
          <p>¿Tu experiencia ha sido fantástica?</p>
        </div>
        <button
          className="review-button"
          type="button"
          onClick={() => setChatOpinionAbierto(true)}
          aria-haspopup="dialog"
          aria-expanded={chatOpinionAbierto}
        >
          Escribe una opinión <span>→</span>
        </button>
      </section>

      <section className="cristo-cta" aria-labelledby="cristo-cta-title">
        <div className="cristo-cta-content">
          <h2 className="cristo-cta-title" id="cristo-cta-title">
            Sé Navishop
          </h2>
          <button
            className="cristo-cta-button"
            type="button"
            onClick={abrirModalRegistro}
          >
            Empieza a ver <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-columns">
          <section className="footer-column">
            <h2>Productos</h2>
            <ul>
              <li>Asados</li>
              <li>Hamburguesas</li>
              <li>Comida casera</li>
              <li>Ensaladas</li>
              <li>Jugos</li>
              <li>Pastas</li>
              <li>Pizzas</li>
            </ul>
          </section>
          <section className="footer-column">
            <h2>Emprendedores</h2>
            <ul>
              <li>Registra tu negocio</li>
              <li>Crea tu marca</li>
              <li>Publica productos</li>
              <li>Gestiona tu catálogo</li>
              <li>Llega a nuevos clientes</li>
            </ul>
          </section>
          <section className="footer-column">
            <h2>Información útil</h2>
            <ul>
              <li>Visita virtual</li>
              <li>Calificaciones</li>
              <li>Pedidos digitales</li>
              <li>Preguntas frecuentes</li>
              <li>Ayuda y soporte</li>
            </ul>
          </section>
          <section className="footer-column">
            <h2>Navishop</h2>
            <ul>
              <li>Quiénes somos</li>
              <li>Nuestro equipo</li>
              <li>TECBA</li>
              <li>Privacidad</li>
              <li>Términos de uso</li>
            </ul>
          </section>
          <section className="footer-column">
            <h2>Comunidad</h2>
            <ul>
              <li>Atención al cliente</li>
              <li>Instagram</li>
              <li>YouTube</li>
              <li>TikTok</li>
              <li>Facebook</li>
            </ul>
          </section>
        </div>
      </footer>

      {menuAbierto && (
        <>
          <button
            className="overlay-bg"
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setMenuAbierto(false)}
          />
          <nav className="drawer-menu" aria-label="Navegación principal">
            <button
              className="close-modal"
              type="button"
              onClick={() => setMenuAbierto(false)}
              aria-label="Cerrar menú"
            >
              ×
            </button>
            <strong>NAVISHOP</strong>
            <a href="#inicio" onClick={() => setMenuAbierto(false)}>
              Inicio
            </a>
            <a href="#negocios" onClick={() => setMenuAbierto(false)}>
              Negocios
            </a>
            <button
              className="btn-dark-outline"
              type="button"
              onClick={() => {
                setMenuAbierto(false);
                irAPantallaEquipo();
              }}
            >
              Habla con el equipo
            </button>
          </nav>
        </>
      )}

      {chatOpinionAbierto && (
        <section
          className="opinion-chat"
          role="dialog"
          aria-modal="false"
          aria-labelledby="opinion-chat-title"
        >
          <header className="opinion-chat-header">
            <div>
              <h2 id="opinion-chat-title">Escribe una opinión</h2>
              <p>Tu comentario se guardará en este negocio.</p>
            </div>
            <button
              className="opinion-chat-close"
              type="button"
              onClick={() => setChatOpinionAbierto(false)}
              aria-label="Cerrar opiniones"
            >
              ×
            </button>
          </header>

          <div className="opinion-chat-body">
            <label className="opinion-chat-label" htmlFor="negocio-comentarios">
              Negocio
            </label>
            <select
              id="negocio-comentarios"
              className="opinion-chat-business"
              value={negocioComentariosId}
              onChange={(e) => setNegocioComentariosId(Number(e.target.value))}
            >
              {negocios.map((negocio) => (
                <option key={negocio.id} value={negocio.id}>
                  {negocio.nombre}
                </option>
              ))}
            </select>

            {estadoComentarios.error && (
              <p className="opinion-chat-error" role="alert">
                {estadoComentarios.error}
              </p>
            )}

            <div
              className="opinion-chat-messages"
              aria-label={`Comentarios de ${
                negocios.find(
                  (negocio) => negocio.id === negocioComentariosId,
                )?.nombre
              }`}
              aria-live="polite"
            >
              {comentariosDelNegocio.length === 0 ? (
                <p className="opinion-chat-empty">
                  Aún no hay comentarios para este negocio. ¡Escribe el primero!
                </p>
              ) : (
                comentariosDelNegocio.map((comentario, index) => (
                  <article
                    className="opinion-chat-message"
                    key={`${comentario.fecha}-${index}`}
                  >
                    <strong>Tú</strong>
                    <p>{comentario.texto}</p>
                    <time dateTime={comentario.fecha}>
                      {new Date(comentario.fecha).toLocaleString('es')}
                    </time>
                  </article>
                ))
              )}
            </div>

            <form
              className="opinion-chat-form"
              onSubmit={manejarEnvioComentario}
            >
              <label className="sr-only" htmlFor="nuevo-comentario">
                Tu comentario
              </label>
              <textarea
                id="nuevo-comentario"
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                placeholder="Escribe tu mensaje..."
                maxLength={500}
                rows={3}
                required
              />
              <button type="submit" disabled={!nuevoComentario.trim()}>
                Enviar
              </button>
            </form>
          </div>
        </section>
      )}

      {modal}
    </div>
  );
}

export default App;
