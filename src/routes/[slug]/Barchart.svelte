<script>
    import { scaleLinear, scaleOrdinal } from "d3-scale";
    import { schemeTableau10 } from "d3-scale-chromatic";
    import { axisBottom, axisLeft } from "d3-axis";
    import { select } from "d3-selection";

    // Properties
    export let stopData;
    export let slider_value=0;
    $: slider_value;
    console.log(stopData);


    let blackRectangle = {
        day:Math.floor((slider_value*60)/86400),
        second:(slider_value*60)-Math.floor((slider_value*60)/86400)*86400
    }

    // Dimensions
    const width = 300;
    const height = 300;
    const margin = { top: 5, right: 10, bottom: 0, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scale
    const xScale = scaleLinear().domain([0,86400]).range([0,innerWidth]);
    const yScale = scaleLinear().domain([6,19]).range([0,innerHeight-40]);
    const cScale = scaleOrdinal(schemeTableau10)
    .domain(['catering' ,'domestic','housing', 'professional', 'other']);

    const yAxis = (node) => axisLeft(yScale)(select(node));

</script>

<style>
    line {
        stroke:silver;
    }
    text {
        font-size: small;
    }
</style>

<svg viewBox="0 0 {width} {height}" style="max-width: {width}px">
    <g transform="translate({margin.left}, {margin.top})">
        {#each stopData as stop}
            <rect x={xScale(stop.start.time)}
            y={yScale(stop.start.day)} height=15
            width={xScale(stop.end.time - stop.start.time)}
            fill={cScale(stop.location.location_type)}> 
        <title>{stop.location.name} ({stop.location.location_type})</title>
        </rect>
        {/each}
        <rect x={xScale((slider_value*60)-Math.floor((slider_value*60)/86400)*86400 - 450)}
        y={yScale(Math.min(Math.floor((slider_value*60)/86400)+6,19))} height=15 width={xScale(900)}/>
        <line x1={xScale(21600)} x2={xScale(21600)} y1={yScale(6)} y2={innerHeight-15}/>
        <text x={xScale(21600)-3} y={innerHeight-5}>6</text>
        <line x1={xScale(43200)} x2={xScale(43200)} y1={yScale(6)} y2={innerHeight-15}/>
        <text x={xScale(43200)-7} y={innerHeight-5}>12</text>
        <line x1={xScale(64800)} x2={xScale(64800)} y1={yScale(6)} y2={innerHeight-15}/>
        <text x={xScale(64800)-7} y={innerHeight-5}>18</text>
        <line x1={xScale(86400)} x2={xScale(86400)} y1={yScale(6)} y2={innerHeight-15}/>
        <text x={xScale(86400)-7} y={innerHeight-5}>24</text>
    </g>
    <g use:yAxis transform="translate({margin.left}, {margin.top+7.5})">
    </g>

</svg>

