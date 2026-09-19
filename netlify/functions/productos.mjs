import { google } from "googleapis";

export default async () => {

    try {

        const privateKey = process.env.GOOGLE_PRIVATE_KEY
            .replace(/\\n/g, "\n");

        const auth = new google.auth.JWT({
            email: process.env.GOOGLE_CLIENT_EMAIL,
            key: privateKey,
            scopes: [
                "https://www.googleapis.com/auth/spreadsheets.readonly"
            ]
        });

        const sheets = google.sheets({
            version: "v4",
            auth
        });

        const result = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Productos!A2:D"
        });

        const rows = result.data.values || [];

        const productos = rows.map((row) => ({
            id: row[0] || "",
            nombre: row[1] || "",
            precio: Number(row[2] || 0),
            categoria: row[3] || ""
        }));

        return Response.json({
            conexion: "OK",
            productos: productos
        });

    } catch (error) {

        console.error("ERROR GOOGLE SHEETS:", error);

        return Response.json({
            conexion: "ERROR",
            mensaje: error.message,
            codigo: error.code || null
        });
    }
};