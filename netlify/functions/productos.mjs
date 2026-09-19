import { google } from "googleapis";

export default async () => {

    const key = process.env.GOOGLE_PRIVATE_KEY || "";

    return Response.json({
        existe: !!key,
        longitud: key.length,
        inicio: key.substring(0, 30),
        tieneBEGIN: key.includes("-----BEGIN PRIVATE KEY-----"),
        tieneEND: key.includes("-----END PRIVATE KEY-----"),
        tieneSaltos: key.includes("\\n")
    });
};