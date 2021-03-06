# auto-filling-by-the-code
![tests](https://github.com/sblecon/auto-filling-by-the-code/workflows/tests/badge.svg)

The purpose of this project is to fill a compatibility table showing the compatibility between a project and its dependencies.

The versions are loaded from a JSON file, by default ``compatibility-versions.json``

# Usage in a workflow

## Inputs

- **version_file_path**: Path to the JSON file containing the versions of your components
- **readme_path**: Path of the readme file to update
- **section_title**: Name of the section containing the table (example: '# Compatibility table')

**Note:** These path are relative to the root of your Github repository 

## Full example

    name: Update Readme

    on: 
    push:
        paths:
        - 'compatibility-versions.json'
        branches:
        - 'master'

    jobs:
    update:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@master
        - uses: sblecon/auto-filling-by-the-code@master
        with:
            version_file_path: 'compatibility-versions.json'
            readme_path: 'README.md'
        - name: Commit and Push the updated README.md
        run: |
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add README.md
            git commit -m "Update README.md compatibility table"
            git push "https://${GH_TOKEN}@github.com/${GITHUB_REPOSITORY}" master:master


# JSON file

Here is an example of the JSON file used ealier

    [
        {
            "Project": "1.0",
            "ComponentA": "2.7",
            "ComponentB": "3.4",
            "ComponentC": "5.8"  
        },
        {
            "Project": "1.1",
            "ComponentA": "2.9",
            "ComponentB": "3.7",
            "ComponentC": "5.8",
            "ComponentE": "0.1" 
        },
        {
            "Project": "2.0",
            "ComponentA": "2.9",
            "ComponentB": "4.4",
            "ComponentC": "6.5",
            "ComponentD": "8.1"
        },
        {
            "Project": "2.1",
            "ComponentA": "3.9",
            "ComponentB": "4.5",
            "ComponentC": "6.8"  
        },
        {
            "Project": "2.5",
            "ComponentA": "5.9",
            "ComponentB": "5.5",
            "ComponentC": "7.8"  
        }
    ]
