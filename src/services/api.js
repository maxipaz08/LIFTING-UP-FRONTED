const cleanUrl = (rawUrl) => {
    if (!rawUrl) return 'https://lifting-up-backend.onrender.com/api';
    // Elimina corchetes, comillas y espacios accidentales
    let cleaned = rawUrl.replace(/[\[\]"']/g, '').trim();
    // Si contiene paréntesis de un link markdown [texto](url), extrae solo la URL
    if (cleaned.includes('(') && cleaned.includes(')')) {
        const match = cleaned.match(/\(([^)]+)\)/);
        if (match) cleaned = match[1];
    }
    return cleaned.replace(/\/$/, ''); // Quita la barra final si la tiene
};

const API_URL = cleanUrl(import.meta.env.VITE_API_URL);
console.log("API_URL configurada actualmente:", API_URL);

// ─── Helper para manejar respuestas ─────────────────────────────────────
const handleResponse = async (response) => {
    const contentType = response.headers.get("content-type");
    let json = null;

    if (contentType && contentType.indexOf("application/json") !== -1) {
        json = await response.json();
    } else {
        const text = await response.text();
        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}: La respuesta del servidor no es JSON válido. Verifica si el endpoint existe.`);
        }
        return text;
    }

    if (!response.ok) {
        const msg = json?.message || `Error HTTP ${response.status}`;
        throw new Error(msg);
    }
    return json;
};

// ─── GET /api/usuarios — Obtener todos ──────────────────────────────────
export const getUsuarios = async () => {
    const response = await fetch(`${API_URL}/usuarios`);
    return handleResponse(response);
};

// ─── GET /api/usuarios/:id — Obtener uno por ID ─────────────────────────
export const getUsuarioById = async (id) => {
    const response = await fetch(`${API_URL}/usuarios/${id}`);
    return handleResponse(response);
};

// ─── POST /api/usuarios — Crear usuario ─────────────────────────────────
export const createUsuario = async (usuarioData) => {
    const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioData),
    });
    return handleResponse(response);
};

export const createAdmin = async (adminData) => {
    const response = await fetch(`${API_URL}/admins`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData)
    })

    return handleResponse(response)
}

// ─── GET /api/admins — Obtener administradores ──────────────────────────
export const getAdmins = async () => {
    const response = await fetch(`${API_URL}/admins`);
    return handleResponse(response);
};


// ─── PUT /api/usuarios/:id — Actualizar usuario ──────────────────────────
export const updateUsuario = async (id, usuarioData) => {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioData),
    });
    return handleResponse(response);
};

// ─── DELETE /api/usuarios/:id — Eliminar usuario ─────────────────────────
export const deleteUsuario = async (id) => {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};

// ─── RUTINAS ─────────────────────────────────────────────────────────────
export const getRutinas = async (id_usuario = '') => {
    const query = id_usuario ? `?id_usuario=${id_usuario}` : '';
    const response = await fetch(`${API_URL}/rutinas${query}`);
    return handleResponse(response);
};

export const createRutina = async (data) => {
    const response = await fetch(`${API_URL}/rutinas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

export const updateRutina = async (id, data) => {
    const response = await fetch(`${API_URL}/rutinas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

// ─── ASISTENCIAS ─────────────────────────────────────────────────────────
export const getAsistencias = async (id_usuario) => {
    // Si id_usuario viene undefined, no envía query corrupto
    const query = id_usuario ? `?id_usuario=${id_usuario}` : '';
    const response = await fetch(`${API_URL}/asistencia${query}`);
    return handleResponse(response);
};

export const createAsistencia = async (data) => {
    // Aseguramos que data tenga id_usuario y fecha antes de enviar
    const response = await fetch(`${API_URL}/asistencia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

// ─── EJERCICIOS ──────────────────────────────────────────────────────────
export const getEjercicios = async () => {
    const response = await fetch(`${API_URL}/ejercicios`);
    return handleResponse(response);
};

export const createEjercicio = async (data) => {
    const response = await fetch(`${API_URL}/ejercicios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

