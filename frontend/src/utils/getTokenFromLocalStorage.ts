export const getTokenFromLocalStorage = (): string | null => {
    try {
        const token = localStorage.getItem("token"); // Substitua "token" pela chave correta usada no seu projeto
        return token ? token : null; // Retorna o token ou null se não existir
    } catch (error) {
        console.error("Erro ao resgatar o token:", error);
        return null;
    }
};
