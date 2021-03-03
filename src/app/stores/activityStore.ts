import { Activity } from './../models/activity';
import {makeAutoObservable, runInAction} from "mobx"
import agent from '../api/agent';
import {v4 as uuid} from 'uuid';


export default class ActivityStore {
  
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingIntial = false;
    
    constructor(){
        makeAutoObservable(this)
    }
get activityByDate(){
    return Array.from(this.activityRegistry.values())
    .sort((a, b)=> Date.parse(a.date) - Date.parse(b.date));
}
    loadActivities = async ()=>{
        this.loadingIntial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction(()=>{
                activities.forEach(activity => {
                    this.setActivity(activity);
                    this.loadingIntial = false;
                  });
            })
        } catch (error) {
            console.log(error)
            runInAction(()=>{
                this.loadingIntial = false;
            })
            
        }

    }

    loadActivity = async (id:string) =>{
        
        let activity = this.getActivity(id);
       
        if (activity) {
            this.selectedActivity = activity;
            return activity
        }else{
            this.loadingIntial = true;
            try {
                
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                   runInAction(()=>{  
                    this.selectedActivity = activity;
                   }) 
                  
                    this.setLoadingIntial(false);
                return activity;

            } catch (error) {
                
                console.log(error);
                this.setLoadingIntial(false);
            }
        }
    }
    private setLoadingIntial = (state: boolean) =>{
        this.loadingIntial = state
    }
    private setActivity = (activity: Activity) =>{
               activity.date = activity.date.split('T')[0];
               this.activityRegistry.set(activity.id, activity);
    }
   private getActivity = (id:string) =>{
    return this.activityRegistry.get(id);
   }
 
 
  
  createActivity = async (activity:Activity) =>{
      this.loading = true;
     
       try {
         await agent.Activities.create(activity);
         runInAction(()=>{
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.loading = false;
         }) 
       } catch (error) {
           console.log(error);
           runInAction(()=>{
               this.loading = false;
           })
       }
       
  }
   updateActivity = async (activity: Activity)=>{
       this.loading = true;
       try {
           await agent.Activities.update(activity);
         runInAction(()=>{
            //this.activities = [...this.activities.filter(a=> a.id !== activity.id), activity];
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.loading =false;
         })      
         
       } catch (error) {
          runInAction(()=>{
              this.loading = false;
              this.editMode = false;
          })
       }
   }

   deleteActivity = async (id:string)=>{
       this.loading= true;
       try {
           await agent.Activities.delete(id);
           runInAction(()=>{
            //this.activities = [...this.activities.filter(a=> a.id !== id)];
            this.activityRegistry.delete(id);
            this.loading = false;
           })
       } catch (error) {
        console.log(error)
        this.loading = false
       }
   }
   setEditMode = (state:boolean)=>{
       this.editMode = state;
   }

}