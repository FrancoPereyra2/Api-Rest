import express from "express";
import fs from "fs";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());

const readDate = () =>{
    try{
        const data =fs.readFileSync ("./db.json");
    return JSON.parse(data);
    }
    catch(error)
    {
        console.log(error);
    }
    
}
const writeData = (data) => {
    try{
        fs.writeFileSync("./db.json", JSON.stringify(data));
    }
    catch(error)
    {
        console.log(error);
    }
};

app.get("/", (req, res) =>{
    res.send("bienvenido al Api rest de Tano Pastita")
})

app.get("/books", (req, res) =>{
    const data = readDate();
    res.json(data.books);
});

app.get("/books/:id",(req, res) =>{
    const data = readDate();
    const id = parseInt(req.params.id);
    const book = data.books.find((book) => book.id ===id);
    res.json(book);
});

app.post("/books", (req, res) =>{
    const data = readDate()
    const body = req.body;
    const newBook = {
        id: data.books.length + 1,
        ...body,
    };
    data.books.push(newBook);
    writeData(data);
    res.json(newBook);
});

app.put("/books/:id", (req, res) => {
    const data = readDate();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Book updated successfully" });
});

app.delete("/books/:id", (req, res) => {
    const data = readDate();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books.splice(bookIndex, 1);
    writeData(data);
    res.json({ message: "Book deleted succcessfully" });
});

app.listen(3001, () => {
    console.log ('server listening on port 3001');
} );