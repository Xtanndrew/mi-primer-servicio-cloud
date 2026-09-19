import { google } from "googleapis";

export default async () => {

    return Response.json({
        clientEmailExiste: !!process.env.GOOGLE_CLIENT_EMAIL,
        privateKeyExiste: !!process.env.GOOGLE_PRIVATE_KEY,
        sheetIdExiste: !!process.env.GOOGLE_SHEET_ID,

        clientEmailInicio:
            process.env.GOOGLE_CLIENT_EMAIL
                ? process.env.GOOGLE_CLIENT_EMAIL.substring(0, 10) + "..."
                : null,

        privateKeyInicio:
            process.env.GOOGLE_PRIVATE_KEY
                ? process.env.GOOGLE_PRIVATE_KEY.substring(0, 30) + "..."
                : null
    });
};