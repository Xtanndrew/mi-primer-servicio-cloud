import { google } from "googleapis";

// ==========================================
// AUTENTICACIÓN CON GOOGLE CLOUD
// ==========================================

const privateKey = process.env.GOOGLE_PRIVATE_KEY
    ?.replace(/\\n/g, "\n");

const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: privateKey,
    scopes: [
        "https://www.googleapis.com/auth/spreadsheets.readonly"
    ]
});

// ==========================================
// CONEXIÓN CON GOOGLE SHEETS API
// ==========================================

const sheets = google.sheets({
    version: "v4",
    auth
});

// ==========================================
// FUNCIÓN SERVERLESS
// ==========================================

export default async () => {

    try {

        // Consultar datos de Google Sheets
        const result = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Productos!A2:D"
        });

        // Obtener filas
        const rows = result.data.values || [];

        // Convertir las filas a objetos
        const productos = rows.map((row) => ({
            id: row[0] || "",
            nombre: row[1] || "",
            precio: Number(row[2] || 0),
            categoria: row[3] || ""
        }));

        // Respuesta exitosa
        return Response.json({
            conexion: "OK",
            productos: productos
        });

    } catch (error) {

        // Mostrar el error en los logs de Netlify
        console.error(
            "ERROR GOOGLE SHEETS:",
            error
        );

        // Respuesta de error
        return Response.json(
            {
                conexion: "ERROR",
                mensaje: "No fue posible consultar Google Sheets!",
                detalle: error.message
            },
            {
                status: 500
            }
        );
    }
};