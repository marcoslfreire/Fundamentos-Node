export function extractQueryParams(query) {
    if (!query || typeof query !== 'string') {
        return {}; // Retorna um objeto vazio se `query` for inválido
    }

    return query.substr(1).split('&').reduce((queryParams, param) => {
        const [key, value] = param.split('=');

        queryParams[key] = value;

        return queryParams;
    }, {});
}
