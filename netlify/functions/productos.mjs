import { google } from "googleapis";

const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    [
        "https://www.googleapis.com/auth/spreadsheets.readonly"
    ]
);

const sheets = google.sheets({
    version: "v4",
    auth
});
//conexión a google sheets
//comentario para actualizar
// $$$$$
export default async () => {

    try {

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
// camnbios para actualizar
        return Response.json(productos);

    } catch (error) {

        //comentarios
        console.error(
            "Error al consultar Google Sheets!:",
            error
        );

        return Response.json(
            {
                error: "No fue posible consultar Google Sheets!",
                detalle: error.message
            },
            {
                status: 500
            }
        );
    }
};