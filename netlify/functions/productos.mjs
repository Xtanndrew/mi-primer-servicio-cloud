import { google } from "googleapis";

export default async () => {

    try {

        const privateKey = process.env.GOOGLE_PRIVATE_KEY
            ?.replace(/\\n/g, "\n");

        const auth = new google.auth.JWT(
            process.env.GOOGLE_CLIENT_EMAIL,
            null,
            privateKey,
            [
                "https://www.googleapis.com/auth/spreadsheets.readonly"
            ]
        );

        // Intentar autenticarnos contra Google
        const credentials = await auth.authorize();

        return Response.json({
            autenticacion: "OK",
            cliente: process.env.GOOGLE_CLIENT_EMAIL,
            tokenGenerado: !!credentials.access_token
        });

    } catch (error) {

        return Response.json({
            autenticacion: "ERROR",
            mensaje: error.message,
            codigo: error.code || null
        });
    }
};