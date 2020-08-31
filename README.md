# Twitter API v2 Filtered Stream with Angular + NestJS + Akita

This project is to showcase how to consume the [Twitter API v2][twitter] data-stream endpoints using [Angular][angular] and [NestJS][nest] managed by a [Nx][nx] workspace with [Akita][akita] State Management solution.

## Demo

The application hasn't been deployed yet but a recorded demo can be found here:
[![CloudApp][demo]](https://share.getcloudapp.com/5zuG2R8w)

## Tech Stack

- [Angular][angular]
- [NestJS][nest]
- [SocketIO][socket]
- [Nx][nx]
- [TailwindCSS][tailwind]
- [ngx-charts][charts]
- [Angular Google Maps][googlemaps]

## Features

An Angular application with Twitter API v2 to stream real time tweets on 3 big frontend frameworks: Angular, React, and Vue.

- Horizontal bar chart shows tweet counts with real time update.
- Scroll panel with the list of tweets with Virtual Scroll (Angular CDK)
- Google map that will drop the logo of the framework mentioned in the tweet as the marker. If the tweet is not geo-tagged, then there’s no marker for that tweet.
- Ability to add more rules to the Twitter API queries to stream different frameworks than the default big 3

### Note on Geographical Data

Initially, I thought **Twitter API** would return geolocation for the tweets. However, that would be a huge privacy flaw. **Twitter API** does indeed return geolocation for tweets **ONLY IF** the users turn on Location, allow **Twitter** to access the device's location service, and actually tag their tweets with a location.

To workaround this, I use [random-location][randomlocation] which is a JavaScript library that will generate random coordinates based on a Center Point and the Radius. For tweets that do not have Geolocation information, I generate a random coordinate for that tweet from the Center of the US.

## High level flow

![high level flow][flow]

The above diagram might be a little confusing which I will also point out a couple of main things:

- FrontEnd, upon initialization, will do 3 things: Connect to the Socket connection, Send an API request to fetch the current Twitter API rules, and Listen for `tweetData` event from Socket.
- Backend, upon a socket connection is established, will attempt to call the Twitter API stream endpoint and save the request as a `Subscription`:
  - If there's already a `Subscription`, do nothing
  - If there's not, call the Twitter API -> receive `IncomingMessage` as a data stream -> convert to RxJS Stream using `fromEventPattern`. When there's data from `IncomingMessage` (`on('data')`), a local `ReplaySubject` (`$tweet`) will push that `data` to its stream.
- `tweetData` handler on the BackEnd constructs a record for `Map<string, Subscription>` which is used to keep track of each connected Client (Socket client) along with their `Subscription`. This `Subscription` is from `tweet$.subscribe()` which is an `Observable` of the `ReplaySubject` above. This is to make sure the `Subscription` from calling Twitter API is a single subscription but the FrontEnd can create as many subscriptions as possible based on the `ReplaySubject`.
- Every piece of data will be pushed through Akita store as well, and the Components layer use data from the Store to render.

## Challenges

- Twitter API stream endpoint only allows **ONE** connection at a time. That's why the trick with RxJS in the above step comes into play.
- Twitter API returns a data stream. Hence, traditional Request Fetching doesn't work. `Axios` does support this type of data with `responseType: stream` and transform the response to `IncomingMessage` which is a little tricky to work with.
- The 2nd challenge also requires a Socket connection of some sort to push the data back to the FrontEnd in a real-time manner because traditional fetch wouldn't work.
- Geographical data also turns out way different that what I initially thought it was. Check [Note on Geographical Data](#note-on-geographical-data).

## Improvements

- Mobile responsive: The application isn't mobile-friendly at the moment. But TailwindCSS would be able to handle that no problem at all.
- Validations: There are no validations at all right now.
- Error Handler: Error handler is a little weak as well.
- Display more information about default Queries which are the big 3 frameworks.

## Time tracking

![time][time]

I spent around 15-16 hours on this project. The rest of the time was writing up this README and looking up documentations in between. Overall, the project is challenging but super fun to work with.

![files][files]

As you can see here, `app.service.ts` takes up the most time because of all the RxJS magic with Twitter API Stream endpoint. Unsubscription logic is handled in `app.service.ts` as well.

## Local Development

- Clone the project
- Supply Environment Variables to `.env` based on `.env.example`
- Run `npm run start api` to start the backend
- Run `npm run start` to start the frontend on port 4200

## License

Feel free to use my code on your project. It would be great if you put a reference to this repository.

[MIT](https://opensource.org/licenses/MIT)

[angular]: https://angular.io
[nest]: https://nestjs.com
[nx]: https://nx.dev
[akita]: https://datorama.github.io/akita/
[tailwind]: https://tailwindcss.com
[charts]: https://swimlane.gitbook.io/ngx-charts/
[googlemaps]: https://github.com/angular/components/blob/master/src/google-maps/README.md
[twitter]: https://developer.twitter.com/en/products/twitter-api
[socket]: https://socket.io/
[randomlocation]: https://www.npmjs.com/package/random-location
[demo]: docs/demo_screenshot.png
[flow]: docs/flow.png
[files]: docs/files.png
[time]: docs/time-spent.png
