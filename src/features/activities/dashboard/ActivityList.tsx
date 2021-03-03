import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import {Item, Button, Segment, Label, Ref} from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityList(){
    const[target, setTarget]  = useState('');
    const handleActivityDelete = (e:SyntheticEvent<HTMLButtonElement>, id: string)=>{
     setTarget(e.currentTarget.name)
     deleteActivity(id);
    }

    const {activityStore} = useStore();
    const {loading, deleteActivity, activityByDate} = activityStore;
    return (

        <Segment>
            
            <Item.Group divided>
            {activityByDate.map((activity) => { 
                 return <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' 
                                        as={Link} to={`activities/${activity.id}`} />
                                <Button onClick={(e)=> handleActivityDelete(e,activity.id)}
                                        content='Delete' floated='right' color='red'
                                        loading={loading && target === activity.id}
                                        name={activity.id}/>
                                <Label  basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                      </Item>
                })}
            </Item.Group>
        </Segment>
 
    );
}
)

