<script>
    import Scatterplot from '../Scatterplot.svelte';
    import ScatterplotDetailed from './ScatterplotDetailed.svelte';
    import Barchart from './Barchart.svelte';
    export let data;

    $: carId = +data.carId;
    $: carData = data.car;
    $: carStops = data.stops;
    let sel_minute = 0;
    let ids = [];
    for(let i = 1; i<36;i++){
        ids.push(i)
    };
    ids.push(101);
    for(let i = 104;i<108;i++){
        ids.push(i)
    };

    $: index = ids.indexOf(carId);

</script>

<style>
    input {
        width:300px;
    }
    .scatterplot{
        margin-right: 30px;;
    }
</style>



<p><a href="/">Back to overview</a></p>
<div>
{#if carId>1}
    <a href={ids[index-1]}>Previous car</a>
{/if}
{#if carId<107}
    <a href={ids[index+1]}>Next car</a>
{/if}
</div>
<h1>Alfonso Larumbe Fernández - KU Leuven - r0924359</h1>
<h2>Details for car {ids[index]}</h2>
<div>
    <input type="range" min="0" max="20160" bind:value={sel_minute}/>
</div>
{#if !data.car}
    <p>Loading...</p>
{:else}
    <div>
    <span class="scatterplot">
    <ScatterplotDetailed gps={carData} sel_minute={sel_minute} />
    </span>
    <Barchart stopData={carStops} slider_value={sel_minute}/>
    </div>
{/if}
