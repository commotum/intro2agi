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
    
    // Draw black circle in the middle
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
        x = random.uniform(min_pos, max_pos)
        y = random.uniform(min_pos, max_pos)
        size = random.uniform(min_size, max_size)
        
        # Generate unique filename
        filename = f"T_circle_{str(uuid.uuid4())[:8]}.ts"
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
        num_tasks=10000,  # Generate 5 files
        output_dir=os.path.dirname(os.path.abspath(__file__)),  # Current directory
        min_size=32,
        max_size=256,
        min_pos=-256,  # Half of canvas width/height
        max_pos=256
    )