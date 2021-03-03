import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Form, Segment, Button } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  let history = useHistory();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingIntial,
  } = activityStore;
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState({
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => {
        setActivity(activity!);
      });
    } 
    
  }, [id, loadActivity]);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {...activity, id : uuid()}
      createActivity(newActivity).then(()=>{
          history.push(`/activities/${newActivity.id}`);
      });
      
    } else {
      updateActivity(activity).then(()=>{
        history.push(`/activities/${activity.id}`);
      })
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setActivity({ ...activity, [name]: value });
  };
  if (loadingIntial) return <LoadingComponent content="Loading activity...." />;
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={(event) => handleInputChange(event)}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={(event) => handleInputChange(event)}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          onChange={(event) => handleInputChange(event)}
          name="category"
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          onChange={(event) => handleInputChange(event)}
          name="date"
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          onChange={(event) => handleInputChange(event)}
          name="city"
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          onChange={(event) => handleInputChange(event)}
          name="venue"
        />
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          loading={loading}
        />
        <Button as={Link} to={'/activities'} floated="right" type="button" content="cancel" />
      </Form>
    </Segment>
  );
});
