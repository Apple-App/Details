require('dotenv').config();
require('newrelic');
const express = require('express');
const compression = require('compression');

const app = express();
const port = 9002;

const React = require('react');
const ReactDOM = require('react-dom/server');

const fs = require('fs');

//mongo
// const db = require('../db/index.js');

//postgres
const db = require('../db/schema.js');

//couch
//const db = require('../db/noSQLschema.js');

const getMovie = require('./helper.js');

// server side render
const component = require('../client/dist/bundle-server').default;

// Redis
const redis = require('redis');
const client = redis.createClient('6379', '18.235.34.167');

client.on('connect', () => {
  console.log('redis connected!');
});

client.on('error', err => {
  console.log(err);
});

app.use((req, res, next) => {
  // console.log(req);
  next();
});
app.use(express.static('./client/dist'));
app.use(compression());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/loaderio-ade6ece33af1644014596ced42e4b450/', (req, res) => {
  res.send('loaderio-ade6ece33af1644014596ced42e4b450');
});

//SERVER DATA
app.get('/movie/:number', (req, res) => {
  const params = req.params.number;
  client.get(params, (err, data) => {
    if (!data) {
      getMovie(params, (err, movie) => {
        client.setex(params, 60, JSON.stringify(movie), (err, info) => {
          console.log(info);
        });
        if (err) {
          console.log(err);
          res.send(500);
        } else {
          res.send(movie);
        }
      });
    } else {
      res.send(JSON.parse(data));
    }
  });
});

