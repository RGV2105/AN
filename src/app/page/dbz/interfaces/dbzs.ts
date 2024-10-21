export interface Dbzs {
    meta: Meta;       // Metadatos sobre la paginación
    links: Links;     // Enlaces para la paginación
    items: Item[];    // Lista de personajes
}

export interface Item {
    id: number;                       // Identificador único del personaje
    name: string;                     // Nombre del personaje
    ki: string;                       // Nivel de Ki
    maxKi: string;                    // Máximo nivel de Ki
    race: string;                     // Raza del personaje
    gender: Gender;                   // Género del personaje
    description: string;              // Descripción del personaje
    image: string;                    // URL de la imagen del personaje
    affiliation: Affiliation;         // Afiliación del personaje
    deletedAt: null;                  // Fecha de eliminación (null si no se ha eliminado)
    Data?: Dbz;                       // Datos adicionales del personaje
    
}

export enum Affiliation {
    ArmyOfFrieza = "Army of Frieza",
    Freelancer = "Freelancer",
    ZFighter = "Z Fighter",
}

export enum Gender {
    Female = "Female",
    Male = "Male",
}

export interface Links {
    first: string;                    // Enlace a la primera página
    previous: string;                 // Enlace a la página anterior
    next: string;                     // Enlace a la siguiente página
    last: string;                     // Enlace a la última página
}

export interface Meta {
    totalItems: number;               // Total de elementos
    itemCount: number;                // Número de elementos en la página actual
    itemsPerPage: number;             // Número de elementos por página
    totalPages: number;               // Total de páginas
    currentPage: number;              // Página actual
}

export interface Dbz {
    id: number;                       // Identificador único
    name: string;                     // Nombre del personaje
    ki: string;                       // Nivel de Ki
    maxKi: string;                    // Máximo nivel de Ki
    race: string;                     // Raza del personaje
    gender: Gender;                   // Género del personaje
    description: string;              // Descripción del personaje
    image: string;                    // URL de la imagen
    affiliation: string;              // Afiliación del personaje
    deletedAt: null;                  // Fecha de eliminación
    originPlanet: OriginPlanet;       // Planeta de origen
    transformations: Transformation[]; // Lista de transformaciones
}

export interface OriginPlanet {
    id: number;                       // Identificador único del planeta
    name: string;                     // Nombre del planeta
    isDestroyed: boolean;             // Indica si el planeta ha sido destruido
    description: string;              // Descripción del planeta
    image: string;                    // URL de la imagen del planeta
    deletedAt: null;                  // Fecha de eliminación
}

export interface Transformation {
    id: number;                       // Identificador único de la transformación
    name: string;                     // Nombre de la transformación
    image: string;                    // URL de la imagen de la transformación
    ki: string;                       // Nivel de Ki de la transformación
    deletedAt: null;                  // Fecha de eliminación
}
