import type {Role} from "@/types/role"

export function hasRole(currentRole: Role, roles: Role[]) {
    return roles.includes(currentRole)
}

export function getRedirectPath(role: Role) {
    switch (role) {
        case "super_admin":
        case "manager":
            return "/dashboard"

        case "user":
            return "/profile"

        default:
            return "/"
    }
}