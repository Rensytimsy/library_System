const express = require('express');
const app = express();
//lets make our default page display views to .ejs extension rather than html
app.set("view engine" , "ejs")
const library = require("./routes/router");
//Down we are going to be using body-parser to get data from forms
const bodyParser = require('body-parser');
//lets make sure that our app makes use of the body parser
app.use(bodyParser.json());
//the above code makes sure that once we get the data from a form we conevert it immediately to json format
app.use(bodyParser.urlencoded({extended : true}));
//the above code enables us to get web address parts value from the server
//lets send the books below to the page for display
const books = [{
    bookName: "Rudest Book Ever",
    bookAuthor: "Shwetabh Gangwar",
    bookPages: 200,
    bookPrice: 240,
    bookState: "Available"
},
{
    bookName: "Do Epic Shit",
    bookAuthor: "Ankur Wariko",
    bookPages: 200,
    bookPrice: 240,
    bookState: "Available"
}
]

const PORT = process.env.PORT || 2000;
const hostname = "127.0.0.1"
//below lets perform a book addition function to our books array.We are able to perform this functionality by the use of,
//req.body.valueName using a post method
app.post("/", (req, res) => {
    //below we are setting a structure of how we are going to be getting values from the form
    const bookName = req.body.bookName;
    const bookAuthor = req.body.bookAuthor;
    const bookPages= req.body.bookPages;
    const bookPrice = req.body.bookPrice;
    const bookState = req.body.bookState;

    if(bookName ==="" && bookAuthor==="", bookPages==="", bookPrice===""){
       console.log("The fields are empty please add fill them in to add a book");
    }

    books.push({
        bookName: bookName,
        bookAuthor: bookAuthor,
        bookPages: bookPages,
        bookPrice: bookPrice,
        bookState: "Available"
    })

    res.render("index", {data: books})

})




const server = app.get("/", (req, res) => {
    res.render("index", {data: books});
});
app.post("/issue", (req, res) => {
    const requestedBook = req.body.bookName;
    books.forEach(book => {
        if(book.bookName == requestedBook){
            book.bookState = "issued";
        }
    })
    res.render("index", {data: books});
});
app.post("/return", (req, res) => {
    const requestedBook = req.body.bookName;
    books.forEach(book => {
        if(book.bookName == requestedBook){
            book.bookState = "Available";
        }
    })
    res.render("index", {data: books});
});
app.post("/delete", (req, res) => {
    const deleteBook = req.body.bookName;
    let i = 0;
    books.forEach(book => {
        i = i + 1;
        if(book.bookName == deleteBook){
            books.splice((i - 1), 1);
        }
    });
    res.render("index", {data: books});
})

const students = [
    {
        firstName: "Evans",
        secondName: "Mutembei",
        schoolId: 12345,
        studentClass: "3E",
        booksIssued: ["Blossoms of savannah"]
    },
    {
        firstName: "Marcus",
        secondName: "Kariuki",
        schoolId: 22545,
        studentClass: "2E",
        booksIssued: ["Blossoms of savannah"]
    },
    {
        firstName: "Brian",
        secondName: "Mwema",
        schoolId: 42645,
        studentClass: "3E",
        booksIssued: ["Blossoms of savannah"]
    },
]

app.post("/students", (req, res) => {
    const firstName = req.body.firstName;
    const secondName = req.body.secondName;
    const schoolId = req.body.schoolId;
    const studentClass = req.body.studentClass;
    const booksIssued = req.body.booksIssued;

    students.push({
        firstName: firstName,
        secondName: secondName,
        schoolId: schoolId,
        studentClass: studentClass,
        booksIssued: booksIssued
    })
    res.render("students", {data: students});
})

//below is a search function

server.listen(PORT, hostname,  () => {
  console.log(`The server is running at http://${hostname}:${PORT}`)   
});
