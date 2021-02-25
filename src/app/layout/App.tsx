import React,{ useEffect, useState} from 'react';
import './styles.css';
import {Activity} from '../models/activity'
import NavBar from '../layout/NavBar'
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
 const App = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    agent.Activities.list().then(response =>{
       let activities : Activity[] = [];
       response.forEach(activity => {
         activity.date = activity.date.split('T')[0];
         activities.push(activity);
       })
       setActivities(activities)
       setLoading(false);
    })
  },[]);
 
 const handleSelectedActivity = (id : string | undefined) =>{
        handleFormClose()
        const activity = activities.find(activity => activity.id === id);
        setSelectedActivity(activity);
  }
  const handleCancelSelectActivity = () =>{
    
    console.log("handleCancelActivity");
    setSelectedActivity(undefined);
    
  }
  
  
  function handleFormOpen(id?:string){
   
    id ? handleSelectedActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  const handleFormClose = ()=>{
    setEditMode(false);
  }

  const handleCreateOrEditActivity = (activity: Activity)=>{
     activity.id ? 
     setActivities([...activities.filter(a => a.id !== activity.id), activity])
     : setActivities([...activities, {...activity, id:uuid()}]);
     setEditMode(false);
     setSelectedActivity(activity);
     agent.Activities.create(activity);
  }
  const handleDeleteActivity = (id:string) =>{
     setActivities([...activities.filter(x=>x.id !== id)]);
  }

  if(loading){
    return <LoadingComponent content='Loading the App' />
  }
  return (
   <>
    <NavBar handleFormOpen={handleFormOpen}/>
   
    <Container style={{marginTop:'7rem'}}>
         <ActivityDashboard 
          activities={activities} 
          selectActivity={handleSelectedActivity} 
          selectedActivity={selectedActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEditActivity={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}/>
    </Container>
    </> 
  );
  }


export default App;
