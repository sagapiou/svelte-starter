import { writable } from "svelte/store";

const meetups = writable([
    {
        id:'m1',
        title : 'coding bootcamp',
        subtitle : 'Learn to code in 2 hours',
        description : 'In this meetup we will have some solidity experts talking',
        imageURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQliMPzlYrPGvTtp8yYQn6IquM3hh0vjKqPfA&usqp=CAU',			
        address : '25 Groper street, Singapore',
        contactEmail : 'saga@test.com',
        isFavorite: false
    },
    {
        id:'m2',
        title : 'Swimming Lessons',
        subtitle : 'Let\'s swim all together',
        description : 'We will be swimming with the dolphins',
        imageURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDMwHDJtkHRrpnuJEV-JabbjLnEzHRWGBmcQ&usqp=CAU' ,
        address : '28 Sur road, Singapore',
        contactEmail : 'saga2@test.com',
        isFavorite : false
    }
]);

const customMeetupStore = {
    subscribe : meetups.subscribe,
    addMeetup: (meetupData) => {
        console.log(meetupData)
        const newMeetup = {
			...meetupData,
            id:Math.random.toString(),
			isFavorite : false
		}
       meetups.update((items) => {
            return [newMeetup, ...items];
        });
    },
    toggleFavorite: (id) => {
        meetups.update((items) => {
            const updatedMeetup= {...items.find(m => m.id===id)};
            updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
            const meetupIndex= items.findIndex(m => m.id===id);
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;	
    
        })
    },
    updateMeetup: (id, meetupData) => {
        meetups.update(items => {
            const meetupIndex= items.findIndex(m => m.id===id);
            const updatedMeetup = {...items[meetupIndex], ...meetupData};
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        })
    },
    removeMeetup: (id) => {
        meetups.update(items => {
            return items.filter(i =>  i.id !== id);
        })
    }

};

export default customMeetupStore;