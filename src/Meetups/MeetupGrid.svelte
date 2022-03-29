<script>
    import {createEventDispatcher} from "svelte"
    import MeetupItem from "./MeetupItem.svelte"
    import Button from "../UI/Button.svelte"
    import MeetupFilter from "./MeetupFilter.svelte"
    import { scale } from "svelte/transition"
    import {flip} from "svelte/animate"
    
    export let meetups;

    
    let favsOnly=false;

    $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups;

    function setFilter(event) {
        if (event.detail === 1) {
            favsOnly=true;
        } else {
            favsOnly=false;
        }
    }
    const dispatch = createEventDispatcher();
</script>

<style>
    #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    }

    #meetup-controls {
        margin: 1rem;
        display: flex;
        justify-content: space-between;
    }

    @media (min-width: 768px) {
    #meetups {
        grid-template-columns: repeat(2, 1fr);
    }
    }
</style>

<section id="meetup-controls">
    <MeetupFilter on:select={setFilter} />
    <Button on:click={() => dispatch('add')}>New Meetup</Button>
</section>
<section id="meetups">
	{#each filteredMeetups as meetup (meetup.id)}
        <div transition:scale animate:flip={{duration:400}}>
            <MeetupItem 
                id={meetup.id}
                subtitle={meetup.subtitle}
                title = {meetup.title}
                description = {meetup.description}
                imageURL = {meetup.imageURL}
                address = {meetup.address}
                email={meetup.contactEmail}
                isFav = {meetup.isFavorite}
                on:showDetails
                on:edit />            
        </div>
	{/each}
</section>