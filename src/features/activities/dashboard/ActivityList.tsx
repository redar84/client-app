import React from 'react';
import {Item, Button, Segment, Label} from 'semantic-ui-react'

import {Activity} from '../../../app/models/activity'
interface Props{
    activities : Activity[];
    selectActivity: (id:string) => void;
    deleteActivity: (id:string) => void;
}
export default function ActivityList({activities, selectActivity,  deleteActivity} : Props){
    return (
<div>
        <Segment>
            <Item.Group divided>
            {activities.map((activity) => { 
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
                                        onClick={()=> selectActivity(activity.id)} />
                                <Button onClick={()=> deleteActivity(activity.id)}
                                        content='Delete' floated='right' color='red'/>
                                <Label  basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                      </Item>
                })}
            </Item.Group>
        </Segment>
        </div>
    );
};

