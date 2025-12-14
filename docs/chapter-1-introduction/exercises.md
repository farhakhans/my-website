---
sidebar_position: 3
title: "Chapter 1: Hands-On Exercises"
---

import Exercise from '@site/src/components/Exercise';

# Chapter 1: Hands-On Exercises

## Learning Objectives

After completing these exercises, you will be able to:
1. Implement basic sensor simulation with noise
2. Apply filtering techniques to reduce sensor uncertainty
3. Design simple control systems for physical tasks
4. Combine multiple sensor readings for improved accuracy

## Exercise 1: Advanced Distance Sensor Simulation

<Exercise
  title="Advanced Distance Sensor Simulation"
  difficulty="beginner"
  description="Extend the basic distance sensor simulation to include more realistic sensor characteristics: variable noise levels based on distance, sensor range limitations, and occasional outliers (sensor malfunctions)."
>

### Implementation
```python
import random
import math

class AdvancedDistanceSensor:
    def __init__(self, max_range=10.0, min_range=0.1, outlier_probability=0.05):
        self.max_range = max_range
        self.min_range = min_range
        self.outlier_probability = outlier_probability

    def measure_distance(self, target_x, target_y, sensor_x=0, sensor_y=0):
        """
        Simulate a distance sensor with realistic characteristics
        """
        # Calculate true distance
        true_distance = math.sqrt((target_x - sensor_x)**2 + (target_y - sensor_y)**2)

        # Check if target is within sensor range
        if true_distance > self.max_range:
            return self.max_range + random.uniform(0, 0.1), true_distance  # Return max range + noise
        elif true_distance < self.min_range:
            return self.min_range - random.uniform(0, 0.05), true_distance  # Return min range - noise

        # Calculate noise based on distance (farther = more noise)
        base_noise_level = 0.05
        distance_factor = true_distance / self.max_range
        noise_level = base_noise_level * (1 + distance_factor)

        # Add noise to the measurement
        noise = random.uniform(-noise_level, noise_level) * true_distance
        measured_distance = true_distance + noise

        # Occasionally add outliers
        if random.random() < self.outlier_probability:
            # Add a large error to simulate sensor malfunction
            outlier = random.uniform(-1.0, 1.0) * true_distance
            measured_distance += outlier

        return measured_distance, true_distance

# Test your implementation
sensor = AdvancedDistanceSensor(max_range=5.0)
for i in range(10):
    measured, actual = sensor.measure_distance(3.0, 4.0)  # Should be 5.0 units away
    print(f"Measurement {i+1}: {measured:.2f}, Actual: {actual:.2f}, Error: {abs(measured-actual):.2f}")
```

### Expected Outcome
Your implementation should show that measurements have higher noise at greater distances and occasionally include outliers that represent sensor malfunctions.

</Exercise>

### Discussion Questions
1. How does distance-dependent noise affect system performance?
2. How would you design a system to detect and handle sensor outliers?

## Exercise 2: Kalman Filter Implementation

<Exercise
  title="Kalman Filter Implementation"
  difficulty="intermediate"
  description="Implement a simple Kalman filter to improve position estimates from noisy sensor readings. Kalman filters are more sophisticated than simple moving averages and take into account both sensor noise and system dynamics."
>

### Implementation
```python
class KalmanFilter1D:
    def __init__(self, initial_state=0, initial_uncertainty=1.0, process_noise=0.1, measurement_noise=0.5):
        self.state = initial_state  # Estimated state (e.g., position)
        self.uncertainty = initial_uncertainty  # Uncertainty in the estimate
        self.process_noise = process_noise  # Noise in the system model
        self.measurement_noise = measurement_noise  # Noise in measurements

    def predict(self, dt=1.0):
        """
        Predict the next state based on system dynamics
        For this simple example, assume the system doesn't change (constant velocity = 0)
        """
        # For a constant system, state doesn't change
        # Uncertainty increases due to process noise
        self.uncertainty += self.process_noise

    def update(self, measurement):
        """
        Update the state estimate based on a new measurement
        """
        # Calculate Kalman gain
        kalman_gain = self.uncertainty / (self.uncertainty + self.measurement_noise)

        # Update state estimate
        self.state = self.state + kalman_gain * (measurement - self.state)

        # Update uncertainty
        self.uncertainty = (1 - kalman_gain) * self.uncertainty

# Test your Kalman filter
kf = KalmanFilter1D(initial_state=0, initial_uncertainty=1.0, process_noise=0.1, measurement_noise=0.5)

true_position = 10.0  # True position we're trying to estimate
print("Step\tMeasurement\tKalman Estimate\tError")
for step in range(20):
    # Simulate noisy measurement
    measurement = true_position + random.gauss(0, 0.5)  # Add Gaussian noise

    # Predict and update
    kf.predict()
    kf.update(measurement)

    error = abs(kf.state - true_position)
    print(f"{step+1}\t{measurement:.2f}\t\t{kf.state:.2f}\t\t{error:.2f}")
```

