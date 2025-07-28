#!/usr/bin/env python3
import json
import re

def fix_all_json_quotes():
    """Fix all smart quotes and other problematic characters in JSON file"""
    
    with open('src/data/readme-data.json', 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("Original file size:", len(content), "characters")
    
    # Replace smart quotes with regular quotes (but escape them for JSON)
    # Only replace within string values, not structure quotes
    replacements = [
        ('"', '\\"'),    # Left double quote
        ('"', '\\"'),    # Right double quote  
        (''', "'"),      # Left single quote
        (''', "'"),      # Right single quote
        ('—', '-'),      # Em dash
        ('–', '-'),      # En dash
    ]
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    print("After replacements, file size:", len(content), "characters")
    
    # Write the fixed content
    with open('src/data/readme-data.json', 'w', encoding='utf-8') as f:
        f.write(content)
    
    # Test if JSON is valid now
    try:
        with open('src/data/readme-data.json', 'r') as f:
            data = json.load(f)
        print('✅ JSON is now VALID!')
        print(f'Successfully loaded {len(data.get("courses", []))} courses')
        return True
    except json.JSONDecodeError as e:
        print(f'❌ JSON Error still exists: {e}')
        print(f'Line: {e.lineno}, Column: {e.colno}')
        
        # Show the problematic line
        lines = content.split('\n')
        if e.lineno <= len(lines):
            problematic_line = lines[e.lineno-1]
            print(f'Problematic line: {problematic_line[:100]}...')
            if e.colno < len(problematic_line):
                print(' ' * (e.colno-1) + '^')
        return False

if __name__ == "__main__":
    success = fix_all_json_quotes()
    if success:
        print("\n🎉 All JSON issues fixed! The file is now valid.")
    else:
        print("\n⚠️  Some issues remain. Manual intervention may be needed.")