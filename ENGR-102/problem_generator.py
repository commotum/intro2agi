import os  # Module for interacting with the operating system
import random  # Module for generating random numbers or choices

# Directory where the JSON files (tasks) are stored
# This should point to the folder where you keep your ARC tasks in JSON format.
json_dir = "./data"

def generate_url():
    """
    Generates a random URL for an ARC task by:
    1. Listing all JSON files in the specified directory.
    2. Selecting one file randomly.
    3. Extracting the task ID from the file name (without .json extension).
    4. Constructing and returning the URL using the task ID.
    """
    # Step 1: List all files in the data folder ending with .json
    json_files = [f for f in os.listdir(json_dir) if f.endswith(".json")]

    # If no JSON files are found, raise an error
    if not json_files:
        raise FileNotFoundError("No JSON files found in the data directory.")

    # Step 2: Select one file randomly from the list
    selected_file = random.choice(json_files)

    # Step 3: Extract the task ID (file name without extension)
    task_id = os.path.splitext(selected_file)[0]  # Removes ".json"

    # Step 4: Generate the URL using the task ID
    url = f"https://arcprize.org/play?task={task_id}"

    # Return the generated URL
    return url

if __name__ == "__main__":
    """
    The main block of code that runs when this script is executed.
    It:
    1. Calls the generate_url function.
    2. Prints the generated URL to the console.
    3. Handles any errors that might occur, like missing files.
    """
    try:
        # Call the function to generate the URL and display it
        print("Generated URL:", generate_url())
    except Exception as e:
        # Print an error message if something goes wrong
        print("Error:", e)

