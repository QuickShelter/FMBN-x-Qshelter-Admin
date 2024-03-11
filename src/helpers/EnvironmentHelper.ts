export default class EnvironmentHelper {
    public static API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    public static PAGINATION_LIMIT = Number(import.meta.env.VITE_PAGINATION_LIMIT)
    public static PRESIGNER_TTL = Number(import.meta.env.VITE_PRESIGNER_TTL)
    public static PROJECT_OWNER = Number(import.meta.env.VITE_PROJECT_OWNER)
}