### Expected Outcome
The Kalman filter estimate should converge toward the true value faster and with less variance than the raw measurements.

</Exercise>

### Discussion Questions
1. How does the Kalman filter balance between trusting measurements and predictions?
2. When would you prefer a Kalman filter over a simple moving average?

## Exercise 3: Multi-Sensor Fusion System

<Exercise
  title="Multi-Sensor Fusion System"
  difficulty="advanced"
  description="Design a system that combines readings from multiple sensors with different characteristics to estimate a physical quantity more accurately than any single sensor could achieve."
>

### Implementation
```python
class MultiSensorFusion:
    def __init__(self):
        # Different sensors with different characteristics
        self.sensors = {
            'lidar': {'variance': 0.01, 'range': (0.1, 100), 'bias': 0.0},
            'camera': {'variance': 0.1, 'range': (0.5, 20), 'bias': 0.05},
            'ultrasonic': {'variance': 0.05, 'range': (0.02, 4), 'bias': -0.02}
        }

    def is_valid_reading(self, reading, sensor_type):
        """Check if the reading is within the sensor's valid range"""
        range_min, range_max = self.sensors[sensor_type]['range']
        return range_min <= reading <= range_max

    def fuse_readings(self, sensor_readings):
        """
        Fuse readings from multiple sensors using weighted average based on reliability
        sensor_readings: dict with format {'sensor_type': reading_value}
        """
        valid_readings = []

        # Process each sensor reading
        for sensor_type, reading in sensor_readings.items():
            if sensor_type not in self.sensors:
                continue

            if not self.is_valid_reading(reading, sensor_type):
                continue

            # Apply bias correction
            corrected_reading = reading - self.sensors[sensor_type]['bias']
            variance = self.sensors[sensor_type]['variance']

            # Calculate weight based on inverse variance (more reliable = higher weight)
            weight = 1.0 / variance

            valid_readings.append((corrected_reading, weight))

        if not valid_readings:
            return None  # No valid readings to fuse

        # Calculate weighted average
        weighted_sum = sum(reading * weight for reading, weight in valid_readings)
        total_weight = sum(weight for reading, weight in valid_readings)

        fused_estimate = weighted_sum / total_weight
        return fused_estimate

# Test your multi-sensor fusion system
fusion_system = MultiSensorFusion()

# Simulate readings from different sensors for the same target
true_distance = 5.0
readings = {
    'lidar': true_distance + random.gauss(0, math.sqrt(0.01)),  # Low noise
    'camera': true_distance + random.gauss(0, math.sqrt(0.1)),  # Higher noise
    'ultrasonic': true_distance + random.gauss(0, math.sqrt(0.05))  # Medium noise
}

print("Sensor Readings:")
for sensor, reading in readings.items():
    print(f"{sensor}: {reading:.2f}")

fused_result = fusion_system.fuse_readings(readings)
print(f"\nFused Estimate: {fused_result:.2f}")
print(f"True Distance: {true_distance:.2f}")
print(f"Error: {abs(fused_result - true_distance):.2f}" if fused_result else "No valid fusion possible")
```

### Expected Outcome
The fused estimate should be more accurate than any individual sensor reading, with the more reliable sensors (lower variance) having greater influence on the final estimate.

</Exercise>

### Discussion Questions
1. How would you handle sensor failures in a real system?
2. What are the computational requirements of multi-sensor fusion in real-time systems?

## Exercise 4: Control System Design Challenge

<Exercise
  title="Control System Design Challenge"
  difficulty="advanced"
  description="Design a control system that moves a simulated robot to a target position while avoiding obstacles. This exercise combines perception (detecting obstacles) and control (moving the robot)."
>

