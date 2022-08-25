// import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((_request, response, next) => {
  console.log("1");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "content-type");
  next();
});

app.post("/api/result", (request, response) => {
  const b = request.body;
  console.log("Body", b);
  response.status(200);
  response.end();
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Dev server listening on ${process.env.PORT || 8080}`);
});
