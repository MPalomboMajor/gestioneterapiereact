
import PieChart from "./PieChartComponents";
import HealtMapChart from "./HealtMapChartComponents";

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
                <h2>Andamento mood giornaliero</h2>
                <HealtMapChart />
            </div>

        </>

    );
}


export { DoctorChartsInterface }
