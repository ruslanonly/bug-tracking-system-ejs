export type User = {
    id: number;
    login: string;
    password: string;
    email: string;
}

export type Product = {
    id: number;
    name: string;
    description?: string;
    moderated: boolean;
    created_at: string;
}

export type Report = {
    id: number;
    name: string;
    product_id: number;
    playback_steps: string;
    actual_result: string;
    expected_result: string;
    status: number;
    priority: number;
    problem: number;
    created_at: number;
}