<script>
    import meetups from "../Meetups/meetups-store.js"
    import {createEventDispatcher} from "svelte";
    import TextInput from "../UI/TextInput.svelte";
    import Button from "../UI/Button.svelte";
    import Modal from "../UI/modal.svelte"
    import { isEmpty, isValidEmail } from "../../helpers/validation.js"

    export let id = null;

    let title = '';
    let subtitle = '';
    let description = '';
	let imageURL = '';
    let address = '';
	let email = '';

    if (id) {
        const unsubscribe = meetups.subscribe(items => {
        const selectedMeetup = items.find(i => i.id === id)
        title = selectedMeetup.title;
         subtitle = selectedMeetup.subtitle
         description = selectedMeetup.description;
	     imageURL = selectedMeetup.imageURL;
         address = selectedMeetup.address;
	     email = selectedMeetup.contactEmail;
         
        })
        unsubscribe()
 
    }

    
    
    const dispatch= createEventDispatcher();

    $: titleValid = !isEmpty(title);
    $: subtitleValid = !isEmpty(subtitle);
    $: descriptionValid = !isEmpty(description);
    $: imageURLValid = !isEmpty(imageURL);
    $: addressValid = !isEmpty(address);
    $: emailValid = isValidEmail(email);
    $: formIsValid = titleValid && subtitleValid && descriptionValid && imageURLValid
        && addressValid && emailValid;

    function submitForm() {
        const meetupData = {
			title : title,
			subtitle : subtitle,
			description : description,
			imageURL : imageURL,
			address : address,
			contactEmail : email, 
		}
		
        if (id) {
            meetups.updateMeetup(id, meetupData);  
        } else {
            meetups.addMeetup(meetupData);
        }
        dispatch('save' );
    }

    function cancel() {
        dispatch("cancel")
    }   
    
    function deleteMeetup() {
        
        meetups.removeMeetup(id);
        dispatch('save' );
    }

</script>

<style>
	form {
		width:100%;
	}
</style>

<Modal title="Edit Meetup Data" on:cancel>
    <form on:submit|preventDefault={submitForm}>
        <TextInput 
            id="title" type="text" label="Title"
            valid={titleValid} validityMessage="Please enter a valid title." 
            value="{title}" on:input="{event=> title=event.target.value}" 
        />
        <TextInput 
            id="subtitle" type="text" label="Subtitle" 
            valid={subtitleValid} validityMessage="Please enter a valid value."
            value="{subtitle}" on:input="{event=> subtitle=event.target.value}" 
        />
        <TextInput 
            id="address" type="text" label="Address"  
            valid={addressValid} validityMessage="Please enter a valid value."
            value="{address}" on:input="{event=> address=event.target.value}" 
        />
        <TextInput 
            id="imageURL" type="text" label="Image URL" 
            valid={imageURLValid} validityMessage="Please enter a valid value."
            value="{imageURL}" on:input="{event=> imageURL=event.target.value}" 
        />
        <TextInput 
            id="email" type="email" label="Email" 
            valid={emailValid} validityMessage="Please enter a valid email."
            value="{email}" on:input="{event=> email=event.target.value}" 
        />
        <TextInput 
            id="description" controlType="textarea" label="Description" rows="3" 
            valid={descriptionValid} validityMessage="Please enter a valid value."
            value="{description}" on:input="{event=> description=event.target.value}" 
        />
    </form>
        <div slot="footer">
            <Button type="button" mode="outline" on:click={cancel} >Cancel</Button>
            <Button type="button" on:click={submitForm} disabled={!formIsValid} >Save</Button>
            {#if id}
                <Button type="button" on:click={deleteMeetup}>Delete</Button>
            {/if}
        </div>
    
</Modal>