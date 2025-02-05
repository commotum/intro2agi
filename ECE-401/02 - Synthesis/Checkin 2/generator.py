import os
import random
import uuid

TEMPLATE = f'''import type {{ P5Task }} from './types'
import p5 from 'p5'

export const T_circle: P5Task = {{
  width: 512,
  height: 512,
  draw: (p: p5) => {{
    // Set white background
    p.background(255)
    
    // Draw a black circle centered at (x,y) with diameter 'size'
    // p.circle(x, y, d)
    p.fill(0)
    p.circle({{x}}, {{y}}, {{size}})
  }}
}}
'''

def generate_circle_tasks(num_tasks: int, output_dir: str, 
                        min_size: int = 50, max_size: int = 200,
                        min_pos: int = -256, max_pos: int = 256):
    """
    Generate multiple circle task files with random parameters
    
    Args:
        num_tasks: Number of task files to generate
        output_dir: Directory where files will be created
        min_size: Minimum circle diameter
        max_size: Maximum circle diameter
        min_pos: Minimum position coordinate
        max_pos: Maximum position coordinate
    """
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    for _ in range(num_tasks):
        # Generate random parameters
        x = random.randint(min_pos, max_pos)
        y = random.randint(min_pos, max_pos)
        size = random.randint(min_size, max_size)
        
        # Generate filename based on circle parameters
        filename = f"T_circle_X{x}Y{y}D{size}.tsx"
        filepath = os.path.join(output_dir, filename)
        
        # Create file with the template
        with open(filepath, 'w') as f:
            # Use string replacement instead of format
            content = TEMPLATE.replace('{x}', str(x))\
                             .replace('{y}', str(y))\
                             .replace('{size}', str(size))
            f.write(content)
        
        print(f"Created {filename}")

# Example usage
if __name__ == "__main__":
    generate_circle_tasks(
        num_tasks=100,  # Generate 5 files
        output_dir=os.path.dirname(os.path.abspath(__file__)),  # Current directory
        min_size=32,
        max_size=128,
        min_pos=-256,  # Half of canvas width/height
        max_pos=256
    )