### Implementation
```python
import math

class SimpleRobot:
    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y
        self.max_speed = 1.0  # Units per time step

    def move_towards(self, target_x, target_y, dt=1.0):
        """Move the robot towards the target position"""
        # Calculate direction vector
        dx = target_x - self.x
        dy = target_y - self.y
        distance = math.sqrt(dx**2 + dy**2)

        if distance == 0:
            return  # Already at target

        # Normalize direction and apply max speed limit
        speed = min(self.max_speed, distance)  # Don't overshoot
        self.x += (dx / distance) * speed * dt
        self.y += (dy / distance) * speed * dt

class ObstacleAvoidingController:
    def __init__(self, safe_distance=1.0):
        self.safe_distance = safe_distance

    def find_path_around_obstacle(self, robot_x, robot_y, target_x, target_y, obstacle_x, obstacle_y):
        """
        Simple obstacle avoidance: go around the obstacle
        """
        # Calculate vectors
        to_target = (target_x - robot_x, target_y - robot_y)
        to_obstacle = (obstacle_x - robot_x, obstacle_y - robot_y)

        # Calculate distances
        dist_to_target = math.sqrt(to_target[0]**2 + to_target[1]**2)
        dist_to_obstacle = math.sqrt(to_obstacle[0]**2 + to_obstacle[1]**2)

        # If obstacle is not on the path to target, go directly
        if dist_to_obstacle > dist_to_target or dist_to_obstacle > self.safe_distance:
            return target_x, target_y

        # Simple avoidance: move perpendicularly around the obstacle
        # Calculate perpendicular direction
        perp_dir = (-to_obstacle[1], to_obstacle[0])
        perp_length = math.sqrt(perp_dir[0]**2 + perp_dir[1]**2)

        if perp_length > 0:
            perp_dir = (perp_dir[0]/perp_length, perp_dir[1]/perp_length)

        # Choose the direction that gets us closer to the target
        checkpoint_x = obstacle_x + perp_dir[0] * self.safe_distance * 1.5
        checkpoint_y = obstacle_y + perp_dir[1] * self.safe_distance * 1.5

        return checkpoint_x, checkpoint_y

def simulate_robot_control():
    robot = SimpleRobot(x=0, y=0)
    controller = ObstacleAvoidingController(safe_distance=1.5)

    target_x, target_y = 10, 10
    obstacle_x, obstacle_y = 5, 5

    print("Step\tRobot X\tRobot Y\tTarget X\tTarget Y\tDistance to Target")

    for step in range(50):
        # Calculate distance to target
        dist_to_target = math.sqrt((robot.x - target_x)**2 + (robot.y - target_y)**2)

        print(f"{step+1}\t{robot.x:.2f}\t{robot.y:.2f}\t{target_x:.2f}\t\t{target_y:.2f}\t\t{dist_to_target:.2f}")

        # Check if we're close enough to target
        if dist_to_target < 0.5:
            print(f"Target reached in {step+1} steps!")
            break

        # Determine next move (with obstacle avoidance)
        if math.sqrt((robot.x - obstacle_x)**2 + (robot.y - obstacle_y)**2) < 2.0:
            # Near obstacle, use avoidance
            next_x, next_y = controller.find_path_around_obstacle(
                robot.x, robot.y, target_x, target_y, obstacle_x, obstacle_y
            )
        else:
            # No obstacle nearby, go directly to target
            next_x, next_y = target_x, target_y

        robot.move_towards(next_x, next_y)

# Run the simulation
simulate_robot_control()
```

### Expected Outcome
The robot should navigate around the obstacle to reach the target, demonstrating basic perception-action integration.

</Exercise>

### Discussion Questions
1. How would you improve this simple obstacle avoidance algorithm?
2. What are the limitations of this approach in complex environments?

## Summary

These exercises have given you hands-on experience with fundamental Physical AI concepts:

1. **Sensor Simulation**: Modeling realistic sensor behavior with noise and limitations
2. **State Estimation**: Using filtering techniques to improve sensor readings
3. **Sensor Fusion**: Combining multiple sensors for better accuracy
4. **Control Systems**: Moving from perception to action

Each exercise builds on the previous ones, showing how Physical AI systems integrate multiple components to operate effectively in the physical world.

## Resources for Further Learning

- [Probabilistic Robotics](https://mitpress.mit.edu/books/probabilistic-robotics) by Thrun, Burgard, and Fox
- [Introduction to Autonomous Robots](https://github.com/Introduction-to-Autonomous-Robots/Introduction-to-Autonomous-Robots) by Dudek and Jenkin
- [Modern Robotics: Mechanics, Planning, and Control](http://modernrobotics.org/) by Lynch and Park