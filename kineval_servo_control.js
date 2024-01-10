
/*-- |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/|

    KinEval | Kinematic Evaluator | arm servo control

    Implementation of robot kinematics, control, decision making, and dynamics 
        in HTML5/JavaScript and threejs
     
    @author ohseejay / https://github.com/ohseejay / https://bitbucket.org/ohseejay

    Chad Jenkins
    Laboratory for Perception RObotics and Grounded REasoning Systems
    University of Michigan

    License: Creative Commons 3.0 BY-SA

|\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| --*/




kineval.setpointDanceSequence = function execute_setpoints() {

    // if update not requested, exit routine
    if (!kineval.params.update_pd_dance) return; 
    // console.log('Set dance funtion called')
    // // STENCIL: implement FSM to cycle through dance pose setpoints
    // // Make Pose for kinval.params.pose
    // var q_robot_config = [
    //     robot.origin.xyz[0],
    //     robot.origin.xyz[1],
    //     robot.origin.xyz[2],
    //     robot.origin.rpy[0],
    //     robot.origin.rpy[1],
    //     robot.origin.rpy[2]
    // ];
    // for (x in robot.joints) {
    //     if (kineval.params.pose[x] == undefined){
    //         q_robot_config = q_robot_config.concat(0)
    //     } else{
    //         q_robot_config = q_robot_config.concat(kineval.params.pose[x]);
    //     }
    //     // q_names[x] = q_robot_config.length;
    //     // q_robot_config = q_robot_config.concat(robot.joints[x].angle);
    // }
    // console.log(q_robot_config.length)
    // console.log(q_robot_config)
    // console.log(kineval.params.pose)

    // // check if the pose is in collition
    // if (kineval.poseIsCollision(q_robot_config) == false){
    //     console.log("All good")
    //     for (x in robot.joints){
    //         if (kineval.params.pose[x]== undefined){
    //             kineval.params.setpoint_target[x] = 0
    //         } else{
    //             kineval.params.setpoint_target[x] = kineval.params.pose[x]
    //         }
    //     }
    // }else{
    //     console.log('Pose is in Collision')
    // }

    for (x in robot.joints){
        if (kineval.params.pose[x]== undefined){
            kineval.params.setpoint_target[x] = 0
        } else{
            kineval.params.setpoint_target[x] = kineval.params.pose[x]
        }
    }
}

kineval.robotArmControllerSetpoint = function robot_pd_control () {

    // if update not requested, exit routine
    if ((!kineval.params.update_pd)&&(!kineval.params.persist_pd)) return; 

    kineval.params.update_pd = false; // if update requested, clear request and process setpoint control
    console.log('Control Update Called.')
    // STENCIL: implement P servo controller over joints
    for (joint in robot.joints) {

        desired_angle = kineval.params.setpoint_target[joint];
        current_angle = robot.joints[joint].angle;
        // Remember that servo_gains is a object.
        servo_gains = robot.joints[joint].servo;
        control_req = servo_gains.p_gain * ( desired_angle - current_angle );
        robot.joints[joint].control = control_req;
    }

}

kineval.setpointClockMovement = function execute_clock() {

    // if update not requested, exit routine
    if (!kineval.params.update_pd_clock) return; 

    var curdate = new Date();
    for (x in robot.joints) {
        kineval.params.setpoint_target[x] = curdate.getSeconds()/60*2*Math.PI;
    }
}