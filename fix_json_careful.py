import json
import re

def fix_json_smart_quotes():
    # Read the file
    with open('src/data/readme-data.json', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # More careful replacement - only replace smart quotes within string values
    # This regex finds content within double quotes and replaces smart quotes only there
    def replace_smart_quotes_in_string(match):
        string_content = match.group(1)
        # Replace smart quotes with escaped regular quotes
        string_content = string_content.replace('"', '\\"')
        string_content = string_content.replace('"', '\\"')
        string_content = string_content.replace(''', "'")
        string_content = string_content.replace(''', "'")
        return f'"{string_content}"'
    
    # Find all JSON string values and fix smart quotes within them
    # This pattern matches: "any content including newlines"
    pattern = r'"((?:[^"\\]|\\.)*)(?<!\\)"'
    content = re.sub(pattern, replace_smart_quotes_in_string, content, flags=re.DOTALL)
    
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
    fix_json_smart_quotes()