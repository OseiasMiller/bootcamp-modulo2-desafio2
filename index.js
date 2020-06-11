import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ola mundo");
});

app.get("/media/:subject/:type", (req, res) => {
  const grades = JSON.parse(fs.readFileSync("grades.json"));
  const gradesFiltrado = grades.grades.filter((grade) => {
    return (
      grade.subject === req.params.subject && grade.type === req.params.type
    );
  });

  const soma = gradesFiltrado.reduce(
    (last, current) => last + current.value,
    0
  );
  const result = soma / gradesFiltrado.length;
  res.send({ media: result, data: gradesFiltrado });
});

app.get("/melhoresGrades", (req, res) => {
  const grades = JSON.parse(fs.readFileSync("grades.json"));
  const gradesFiltrado = grades.grades.filter((grade) => {
    return grade.subject === "03 - React" && grade.type === "Trabalho Prático";
  });
  const result = gradesFiltrado.sort((a, b) => b.value - a.value);

  res.send(result);
});

app.get("/total/:student/:subject", (req, res) => {
  const grades = JSON.parse(fs.readFileSync("grades.json"));
  const gradesFiltrado = grades.grades.filter((grade) => {
    return (
      grade.student === req.params.student &&
      grade.subject === req.params.subject
    );
  });

  console.log(gradesFiltrado);

  const soma = gradesFiltrado.reduce(
    (last, current) => last + current.value,
    0
  );

  res.send({ total: soma, result: gradesFiltrado });
});

app.get("/grade/:id", (req, res) => {
  const grades = JSON.parse(fs.readFileSync("grades.json"));
  const gradesFiltrado = grades.grades.filter((grade) => {
    return grade.id == req.params.id;
  });
  console.log(gradesFiltrado);
  res.send(gradesFiltrado);
});

app.put("/grade/:id", (req, res) => {
  const grades = JSON.parse(fs.readFileSync("grades.json"));
  const index = grades.grades.findIndex((grade) => {
    return grade.id == req.params.id;
  });

  const grade = grades.grades[index];
  grade.value = 15;
  grades.grades[index] = grade;
  fs.writeFileSync("grades.json", JSON.stringify(grades));
  res.send(grades);
});

app.delete("/grade/:id", (req, res) => {
  const grades = JSON.parse(fs.readFileSync("grades.json"));
  const gradesFiltrado = grades.grades.filter((grade) => {
    return grade.id != req.params.id;
  });

  grades.grades = gradesFiltrado;

  fs.writeFileSync("grades.json", JSON.stringify(grades));

  res.send(gradesFiltrado);
});

app.post("/grade", (req, res) => {
  const grades = JSON.parse(fs.readFileSync("grades.json"));
  const id = grades.nextId;
  grades.nextId++;
  const grade = { id: id, ...req.body };
  grades.grades.push(grade);
  //   console.log(grades);
  res.send(grades);
  //   fs.writeFile("grades.json", JSON.stringify(grades));
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
