# Joiner Component

Joiner component is created to draw lines between `Slices` and `Device Groups`, `Slices` and `Services`, `Small Cells` and `Devices`.

- Joiner is a dotted line that'll be used to connect various items as shown below:

  1. In Dashboard Screen:

  ![`Joiner Dashboard`](images/joiner-dashboard.png)

  2. In Small cells Screen:

  ![`Joiner Small Cells`](images/joiner-small-cells.png)

  3. In Slices Screen:

  ![`Joiner Slices`](images/joiner-slices.png)

## Developer Information

### Implementation

When the **Joiner Component** is loaded:

- An SVG line will be drawn based on the specs received as the `Input` for the component.
- The specs that are calculated:
  1. Horizontal starting and end points of the line.
  1. Vertical starting and end points of the line.
  1. Type of the line `Dotted` or `Straight`.
- The position of the SVG is kept absolute so that the lines are drawn correctly to connect the HTML elements.
