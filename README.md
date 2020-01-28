# auto-filling-by-the-code
The purpose of this project is to fill a compatibility table showing the compatibility between a project and its dependencies.

The versions are loaded from a JSON file : ``compatibility-versions.json``

# Compatibility table

|Project version|ComponentA version|ComponentB version|ComponentC version|ComponentE version|ComponentD version|
|---|---|---|---|---|---|
|1.0|2.7|3.4|5.8|-|-|
|1.1|2.9|3.7|5.8|0.1|-|
|2.0|2.9|4.4|6.5|-|8.1|
|2.1|3.9|4.5|6.8|-|-|
|2.2|-|4.5|6.8|-|-|
|2.5|5.9|5.5|7.8|-|-|

The table above will be updated automaticly when ``compatibility-versions.json`` is modified.

# JSON file

Here is an example of ``compatibility-versions.json``

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
