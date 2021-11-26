# Requirements
---

#### Student Perspective
- [ ] demand an event on topics provided
- [ ] list of past events he took part in
- [ ] list of events going to participate in
- [ ] list of all mentors
- [ ] follow a particular mentor
- [ ] follow a fellow student
- [ ] list of mentors following
- [ ] list of suggested events on basis of 
    - past topics demanded
    - mentors he follow
    - students he follow
- [ ] list of rooms <===> list of events

#### Mentor Perpesective
- [ ] create an event manually on his choice of topics
- [ ] list of topics in demand
- [ ] pick a topic and book it as creating a event from it
- [ ] list of scheduled events
- [ ] list of past events

#### Event wise/ Room wise
- [ ] list of students attending the Event
- [ ] mentor of event/ Room

#### Room - Message - ....

- Event
    - id
    - name
    - event_topic_id
    - mentor_id
    - membership


- event_topic
    - id
    - event_id
    - topic_id


- membership/ schedule
    - id
    - Event_id
    - Student_id
    - date

Event Eent_topic topic (M2M)
Student schedule Event (M2M)

student ---following 


#### API requirements
- Topic
    - [post /topic] create a new topic