//server side render
app.get('/movie/server/:number', (req, res) => {
  const params = req.params.number;
  client.get(params, (err, data) => {
    if (!data) {
      getMovie(params, (err, movie) => {
        client.setex(params, 60, JSON.stringify(movie), (err, info) => {
          console.log(info);
        });
        if (err) {
          console.log(err);
          res.send(500);
        } else {
          let props = { movieData: movie };
          let element = React.createElement(component, props);
          let string = ReactDOM.renderToString(element);

          let css = `
        * {
          box-sizing: border-box;
        }
        body {
          font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 16px;
          line-height: 1.25;
          color: #343434;
          background-color: #fff;
          -webkit-font-smoothing: antialiased;
        }
        div {
          display: block;
        }
        a {
          color: #3976dc;
          text-decoration: none;
        }
        a:hover {
          text-decoration: none;
          color: #53bbf1 !important;
          cursor: pointer;
        }
        .column {
          overflow: hidden;
        }
        @media (min-width: 770px) {
          .column {
            width: 770px;
          }
        }
        @media (max-width: 769px) {
          .column {
            width: 100%;
          }
        }
        @media (min-width: 768px) {
          h2 {
            line-height: 22px;
            margin-bottom: 6px;
            margin-top: 4px;
          }
        }
        @media (max-width: 767px) {
          h2 {
            padding-left: 25px !important;
            font-family: 'Neusa Next Pro Compact';
          }
        }
        @media (min-width: 768px) {
          .panel-heading {
            border: 0;
            background-color: white;
            font-size: 28px;
            font-weight: 500;
          }
          h2.panel-heading::after {
            position: absolute;
            margin-left: 7px;
            width: 100%;
            background-color: #fa320a;
            content: ' ';
            min-width: 20px;
            height: 20px;
          }
        }
        @media (max-width: 767px) {
          .panel-heading {
            margin: 2px 0;
            padding: 6px 10px;
            font-size: 20px;
          }
          .panel-heading > h2.panel-heading::after {
            content: none;
          }
        }
        .panel-heading {
          border-radius: 0;
          clear: left;
          color: #1c1c1c;
          /* float: left; */
          text-transform: uppercase;
        }
        .panel-heading {
          width: 100% !important;
          position: relative;
          overflow: hidden;
          line-height: 24px;
          padding: 10px 15px;
          padding-left: 25px;
        }
        h2 {
          display: block;
          font-size: 1.5em;
          /* margin-block-start: 0.83em;
          margin-block-end: 0.83em;
          margin-inline-start: 0px;
          margin-inline-end: 0px; */
          font-family: 'Staatliches', cursive;
          font-weight: bold;
          font-weight: 500;
        }
        h2.panel-heading::before {
          position: absolute;
          left: 0;
          background-color: #fa320a;
          content: ' ';
          min-width: 20px;
          height: 20px;
        }
        @media (min-width: 480px) {
          .content_panel {
            overflow: visible;
          }
        }
        @media (max-width: 991px) {
          .content_panel {
            width: 100%;
          }
        }
        .content-panel {
          clear: both;
          overflow: hidden;
          padding: 15px;
        }
        .video_list {
          width: 4476px;
          overflow: hidden;
        }
        iframe {
          height: 130px;
          width: 170px;
        }
        .video_container {
          height: 165px;
          width: 170px;
          padding: 5px 5px;
          display: inline-block;
        }
        .video_description {
          color: #444;
          display: -webkit-box;
          font-size: 14px;
          line-height: 1.2;
          max-height: 2.4em;
          padding: 5px 0;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        ul {
          position: relative;
          display: block;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          padding-inline-start: 40px;
        }
        .dots {
          padding: 0;
          padding-right: 30px;
          list-style: none;
          display: block;
          text-align: right;
          /* top: -26px; */
          bottom: auto;
          margin: 0;
        }
        .dots li {
          position: relative;
          display: inline-block;
          height: 14px;
          width: 14px;
          margin: 0 4px;
          padding: 0;
          cursor: pointer;
          list-style: none;
          user-select: none;
        }
        .dots li .active_dot {
          background: #fa320a !important;
        }
        .dots li button {
          border-radius: 50%;
          border: 0;
          background: #ccc;
          display: block;
          height: 14px;
          width: 14px;
          outline: none;
          line-height: 0;
          font-size: 0;
          color: transparent;
          padding: 5px;
          cursor: pointer;
        }
        .carousel {
          padding: 0px 15px;
          padding-top: 5px;
          margin-bottom: 0;
          margin-top: 0;
          position: relative;
          box-sizing: border-box;
          /* user-select: none;
          touch-action: pan-y;
          -webkit-tap-highlight-color: transparent; */
        }
        @media (max-width: 991px) {
          .carousel {
            width: 100%;
          }
        }
        .carousel_button {
          display: inline-block;
          top: 50%;
          border: none;
          transform: translateY(-50%);
          border-radius: 50%;
          background: white;
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
          color: gray;
          height: 40px;
          line-height: 0;
          padding: 0;
          position: absolute;
          width: 40px;
          z-index: 1;
          -webkit-appearance: button;
          cursor: pointer;
          margin: 0;
          text-transform: none;
          border-style: none;
          outline-style: none;
        }
        .left {
          left: -8px;
        }
        .right {
          right: 4px;
        }
        svg {
          fill: currentcolor;
          vertical-align: middle;
          width: 24px;
          height: 24px;
        }
        .carousel_list {
          width: 100%;
          max-height: 181px;
          position: relative;
          overflow: hidden;
          display: inline-block;
          margin: 0;
          padding: 0;
          white-space: nowrap;
        }
        .carousel_list img {
          padding: 5px;
          outline: none;
          width: 181.5px;
          float: left;
          /* transition: transform 0.15s ease-in-out; */
          /* vertical-align: middle; */
          cursor: pointer;
        }
        img:hover {
          transform: scale(1.05);
          outline: 0;
          color: #53bbf1 !important;
          overflow: hidden;
        }
        @media (max-width: 767px) {
          .carousel {
            overflow: hidden;
          }
          .carousel_list {
            overflow: hidden;
          }
          .dots {
            display: none;
          }
          .left {
            display: none;
          }
          .right {
            display: none;
          }
        }
        .rightslider-enter {
          transform: translate(100%);
        }
        .rightslider-enter.rightslider-enter-active {
          transform: translate(0%);
          transition: transform 350ms ease-in-out;
        }
        .rightslider-leave {
          transform: translate(0%);
        }
        .rightslider-leave.rightslider-leave-active {
          transform: translate(-100%);
          transition: transform 350ms ease-in-out;
        }
        .leftslider-enter {
          transform: translate(-100%);
        }
        .leftslider-enter.leftslider-enter-active {
          transform: translate(0%);
          transition: transform 350ms ease-in-out;
        }
        .leftslider-leave {
          transform: translate(0%);
        }
        .leftslider-leave.leftslider-leave-active {
          transform: translate(100%);
          transition: transform 350ms ease-in-out;
        }
        #movie_description {
          font-family: 'Franklin Gothic Book';
          max-height: 7.5em;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          /* overflow: hidden; */
          line-height: 1.2em;
        }
        .information {
          display: table;
          font-family: 'Franklin Gothic Book';
          width: 100%;
          margin: 10px 0 15px;
          list-style-type: none;
          padding: 0;
        }
        .information_row {
          display: table-row;
          width: 100%;
          clear: both;
          text-align: -webkit-match-parent;
        }
        .information_row .label {
          display: table-cell;
          min-height: 1px;
          padding: 0 10px;
          position: relative;
          vertical-align: top;
          font-weight: bold;
          text-align: right;
          width: 23%;
          color: #787878;
        }
        .information_row .value {
          display: table-cell;
          min-height: 1px;
          padding: 0 10px;
          position: relative;
          vertical-align: top;
          text-align: left;
          width: 77%;
        }
        @media (max-width: 767px) {
          .information .label {
            display: inline;
            font-weight: normal;
            text-align: left;
            line-height: 1.2em;
            padding-right: 5px;
          }
          .information .value {
            display: inline;
            font-weight: normal;
            text-align: left;
            line-height: 1.2em;
            padding: 0;
          }
        }
        .location {
          padding: 0 0 10px;
          border-bottom: 1px solid #eee;
        }
        .change_location {
          font-size: 12px;
          padding-left: 4px;
        }
        .address {
          padding-top: 10px;
          display: inline-block;
        }
        .address h2 {
          margin: 0;
          padding: 0;
          padding-right: 5px;
          font-size: 18px;
          font-weight: normal;
          font-family: inherit;
        }
        .showtimes {
          color: #787878;
          /* display: inline; */
          font-size: 14px;
          padding-top: 10px;
          width: 100%;
        }
        .times {
          padding: 5px;
        }
        .showing_type {
          padding-top: 10px;
        }
        .time_button {
          font-size: 15px;
          font-weight: normal;
          line-height: 1.42857143;
          margin: 2px;
          min-width: 86px;
          padding: 6px 12px;
          text-align: center;
          touch-action: manipulation;
          vertical-align: middle;
          white-space: nowrap;
          border-radius: 5px;
          border: none;
          display: inline-block;
          background-color: #ffe400 !important;
          color: #333;
        }
        @media (max-width: 767px) {
          .time_button {
            width: auto;
          }
        }    
      `;

          res.send(
            `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
            <title>Document</title>
            <script src="/lib/react.development.js"></script>
            <script src="/lib/react-dom.development.js"></script>
            <style type="text/css" scoped>${css}</style>
            </head>
            <body>
            <div id="details">${string}</div>
            <script src="http://ec2-18-235-34-167.compute-1.amazonaws.com/bundle.js"><script/>
            <script>
              ReactDOM.hydrate(
                React.createElement(App, ${JSON.stringify(props)},
                  document.getElementById('details')
                );
            </script>
            </body>
        </html>`
          );
        }
      });
    } else {
      let props = { movieData: JSON.parse(data) };
      let element = React.createElement(component, props);
      let string = ReactDOM.renderToString(element);

      let css = `
        * {
          box-sizing: border-box;
        }
        body {
          font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 16px;
          line-height: 1.25;
          color: #343434;
          background-color: #fff;
          -webkit-font-smoothing: antialiased;
        }
        div {
          display: block;
        }
        a {
          color: #3976dc;
          text-decoration: none;
        }
        a:hover {
          text-decoration: none;
          color: #53bbf1 !important;
          cursor: pointer;
        }
        .column {
          overflow: hidden;
        }
        @media (min-width: 770px) {
          .column {
            width: 770px;
          }
        }
        @media (max-width: 769px) {
          .column {
            width: 100%;
          }
        }
        @media (min-width: 768px) {
          h2 {
            line-height: 22px;
            margin-bottom: 6px;
            margin-top: 4px;
          }
        }
        @media (max-width: 767px) {
          h2 {
            padding-left: 25px !important;
            font-family: 'Neusa Next Pro Compact';
          }
        }
        @media (min-width: 768px) {
          .panel-heading {
            border: 0;
            background-color: white;
            font-size: 28px;
            font-weight: 500;
          }
          h2.panel-heading::after {
            position: absolute;
            margin-left: 7px;
            width: 100%;
            background-color: #fa320a;
            content: ' ';
            min-width: 20px;
            height: 20px;
          }
        }
        @media (max-width: 767px) {
          .panel-heading {
            margin: 2px 0;
            padding: 6px 10px;
            font-size: 20px;
          }
          .panel-heading > h2.panel-heading::after {
            content: none;
          }
        }
        .panel-heading {
          border-radius: 0;
          clear: left;
          color: #1c1c1c;
          /* float: left; */
          text-transform: uppercase;
        }
        .panel-heading {
          width: 100% !important;
          position: relative;
          overflow: hidden;
          line-height: 24px;
          padding: 10px 15px;
          padding-left: 25px;
        }
        h2 {
          display: block;
          font-size: 1.5em;
          /* margin-block-start: 0.83em;
          margin-block-end: 0.83em;
          margin-inline-start: 0px;
          margin-inline-end: 0px; */
          font-family: 'Staatliches', cursive;
          font-weight: bold;
          font-weight: 500;
        }
        h2.panel-heading::before {
          position: absolute;
          left: 0;
          background-color: #fa320a;
          content: ' ';
          min-width: 20px;
          height: 20px;
        }
        @media (min-width: 480px) {
          .content_panel {
            overflow: visible;
          }
        }
        @media (max-width: 991px) {
          .content_panel {
            width: 100%;
          }
        }
        .content-panel {
          clear: both;
          overflow: hidden;
          padding: 15px;
        }
        .video_list {
          width: 4476px;
          overflow: hidden;
        }
        iframe {
          height: 130px;
          width: 170px;
        }
        .video_container {
          height: 165px;
          width: 170px;
          padding: 5px 5px;
          display: inline-block;
        }
        .video_description {
          color: #444;
          display: -webkit-box;
          font-size: 14px;
          line-height: 1.2;
          max-height: 2.4em;
          padding: 5px 0;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        ul {
          position: relative;
          display: block;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          padding-inline-start: 40px;
        }
        .dots {
          padding: 0;
          padding-right: 30px;
          list-style: none;
          display: block;
          text-align: right;
          /* top: -26px; */
          bottom: auto;
          margin: 0;
        }
        .dots li {
          position: relative;
          display: inline-block;
          height: 14px;
          width: 14px;
          margin: 0 4px;
          padding: 0;
          cursor: pointer;
          list-style: none;
          user-select: none;
        }
        .dots li .active_dot {
          background: #fa320a !important;
        }
        .dots li button {
          border-radius: 50%;
          border: 0;
          background: #ccc;
          display: block;
          height: 14px;
          width: 14px;
          outline: none;
          line-height: 0;
          font-size: 0;
          color: transparent;
          padding: 5px;
          cursor: pointer;
        }
        .carousel {
          padding: 0px 15px;
          padding-top: 5px;
          margin-bottom: 0;
          margin-top: 0;
          position: relative;
          box-sizing: border-box;
          /* user-select: none;
          touch-action: pan-y;
          -webkit-tap-highlight-color: transparent; */
        }
        @media (max-width: 991px) {
          .carousel {
            width: 100%;
          }
        }
        .carousel_button {
          display: inline-block;
          top: 50%;
          border: none;
          transform: translateY(-50%);
          border-radius: 50%;
          background: white;
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
          color: gray;
          height: 40px;
          line-height: 0;
          padding: 0;
          position: absolute;
          width: 40px;
          z-index: 1;
          -webkit-appearance: button;
          cursor: pointer;
          margin: 0;
          text-transform: none;
          border-style: none;
          outline-style: none;
        }
        .left {
          left: -8px;
        }
        .right {
          right: 4px;
        }
        svg {
          fill: currentcolor;
          vertical-align: middle;
          width: 24px;
          height: 24px;
        }
        .carousel_list {
          width: 100%;
          max-height: 181px;
          position: relative;
          overflow: hidden;
          display: inline-block;
          margin: 0;
          padding: 0;
          white-space: nowrap;
        }
        .carousel_list img {
          padding: 5px;
          outline: none;
          width: 181.5px;
          float: left;
          /* transition: transform 0.15s ease-in-out; */
          /* vertical-align: middle; */
          cursor: pointer;
        }
        img:hover {
          transform: scale(1.05);
          outline: 0;
          color: #53bbf1 !important;
          overflow: hidden;
        }
        @media (max-width: 767px) {
          .carousel {
            overflow: hidden;
          }
          .carousel_list {
            overflow: hidden;
          }
          .dots {
            display: none;
          }
          .left {
            display: none;
          }
          .right {
            display: none;
          }
        }
        .rightslider-enter {
          transform: translate(100%);
        }
        .rightslider-enter.rightslider-enter-active {
          transform: translate(0%);
          transition: transform 350ms ease-in-out;
        }
        .rightslider-leave {
          transform: translate(0%);
        }
        .rightslider-leave.rightslider-leave-active {
          transform: translate(-100%);
          transition: transform 350ms ease-in-out;
        }
        .leftslider-enter {
          transform: translate(-100%);
        }
        .leftslider-enter.leftslider-enter-active {
          transform: translate(0%);
          transition: transform 350ms ease-in-out;
        }
        .leftslider-leave {
          transform: translate(0%);
        }
        .leftslider-leave.leftslider-leave-active {
          transform: translate(100%);
          transition: transform 350ms ease-in-out;
        }
        #movie_description {
          font-family: 'Franklin Gothic Book';
          max-height: 7.5em;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          /* overflow: hidden; */
          line-height: 1.2em;
        }
        .information {
          display: table;
          font-family: 'Franklin Gothic Book';
          width: 100%;
          margin: 10px 0 15px;
          list-style-type: none;
          padding: 0;
        }
        .information_row {
          display: table-row;
          width: 100%;
          clear: both;
          text-align: -webkit-match-parent;
        }
        .information_row .label {
          display: table-cell;
          min-height: 1px;
          padding: 0 10px;
          position: relative;
          vertical-align: top;
          font-weight: bold;
          text-align: right;
          width: 23%;
          color: #787878;
        }
        .information_row .value {
          display: table-cell;
          min-height: 1px;
          padding: 0 10px;
          position: relative;
          vertical-align: top;
          text-align: left;
          width: 77%;
        }
        @media (max-width: 767px) {
          .information .label {
            display: inline;
            font-weight: normal;
            text-align: left;
            line-height: 1.2em;
            padding-right: 5px;
          }
          .information .value {
            display: inline;
            font-weight: normal;
            text-align: left;
            line-height: 1.2em;
            padding: 0;
          }
        }
        .location {
          padding: 0 0 10px;
          border-bottom: 1px solid #eee;
        }
        .change_location {
          font-size: 12px;
          padding-left: 4px;
        }
        .address {
          padding-top: 10px;
          display: inline-block;
        }
        .address h2 {
          margin: 0;
          padding: 0;
          padding-right: 5px;
          font-size: 18px;
          font-weight: normal;
          font-family: inherit;
        }
        .showtimes {
          color: #787878;
          /* display: inline; */
          font-size: 14px;
          padding-top: 10px;
          width: 100%;
        }
        .times {
          padding: 5px;
        }
        .showing_type {
          padding-top: 10px;
        }
        .time_button {
          font-size: 15px;
          font-weight: normal;
          line-height: 1.42857143;
          margin: 2px;
          min-width: 86px;
          padding: 6px 12px;
          text-align: center;
          touch-action: manipulation;
          vertical-align: middle;
          white-space: nowrap;
          border-radius: 5px;
          border: none;
          display: inline-block;
          background-color: #ffe400 !important;
          color: #333;
        }
        @media (max-width: 767px) {
          .time_button {
            width: auto;
          }
        }    
      `;

      res.send(
        `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
            <title>Document</title>
            <script src="/lib/react.development.js"></script>
            <script src="/lib/react-dom.development.js"></script>
            <style type="text/css" scoped>${css}</style>
            </head>
            <body>
            <div id="details">${string}</div>
            <script src="http://ec2-18-235-34-167.compute-1.amazonaws.com/bundle.js"><script/>
            <script>
              ReactDOM.hydrate(
                React.createElement(App, JSON.parse(${JSON.stringify(props)}),
                  document.getElementById('details')
                );
            </script>
            </body>
        </html>`
      );
    }
  });
});

app.listen(port, () => {
  console.log('listening on port: ', port);
});
