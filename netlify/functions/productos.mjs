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

        const credentials = await auth.authorize();

        return Response.json({
            autenticacion: "OK",
            tokenGenerado: !!credentials.access_token,
            cliente: process.env.GOOGLE_CLIENT_EMAIL
        });

    } catch (error) {

        console.error("ERROR AUTH GOOGLE:", error);

        return Response.json({
            autenticacion: "ERROR",
            mensaje: error.message,
            codigo: error.code || null
        });
    }
};