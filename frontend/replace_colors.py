import os
import re

base_dir = '/Users/kishoreabinash2005/Desktop/New one/adler-contracts'
dirs_to_check = [os.path.join(base_dir, 'components'), os.path.join(base_dir, 'app'), os.path.join(base_dir, 'data')]

def process_file(filepath):
    if not (filepath.endswith('.ts') or filepath.endswith('.tsx') or filepath.endswith('.css')): return
    with open(filepath, 'r') as f:
        content = f.read()
    
    orig = content
    # Replace globals.css variables
    content = content.replace('--red:         #CC1F1F;', '--green:       #7CB342;')
    content = content.replace('--red-dark:    #A51818;', '--green-dark:  #558B2F;')
    content = content.replace('--red-light:   #E83232;', '--green-light: #9CCC65;')
    content = content.replace('--red-glow:    rgba(204,31,31,0.12);', '--green-glow:  rgba(124,179,66,0.12);')
    content = content.replace('--red-soft:    #FFF5F5;', '--green-soft:  #F1F8E9;')
    
    content = content.replace('--black:       #0F0F0F;', '--black:       #222222;')
    content = content.replace('--white:       #FFFFFF;', '--white:       #FFFFFF;')
    
    # CSS classes / vars
    content = content.replace('var(--red', 'var(--green')
    content = re.sub(r'\bred-glow\b', 'green-glow', content)
    content = re.sub(r'\bred-soft\b', 'green-soft', content)
    content = re.sub(r'\bred-dark\b', 'green-dark', content)
    content = re.sub(r'\bred-light\b', 'green-light', content)
    content = re.sub(r'\bbg-red\b', 'bg-green', content)
    content = re.sub(r'\btext-red\b', 'text-green', content)
    content = re.sub(r'\bborder-red\b', 'border-green', content)
    content = re.sub(r'\bcolor-red(-[a-z]+)?\b', r'color-green\1', content)
    
    # Update globals.css specific bits
    content = content.replace('rgba(204,31,31', 'rgba(124,179,66')
    content = content.replace('rgba(204, 31, 31', 'rgba(124, 179, 66')
    content = content.replace('background: var(--red);', 'background: var(--green);')
    content = content.replace('color: var(--red)', 'color: var(--green)')
    content = content.replace('border-color: var(--red)', 'border-color: var(--green)')

    if orig != content:
        with open(filepath, 'w') as f:
            f.write(content)
        print("Updated", filepath)

for d in dirs_to_check:
    for root, _, files in os.walk(d):
        for f in files:
            process_file(os.path.join(root, f))
