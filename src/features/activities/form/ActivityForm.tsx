import React, {ChangeEvent, useState } from 'react';
import { Form, Segment,Button } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
    closeForm:()=> void;
    activity: Activity | undefined;
    createOrEditActivity: (activity: Activity)=>void;
}
export default function ActivityForm({closeForm, 
    activity: selectedActivity,
    createOrEditActivity} : Props){
   
   
    const intialState = selectedActivity ?? {
    id: '',      
    title: '',
    date: '',
    description:'',
    category: '',
    city: '',
    venue: '',
    };

    const [activity, setActivity] = useState(intialState);

    const handleSubmit = ()=>{  
        createOrEditActivity(activity);
    }

    const handleInputChange = (event : ChangeEvent<HTMLInputElement| HTMLTextAreaElement>)=>{
        const {name, value } = event.target;
        //console.log(name + value)
        setActivity({...activity, [name] : value});
    }
    return (
        <div>
    <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete='off'>
            <Form.Input placeholder='Title' value={activity.title}
             name='title'
             onChange={(event) => handleInputChange(event)}/>
            <Form.TextArea placeholder='Description' value={activity.description}
             name='description'
             onChange={(event) => handleInputChange(event)}/>
            <Form.Input placeholder='Category' value={activity.category}
             onChange={(event) => handleInputChange(event)} name='category'/>
            <Form.Input type='date' placeholder='Date' value={activity.date}
            onChange={(event) => handleInputChange(event)} name='date'/>
            <Form.Input placeholder='City'  value={activity.city}
            onChange={(event) => handleInputChange(event)} name='city'/>
            <Form.Input placeholder='Venue' value={activity.venue}
            onChange={(event) => handleInputChange(event)} name='venue'/>
            <Button floated='right' positive type='submit' content='Submit'/>
            <Button floated='right'  type='button' content='cancel' onClick={closeForm}/>
        </Form>
    </Segment>
    </div>
    );
};

