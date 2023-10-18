<script>
    import { scaleLinear, scaleOrdinal } from "d3-scale";
    import { schemeTableau10 } from "d3-scale-chromatic";

    // Properties
    export let gps = [];
    export let poi = [];
    export let sel_car = 0;

    // Dimensions
    const width = 600;
    const height = 600;
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales 
    // First find minimum and maximum latitude and longitude to
    // find the appropriate scatterplot dimensions. Also save all the
    // types of POI for coloring purposes
    let lats = [];
    let longs = [];
    let ids = [];
    if(gps){
        gps.forEach(element => {
            lats.push(element.lat);
            longs.push(element.long);
            ids.push(element.car_id);
        });
        poi.forEach(element => {
            lats.push(element.lat);
            longs.push(element.long);
        });

        ids = [... new Set(ids)];
    }
    const xScale = scaleLinear().domain(
        [Math.min.apply(null,longs),Math.max.apply(null,longs)]
        )
        .range([0,innerWidth]);
    console.log([Math.min.apply(null,longs),Math.max.apply(null,longs)]);
    const yScale = scaleLinear().domain(
        [Math.min.apply(null,lats),Math.max.apply(null,lats)]
        )
        .range([innerHeight,0]);

    const cScale = scaleOrdinal(schemeTableau10).domain(['catering' ,'domestic',
    'housing', 'professional', 'other']);
    console.log([Math.min.apply(null,lats),Math.max.apply(null,lats)]);
    
    
</script>

<style>
    .unselected{
        opacity: 0.15;
    }
    .selected{
        fill: red;
        opacity: 1;
    }
</style>

<svg viewBox="0 0 {width} {height}" style="max-width: {width}px">
    <g transform="translate({margin.left}, {margin.top})">
        {#each gps as gpsPoint}
            <circle class:unselected={sel_car!=gpsPoint.car_id}
            class:selected={sel_car===gpsPoint.car_id} 
            cx={xScale(gpsPoint.long)} cy={yScale(gpsPoint.lat)}
            r=2>
            </circle>
        {/each}
        {#each poi as poiPoint}
            <circle cx={xScale(poiPoint.long)} cy={yScale(poiPoint.lat)}
            fill={cScale(poiPoint.type)} r=4>
            <title>{poiPoint.name}</title>
            </circle>
        {/each}
    </g>
</svg>