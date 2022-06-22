import React from 'react';

/* Objective: Set up task for participants and game sequence to be completed.
    Additionally, calling the Game component to play each game in the sequence.
*/

class Task extends React.Component {
    constructor(props){
        super(props);
        // T-A-1 TODO: Create unique task id
    }

    // T-A-2 TODO: Call/create sequence of games (list of start states w/ game ids)
    // T-A-3 TODO: Conduct game for each start state
    // T-A-4 TODO: Save necessary game data
    // T-A-5 TODO: Export and save task data (JSON -> MongoDB)
    // T-A-6 TODO: Give player redeemable code from pre-made list of codes

    // T-B-1 TODO: Create UI for pre-start app layout

    // T-C-1 TODO: Redeemable code isn't working
        // Backup code, if issued code hasn't been redeemed
    // T-C-2 TODO: Game won't start/Game issues

    // T-D-1 TODO: Send notification when new task is created (i.e. when a participant logs on)
    // T-D-2 TODO: Log time taken for completing the task
    
    render(){
      return(
        <div className="Task">
            <h2>Task</h2>
        </div>
      )
    }

}

export default Task
