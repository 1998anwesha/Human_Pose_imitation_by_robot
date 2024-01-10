
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
    
    for (x in robot.joints){
        if (kineval.params.pose[x]== undefined){
            kineval.params.setpoint_target[x] = 0
        } else{
            // angles received from pose.py are present in kineval.params.pose
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
