<script>
    // Import required functions
    import { json } from "d3-fetch";
    import { onMount } from "svelte";
    import Scatterplot from "./Scatterplot.svelte";
    let selected = {text:"", carId:0};


    // Load data from websites
    let gps_data = null;
    let poi_data;
    let stop_data = null;
    onMount(async () => {
        gps_data = await json("https://vda-lab.github.io/assets/vast2021_gps_coordinates.json");
        poi_data = await json("https://vda-lab.github.io/assets/vast2021_businesses.json");
        stop_data = await json("https://vda-lab.github.io/assets/vast2021_carstops.json");
        console.log(gps_data);
    });

    // Create array for select car options:
    let options = [{text:"", carId:0}];
    let carString = "Car ";
    for(let i = 1; i<36; i++){
        let sel_temp = {text:carString.concat(i.toString()),
                        carId:i};
        options.push(sel_temp);
    };
    options.push({text:carString.concat("101"), carId:101});
    options.push({text:carString.concat("104"), carId:104});
    options.push({text:carString.concat("105"), carId:105});
    options.push({text:carString.concat("106"), carId:106});
    options.push({text:carString.concat("107"), carId:107});
    


</script>

<style>
    .row {
        display: flex;
        align-items: center;
        justify-content: start;
        flex-wrap: wrap;
    }
    .row p {
        margin-right: 5px;
    }
</style>


<h1>Alfonso Larumbe Fernández - KU Leuven - q1601565</h1>
<h2>Overview</h2>
{#if !stop_data}
    <p>Loading the data, please wait...</p>
{:else}
    <div class="row">
        <p>Select car to highlight: </p>
        <select bind:value={selected}>
            {#each options as option}
                <option value={option}>
                    {option.text}
                </option>
                
            {/each}
        </select>
    </div>
    {#if selected.carId}
        <p>Go to <a href={selected.carId}>details</a> for car {selected.carId}</p>
    {/if}
    
    <Scatterplot gps={gps_data} poi={poi_data} sel_car={selected.carId}/>
{/if}

