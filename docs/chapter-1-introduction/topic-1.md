---
sidebar_position: 2
title: "Topic 1: Fundamentals of Physical AI Systems"
---

# Fundamentals of Physical AI Systems

## Learning Objectives

After completing this topic, you will be able to:
1. Identify the key components of Physical AI systems
2. Explain the interaction between sensing, perception, and action
3. Understand the role of uncertainty in Physical AI
4. Describe the feedback loop in Physical AI systems

## Introduction

Physical AI systems operate in a fundamentally different environment than traditional AI systems. While digital AI operates on clean, structured data, Physical AI must deal with noisy sensor readings, uncertain state estimates, and the complex dynamics of the physical world. Understanding these fundamental differences is crucial for designing effective Physical AI systems.

## The Physical AI Stack

Physical AI systems typically follow a hierarchical structure:

```
┌─────────────────┐
│   Reasoning     │ ← High-level decision making
├─────────────────┤
│   Planning      │ ← Action planning and optimization
├─────────────────┤
│   Control       │ ← Low-level control of actuators
├─────────────────┤
│   Perception    │ ← Interpretation of sensor data
├─────────────────┤
│    Sensing      │ ← Raw sensor measurements
├─────────────────┤
│   Actuation     │ ← Physical actions in the world
└─────────────────┘
```

Each layer builds upon the ones below it, with information flowing both up and down the stack.

## Sensing and Uncertainty

Sensors provide the only window into the physical world for our AI systems. However, sensor readings are inherently uncertain due to:

- **Noise**: Random variations in sensor readings
- **Bias**: Systematic errors in sensor measurements
- **Limited Field of View**: Sensors only observe part of the environment
- **Temporal Limitations**: Sensors provide readings at discrete time intervals

### Example: Distance Sensor Simulation

Let's implement a simple simulation of a distance sensor with noise:

```python
import random
import math

def simulate_distance_sensor(target_x, target_y, sensor_x=0, sensor_y=0, noise_level=0.1):
    """
    Simulate a distance sensor with noise
    """
    # Calculate true distance
    true_distance = math.sqrt((target_x - sensor_x)**2 + (target_y - sensor_y)**2)

    # Add noise to the measurement
    noise = random.uniform(-noise_level, noise_level) * true_distance
    measured_distance = true_distance + noise

    return measured_distance, true_distance

# Example usage
measured, actual = simulate_distance_sensor(3.0, 4.0)
print(f"Measured: {measured:.2f}, Actual: {actual:.2f}, Error: {abs(measured-actual):.2f}")
```

## Perception: Making Sense of Sensor Data

Perception is the process of interpreting raw sensor data to extract meaningful information about the environment. This involves:

- **State Estimation**: Determining the current state of the system and environment
- **Object Recognition**: Identifying objects and their properties
- **Scene Understanding**: Understanding the relationships between objects
- **Prediction**: Estimating future states based on current observations

### State Estimation Example

Here's a simple example of state estimation using a moving average to filter noisy sensor readings:

```python
class MovingAverageFilter:
    def __init__(self, window_size=5):
        self.window_size = window_size
        self.readings = []

    def update(self, new_reading):
        self.readings.append(new_reading)
        if len(self.readings) > self.window_size:
            self.readings.pop(0)

        return sum(self.readings) / len(self.readings)

# Example usage
filter = MovingAverageFilter(window_size=3)
for i in range(10):
    noisy_reading = 10.0 + random.uniform(-1.0, 1.0)  # True value is ~10.0
    filtered = filter.update(noisy_reading)
    print(f"Reading {i+1}: {noisy_reading:.2f} -> Filtered: {filtered:.2f}")
```

## Control Systems

Control systems translate high-level goals into low-level actuator commands. The most common approach is feedback control, where the system continuously measures its state and adjusts its actions to achieve the desired goal.

### PID Controller Example

A Proportional-Integral-Derivative (PID) controller is a fundamental control algorithm:

```python
class PIDController:
    def __init__(self, kp, ki, kd, setpoint=0):
        self.kp = kp  # Proportional gain
        self.ki = ki  # Integral gain
        self.kd = kd  # Derivative gain
        self.setpoint = setpoint

        self.previous_error = 0
        self.integral = 0

    def update(self, current_value, dt):
        error = self.setpoint - current_value

        # Proportional term
        p_term = self.kp * error

        # Integral term
        self.integral += error * dt
        i_term = self.ki * self.integral

        # Derivative term
        derivative = (error - self.previous_error) / dt
        d_term = self.kd * derivative

        # Store error for next iteration
        self.previous_error = error

        # Calculate output
        output = p_term + i_term + d_term
        return output

# Example usage: controlling a motor to reach a target position
pid = PIDController(kp=1.0, ki=0.1, kd=0.05, setpoint=90.0)  # Target: 90 degrees
current_position = 0.0
dt = 0.1  # Time step

for i in range(100):
    control_signal = pid.update(current_position, dt)
    # Simulate system response (simplified)
    current_position += control_signal * dt * 0.1
    print(f"Step {i+1}: Position: {current_position:.2f}, Control: {control_signal:.2f}")
```

## The Perception-Action Cycle

Physical AI systems operate in a continuous perception-action cycle:

```
┌─────────────────┐
│   Environment   │
└─────────┬───────┘
          │ ← Sensing
          ▼
┌─────────────────┐
│    Sensing      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Perception    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Reasoning/    │
│   Planning      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│    Control      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Actuation     │
└─────────┬───────┘
          │ ← Action
          ▼
┌─────────────────┐
│   Environment   │
└─────────────────┘
```

This cycle repeats continuously, allowing the system to adapt to changes in the environment and achieve its goals despite uncertainty and disturbances.

## Hands-On Exercise

### Exercise 1: Sensor Fusion
Combine readings from multiple sensors to improve state estimation.

**Problem**: You have two distance sensors measuring the same target. Each sensor has different noise characteristics. Implement a simple sensor fusion algorithm that combines both readings to get a more accurate estimate.

**Implementation**:
```python
def sensor_fusion(sensor1_reading, sensor2_reading, sensor1_variance, sensor2_variance):
    """
    Combine two sensor readings using inverse variance weighting
    """
    # Calculate weights based on inverse variance (more reliable sensors get higher weight)
    weight1 = 1.0 / sensor1_variance
    weight2 = 1.0 / sensor2_variance

    # Calculate fused estimate
    fused_estimate = (weight1 * sensor1_reading + weight2 * sensor2_reading) / (weight1 + weight2)

    return fused_estimate

# Example usage
reading1 = 10.2  # Sensor 1 reading
variance1 = 0.5  # Sensor 1 variance (uncertainty)

reading2 = 9.8   # Sensor 2 reading
variance2 = 0.2  # Sensor 2 variance (uncertainty) - more reliable

fused = sensor_fusion(reading1, reading2, variance1, variance2)
print(f"Sensor 1: {reading1}, Sensor 2: {reading2}, Fused: {fused:.2f}")
```

Try running this code with different values for sensor readings and variances. Notice how the fused estimate is closer to the reading from the more reliable sensor (the one with lower variance).

## Summary

In this topic, we've explored the fundamental components of Physical AI systems. We've seen how these systems must handle uncertainty in sensing, interpret sensor data through perception, and use control algorithms to act effectively in the physical world. The perception-action cycle forms the core of all Physical AI systems, enabling them to operate effectively despite the challenges of the physical world.

## Next Steps

In the next section, we'll explore how Physical AI systems handle real-time constraints and the computational challenges that arise when operating in physical environments.