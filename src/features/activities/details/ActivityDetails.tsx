import { observer } from "mobx-react-lite";
import {useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import { Card, Image, Button } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";


export default observer(function ActivityDetails() {
  const {activityStore} = useStore();
  const {selectedActivity: activity, loadActivity,loadingIntial} = activityStore
  const {id} = useParams<{id:string}>();
  useEffect(()=>{
    if(id) loadActivity(id);
    
   },[id, loadActivity]);

  if(loadingIntial || !activity) return <LoadingComponent content='loading....'/>;
  
  return (
   
    <Card fluid>
      <Image  src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
         <Button.Group width='2'>
             <Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit' />
             <Button as={Link} to='/activities' basic color='grey' content='Cancel' />
         </Button.Group>
      </Card.Content>
    </Card>
  
  );
})
