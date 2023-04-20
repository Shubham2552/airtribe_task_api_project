class validator {
    static validateTaskInfo(tasksInfo, tasksData) {
      // console.log(tasksInfo);
      if(tasksInfo.hasOwnProperty("taskId") &&
        tasksInfo.hasOwnProperty("title") &&
        tasksInfo.hasOwnProperty("description") &&
        tasksInfo.hasOwnProperty("flag") &&
        tasksInfo.hasOwnProperty("priority") && this.validateUniqueTaskId(tasksInfo, tasksData)) {
          return {
            "status": true,
            "message": "task has been added"
          };
        }
        if(!this.validateUniqueTaskId(tasksInfo, tasksData)){
          return {
            "status": false,
            "message": "task Id has to be unique"
          };
        }
        return {
          "status": false,
          "message": "task Info is malformed please provide all the properties"
        }
    }
  
    static validateUniqueTaskId(tasksInfo, tasksData) {
      let valueFound = tasksData.tasks.some(el => el.taskId === tasksInfo.taskId);
      if(valueFound) return false;
      return true;
    }
  
    // static validateAverageRating(averageRating) {
    //   if(averageRating.hasOwnProperty("rating") && this.isInt(averageRating.rating)) {
    //     return true;
    //   }
    //   return false;
    // }
  
    static isInt(value) {
      return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
    }
  }
  
  module.exports = validator;