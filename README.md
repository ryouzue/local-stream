## Video Platform - Project

- This project is in beta so expect issues 
- There is no semantic versioning to keep track of the progress
- I'm working on this based on personal interest
<br>

## Future plans - 3 / 25 / 2025

1. Rewrite the backend (again) plus include mongo database for faster performance
> Create an entry in the database for every non-recognized video
2. Come up with or, find a 'proper' data form to follow for data entries on the backend
```js
{
  "id": "{unique_identifier-min_range_x6}",
  "name": "{file_name} : null",
  "description": "{file_description} : null",
  "length": "{length_in_ms}",
  "size": "{size_in_bytes}",
  "source": "http://localhost:3006/video/{unique_identifier}",
  "image": {
    "size": 72278,
    "source": "http://localhost:3006/image/{unique_identifier}"
  }
}
```

<br>

## Wish to support me and this project?
If you have any ideas to help me out, dm on discord or create an issue letting me know!
