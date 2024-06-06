const express = require('express');
const app = express();

app.set("port", process.env.PORT || 3000);

// 정적 파일 제공
//app.use(express.static(path.join(__dirname, '../frontend')));

app.use(
	express.urlencoded({
		extended: false
	})
);

app.get('/', (req, res) => {
  res.send("Welcome!!!!!!");
});

app.listen(app.get("port"), () => {
  console.log(`Server is running at http://localhost:${app.get("PORT")}`);
});

