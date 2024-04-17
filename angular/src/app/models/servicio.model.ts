export interface Servicio {
    id?: number;
    categoria: string;
    nombre_servicio: string;
    descripcion: string;
    tarifa: number;
    imagen: number;
    created_at:Date|null;
    updated_at:Date|null;
    }