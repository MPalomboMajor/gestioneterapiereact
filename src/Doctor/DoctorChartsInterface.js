import { PieChart } from "../Dashboard/PieChartComponents";
import HealtMapChart from "../Dashboard/HealtMapChartComponents";
import { BarChart } from "../Dashboard/BarChartComponents";
import { LineChart } from "../Dashboard/LineChartComponents";

function DoctorChartsInterface(props) {
    return (

        <>
            <h1 className="h1">Chart</h1>
            &nbsp;&nbsp;
            <div style={{ "height": "600px" }}>
                <h2>Drop off</h2>
                <PieChart />
            </div>
            &nbsp;&nbsp;
            <div style={{ "height": "600px" }}>
                <h2>GetBySex</h2>
                <BarChart />
            </div>
            &nbsp;&nbsp;
            <div style={{ "height": "600px" }}>
                <h2>GetMonthlyTrend</h2>
                <LineChart />
            </div>
            &nbsp;&nbsp;
            <div style={{ "height": "600px" }}>
                <h2>Andamento mood giornaliero</h2>
                <HealtMapChart />
            </div>

        </>

    );
}


export { DoctorChartsInterface }
