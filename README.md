# Installation
You will need to install: OpenCV version 2.4.x (http://opencv.org/) on your machine. The easiest way to install OpenCV on a Mac is:

```bash
brew tap homebrew/science
brew install opencv
```

After installing OpenCV, just run:

```bash
yarn
yarn start
```

# Usage:

```
curl \
  -XPOST \
  localhost:3000 \
  --data <JSON Body>  
```

with `JSON body` having the following format:

```
{
	"url": <String (required): url of the image with clothing and a reference object>,
	"contours": <Number (default=1): number of items you want to get measurements, ordered by size>,
	"refWidth": <Number (default=1): the width of reference object in your preferred length unit>,
	"refHeight": <Number (default=1): the height of reference object in your preferred length unit>
}
```

example:

```json
{
	"url": "http://192.168.3.224:9090/jean_with_ref.jpg",
	"contours": 1,
	"refWidth": 0.5,
	"refHeight": 0.5
}
```

the result will be similar to the following:

```json
{
  "uri": "http://localhost:3000/outputs/810a5d12-7e7c-4270-a181-e6993d53b0c0.contours.jpg",
  "id": "810a5d12-7e7c-4270-a181-e6993d53b0c0",
  "total": 186,
  "items": [
    {
      "i": 185,
      "area": 96899.5,
      "measurements": {
        "waist": 0.7236291414064655,
        "rise": 0.7597953985314603,
        "inseam": 1.1292140702702378,
        "fullLeg": 1.2282795186686397
      }
    }
  ]
}
```
