import { useState } from "react";

function App() {
  const [modo, setModo] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [logueado, setLogueado] = useState(false);
  const [invitaciones, setInvitaciones] = useState([]);
  const [nuevoInvitado, setNuevoInvitado] = useState("");

  // 🔥 GRUPOS
  const [grupos, setGrupos] = useState([]);
  const [nombreGrupo, setNombreGrupo] = useState("");

  // 👇 GRUPO SELECCIONADO
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);

  // 👥 NUEVO MIEMBRO
  const [nuevoMiembro, setNuevoMiembro] = useState("");

  if (logueado) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f2f2f2"
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          width: "300px",
          textAlign: "center"
        }}>

          <h2>Bienvenida, {nombre || email} 👋</h2>

          {/* CREAR GRUPO */}
          <h3>Crear Grupo</h3>

          <input
            placeholder="Nombre del grupo"
            value={nombreGrupo}
            onChange={(e) => setNombreGrupo(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={() => {
              if (!nombreGrupo) {
                alert("Escribe un nombre");
                return;
              }

              setGrupos([
                ...grupos,
                { nombre: nombreGrupo, miembros: [] }
              ]);

              setNombreGrupo("");
            }}
            style={buttonStyle}
          >
            Crear grupo
          </button>

          {/* LISTA DE GRUPOS */}
          <h3>Mis grupos</h3>

          {grupos.length === 0 ? (
            <p>No tienes grupos aún</p>
          ) : (
            grupos.map((grupo, index) => (
              <div
                key={index}
                onClick={() => setGrupoSeleccionado(index)}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  backgroundColor:
                    grupoSeleccionado === index ? "#dff0ff" : "white"
                }}
              >
                {grupo.nombre}

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    if (grupo.miembros.length > 0) {
                      alert("Debes eliminar todos los integrantes primero");
                      return;
                    }

                    const nuevos = grupos.filter((_, i) => i !== index);
                    setGrupos(nuevos);

                    if (grupoSeleccionado === index) {
                      setGrupoSeleccionado(null);
                    }
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  ❌
                </button>
              </div>
            ))
          )}

          {/* 📌 PANEL DE GRUPO */}
          {grupoSeleccionado !== null && grupos[grupoSeleccionado] && (
            <div style={{ marginTop: "20px" }}>

              <h3>Grupo: {grupos[grupoSeleccionado].nombre}</h3>
              <h4>Invitar miembro</h4>

              <input
                placeholder="Nombre a invitar"
                value={nuevoInvitado}
                onChange={(e) => setNuevoInvitado(e.target.value)}
                style={inputStyle}
              />

              <button
                 onClick={() => {
                   if (!nuevoInvitado) {
                    alert("Escribe un nombre");
                    return;
                  }

                    const nuevaInv = {
                    nombre: nuevoInvitado,
                    grupo: grupoSeleccionado
                    };

                    setInvitaciones([...invitaciones, nuevaInv]);
                    setNuevoInvitado("");
                  }}
                  style={buttonStyle}
               >
                  📩 Invitar
                </button>



              {/* ➕ AGREGAR MIEMBRO */}
              <input
                placeholder="Nombre del miembro"
                value={nuevoMiembro}
                onChange={(e) => setNuevoMiembro(e.target.value)}
                style={inputStyle}
              />

              <button
                onClick={() => {
                  if (!nuevoMiembro) {
                    alert("Escribe un nombre");
                    return;
                  }

                  const nuevos = [...grupos];

                  nuevos[grupoSeleccionado].miembros.push({
                    nombre: nuevoMiembro,
                    rol: "miembro"
                  });

                  setGrupos(nuevos);
                  setNuevoMiembro("");
                }}
                style={buttonStyle}
              >
                ➕ Agregar miembro
              </button>

              {/* LISTA MIEMBROS */}
              <h4>Miembros</h4>

              <h4>Invitaciones</h4>

{invitaciones.length === 0 ? (
  <p>No hay invitaciones</p>
) : (
  invitaciones.map((inv, i) => (
    <div key={i} style={{ marginBottom: "10px" }}>
      {inv.nombre}

      <button
        onClick={() => {
          const nuevos = [...grupos];

          nuevos[inv.grupo].miembros.push({
            nombre: inv.nombre,
            rol: "miembro"
          });

          setGrupos(nuevos);

          setInvitaciones(
            invitaciones.filter((_, idx) => idx !== i)
          );
        }}
        style={{ marginLeft: "10px" }}
      >
        ✔ aceptar
      </button>

      <button
        onClick={() => {
          setInvitaciones(
            invitaciones.filter((_, idx) => idx !== i)
          );
        }}
        style={{ marginLeft: "10px" }}
      >
        ❌ rechazar
      </button>
    </div>
  ))
)}

              {grupos[grupoSeleccionado].miembros.length === 0 ? (
                <p>Sin miembros</p>
              ) : (
                grupos[grupoSeleccionado].miembros.map((m, i) => (
                  <div key={i}>
                    {m.nombre} - {m.rol}

                    {/* ❌ ELIMINAR MIEMBRO */}
                    <button
                      onClick={() => {
                        const nuevos = [...grupos];

                        nuevos[grupoSeleccionado].miembros =
                          nuevos[grupoSeleccionado].miembros.filter(
                            (_, idx) => idx !== i
                          );

                        setGrupos(nuevos);
                      }}
                      style={{ marginLeft: "10px" }}
                    >
                      ❌
                    </button>

                    {/* ⭐ HACER ADMIN */}
                    {m.rol !== "admin" && (
                      <button
                        onClick={() => {
                          const nuevos = [...grupos];

                          nuevos[grupoSeleccionado].miembros[i].rol = "admin";

                          setGrupos(nuevos);
                        }}
                        style={{ marginLeft: "10px" }}
                      >
                        ⭐ admin
                      </button>
                    )}
                    
                  </div>
                ))
              )}

            </div>
          )}

          <button
            onClick={() => setLogueado(false)}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            Cerrar sesión
          </button>

        </div>
      </div>
    );
  }

  // 🔥 LOGIN / REGISTRO
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f2f2f2"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        width: "300px",
        textAlign: "center"
      }}>

        <button onClick={() => setModo("login")} style={{ marginRight: "10px" }}>
          Iniciar Sesión
        </button>

        <button onClick={() => setModo("registro")}>
          Registrarse
        </button>

        <br /><br />

 {modo === "login" ? (
  <div>
    <h2>Login</h2>

    <input
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
      style={inputStyle}
    />

    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
      style={inputStyle}
    />

    <button
      onClick={() => {
        if (!email || !password) {
          alert("Completa todos los campos");
          return;
        }

        fetch("http://localhost:8000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })
          .then(res => res.json())
          .then(data => {
            console.log("Respuesta backend:", data);
            setLogueado(true);
          })
          .catch(err => {
            console.log("Error:", err);
          });
      }}
      style={buttonStyle}
    >
      Entrar
    </button>
  </div>
) : (
  <div>
    <h2>Registro</h2>

    <input
      placeholder="Nombre"
      onChange={(e) => setNombre(e.target.value)}
      style={inputStyle}
    />

    <input
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
      style={inputStyle}
    />

    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
      style={inputStyle}
    />

    <button
      onClick={() => {
        console.log("CLICK LOGIN");
        if (!nombre || !email || !password) {
          alert("Completa todos los campos");
          return;
        }

        fetch("http://localhost:8000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre, email, password }),
        })
          .then(res => res.json())
          .then(data => {
            console.log("Respuesta backend:", data);
            setLogueado(true);
          })
          .catch(err => {
            console.log("Error:", err);
          });
      }}
      style={buttonStyle}
    >
      Registrarse
    </button>
  </div>
)}
      </div>
    </div>
  );
}

// ESTILOS (INTACTOS)
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default App;