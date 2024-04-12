const BASE_URL = "https://api.coinpaprika.com/v1";
const FREE_BASE_URL = "https://ohlcv-api.nomadcoders.workers.dev";

export async function fetchCoins() {
	return await fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export async function fetchDetailCoin(coinId: string) {
	return await fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
		response.json()
	);
}

export async function fetchCoinPrice(coinId: string) {
	return await fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
		response.json()
	);
}

export async function fetchCoinHistory(coinId: string) {
	return await fetch(`${FREE_BASE_URL}?coinId=${coinId}`).then((response) =>
		response.json()
	);
}
