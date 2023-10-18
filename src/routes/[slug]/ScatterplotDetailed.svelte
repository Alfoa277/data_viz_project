<script>
    import { scaleLinear, scaleOrdinal } from "d3-scale";
    import { schemeTableau10 } from "d3-scale-chromatic";

    // Properties
    export let gps = [];
    export let sel_car = 0;
    export let sel_minute = 0;
    

    // Dimensions
    const width = 300;
    const height = 300;
    const margin = { top: 10, right: 5, bottom: 10, left: 10 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales 
    const xScale = scaleLinear().domain(
        [24.82586806, 24.90836090428572]
        )
        .range([0,innerWidth]);
    const yScale = scaleLinear().domain(
        [36.04802108, 36.08961232]
        )
        .range([innerHeight,0]);


    // Functions

    

    
    
</script>

<style>
    .unselected{
        fill:  blue;
        opacity: 0.2;
    }
    .selected{
        fill: red;
        opacity: 1;
    }
</style>

<svg viewBox="0 0 {width} {height}" style="max-width: {width}px">
    <g transform="translate({margin.left}, {margin.top})">
        {#each gps as gpsPoint}
            <circle class:unselected={sel_minute!=gpsPoint.cumulative_minute_total}
            class:selected={gpsPoint.cumulative_minute_total<(sel_minute+15) 
            && gpsPoint.cumulative_minute_total>(sel_minute-15)} 
            cx={xScale(gpsPoint.long)} cy={yScale(gpsPoint.lat)}
            r=2>
            </circle>
        {/each}

    </g>
</svg>

