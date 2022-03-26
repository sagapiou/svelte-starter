<script>
	import Header from './UI/Header.svelte';
	import MeetupGrid from "./Meetups/MeetupGrid.svelte";
	import EditMeetup from "./Meetups/EditMeetup.svelte";
	import Button from './UI/Button.svelte';
	import meetups from "./Meetups/meetups-store.js"
	import MeetupDetail from "./Meetups/MeetupDetail.svelte";

	
	let EditMode;
	let editedId;
	let page = 'overview';
	let pageData = {};

	function savedMeetup() {
		EditMode = null;
		editedId = null;
	}


	function cancelEdit () {
		EditMode=null;
		editedId = null;
	}
	
	function details(event) {
		page='details';
		pageData.id = event.detail
		console.log(page, pageData)
		
	}

	function startEdit(event) {
		EditMode="edit";
		editedId = event.detail;
	}
</script>

<style>
    main {
		margin-top: 5rem;
	}	

</style>

<Header />

{#if page==='overview'}
	<main>
		{#if EditMode === 'edit'}
			<EditMeetup id="{editedId}" on:save={savedMeetup} on:cancel={cancelEdit} />
		{/if}
			<MeetupGrid 
				meetups={$meetups} 
					on:showDetails={details} 
					on:edit={startEdit} 
					on:add={() => {EditMode='edit'}}	
				/>
	</main>
{:else if page==='details'}
	<MeetupDetail id={pageData.id} on:close={() => {page='overview'}} />
{/if}