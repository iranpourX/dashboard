import {Role} from "@/types/role"

type User = {
    id: string;
    name: string | null;
    phone: string;
    email: string | null;
    avatar: string | null;
    role: Role;
    createdAt: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
} | undefined