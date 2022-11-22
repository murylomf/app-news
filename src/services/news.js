import service from "./axios";

const API_KEY = 'de12c4ed54344b23af94f71f27236505';

export async function getEverything(q) {
    let params = {
        apiKey: API_KEY,
        sortBy: 'publishedAt',
        searchIn: 'title'
    }

    if (q) params['q'] = q;

    try {
        const { data } = await service.get('/v2/everything', {
            params: params
        });
        return data;
    }
    catch (e) { console.log(e) }
}

export async function getTopHeadlines() {
    try {
        const { data } = await service.get('/v2/top-headlines', {
            params: {
                apiKey: API_KEY,
                country: 'br',
                sortBy: 'publishedAt'
            }
        });
        return data;
    }
    catch (e) { console.log(e) }
}