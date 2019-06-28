# Video autoplay

This project is an utilitary to autoplay video (usually as a banner ad), receiving the properties as url query parameters.

## How-to

### Step 1 (required): Upload video somewhere and remember the url.

### Step 2 (required): Access this project (wherever it is being served from) passing the video url as argument. 

For example, if this project is running at `localhost:3000` and the server is also hosting the video at `localhost:3000/example.mp4`, the url will be:
  - `http://localhost:3000/?src=example.mp4` 

### Step 3 (optional): Customize your video
  You can pass query parameters to customize the video display. Just add the following to the end of the URL:

  - `&loop=1`: Defines if the video will loop
  - `&href=http://example.pt`: A link that will open in a new tab if the user click on the banner.
  - `&sound=1`: DEfines if the sound will be unmuted when the user tap (mobile) or mouse over (desktop) it.