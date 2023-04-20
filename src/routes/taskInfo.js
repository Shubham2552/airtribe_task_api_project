const taskRoutes = require('express').Router();
const tasksData = require('../tasks.json');
const validator = require('../helpers/validator');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");

taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

//Route to fetch all tasks
taskRoutes.get('/', (req, res) => {
  tasksData.tasks.sort(function (a, b) {
    var keyA = a.priority,
      keyB = b.priority;
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  res.status(200);
  res.send(tasksData);
});


//Route to fetch task with task id
taskRoutes.get('/:tasksId', (req, res) => {
  let tasks = tasksData.tasks;
  let taskIdPassed = req.params.tasksId;
  let result = tasks.filter(val => val.taskId == taskIdPassed);

  res.status(200);
  res.send(result);
});

//route to post a new task
taskRoutes.post('/', (req, res) => {
  const tasksDetails = req.body
  // console.log(tasksDetails);
  let writePath = path.join(__dirname, '..', 'tasks.json');
  if (validator.validateTaskInfo(tasksDetails, tasksData).status) {
    let tasksDataModified = JSON.parse(JSON.stringify(tasksData));
    tasksDataModified.tasks.push(tasksDetails);
    fs.writeFileSync(writePath, JSON.stringify(tasksDataModified), { encoding: 'utf8', flag: 'w' });
    res.status(200);
    res.json(validator.validateTaskInfo(tasksDetails, tasksData));
  } else {
    res.status(400);
    res.json(validator.validateTaskInfo(tasksDetails, tasksData))
  }
});

//Route to delete task with specific id
taskRoutes.delete('/:tasksId', (req, res) => {
  let writePath = path.join(__dirname, '..', 'tasks.json');

  let taskDataModified = JSON.parse(JSON.stringify(tasksData));
  let taskIdPassed = req.params.tasksId;
  taskDataModified.tasks = taskDataModified.tasks.filter(function (obj) {
    return obj.taskId != taskIdPassed;
  });

  fs.writeFileSync(writePath, JSON.stringify(taskDataModified), { flag: 'w' });
  res.status(200);
  res.send("Successfully deleted task with id " + taskIdPassed);
})

//Route to update task with id
taskRoutes.put('/:tasksId', (req, res) => {
  const tasksDetails = req.body;
  let taskIdPassed = req.params.tasksId;
  console.log("1"+tasksData.tasks[0].description+taskIdPassed);
  // console.log("2"+{...tasksDetails});
  res.send("Done");
  let writePath = path.join(__dirname, '..', 'tasks.json');
  if (validator.validateTaskInfo(        {
    "taskId":taskIdPassed,
    "title": tasksDetails.title,
    "description": tasksDetails.description,
    "flag": tasksDetails.flag,
    "priority": tasksDetails.priority
}, tasksData).status) {
    let tasksDataModified = JSON.parse(JSON.stringify(tasksData));
    console.log("2"+tasksDataModified.tasks[0].taskId);
  //   // tasksDataModified.tasks.push(tasksDetails);
  var i;
    for(let i in tasksDataModified.tasks){
      if(tasksDataModified.tasks[i].taskId==taskIdPassed){
        console.log(tasksDataModified.tasks[i]);
        tasksDataModified.tasks[i].title=tasksDetails.title;
        tasksDataModified.tasks[i].description=tasksDetails.description;
        tasksDataModified.tasks[i].flag=tasksDetails.flag;
        tasksDataModified.tasks[i].priority=tasksDetails.priority;

      }
      console.log(tasksDataModified.tasks[i]);
      
    }
    fs.writeFileSync(writePath, JSON.stringify(tasksDataModified), { encoding: 'utf8', flag: 'w' });
    res.status(200);
  //   res.json(validator.validateTaskInfo(tasksDetails, tasksData));
  } else {
    res.status(400);
  //   res.json(validator.validateTaskInfo(tasksDetails, tasksData))
  }
})
module.exports = taskRoutes;