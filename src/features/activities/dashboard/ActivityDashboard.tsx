import React from 'react'
import {Grid} from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityList from './ActivityList'
import ActivityDetials from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
interface Props{
    activities : Activity[];
    selectActivity : (id:string) => void;
    selectedActivity?: Activity;
    cancelSelectActivity: ()=> void;
    editMode : boolean;
    openForm: (id:string) => void;
    closeForm: ()=>void;
    createOrEditActivity : (activity: Activity)=> void;
    deleteActivity: (id:string) => void;
}
export default function ActivityDashboard({activities,
     selectedActivity, cancelSelectActivity,
      selectActivity, editMode,
      openForm,
      closeForm, 
      createOrEditActivity,
      deleteActivity} : Props){
    return (
        <div>
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} 
                selectActivity={selectActivity}
                deleteActivity={deleteActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetials 
                activity={selectedActivity}
                cancelSelectActivity={cancelSelectActivity}
                openForm ={openForm}
               />
                 }
                { editMode &&
                 <ActivityForm 
                 closeForm={closeForm}
                  activity={selectedActivity}
                  createOrEditActivity={createOrEditActivity}
                  />
                 }
            </Grid.Column>
        </Grid>
        </div>
    )
}