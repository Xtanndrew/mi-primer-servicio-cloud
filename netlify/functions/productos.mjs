export default async () => {
    return Response.json([
        {
            id: 1,
            nombre: "Laptop",
            precio: 15000,
            categoria: "Computación"
        },
        {
            id: 2,
            nombre: "Mouse",
            precio: 350,
            categoria: "Accesorios"
        },
        {
            id: 3,
            nombre: "Teclado",
            precio: 650,
            categoria: "Accesorios"
        }
    ]);
};