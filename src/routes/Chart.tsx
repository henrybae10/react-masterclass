import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../apies/api";
import ApexChart from "react-apexcharts";
import { useParams } from "react-router-dom";

interface IHistorical {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

function Chart() {
	const { coinId } = useParams();

	const { isLoading, data: coinData } = useQuery<IHistorical[]>({
		queryKey: ["ohlcv", coinId],
		queryFn: () => fetchCoinHistory(coinId!),
		refetchInterval: 30000,
	});

	return (
		<div>
			{isLoading ? (
				"Loading chart..."
			) : (
				<ApexChart
					type="candlestick"
					options={{
						theme: {
							mode: "light",
						},
						chart: {
							type: "candlestick",
							height: 300,
							width: 500,
							toolbar: {
								show: false,
							},
							background: "transparent",
						},
						grid: { show: true },
						stroke: {
							curve: "smooth",
							width: 1,
						},
						yaxis: {
							show: false,
						},
						xaxis: {
							axisBorder: { show: false },
							axisTicks: { show: false },
							labels: { show: false },
							type: "datetime",
							categories:
								coinData && coinData.length > 0
									? coinData!.map((price) => price.time_close)
									: [],
						},
						fill: {
							type: "gradient",
							gradient: {
								gradientToColors: ["#0be881"],
								stops: [0, 100],
							},
						},
						colors: ["#0fbcf9"],
						tooltip: {
							y: {
								formatter: (value: any) =>
									`$${value.toFixed(2)}`,
							},
						},
					}}
					series={[
						{
							name: "price",
							data:
								coinData && coinData.length > 0
									? coinData!.map((price) => {
											return {
												x: price.time_close,
												y: [
													price.open,
													price.high,
													price.low,
													price.close,
												],
											};
									  })
									: [],
						},
					]}
				/>
			)}
		</div>
	);
}

export default Chart;
