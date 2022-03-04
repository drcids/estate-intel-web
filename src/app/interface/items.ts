export interface Item {
    color: string
    shape: string
}

export interface Color {
    color: string
    active: boolean
}

export interface Shape {
    active: boolean
    shape: string
}

export interface Filter {
    color: string[]
    shape: string[]
}