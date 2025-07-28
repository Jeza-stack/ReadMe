import json
import re

def fix_json_quotes():
    # Read the file
    with open('src/data/readme-data.json', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace smart quotes with escaped regular quotes
    content = content.replace('"', '\\"')  # Left smart quote
    content = content.replace('"', '\\"')  # Right smart quote
    content = content.replace(''', "\\'")  # Left smart single quote
    content = content.replace(''', "\\'")  # Right smart single quote
    
    # Write back
    with open('src/data/readme-data.json', 'w', encoding='utf-8') as f:
        f.write(content)
    
    # Test if JSON is now valid
    try:
        with open('src/data/readme-data.json', 'r') as f:
            data = json.load(f)
        print('✅ JSON is now valid!')
        print(f'Loaded {len(data.get("courses", []))} courses successfully')
        return True
    except json.JSONDecodeError as e:
        print(f'❌ JSON Error still exists: {e}')
        print(f'Line: {e.lineno}, Column: {e.colno}')
        return False

if __name__ == "__main__":
    fix_json_quotes()