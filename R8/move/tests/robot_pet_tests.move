#[test_only]
module robot_tokenomics::robot_pet_tests;

use robot_tokenomics::robot_pet::{RobotPet, create_robot};
use sui::test_scenario as ts;

#[test]
fun test_create_robot() {
    let admin = @0xA;
    let mut scenario = ts::begin(admin);

    // Create robot
    {
        create_robot(b"TestBot".to_string(), scenario.ctx());
    };

    // Verify robot was created
    scenario.next_tx(admin);
    {
        let robot = scenario.take_shared<RobotPet>();
        assert!(robot.queue_length() == 0);
        assert!(robot.is_admin(admin));
        ts::return_shared(robot);
    };

    scenario.end();
}
